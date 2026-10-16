---
title: "4. Install and remove apps with a package manager"
description: "Search for, install, list, update, and uninstall one app from the command line with winget on Windows or Homebrew on macOS."
domain: windows-macos
pageType: walkthrough
level: 1
difficulty: easy
status: draft
safetyCritical: false
time: "30-45 minutes (estimate)"
tools: ["A Windows 11 PC with winget, or a Mac", "PowerShell (Windows) or Terminal (macOS)", "An internet connection", "An administrator account's credentials, in case an installer asks for them"]
parts: []
sources:
  - title: "Use the winget tool to install and manage applications"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/"
    publisher: "Microsoft Learn"
  - title: "winget install command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/install"
    publisher: "Microsoft Learn"
  - title: "winget search command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/search"
    publisher: "Microsoft Learn"
  - title: "winget list command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/list"
    publisher: "Microsoft Learn"
  - title: "winget upgrade command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/upgrade"
    publisher: "Microsoft Learn"
  - title: "winget uninstall command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/uninstall"
    publisher: "Microsoft Learn"
  - title: "Starting Windows PowerShell"
    url: "https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/starting-windows-powershell"
    publisher: "Microsoft Learn"
  - title: "Homebrew"
    url: "https://brew.sh/"
    publisher: "Homebrew (third party, not Apple)"
  - title: "Homebrew Installation"
    url: "https://docs.brew.sh/Installation"
    publisher: "Homebrew (third party, not Apple)"
  - title: "Homebrew Manpage"
    url: "https://docs.brew.sh/Manpage"
    publisher: "Homebrew (third party, not Apple)"
  - title: "Homebrew FAQ"
    url: "https://docs.brew.sh/FAQ"
    publisher: "Homebrew (third party, not Apple)"
  - title: "Open or quit Terminal on Mac"
    url: "https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac"
    publisher: "Apple Support (Terminal User Guide)"
tags: [windows, macos, winget, homebrew, package-manager, install, beginner]
sidebar:
  order: 103
---

:::caution[Not yet run end to end]
Steps follow the winget and Homebrew documentation as read on 2026-09-26. Nothing was installed, upgraded, or uninstalled while writing this page, because those commands change the machine. Lines marked "to test" have not been checked on a real machine. Homebrew is a third-party tool, not made by Apple.
:::

## Before you start

A **package manager** is a program that installs, updates, and removes other programs from a single command line, the way a library card catalog lets you find, borrow, and return a book without wandering the shelves. Windows has **winget** (the Windows Package Manager). macOS has no Apple-made one; the common choice is **Homebrew**, a third-party project.

| Way to get an app | Good for | Watch out for |
| --- | --- | --- |
| **Package manager** (winget, Homebrew) | One command to install, list, update, and remove; easy to repeat on a second machine | Not every app is in it, and you trust the source it pulls from |
| **The vendor's download page** | Apps that are not in a package manager | Manual updates; look-alike sites |
| **App stores** | Apps offered there | Not every app is offered |

Why a package manager for this walkthrough: the same short commands teach you what "install", "list", "upgrade", and "uninstall" mean on any system, and you can see exactly what you did in your terminal history.

You need:

- A working administrator account (from [2. Manage accounts and admin rights](/windows-macos/walkthroughs/2-manage-accounts-and-admin-rights/)). If you now work as a standard user, some installs will ask for administrator credentials; that is the credential prompt doing its job.
- A backup you have tested ([3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/)).
- An app you do not mind installing and removing. This walkthrough uses `Git.Git` on Windows, the example identifier in Microsoft's own documentation, and `ffmpeg` on macOS, the example on Homebrew's front page. Any package works the same way.

:::note[Do not run the installer in an elevated console]
winget's documentation notes that some installers prompt for elevation and advises care in an administrator console. Work in a normal PowerShell window and let the one installer that needs it ask.
:::

## Steps

### A. Windows: winget

1. Open PowerShell: **Start** menu, type **Windows PowerShell**, select it, then **Open**. Do not choose **Run as administrator**.
2. Run `winget --version`. You should see a version number; the machine used to check this guide printed `v1.29.380` on 2026-09-26.
3. Search: `winget search git`. Search is a case-insensitive substring match, so it also matches names that contain "git". You should see a table of results; the `Id` column is what you need.
4. Install by exact ID: `winget install --id Git.Git -e`. The `--id` flag matches the ID, and `-e` makes the match exact, so you get that package and not another whose name contains the text. Microsoft's docs recommend this form. If winget shows agreement text, read it. The `--accept-package-agreements` and `--accept-source-agreements` flags accept agreements without asking, but do not add them until you have read the terms once. If a Windows prompt appears, read the program name before you approve it.
5. List what is installed: `winget list`. It also shows apps that winget did not install. To see only apps with an update available, run `winget list --upgrade-available`.
6. See what can be updated: `winget upgrade` with no arguments lists the available upgrades and changes nothing.
7. Update one app: `winget upgrade --id Git.Git -e`. To update everything at once, use `winget upgrade --all`; read the list from step 6 before you do. `-u` (`--include-unknown`) also covers packages whose installed version winget cannot read.
8. Uninstall: `winget uninstall --id Git.Git -e --source winget`. The command also answers to `remove` and `rm`. Adding `--source winget` avoids a Microsoft Store agreement prompt.
9. Confirm it is gone: `winget list --id Git.Git -e`. Nothing should be listed.

