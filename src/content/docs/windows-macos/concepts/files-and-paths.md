---
title: "Files, folders, and paths"
description: "How Windows and macOS name and organize files, which places are hidden, which names are forbidden, and which drive format to pick when a disk moves between the two."
domain: windows-macos
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Naming Files, Paths, and Namespaces"
    url: "https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file"
    publisher: "Microsoft Learn"
  - title: "Known Folders"
    url: "https://learn.microsoft.com/en-us/windows/win32/shell/known-folders"
    publisher: "Microsoft Learn"
  - title: "File Explorer in Windows"
    url: "https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows"
    publisher: "Microsoft Support"
  - title: "Get-ChildItem"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "File System Overview (archived File System Programming Guide)"
    url: "https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html"
    publisher: "Apple Developer Documentation Archive"
  - title: "File system formats available in Disk Utility on Mac"
    url: "https://support.apple.com/guide/disk-utility/file-system-formats-dsku19ed921c/mac"
    publisher: "Apple Support (Disk Utility User Guide)"
  - title: "Show or hide filename extensions on Mac"
    url: "https://support.apple.com/guide/mac-help/mchlp2304/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Mac keyboard shortcuts"
    url: "https://support.apple.com/en-us/102650"
    publisher: "Apple Support"
  - title: "open(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/open.1.html"
    publisher: "keith.github.io xcode-man-pages"
tags: [windows, macos, files, paths, file-system, hidden-files]
sidebar:
  order: 50
---

## The one-line version

A path is a postal address for a file: it names every folder you pass through to reach it. Windows and macOS write that address differently, keep different things in different places, and forbid different names, and a disk formatted for one system may not be readable by the other.

Think of two cities laid out differently. Windows numbers each district separately: `C:` is one district with its own streets, `D:` is another. macOS has a single street plan that starts at one central square, written `/`, and everything hangs off it.

## How it works

### The shape of a path

| | Windows | macOS |
| --- | --- | --- |
| Starts with | A drive letter and colon: `C:\` | A slash: `/` |
| Separator | Backslash `\` | Forward slash `/` |
| Network location | UNC path: `\\server\share` | Not sourced yet (see the note below) |
| Current folder / parent folder | `.` and `..` | Not sourced yet (see the note below) |
| Your files | `C:\Users\<you>` | `/Users/<you>`, with `Desktop`, `Documents`, and `Downloads` inside |
| Case | Names are not case-sensitive by default | Depends on the volume format; Disk Utility lists Case-sensitive variants of APFS as separate formats |

> TODO(source): macOS network path form (`smb://`), the `.` and `..` shorthand in the shell, and whether standard APFS is case-insensitive by default, from an Apple source.

Every path is either **absolute** (starts from the top: `C:\Users\you\notes.txt`) or **relative** (starts from wherever you are now). A relative path uses `.` for the current folder and `..` for the folder above it; Microsoft documents both for Windows.

### Windows rules for names

Microsoft's file-naming documentation, read on 2026-09-26, sets these limits for a file or folder name on Windows:

