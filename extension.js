const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

let isScreaming = false;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('FAhhhh Screamer is now active!');

    // The script used to play the audio seamlessly
    const vbsPath = path.join(context.extensionPath, 'play.vbs');

    const playScream = () => {
        // Let's dynamically find the sound file since the user provided an mp3
        let soundPath = path.join(context.extensionPath, 'fahhh_KcgAXfs.mp3');
        if (!fs.existsSync(soundPath)) {
            soundPath = path.join(context.extensionPath, 'fahhh.mp3');
        }
        if (!fs.existsSync(soundPath)) {
            soundPath = path.join(context.extensionPath, 'fahhh.wav');
        }

        if (!fs.existsSync(soundPath)) {
            vscode.window.showErrorMessage(`Sound file not found! Please ensure fahhh_KcgAXfs.mp3 or fahhh.wav exists.`);
            return;
        }

        // Play using Windows Script Host and VBScript, natively supports MP3 easily!
        // No lock here! If they trigger it 5 times fast, it screams 5 times loudly.
        const command = `wscript.exe "${vbsPath}" "${soundPath}"`;
        exec(command);
    };

    // Command to test the scream manually
    let disposable = vscode.commands.registerCommand('fahhhh.testScream', () => {
        vscode.window.showInformationMessage('FAhhhhhhhh!');
        playScream();
    });

    context.subscriptions.push(disposable);

    // Watch for VS Code tasks completing
    vscode.tasks.onDidEndTaskProcess((event) => {
        if (event.exitCode !== 0) {
            vscode.window.showErrorMessage('Task failed or errored out! FAhhhhhhhh!');
            playScream();
        }
    }, null, context.subscriptions);

    // Check if there are errors when the user SAVES a file.
    // This allows them to instantly get a scream if they modify broken code and hit save trying to run it again.
    vscode.workspace.onDidSaveTextDocument((document) => {
        const diagnostics = vscode.languages.getDiagnostics(document.uri);
        const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);

        if (hasErrors) {
            playScream();
        }
    }, null, context.subscriptions);

    // Watch for VS Code Debugger exceptions (like when a Python or Node script actually crashes while running)
    vscode.debug.onDidChangeActiveDebugSession(session => {
        if (!session) return;
        // The debugger itself often halts on unhandled exceptions.
        // We can't strictly read the stack trace directly via API easily, 
        // but often getting thrown into the debugger unexpectedly is a failure worth screaming at!
        playScream();
    }, null, context.subscriptions);

    // Watch for diagnostics (errors in code like syntax errors, red squiggles, etc.)
    let diagnosticTimeout;

    // We need to track the number of errors to avoid screaming continuously 
    // unless a NEW error actually appeared.
    let previousErrorCount = 0;

    vscode.languages.onDidChangeDiagnostics((event) => {
        clearTimeout(diagnosticTimeout);
        diagnosticTimeout = setTimeout(() => {
            // Check if any errors exist in the active document
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                const uri = activeEditor.document.uri;
                const diagnostics = vscode.languages.getDiagnostics(uri);

                // Count the number of RED ERRORS
                const currentErrorCount = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;

                // Only scream if the user ADDED a new error (error count increased)
                if (currentErrorCount > previousErrorCount) {
                    playScream();
                }

                // Update tracker
                previousErrorCount = currentErrorCount;
            }
        }, 150); // Wait 1.5 seconds after they stop typing to check for errors
    }, null, context.subscriptions);
}

function deactivate() {
    isScreaming = false;
}

module.exports = {
    activate,
    deactivate
}
