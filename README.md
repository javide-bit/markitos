<p align="center"><img src="docs/assets/logo-small.png" alt="Markitos" width="100" height="100"></p>

<h1 align="center">Markitos</h1>

<div align="center">
  <strong>:high_brightness: Next generation markdown editor :crescent_moon:</strong><br>
  A simple, elegant and modern open-source markdown editor focused on speed and usability.<br>
  <sub>Available for Linux, macOS and Windows.</sub>
</div>

<br>

<div align="center">
  <!-- License -->
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/javide-bit/markitos.svg" alt="LICENSE">
  </a>
  <!-- Commits -->
  <a href="https://github.com/javide-bit/markitos/commits/develop">
    <img src="https://img.shields.io/github/last-commit/javide-bit/markitos/develop.svg" alt="Last Commit">
  </a>
  <!-- Platform -->
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue.svg" alt="Platforms">
</div>

<div align="center">
  <h3>
    <a href="#features">Features</a>
    <span> | </span>
    <a href="#whats-new-in-markitos-">What's New in Markitos</a>
    <span> | </span>
    <a href="#download-and-installation">Downloads</a>
    <span> | </span>
    <a href="#development">Development</a>
    <span> | </span>
    <a href="#credits-and-acknowledgments">Credits</a>
  </h3>
</div>

<div align="center">
  <sub>Fork of <a href="https://github.com/marktext/marktext">MarkText</a> with enhanced features and modern maintenance.</sub>
</div>

<br />

## Screenshot

![](docs/assets/marktext.png?raw=true)

## Features

- **Realtime preview (WYSIWYG)** and a clean interface for a distraction-free writing experience.
- Support for **CommonMark Spec**, **GitHub Flavored Markdown Spec** and selective support for **Pandoc markdown**.
- Markdown extensions such as math expressions (KaTeX), front matter and emojis.
- Paragraph and inline style shortcuts to improve writing efficiency.
- Output to **HTML** and **PDF** files.
- Various built-in themes: **Cadmium Light**, **Material Dark**, etc.
- Multiple editing modes: **Source Code mode**, **Typewriter mode**, **Focus mode**.
- Paste images directly from clipboard.

## What's New in Markitos ✨

- **Context Menu Tab Save**: Direct "Save" action in the tab right-click context menu with full internationalization (i18n).
- **Unsaved Changes Prompt**: Safety confirmation warning dialog when closing tabs with unsaved edits to prevent accidental data loss.
- **Dedicated Windows Branding**: Custom app identity (`com.github.javide-bit.markitos`), updated icon sets (16x16 to 512x512, ICO), and installer integration.
- **Updated Dependencies & Modern Tooling**: Built with modern Electron 42, Vite 5, Vue 3, and strict TypeScript.

## Download and Installation

Binary releases and installers are published on the [Releases page](https://github.com/javide-bit/markitos/releases).

| Windows | macOS | Linux |
| :---: | :---: | :---: |
| [![Download for Windows](https://img.shields.io/badge/Windows-Download-blue)](https://github.com/javide-bit/markitos/releases/latest) | [![Download for macOS](https://img.shields.io/badge/macOS-Download-blue)](https://github.com/javide-bit/markitos/releases/latest) | [![Download for Linux](https://img.shields.io/badge/Linux-Download-blue)](https://github.com/javide-bit/markitos/releases/latest) |

#### Windows
Requires Windows 10 or 11. Run the setup installer (`markitos-win-(x64|arm64)-%version%-setup.exe`) to install per-user or system-wide.

#### macOS
Requires macOS 11 (Big Sur) or later. Pick the matching `arm64` (Apple Silicon) or `x64` (Intel) installer from the [releases page](https://github.com/javide-bit/markitos/releases/latest).

#### Linux
Binaries and packages can be downloaded from the [releases page](https://github.com/javide-bit/markitos/releases/latest).

## Development

If you wish to build Markitos yourself from source:

```bash
# Clone the repository
git clone https://github.com/javide-bit/markitos.git
cd markitos

# Install dependencies (requires pnpm >= 10 and Node >= 20.19.0)
pnpm install

# Run in development mode
pnpm dev

# Build for distribution
pnpm build:win    # for Windows
pnpm build:mac    # for macOS
pnpm build:linux  # for Linux
```

## Credits and Acknowledgments

Markitos is built upon the solid foundation of [MarkText](https://github.com/marktext/marktext), created by [Jocs](https://github.com/Jocs) and its many talented contributors. We are deeply grateful to the original team and community for their dedication to open-source software.

## License

This project is licensed under the [**MIT License**](LICENSE).