- These characters are reserved and cannot be used in a name: `<` `>` `:` `"` `/` `\` `|` `?` `*`
- A few names are reserved for devices, whatever the extension: `CON`, `PRN`, `AUX`, `NUL`, `COM1` to `COM9`, and `LPT1` to `LPT9`.
- A name cannot end with a space or a period.
- A full path is limited to `MAX_PATH`, which is 260 characters. Before Windows 10 version 1607 that was a hard limit. Since then, longer paths need an opt-in through the registry or Group Policy.

Why this hurts you: a deep folder tree can reach 260 characters even though no single name in it is long. Keep folder trees shallow.

> TODO(source): macOS file-name rules (forbidden characters, length limits) from an Apple source.

### Where things live on Windows

Observed on one Windows 11 Pro machine (OS build 10.0.26200) on 2026-09-26. Your machine's layout will be the same shape.

| Place | Path | Notes |
| --- | --- | --- |
| Your user folder | `C:\Users\<you>` (`$env:USERPROFILE` in PowerShell) | Your documents, downloads, and settings start here |
| Per-user app data | `C:\Users\<you>\AppData\Roaming` and `C:\Users\<you>\AppData\Local` | `%LOCALAPPDATA%` points at the Local one; winget writes its logs there |
| Temporary files | `%TEMP%`, which was `C:\Users\<you>\AppData\Local\Temp` | Where programs drop scratch files |
| Installed programs | `C:\Program Files` | |
| Program data shared by all users | `C:\ProgramData` | Hidden |
| Windows itself | `C:\WINDOWS` | |

> TODO(source): Microsoft's own description of what each of these locations is for. The Known Folders page describes how Windows names and redirects these locations but did not list default paths.

Run `Get-ChildItem C:\ -Force` in PowerShell to see the top of the drive. Without `-Force`, PowerShell skips hidden and system items. On the machine above, `-Force` revealed `$Recycle.Bin`, `ProgramData`, `Recovery`, `System Volume Information`, `pagefile.sys`, `hiberfil.sys`, and `swapfile.sys`. It also showed `Documents and Settings`, which is a **junction**: a folder that points at another folder. PowerShell marks such an item with the `l` (link) flag in the Mode column and puts the target in the `LinkTarget` property.

These items are hidden because Windows manages them for you. Do not delete or move them.

To see hidden items in File Explorer: open the **View** menu, then **Show**, and choose **Hidden items**. The same menu has **File name extensions**, which you should turn on so `report.pdf` and `report.pdf.exe` cannot pass for the same thing.

### Where things live on macOS

Apple's archived File System Programming Guide describes four **domains**: User, Local, Network, and System. The folders you meet every day are:

| Place | Path |
| --- | --- |
| Applications | `/Applications` |
| Apple's system software | `/System` |
| All users' home folders | `/Users` |
| Your Desktop, Documents, and Downloads | `~/Desktop`, `~/Documents`, `~/Downloads` (`~` means your home folder) |
| Your Library (per-user support files) | `~/Library`, which is hidden |

The same guide lists these Unix directories as hidden: `/bin`, `/dev`, `/etc`, `/sbin`, `/tmp`, `/usr`, `/var`, and `/Volumes`.

Three Finder habits pay off quickly. The keyboard shortcuts come from Apple's shortcuts page:

- `Shift-Command-G` opens **Go to Folder**, where you can type a path, including a hidden one.
- `Shift-Command-H` opens your Home folder.
- In Finder, choose **Finder > Settings**, click the **Advanced** tab, and turn on **Show all filename extensions**. Apple warns not to change a file's extension by hand, because you may no longer be able to open it.

In Terminal, `open .` opens the current folder in Finder, and `open -R <path>` reveals a file in its folder.

> TODO(source): the shortcut that shows hidden files in Finder. Apple's shortcuts page did not list it.
>
> TODO(test): run `open .` and `open -R` on a real Mac.

### Drive formats

A **file system** is the format a volume uses to keep track of its files. A drive formatted for one system may not be readable or writable on the other.

| Format | Where you meet it | Notes |
| --- | --- | --- |
| NTFS | The `C:` drive on the Windows machine used for this guide | The Windows system format |
| APFS | Disk Utility lists it, plus Encrypted and Case-sensitive variants | A Mac format |
| MS-DOS (FAT) | Disk Utility, for Windows-compatible volumes of 32 GB or less | Small shared drives |
| ExFAT | Disk Utility, for Windows-compatible volumes over 32 GB; the Windows machine above also had exFAT volumes | Large shared drives |

For a drive you will plug into both a PC and a Mac, pick ExFAT unless the drive is 32 GB or smaller, in which case Disk Utility's MS-DOS (FAT) option is the one Apple names for that size. NTFS is not among the formats Disk Utility lists, and APFS is a Mac format, so a drive formatted with either is the wrong choice for sharing. Formatting erases the drive. Copy anything you want to keep first.

> TODO(source): whether Windows can read or write APFS and whether macOS can write NTFS, from a Microsoft or Apple source. This page does not claim either.

## Choosing between options

| Decision | Choose | Why the others lose |
| --- | --- | --- |
| Show extensions or hide them | Show them (File Explorer **View > Show > File name extensions**; Finder **Settings > Advanced**) | Hidden extensions let a name like `report.pdf.exe` look like `report.pdf`, and you cannot see what will open a file |
| Open a hidden folder | Type its path (`Go to Folder` on a Mac, `Get-ChildItem -Force` on Windows) | Turning on "show everything" makes it easy to delete a file Windows or macOS manages |
| Format for a shared drive | ExFAT (over 32 GB) or FAT (32 GB or less) | NTFS and APFS are each native to only one system |
| Long path problems | Shorten the folder tree | The alternative is the registry or Group Policy opt-in, a settings change you would have to keep track of and reverse; shortening the tree needs none |

## Common mistakes

- **Removing an extension while renaming.** The file may stop opening. Turn on extensions and rename only the part before the dot.
- **Choosing a reserved or forbidden name.** `CON`, `NUL`, and names ending in a period or a space are not valid Windows names. A file that arrives from another source with one of them needs renaming.
- **Assuming case matters everywhere.** Windows names are not case-sensitive by default, so treat `Report.txt` and `report.txt` as the same name.
- **Formatting the wrong drive.** Disk Utility lists every drive. Confirm the name and size before you erase.
- **Putting your only copy on a hidden system location.** Keep your work under your user folder, where backups look.

## Where this shows up

- [Level 0: Orientation](/windows-macos/levels/0-orientation/) uses paths in its practice project.
- [3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/) depends on knowing which folders a backup covers.
- [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/) uses the storage checks when a disk fills up.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
