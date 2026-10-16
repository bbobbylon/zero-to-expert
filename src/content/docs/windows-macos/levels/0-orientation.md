---
title: "Level 0: Orientation"
description: "Name the moving parts of Windows and macOS, find your way around each, and know which actions can lose data."
domain: windows-macos
pageType: level
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Find information about your Windows device"
    url: "https://support.microsoft.com/en-us/windows/which-version-of-windows-operating-system-am-i-running-628bec99-476a-2c13-5296-9dd081cdd808"
    publisher: "Microsoft Support"
  - title: "How User Account Control works"
    url: "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works"
    publisher: "Microsoft Learn"
  - title: "Manage User Accounts in Windows"
    url: "https://support.microsoft.com/en-us/windows/create-a-local-user-or-administrator-account-in-windows-20de74e0-ac7f-3502-a866-32915af2a34d"
    publisher: "Microsoft Support"
  - title: "Add a user or group on Mac"
    url: "https://support.apple.com/guide/mac-help/add-a-user-or-group-mchl3e281fc9/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Enter administrator commands in Terminal"
    url: "https://support.apple.com/guide/terminal/enter-administrator-commands-apd5b0b6259-a7d4-4435-947d-0dff528912ba/mac"
    publisher: "Apple Support (Terminal User Guide)"
  - title: "Naming Files, Paths, and Namespaces"
    url: "https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file"
    publisher: "Microsoft Learn"
  - title: "File System Overview (archived File System Programming Guide)"
    url: "https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html"
    publisher: "Apple Developer Documentation Archive"
  - title: "An overview on Windows Terminal"
    url: "https://learn.microsoft.com/en-us/windows/terminal/"
    publisher: "Microsoft Learn"
  - title: "Starting Windows PowerShell"
    url: "https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/starting-windows-powershell"
    publisher: "Microsoft Learn"
  - title: "Open or quit Terminal on Mac"
    url: "https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac"
    publisher: "Apple Support (Terminal User Guide)"
  - title: "Change the default shell in Terminal on Mac"
    url: "https://support.apple.com/guide/terminal/change-the-default-shell-trml113/mac"
    publisher: "Apple Support (Terminal User Guide)"
  - title: "Configure Startup applications in Windows"
    url: "https://support.microsoft.com/en-us/windows/configure-startup-applications-in-windows-115a420a-0bff-4a6f-90e0-1934c844e473"
    publisher: "Microsoft Support"
  - title: "Change Login Items & Extensions settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-login-items-extensions-settings-mtusr003/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Install Windows Updates"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/install-windows-updates"
    publisher: "Microsoft Support"
  - title: "Update macOS on Mac"
    url: "https://support.apple.com/en-us/108382"
    publisher: "Apple Support"
  - title: "Recovery options in Windows"
    url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5"
    publisher: "Microsoft Support"
  - title: "How to use macOS Recovery"
    url: "https://support.apple.com/en-us/102518"
    publisher: "Apple Support"
  - title: "View information about processes in Activity Monitor on Mac"
    url: "https://support.apple.com/guide/activity-monitor/view-information-about-processes-actmntr1001/mac"
    publisher: "Apple Support (Activity Monitor User Guide)"
  - title: "Get-Process"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "Get-Service"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "Get-ChildItem"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "Get-LocalUser"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.localaccounts/get-localuser"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "whoami"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/whoami"
    publisher: "Microsoft Learn"
  - title: "ipconfig"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig"
    publisher: "Microsoft Learn"
  - title: "Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
    publisher: "Apple Support"
  - title: "sw_vers(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/sw_vers.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "df(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/df.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "top(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/top.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "open(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/open.1.html"
    publisher: "keith.github.io xcode-man-pages"
tags: [windows, macos, orientation, accounts, file-system, command-line]
sidebar:
  order: 10
---

## What you'll be able to do

- Say which version of Windows or macOS you are running, and where to look it up.
- Name the six parts of an operating system you will work with in this guide: accounts, the file system, processes, services and startup items, updates, and recovery.
- Tell a standard account from an administrator account, and say what an elevation prompt is asking you to approve.
- Open a command line on each system and run a command that only reads.
- Sort any action into three bins before you do it: safe to try, changes a setting, or can lose data.

:::note[What these instructions were read against]
Menu paths and commands come from Microsoft's and Apple's own documentation as read on 2026-09-26, and from one Windows 11 Pro machine (OS build 10.0.26200) on the same date. Apple's update page, dated 2026-09-14, covers macOS 27 Golden Gate back to Catalina. The Time Machine and Storage pages Apple wrote for macOS Ventura 13 and later use System Settings; if your Mac is older, follow Apple's page for your version. Menus move between releases, so when a label does not match, trust the linked source over this page.
:::

## Concepts

### The operating system is the building's management office

Every app on your computer is a tenant. Apps do not touch the disk, the screen, the network, or each other's memory directly. They ask the operating system, which acts as the building's management office: it hands out space, decides who gets to use the lifts and when, keeps the keys, and refuses requests that a tenant is not allowed to make. Almost every problem in this guide is one of four things going wrong at the office: it ran out of something (disk, memory), a tenant is hogging something (a runaway process), a tenant asked for something it is not allowed (permissions), or the office itself is damaged (updates, corruption, recovery).

### The same ideas under different names

Windows and macOS do the same jobs with different tools. Learn the pairs once and every later page reads across.

| Idea | Windows | macOS |
| --- | --- | --- |
| Settings | Start > Settings | System Settings |
| Find your version | Settings > System > About (shortcut: `ms-settings:about`) | Apple menu > About This Mac |
| File manager | File Explorer | Finder |
| See running programs | Task Manager (`Ctrl+Shift+Esc`) | Activity Monitor (in `/Applications/Utilities`) |
| Install apps from the command line | winget (the Windows Package Manager) | Homebrew (third party, not Apple) |
| Back up files | File History, Windows Backup | Time Machine |
| Startup programs | Settings > Apps > Startup; Task Manager > Startup apps | System Settings > General > Login Items & Extensions |
| Approve an admin action | UAC elevation prompt | Administrator name and password; `sudo` in Terminal |
| Recovery tools | Windows recovery environment, Reset this PC, System Restore | macOS Recovery |
| Command line | PowerShell and Command Prompt, hosted in Windows Terminal | zsh (the default shell) in Terminal |

The concept pages below go deeper on each row.

### Accounts: who is asking

An **account** is a named identity with its own home folder and its own permissions. Both systems separate two kinds for daily work:

- A **standard** account can run apps and change its own settings, but cannot change the system for everyone.
- An **administrator** account can also install software system-wide, change protected settings, and manage other accounts.

Think of a hotel: a guest key opens your room; the master key opens every room. You do not carry the master key around all day. Microsoft recommends that the account you use every day be a standard user. Apple's advice points the same way: it says not to set up automatic login for an administrator account. On Windows, an administrator actually holds two access tokens after signing in, a standard one and an administrator one, and the desktop (Explorer.exe) runs on the standard one. When you approve an elevation prompt, the program you launched gets the administrator token; the rest of your session does not.

You can see this on a real machine. In a normal, non-elevated PowerShell window on an administrator account, `whoami /groups` lists `BUILTIN\Administrators` with the note "Group used for deny only" and shows `Mandatory Label\Medium Mandatory Level`. That is the filtered token: the group is there, but switched off until you elevate. This was observed on the Windows 11 Pro machine described above.

> TODO(source): Microsoft's whoami page documents the `/groups` switch but not the "deny only" wording; link the documentation that explains it, or confirm the wording on a second machine.

On a Mac, the first account created during setup is an administrator. Apple's account types are Administrator, Standard, and Sharing Only. In Terminal, `sudo` runs a single command with administrator rights, and only administrators may use it; it asks for the current user's password. Apple describes the root user as disabled by default and says `sudo` is the safer route than enabling root. [Accounts, admin rights, and permissions](/windows-macos/concepts/accounts-admin-and-permissions/) explains all of this in depth.

### The file system: where things live

A **path** is a postal address for a file. Windows starts each path at a drive letter (`C:\Users\...`) and separates folders with a backslash; a network location looks like `\\server\share`. Names are not case-sensitive by default. macOS starts every path at `/` and separates folders with a forward slash; your home folder is `/Users/<you>`, with `Desktop`, `Documents`, and `Downloads` inside it. Both systems hide some folders, and both have names you cannot use. [Files, folders, and paths](/windows-macos/concepts/files-and-paths/) has the full rules.

### Processes, services, and startup items

A **process** is one running copy of a program. Think of a restaurant kitchen: each cook working an order is a process. A **service** is a process that runs in the background with no window, like the dishwasher and the ventilation that run whether or not anyone is looking. A **startup item** (Windows) or **login item** (macOS) is a program set to launch when you sign in, like the staff who unlock the kitchen in the morning. Most slowness on a healthy machine is too many of the third kind, or one process of the first kind eating everything. [Processes, services, and startup items](/windows-macos/concepts/processes-services-and-startup/) covers the tools.

### Updates

Both systems deliver security fixes and features as updates. On Windows, open Start > Settings > Windows Update and choose Check for Windows updates. On a Mac, open System Settings > General > Software Update. Apple recommends backing up before you update and says installing asks for an administrator password. The first walkthrough, [Check your version, update, and confirm the basics](/windows-macos/walkthroughs/1-check-version-update-and-confirm-basics/), does this step by step.

### Recovery

Recovery is the set of tools that work when the normal system does not. Windows has the **Windows recovery environment** and, from Settings > System > Recovery, options that range from a troubleshooter and System Restore up to Reset this PC. A Mac has **macOS Recovery**, started differently on Apple silicon (hold the power button until startup options appear) and on Intel (hold Command-R at power-on). Both can reinstall the system. Neither is a backup: they get the system running again, and your own files come back only from a backup. [Backups and recovery](/windows-macos/concepts/backups-and-recovery/) explains the layers.

### The command line

Every task in this guide can be done with menus, but the command line is faster to repeat and easier to copy into notes. A **shell** is the program that reads what you type; a **terminal** is the window it runs in.

| | Windows | macOS |
| --- | --- | --- |
| Window | Windows Terminal hosts Command Prompt, PowerShell, and other shells | Terminal |
| Shells | Command Prompt and PowerShell, each in its own tab | zsh is the default |
| Open it | Open the **Start** menu, type **Windows PowerShell**, select it, then select **Open** | Open Spotlight (`Command-Space`), type **Terminal**, then click **Terminal**; or open `/Applications/Utilities` in Finder and double-click **Terminal** |
| Open it as administrator | Start menu, type **Windows PowerShell**, select it, then select **Run as administrator** | Not needed: put `sudo` in front of a single command |
| Quit | Close the window | Type `exit` and press Return, or choose Terminal > Quit Terminal |

PowerShell commands are named `Verb-Noun`, for example `Get-Process` and `Get-Service`; the `Get-` ones fetch information. Mac commands are short lowercase words like `df`, `top`, and `open`. Each has a manual (`man <name>`).

> TODO(test): confirm the exact wording of the Windows Terminal entry in the Start menu on a fresh Windows 11 install, and whether Windows Terminal is the default host there.

### Which bin is this action in?

Before you run anything, decide which of these three it belongs to. This is the single most useful habit in the guide.

| Bin | What it does | Examples in this guide | Rule |
| --- | --- | --- | --- |
| Reads only | Shows you information and changes nothing | `Get-Process`, `Get-Service`, `tasklist`, `netstat`, `ipconfig`, Activity Monitor, `df -h`, `sw_vers` | Run freely |
| Changes a setting | Alters how the machine behaves; reversible if you remember the old value | Turning off a startup app, `ipconfig /release`, changing a firewall option, changing an account type | Write the old value down first |
| Can lose data | Deletes, erases, or overwrites something you cannot get back without a backup | Choosing "Remove everything" in Reset this PC, erasing a disk, deleting an account with its data, force-ending an app with unsaved work | Back up first, and read the confirmation screen twice |

### Vocabulary

| Word | Meaning |
| --- | --- |
| Account | A named identity with its own home folder and permissions. |
| Administrator | An account allowed to change the system for everyone. |
| Standard user | An account limited to its own files and settings. |
| Elevation | Temporarily running one program with administrator rights (Windows UAC prompt; `sudo` on a Mac). |
| UAC | User Account Control: the Windows system that shows an elevation prompt. |
| Process | One running copy of a program. |
| Service | A background process with no window. |
| Startup item / login item | A program set to launch when you sign in. |
| Path | The address of a file or folder. |
| Volume | A formatted storage area with its own file system, such as `C:` or an external drive. |
| File system | The format a volume uses to store files. The Windows machine used for this guide had NTFS and exFAT volumes; Disk Utility on a Mac lists APFS, MS-DOS (FAT), and ExFAT among its formats. |
| Package manager | A command-line tool that installs, updates, and removes software: winget on Windows, Homebrew on a Mac. |
| Recovery environment | A small separate system that starts when the main one will not. |
| Safe mode | A special startup used for diagnosis. |
| Shell | The program that reads the commands you type. |
| Cmdlet | A PowerShell command, named `Verb-Noun`. |
| Root user | The all-powerful Unix account on a Mac, disabled by default. |

## Practice project

Run six read-only checks on the system you own. Nothing here changes anything. Write down each answer; you will use them in Level 1.

**On Windows**

1. Open Start > Settings > System > About. Note the edition, version, and OS build under Windows specifications.
2. Open PowerShell (Start menu, type **Windows PowerShell**, select it, then select **Open**) and run `whoami`. Then run `whoami /groups` and find the `Administrators` line. Note whether it says "Group used for deny only".
3. Run `Get-LocalUser` and list the accounts.
4. Run `Get-ChildItem C:\ -Force`. The `-Force` switch shows hidden and system items. You should see ordinary folders such as `Users`, `Windows`, and `Program Files`, plus hidden ones such as `ProgramData`, and files such as `pagefile.sys`.
5. Run `Get-Process | Where-Object WorkingSet -GT 20MB`, which lists processes using more than 20 MB of working memory. Then run `Get-Service | Where-Object {$_.Status -eq "Running"}` to list running services. On the machine used to check this guide, `Get-Service` listed 342 services, 141 of them running; your numbers will differ.
6. Press `Ctrl+Shift+Esc` to open Task Manager and look at the Processes, Performance, and Startup apps tabs. Close it.

**On macOS**

1. Choose Apple menu > About This Mac and note the macOS version.
2. Open Terminal (Spotlight, type **Terminal**). Run `sw_vers` and compare it to step 1.
3. Run `df -h` to see each volume's size and free space in human-readable units.
4. Run `top -o cpu -n 10` to see the ten busiest processes by CPU. Press `q` to quit.
5. Run `open .` to open the current folder in Finder.
6. Open Activity Monitor from `/Applications/Utilities`, choose View > All Processes, and look at the CPU, Memory, Disk, and Network tabs. Close it.

> TODO(test): none of the macOS commands or menu paths above has been run on a real Mac. Run each and record the output before this page is marked verified.

You have now used the command line on your system without changing anything, found the version, and looked at accounts, files, and processes. That is the whole map for Level 1.

## Check yourself

1. Why does Microsoft recommend a standard account for daily use, and what happens to an administrator's session when an elevation prompt is approved?
2. What is the difference between a process, a service, and a startup item?
3. On a Mac, which kind of account may use `sudo`, and whose password does it ask for?
4. Name a command that is safe to run at any time, one that changes a setting, and an action that can lose data.
5. Which is a backup: Reset this PC, macOS Recovery, or Time Machine?
6. On Windows, what does the `-Force` switch on `Get-ChildItem` add?

<details>
<summary>Answers</summary>

1. A mistake or a piece of malware running as a standard user can only change that user's own things. Approving an elevation prompt gives only the program you launched the administrator token; the rest of the session keeps the standard token.
2. A process is one running copy of a program. A service is a process that runs in the background with no window. A startup item is a program set to launch at sign-in, and it becomes a process when it does.
3. Only an administrator account may use `sudo`, and it asks for the current user's own password.
4. Any of `Get-Process`, `tasklist`, `df -h`, `sw_vers` are safe; `ipconfig /release` or turning off a startup app changes a setting; "Remove everything" in Reset this PC or erasing a disk can lose data.
5. Time Machine. Reset this PC and macOS Recovery get the system running again but do not hold your files.
6. It includes items that are hidden or otherwise not normally accessible, such as hidden and system files. It does not override security restrictions.

</details>

## Next

[Level 1: Beginner](/windows-macos/levels/1-beginner/) turns this map into six jobs you do step by step. If you would rather look something up, the [cheat sheet](/windows-macos/cheat-sheet/) lists commands and shortcuts for both systems by how often you will need them.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
