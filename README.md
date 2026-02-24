# FAhhhh Screamer 😱

> **The VS Code extension that screams the legendary "FAhhhhhhhh!" meme every time your code has errors.**
> Stop staring at silent red squiggles. Get instant, hilarious audio feedback on build failures, syntax errors, test crashes, and debug exceptions.

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Shams.fahhhh-screamer?style=flat-square&label=version&color=blue)](https://marketplace.visualstudio.com/items?itemName=Shams.fahhhh-screamer)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](https://github.com/shams909/fahhh/blob/main/LICENSE.md)

---

## ✨ Features

- 🔴 **Live Error Detection** — Screams the moment a new red squiggle appears while you type
- 💾 **Save & Scream** — Saves a broken file? Caught. Screams instantly on `Ctrl+S`
- 🛑 **Build & Task Failure** — Screams when a VS Code Task exits with a non-zero code (run via `Ctrl+Shift+B` or `Terminal → Run Task`)
- 🐛 **Debugger Crash Detection** — Listens for DAP exception events and screams when your app crashes with an unhandled exception
- 😱 **Scream Counter** — Status bar shows exactly how many times you've been screamed at today. Click it to test the sound.
- 🔇 **Quick Toggle** — Disable/enable from the Command Palette without uninstalling
- 🔊 **Volume Control** — Adjust the scream volume from your VS Code settings (0.0 – 1.0)

---

## 💻 Platform Support

| Platform | Audio Engine | Status |
|---|---|---|
| **Windows** | Windows Script Host (VBScript) | ✅ Fully supported |
| **macOS** | `afplay` (built-in) | ✅ Fully supported + volume control |
| **Linux** | `paplay` / `aplay` (PulseAudio / ALSA) | ✅ Fully supported |

---

## ⚙️ Configuration

Open VS Code Settings (`Ctrl+,`) and search for `FAhhhh` to configure:

| Setting | Type | Default | Description |
|---|---|---|---|
| `fahhhhScreamer.enabled` | `boolean` | `true` | Globally enable or disable all screaming |
| `fahhhhScreamer.volume` | `number` | `1.0` | Volume level from `0.0` (silent) to `1.0` (max). macOS only. |

**Example `settings.json`:**
```json
{
  "fahhhhScreamer.enabled": true,
  "fahhhhScreamer.volume": 0.8
}
```

---

## �️ Commands

Open the Command Palette (`Ctrl+Shift+P`) and type `FAhhhh`:

| Command | Description |
|---|---|
| `FAhhhh: Test Scream` | Manually trigger a scream to verify the sound is working |
| `FAhhhh: Toggle Enable/Disable` | Quickly mute or unmute the extension |
| `FAhhhh: Reset Scream Counter` | Reset the status bar counter back to zero |

---

## 📦 Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search **"FAhhhh Screamer"**
4. Click **Install**
5. Turn your speakers on and write bad code

**Linux users:** Ensure PulseAudio or ALSA is installed:
```bash
sudo apt-get install pulseaudio   # Ubuntu/Debian
sudo pacman -S pulseaudio         # Arch
```

---

## � How It Works

The extension hooks into **four** VS Code native APIs simultaneously to catch errors at every stage:

1. **`vscode.languages.onDidChangeDiagnostics`** — Watches the Problems panel in real-time for new errors as you type
2. **`vscode.workspace.onDidSaveTextDocument`** — Checks for errors at the moment you save
3. **`vscode.tasks.onDidEndTaskProcess`** — Listens for non-zero exit codes from tasks (build tools, test runners)
4. **`vscode.debug.onDidChangeActiveDebugSession`** — Hooks into the debugger to catch runtime exception halts

---

## 📜 License

[MIT](https://github.com/shams909/fahhh/blob/main/LICENSE.md) © [Shams](https://github.com/shams909)

---

*PRs and feature suggestions welcome at [github.com/shams909/fahhh](https://github.com/shams909/fahhh)*
