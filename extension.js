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
        statusBarItem.text = `😱 $(megaphone) ${screamCount}`;
    };
    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // --- Helper to read settings ---
    const getConfig = () => vscode.workspace.getConfiguration('fahhhhScreamer');

    // --- Cross-platform audio player ---
    const vbsPath = path.join(context.extensionPath, 'play.vbs');

    const playScream = () => {
        const config = getConfig();

        // Respect the enable/disable toggle
        if (!config.get('enabled', true)) return;

        // Find the sound file
        let soundPath = path.join(context.extensionPath, 'fahhh_KcgAXfs.mp3');
        if (!fs.existsSync(soundPath)) soundPath = path.join(context.extensionPath, 'fahhh.mp3');
        if (!fs.existsSync(soundPath)) soundPath = path.join(context.extensionPath, 'fahhh.wav');

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
        })
    );

    // --- Trigger 1: VS Code task failures ---
    vscode.tasks.onDidEndTaskProcess((event) => {
        if (event.exitCode !== 0) {
            playScream();
        }
    }, null, context.subscriptions);

    // --- Trigger 2: File save with existing errors ---
    vscode.workspace.onDidSaveTextDocument((document) => {
        const diagnostics = vscode.languages.getDiagnostics(document.uri);
        const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);
        if (hasErrors) playScream();
    }, null, context.subscriptions);

    // --- Trigger 3: Debugger session starts (catches runtime crashes) ---
    vscode.debug.onDidChangeActiveDebugSession(session => {
        if (!session) return;
        playScream();
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
                    playScream();
                }
                previousErrorCount = currentErrorCount;
            }
        }, 150);
    }, null, context.subscriptions);
}

function deactivate() {}

module.exports = { activate, deactivate };
