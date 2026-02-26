# FAhhhh Screamer v2.1.3 - The Ultimate Customization Update 🎉

This major release transforms the extension from a simple meme player into a highly customizable, cross-platform developer tool. It brings massive underlying architectural changes, full cross-platform audio support, and fine-grained control over exactly *when* and *how* your code screams at you.

## ✨ New Features & Enhancements

* **🎵 Custom Sound Support:** You are no longer limited to the default meme! Added the `FAhhhh: Pick Custom Sound File...` command and `fahhhhScreamer.soundFile` setting to use any `.mp3` or `.wav` on your machine.
* **🌍 Full Cross-Platform Audio Engine:** Rearchitected how audio plays to support all operating systems without requiring external dependencies:
  * **Windows:** Uses a background VBScript (`wscript.exe`) for completely silent, no-popup execution.
  * **macOS:** Uses the native `afplay` engine.
  * **Linux:** Automatically cascades between `paplay` (PulseAudio) and `aplay` (ALSA).
* **🎛️ Volume Control:** Added `fahhhhScreamer.volume` slider for macOS users (0.0 to 1.0).
* **🔔 Per-Trigger Toggles:** Don't want it screaming while you type? You can now individually toggle the 4 main triggers in settings:
  * `playOnDiagnostics` (Live red squiggles)
  * `playOnSave` (Ctrl+S with active errors)
  * `playOnTaskFailure` (Build scripts & test runners)
  * `playOnDebuggerCrash` (Unhandled exceptions)
* **🔢 Scream Counter Tracker:** The status bar now tracks and persists exactly how many times you've been yelled at during your session.

## 🐛 Bug Fixes & Performance

* **Debugger Hook Fix:** Fixed an issue where the debugger trigger would fire on session start instead of actual failures. It now correctly monitors the DAP protocol for the `stopped` event with `reason: exception`.
* **Startup Performance Optimization:** Changed `activationEvents` from `*` to `onStartupFinished` to eliminate background extension loading warnings and dramatically improve VS Code launch times.
* **Marketplace Optimization:** Completely rewrote the `README.md` to be fully compatible with VS Code's internal markdown renderer, dropping raw HTML tags for native Markdown to ensure Badges and Tables render correctly in the Extensions tab.
