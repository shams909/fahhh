# FAhhhh Screamer 😱

> **The VS Code extension that screams the legendary "FAhhhhhhhh!" meme every time your code has errors.**
> Stop staring at silent red squiggles. Get instant, hilarious audio feedback on build failures, syntax errors, test crashes, and debug exceptions.

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Shams.fahhhh-screamer?style=flat-square&label=version&color=orange)](https://marketplace.visualstudio.com/items?itemName=Shams.fahhhh-screamer)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](https://github.com/shams909/fahhh/blob/main/LICENSE.md)

---

## ✨ Features

- 🔴 **Live Error Detection** — Screams the moment a new red squiggle appears while you type
- 🍞 **Random Funny Toasts** — Shows a random hilarious roast message (like `💀 RIP your code`) along with the scream
- 💾 **Save & Scream** — Saves a broken file? Caught. Screams instantly on `Ctrl+S`
- 🛑 **Build & Task Failure** — Screams when a VS Code Task exits with a non-zero code (run via `Ctrl+Shift+B` or `Terminal → Run Task`)
- 🐛 **Debugger Crash Detection** — Listens for DAP exception events and screams when your app crashes with an unhandled exception
- 😱 **Scream Counter** — Status bar shows exactly how many times you've been screamed at today. Click it to test the sound.
- 🔇 **Quick Toggle** — Disable/enable from the Command Palette without uninstalling
- 🔊 **Volume Control** — Adjust the scream volume from your VS Code settings (0.0 – 1.0)
- 🎵 **Custom Sound** — Use your own `.mp3` or `.wav` file instead of the bundled FAhhhh sound

---

## 💻 Platform Support

| Platform | Audio Engine | Status |
|---|---|---|
| **Windows** | Windows Script Host (VBScript) | ✅ Fully supported |
| **macOS** | `afplay` (built-in) | ✅ Fully supported + volume control |
| **Linux** | `paplay` / `aplay` (PulseAudio / ALSA) | ✅ Fully supported |

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

## 📖 User Manual

### 🔔 The Scream Counter (Status Bar)
After installing, look at the **bottom-right of VS Code** in the blue status bar. You'll see:

```
🔔 FAhhhh x0
```

- The number shows how many times the extension has screamed at you this session
- **Click it** to manually trigger a test scream anytime
- It turns orange/highlighted once you've been screamed at

---

### 🔴 Trigger 1: Live Error Detection (while typing)
The extension watches your code in real-time. The moment you introduce a **new syntax or type error** (a red squiggle), it screams.

**Example:**
1. Open any `.js`, `.py`, `.ts`, or other file
2. Type some broken code like `const = ;` — the moment VS Code shows the red squiggle, it screams!

> **Note:** It only screams when the error count *increases*. Fixing errors does not trigger a scream.

**To turn this off:** Set `fahhhhScreamer.playOnDiagnostics` to `false` in Settings.

---

### 💾 Trigger 2: Save & Scream
Every time you press **`Ctrl+S`** (Save), the extension checks if that file has any red errors. If it does — it screams at you before you can even run the file.

**Example:**
1. Have a broken file open with a red squiggle
2. Press `Ctrl+S`
3. Even if you're saving to reload — it catches you!

**To turn this off:** Set `fahhhhScreamer.playOnSave` to `false` in Settings.

---

### 🛑 Trigger 3: Build & Task Failure
When you run a VS Code Task (build scripts, test suites, etc.) and it **crashes with an error**, the extension screams.

**How to use VS Code Tasks:**
1. Press `Ctrl+Shift+B` (Run Build Task) or go to `Terminal → Run Task`
2. Select a task like `npm run build`, `pytest`, or `gradle build`
3. If the task exits with an error, it screams!

**To turn this off:** Set `fahhhhScreamer.playOnTaskFailure` to `false` in Settings.

---

### 🐛 Trigger 4: Debugger Crash Detection
If you are running your code through the VS Code **debugger** (via `F5` or `Run → Start Debugging`) and your app throws an **unhandled exception**, the debugger halts — and the extension screams.

**How to test:**
1. Create a file `test.py` with the content `1/0`
2. Press `F5` to run it in the debugger
3. Python crashes with `ZeroDivisionError` — it screams!

**Works with:** Python, Node.js, C++, Java, and any debugger that uses the DAP protocol.

**To turn this off:** Set `fahhhhScreamer.playOnDebuggerCrash` to `false` in Settings.

---

### 🔇 Quickly Enable / Disable the Extension
Don't want it screaming at you during a meeting? Toggle it instantly:

1. Press `Ctrl+Shift+P` (Command Palette)
2. Type `FAhhhh: Toggle Enable/Disable`
3. Press Enter

A notification will confirm `😱 FAhhhh Screamer: Enabled!` or `🔇 FAhhhh Screamer: Disabled!`.

Alternatively, go to `Settings → fahhhhScreamer.enabled` and toggle the checkbox.

---

### 🎵 Using Your Own Custom Sound
Don't like the bundled FAhhhh sound? Use any `.mp3` or `.wav` file you want!

**Option A — Easy file picker (recommended):**
1. Press `Ctrl+Shift+P`
2. Type `FAhhhh: Pick Custom Sound File...`
3. A file browser opens — navigate to your audio file and click **"Use This Sound"**
4. Done! It saves automatically and a confirmation notification appears.

**Option B — Manual path in Settings:**
1. Press `Ctrl+,` (Settings)
2. Search `FAhhhh`
3. Find `fahhhhScreamer.soundFile`
4. Enter the full path to your file, e.g. `C:\Users\You\sounds\meme.mp3` or `~/sounds/meme.mp3`

> **Tip:** To go back to the default bundled sound, just clear the `soundFile` setting field.

---

### 🔊 Adjusting the Volume
> Volume control is currently supported on **macOS only** (uses `afplay -v`).

1. Press `Ctrl+,` (Settings)
2. Search `FAhhhh`
3. Find `fahhhhScreamer.volume`
4. Set a value between `0.0` (silent) and `1.0` (max volume)

---

### 🔢 Resetting the Scream Counter
The counter in the status bar persists across sessions. To reset it:

1. Press `Ctrl+Shift+P`
2. Type `FAhhhh: Reset Scream Counter`
3. Press Enter — the counter resets to `x0`

---

## ⚙️ All Settings Reference

Open VS Code Settings (`Ctrl+,`) and search `FAhhhh`:

| Setting | Type | Default | Description |
|---|---|---|---|
| `fahhhhScreamer.enabled` | `boolean` | `true` | Master switch — globally enable or disable all screaming |
| `fahhhhScreamer.volume` | `number` | `1.0` | Volume from `0.0` to `1.0` (macOS only) |
| `fahhhhScreamer.soundFile` | `string` | `""` | Path to custom `.mp3`/`.wav`. Empty = use bundled sound |
| `fahhhhScreamer.playOnDiagnostics` | `boolean` | `true` | Scream on new live red squiggles while typing |
| `fahhhhScreamer.playOnSave` | `boolean` | `true` | Scream on `Ctrl+S` if the file has errors |
| `fahhhhScreamer.playOnTaskFailure` | `boolean` | `true` | Scream when a VS Code Task exits with error |
| `fahhhhScreamer.playOnDebuggerCrash` | `boolean` | `true` | Scream when debugger halts due to unhandled exception |

---

## 🛠️ All Commands Reference

Press `Ctrl+Shift+P` and type `FAhhhh`:

| Command | What it does |
|---|---|
| `FAhhhh: Test Scream` | Manually trigger a scream to verify everything is working |
| `FAhhhh: Toggle Enable/Disable` | Instantly mute or unmute the entire extension |
| `FAhhhh: Reset Scream Counter` | Reset the status bar counter to 0 |
| `FAhhhh: Pick Custom Sound File...` | Open a file browser to select your own audio file |

---

## 🔧 How It Works

The extension hooks into **four** VS Code native APIs simultaneously:

1. **`vscode.languages.onDidChangeDiagnostics`** — Watches the Problems panel in real-time for new errors as you type
2. **`vscode.workspace.onDidSaveTextDocument`** — Checks for errors at the moment you save
3. **`vscode.tasks.onDidEndTaskProcess`** — Listens for non-zero exit codes from build tasks
4. **`vscode.debug.onDidReceiveDebugSessionCustomEvent`** — Listens for DAP `stopped` + `exception` events from the debugger

---

## 📜 License

[MIT](https://github.com/shams909/fahhh/blob/main/LICENSE.md) © [Shams](https://github.com/shams909)

---

*PRs and feature suggestions welcome at [github.com/shams909/fahhh](https://github.com/shams909/fahhh)*
