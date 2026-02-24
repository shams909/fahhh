# FAhhhh Screamer 😱

**The VS Code extension that screams the legendary "FAhhhhhhhh!" meme whenever your code has errors.** Get instant audio feedback on build failures, syntax errors, test crashes, and debugging exceptions.

[![Version](https://img.shields.io/visual-studio-marketplace/v/Shams.fahhhh-screamer?label=version&color=blue)](https://marketplace.visualstudio.com/items?itemName=Shams.fahhhh-screamer)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Shams.fahhhh-screamer?label=installs&color=green)](https://marketplace.visualstudio.com/items?itemName=Shams.fahhhh-screamer)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/shams909/fahhh/blob/main/LICENSE.md)

---

## 🚀 Features

Stop silently staring at red text. **FAhhhh Screamer** blasts the iconic meme audio the moment anything goes wrong:

| Trigger | What happens |
|---|---|
| 🔴 **New red squiggle** | Screams as you type |
| 💾 **Save broken file** | Screams on `Ctrl+S` |
| 🛑 **Build/task failure** | Screams when exit code ≠ 0 |
| 🐛 **Debugger crash** | Screams when the debugger halts |

## 😱 Scream Counter
The status bar shows how many times you've been screamed at this session. A fun way to track your daily bug count. Click it to test the scream anytime.

## ⚙️ Configuration

Go to **Settings** (`Ctrl+,`) and search `FAhhhh` to configure:

| Setting | Default | Description |
|---|---|---|
| `fahhhhScreamer.enabled` | `true` | Turn the screaming on or off |
| `fahhhhScreamer.volume` | `1.0` | Volume from 0.0 (silent) to 1.0 (max). macOS only. |

## 💻 Platform Support

| Platform | Status |
|---|---|
| Windows | ✅ Full support |
| macOS | ✅ Full support (with volume control) |
| Linux | ✅ Full support (requires PulseAudio or ALSA) |

## 📦 Installation

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Shams.fahhhh-screamer).
2. Turn your speakers on.
3. Write bad code. It will let you know.

## 🛠️ Commands

Open the Command Palette (`Ctrl+Shift+P`) and type `FAhhhh`:

- **FAhhhh: Test Scream** — Play the sound manually to verify it's working
- **FAhhhh: Toggle Enable/Disable** — Quickly mute/unmute the extension
- **FAhhhh: Reset Scream Counter** — Reset the status bar counter to 0

## 📜 License

This project is licensed under the [MIT License](https://github.com/shams909/fahhh/blob/main/LICENSE.md).

---
*Built by [Shams](https://github.com/shams909). PRs welcome.*
