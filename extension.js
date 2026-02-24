const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('FAhhhh Screamer is now active!');

    // --- Scream Counter Status Bar ---
    let screamCount = context.globalState.get('screamCount', 0);
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.tooltip = 'FAhhhh Screamer - Total screams this session';
    statusBarItem.command = 'fahhhh.testScream';
    const updateStatusBar = () => {
        statusBarItem.text = `$(bell) FAhhhh x${screamCount}`;
        statusBarItem.backgroundColor = screamCount > 0
            ? new vscode.ThemeColor('statusBarItem.warningBackground')
            : undefined;
    };
    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // --- Helper to read settings ---
    const getConfig = () => vscode.workspace.getConfiguration('fahhhhScreamer');

    // --- Cross-platform audio player ---
    const vbsPath = path.join(context.extensionPath, 'play.vbs');

    const playScream = (trigger = 'any') => {
        const config = getConfig();

        // Respect the global enable/disable toggle
        if (!config.get('enabled', true)) return;

        // Respect per-trigger toggles
        if (trigger === 'diagnostics' && !config.get('playOnDiagnostics', true)) return;
        if (trigger === 'save' && !config.get('playOnSave', true)) return;
        if (trigger === 'task' && !config.get('playOnTaskFailure', true)) return;
        if (trigger === 'debugger' && !config.get('playOnDebuggerCrash', true)) return;

        // Sound file: check custom path setting first, then fall back to bundled files
        const customSoundFile = config.get('soundFile', '');
        let soundPath = '';

        if (customSoundFile && customSoundFile.trim() !== '') {
            // Expand ~ to home directory for cross-platform paths
            soundPath = customSoundFile.replace(/^~/, os.homedir());
            if (!fs.existsSync(soundPath)) {
                vscode.window.showWarningMessage(`FAhhhh Screamer: Custom sound file not found: ${soundPath}. Falling back to bundled sound.`);
                soundPath = '';
            }
        }

        // Fall back to bundled sound if no custom file
        if (!soundPath) {
            soundPath = path.join(context.extensionPath, 'fahhh_KcgAXfs.mp3');
            if (!fs.existsSync(soundPath)) soundPath = path.join(context.extensionPath, 'fahhh.mp3');
            if (!fs.existsSync(soundPath)) soundPath = path.join(context.extensionPath, 'fahhh.wav');
        }

        if (!fs.existsSync(soundPath)) {
            vscode.window.showErrorMessage('FAhhhh Screamer: Sound file not found!');
            return;
        }

        const volume = config.get('volume', 1.0);
        const platform = os.platform();

        let command;
        if (platform === 'win32') {
            // Windows: use our silent VBScript player
            command = `wscript.exe "${vbsPath}" "${soundPath}"`;
        } else if (platform === 'darwin') {
            // macOS: use afplay (built-in, no install needed)
            // Volume on afplay is 0-255, so we multiply our 0-1 value by 255
            const macVolume = Math.round(volume * 255);
            command = `afplay "${soundPath}" -v ${macVolume}`;
        } else {
            // Linux: try paplay first (PulseAudio), then aplay (ALSA) as fallback
            command = `paplay "${soundPath}" 2>/dev/null || aplay "${soundPath}" 2>/dev/null`;
        }

        exec(command);

        // Update the scream counter
        screamCount++;
        context.globalState.update('screamCount', screamCount);
        updateStatusBar();
    };

    // --- Commands ---
    context.subscriptions.push(
        vscode.commands.registerCommand('fahhhh.testScream', () => {
            vscode.window.showInformationMessage('FAhhhhhhhh! 😱');
            playScream();
        }),
        vscode.commands.registerCommand('fahhhh.toggle', () => {
            const config = getConfig();
            const current = config.get('enabled', true);
            config.update('enabled', !current, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(
                !current ? '😱 FAhhhh Screamer: Enabled!' : '🔇 FAhhhh Screamer: Disabled!'
            );
        }),
        vscode.commands.registerCommand('fahhhh.resetCount', () => {
            screamCount = 0;
            context.globalState.update('screamCount', 0);
            updateStatusBar();
            vscode.window.showInformationMessage('😱 Scream counter reset to 0!');
        }),
        vscode.commands.registerCommand('fahhhh.pickSoundFile', async () => {
            // Open native file browser dialog filtered to audio files
            const selected = await vscode.window.showOpenDialog({
                canSelectMany: false,
                openLabel: 'Use This Sound',
                filters: { 'Audio Files': ['mp3', 'wav', 'm4a'] },
                title: 'Pick your FAhhhh sound file'
            });

            if (selected && selected.length > 0) {
                const filePath = selected[0].fsPath;
                const config = getConfig();
                await config.update('soundFile', filePath, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage(
                    `😱 FAhhhh Screamer: Sound set to "${path.basename(filePath)}"! ` +
                    `Run "FAhhhh: Test Scream" to preview it.`
                );
            }
        })
    );

    // --- Trigger 1: VS Code task failures ---
    vscode.tasks.onDidEndTaskProcess((event) => {
        if (event.exitCode !== 0) {
            playScream('task');
        }
    }, null, context.subscriptions);

    // --- Trigger 2: File save with existing errors ---
    vscode.workspace.onDidSaveTextDocument((document) => {
        const diagnostics = vscode.languages.getDiagnostics(document.uri);
        const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);
        if (hasErrors) playScream('save');
    }, null, context.subscriptions);

    // --- Trigger 3: Actual debugger CRASH (unhandled exception) ---
    // This uses the DAP (Debug Adapter Protocol) stopped event, which fires specifically
    // when execution halts due to an exception - NOT on normal starts/stops.
    vscode.debug.onDidReceiveDebugSessionCustomEvent(event => {
        if (
            event.event === 'stopped' &&
            (event.body?.reason === 'exception' || event.body?.reason === 'signal')
        ) {
            playScream('debugger');
        }
    }, null, context.subscriptions);

    // --- Trigger 4: Live diagnostics (new red squiggles while typing) ---
    let diagnosticTimeout;
    let previousErrorCount = 0;

    vscode.languages.onDidChangeDiagnostics(() => {
        clearTimeout(diagnosticTimeout);
        diagnosticTimeout = setTimeout(() => {
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                const uri = activeEditor.document.uri;
                const diagnostics = vscode.languages.getDiagnostics(uri);
                const currentErrorCount = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;

                if (currentErrorCount > previousErrorCount) {
                    playScream('diagnostics');
                }
                previousErrorCount = currentErrorCount;
            }
        }, 150);
    }, null, context.subscriptions);
}

function deactivate() { }

module.exports = { activate, deactivate };