> TODO(test): run steps 3 to 9 on a real Windows 11 machine and record the actual output, including the agreement prompts, what a successful install and uninstall print, and whether the `list` filters behave as written.

Where to look if it fails: winget writes logs under `%LOCALAPPDATA%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\DiagOutputDir`. On the machine used to check this guide, `winget --help` also listed a `--logs` option.

### B. macOS: Homebrew

Homebrew's documentation, read on 2026-09-26, requires macOS Sequoia (15) or later, an Apple silicon CPU (a 64-bit Intel CPU is a Tier 3 configuration), and Command Line Tools for Xcode (installed with `xcode-select --install`). Check that your Mac meets this before you continue.

1. Open Terminal: click **Spotlight** in the menu bar, type **Terminal**, and click **Terminal**. Or open `/Applications/Utilities` in Finder and double-click **Terminal**.
2. Open **https://brew.sh** in a browser and find the install command under **Install Homebrew**. Copy it from that page rather than from here, so you get the current version. On 2026-09-26 it read:

   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   This downloads a script and runs it. Homebrew states the script explains what it will do and then pauses before doing it. Read what it says before you press a key.
3. Run the command. The installer will tell you what it is about to do; confirm when you are ready.
4. Put `brew` on your path. Homebrew's docs say to add this line to your shell's configuration file, replacing the placeholder with your Homebrew prefix, and that Homebrew will not work if you skip it. The default prefix is `/opt/homebrew` on Apple silicon and `/usr/local` on Intel:

   ```
   eval "$(<Homebrew prefix path>/bin/brew shellenv)"
   ```

   The docs give `~/.zshrc` as an example file for zsh, which is the default shell on a Mac.
5. Open a new Terminal window so the change takes effect, then run `brew doctor`. It checks your system for problems affecting Homebrew.
6. Search: `brew search ffmpeg`. It performs a substring search of cask tokens and formula names.
7. Install: `brew install ffmpeg`. Formulae are command-line tools; **casks** are Mac apps with windows, installed with `brew install --cask`. Do not use `sudo` with `brew`; Homebrew's FAQ says not to.
8. List what is installed: `brew list`.
9. See what can be updated: `brew update` fetches the newest Homebrew and formulae, then `brew outdated` lists installed formulae and casks with a newer version.
10. Update: `brew upgrade` upgrades outdated, unpinned packages. Give it a package name (`brew upgrade ffmpeg`) to update just one.
11. Uninstall: `brew uninstall ffmpeg`.
12. Optionally run `brew cleanup` to remove stale lock files, outdated downloads, and old versions. Homebrew also cleans automatically when it upgrades.

> TODO(test): run every step of part B on a real Mac and record the output. Confirm that Homebrew's installer asks for an administrator password, which configuration file it tells you to edit, what `brew doctor` prints on a clean install, and whether `brew uninstall` needs `--cask` for GUI apps.

## Check it worked

**On Windows**

1. Step 4 finished without an error and you could see the app installed (step 5 lists it).
2. After step 8, `winget list --id Git.Git -e` shows nothing.

**On macOS**

1. `brew doctor` finished without a complaint you cannot explain.
2. After step 7, `brew list` includes what you installed. After step 11 it no longer does.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `winget` is not recognized | winget ships in App Installer, which may be missing on your machine | TODO(source): Microsoft's steps to install or repair App Installer |
| Several results match a name | Search is a substring match | Use `--id <Id> -e` for an exact match |
| An installer asks for administrator credentials | It needs elevation, and you are a standard user or working normally | Enter an administrator's name and password if you started this install; otherwise cancel |
| `winget uninstall` shows a Microsoft Store agreement prompt | The Microsoft Store source is being consulted | Add `--source winget`, which the docs give as the way to avoid that prompt |
| winget install fails without a clear message | An installer problem | Read the log under `%LOCALAPPDATA%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\DiagOutputDir` |
| `brew` is not found after installing | The shellenv line is missing from your shell's configuration file | Add the `eval` line from step 4 and open a new Terminal window |
| The Homebrew installer refuses or errors | The Mac does not meet the requirements, or the Command Line Tools are missing | Check macOS Sequoia (15) or later and run `xcode-select --install` |
| You are tempted to put `sudo` in front of a `brew` command | A permissions message can look like a reason to | Do not. Homebrew's FAQ says not to use `sudo` with `brew` |
| You want to remove Homebrew itself | Not covered here | Homebrew's Installation page points to its FAQ for uninstalling; read it there |

## Next

[5. Find what is using CPU, memory, disk, or a port](/windows-macos/walkthroughs/5-find-what-is-using-cpu-memory-disk-or-a-port/). Now that you can add and remove software, learn to see what your machine is actually running.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
