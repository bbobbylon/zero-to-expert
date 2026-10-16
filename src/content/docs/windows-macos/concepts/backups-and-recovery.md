---
title: "Backups, restore points, and recovery"
description: "The three layers of getting back to a working computer (a backup of your files, a restore point for the system, and a reset or reinstall), which one fits which problem, and what each costs you."
domain: windows-macos
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Backup, restore, and recovery in Windows"
    url: "https://support.microsoft.com/en-us/windows/backup-restore-and-recovery-in-windows-e6d629c4-2568-4406-814f-209a2af06ef7"
    publisher: "Microsoft Support"
  - title: "Recovery options in Windows"
    url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5"
    publisher: "Microsoft Support"
  - title: "Back up and restore with Windows Backup"
    url: "https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338"
    publisher: "Microsoft Support"
  - title: "Backup and restore with File History"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/backup-and-restore-with-file-history"
    publisher: "Microsoft Support"
  - title: "System Restore"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/system-restore"
    publisher: "Microsoft Support"
  - title: "Reset your PC"
    url: "https://support.microsoft.com/en-us/windows/reset-your-pc-0ef73740-b927-549b-b7c9-e6f2b48d275e"
    publisher: "Microsoft Support"
  - title: "Recovery Drive"
    url: "https://support.microsoft.com/en-us/windows/recovery-drive-abb4691b-5324-6d4a-8766-73fab304c246"
    publisher: "Microsoft Support"
  - title: "Windows recovery environment"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment"
    publisher: "Microsoft Support"
  - title: "Find your BitLocker recovery key"
    url: "https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"
    publisher: "Microsoft Support"
  - title: "Back up your Mac with Time Machine"
    url: "https://support.apple.com/en-us/104984"
    publisher: "Apple Support"
  - title: "Restore items backed up with Time Machine on Mac"
    url: "https://support.apple.com/guide/mac-help/restore-files-mh11422/12.0/mac/12.0"
    publisher: "Apple Support (macOS User Guide)"
  - title: "How to use macOS Recovery"
    url: "https://support.apple.com/en-us/102518"
    publisher: "Apple Support"
  - title: "Update macOS on Mac"
    url: "https://support.apple.com/en-us/108382"
    publisher: "Apple Support"
tags: [windows, macos, backup, restore, recovery, time-machine, file-history, bitlocker]
sidebar:
  order: 53
---

## The one-line version

Three separate things get called "recovery", and mixing them up is how people lose files. A **backup** is a second copy of your files somewhere else. A **restore point** is a snapshot of the system that lets you undo a bad change without touching your files. A **reset or reinstall** rebuilds the system from scratch.

A backup is a photocopy of your documents kept in another building: if the office burns, you still have the papers. A restore point is a save game: if the last level goes wrong, you reload, but your other files are exactly as they were. A reset is demolishing the house and rebuilding it on the same plot: you get a clean house, and everything you kept inside is gone unless it was stored somewhere else.

## How it works

### Layer 1: backups of your files

| | Windows Backup | File History | Time Machine (macOS) |
| --- | --- | --- | --- |
| Where the copy goes | OneDrive, in the cloud | A drive you select | A backup disk you add |
| What it needs | A personal Microsoft account (not a work or school one) | A drive to select | A disk with capacity of at least twice the Mac's storage, per Apple |
| What it covers | Desktop, Documents, Pictures, Videos, and Music, plus settings, apps, and Wi-Fi information | The folders you set up for it | See Apple's page |
| How you get a file back | Restore through Windows Backup (steps not recorded here) | File Explorer: right-click the folder, choose **Restore previous versions** | Open the folder, enter Time Machine, browse the timeline, select the item, click **Restore** |
| How long it keeps copies | Subject to your OneDrive allowance; Microsoft's page cites 5 GB for the free tier, as read on 2026-09-26, so check your current allowance | Not sourced yet (see the note below) | Hourly for the past 24 hours, daily for the past month, weekly after that; the oldest backups are deleted when the disk fills |

> TODO(source): File History's retention rules and its default folder set, from Microsoft's File History page.
>
> TODO(test): the exact Windows Backup restore steps on a real Windows 11 install.

A backup you have never restored from is a hope, not a backup. [3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/) has you restore a test file before you rely on it.

### Layer 2: restore points and undo tools (Windows)

Microsoft's "Recovery options in Windows" page, read on 2026-09-26, lists these tools from smallest to biggest. Some depend on your Windows version, as noted on that page.

| Option | What it undoes | Notes |
| --- | --- | --- |
| Troubleshooter | Runs an automated check | First and cheapest |
| Reinstall through Windows Update | Reinstalls the current version using Windows Update | Version 22H2 or later per Microsoft's page |
| Uninstall an update | Removes one recent update | Use when a specific update broke something |
| Point-in-time restore | Rolls the system back to a saved snapshot | Version 24H2 or later, snapshots up to 3 days old; found in **Settings > System > Recovery** |
| Go back to the previous version | Returns to the version before your last big upgrade | Available for 10 days, per Microsoft |
| **System Restore** | Rolls system files and settings back to a restore point | Start it with `rstrui.exe`. Your personal files are not affected |
| **Reset this PC** | Reinstalls Windows | See layer 3 |
| Recovery drive | A USB stick you can start from | Created with `recoverydrive.exe`; the USB stick is erased |
| Installation media | A Windows installer on a USB stick | For reinstalling |
| Quick Machine Recovery | Microsoft's automated recovery | Version 24H2 or later |

System Restore changes system files and settings, but not your documents. That is why it is safe to try early, and why it cannot bring back a deleted file: only a backup can.

### Layer 3: reset or reinstall

- **Windows:** **Settings > System > Recovery > Reset this PC**. You choose **Keep my files** or **Remove everything**, and **Cloud download** or **Local reinstall**. Microsoft's page says to know your BitLocker key before you start.
- **macOS:** boot into **macOS Recovery** and choose Reinstall macOS.

> TODO(source): whether Reinstall macOS needs an internet connection, and how to bring your files back afterward (Migration Assistant or Restore from Time Machine), from an Apple page read in full. This guide does not claim either yet.

### The recovery environments

When the normal system will not start, both systems have a small separate system to boot instead.

**Windows recovery environment (WinRE).** Microsoft lists these ways in:

1. **Settings > System > Recovery > Advanced startup > Restart now**
2. Hold `Shift` while choosing **Restart**
3. Interrupt the boot three times in a row
4. Start from a recovery drive
5. Start from installation media

Once inside, the tools include Startup Repair, Startup Settings, Command Prompt, Uninstall Updates, System Restore, UEFI Firmware Settings, and System Image Recovery.

**macOS Recovery.** How you start it depends on the Mac:

| Mac | How to start |
| --- | --- |
| Apple silicon | Shut down, then hold the power button until "Loading startup options" or the Options icon appears. Choose **Options > Continue**, pick a volume, then pick an administrator user |
| Intel | Turn it on and hold `Command-R`. Apple also documents `Option-Command-R` and `Shift-Option-Command-R` for internet recovery |

Its utilities are Restore from Time Machine, Reinstall macOS, Disk Utility, and Terminal.

### The BitLocker recovery key

BitLocker is Windows disk encryption. If BitLocker cannot unlock the drive automatically, Windows asks for a **48-digit recovery key**. Microsoft's page lists three places to look: your Microsoft account (sign in at `account.microsoft.com/devices/recoverykey`), a work or school account (`aka.ms/aadrecoverykey`), and any printout or USB stick from when BitLocker was turned on. It also says plainly that **Microsoft Support cannot retrieve or recreate a lost key**, and that without it your only path is a Windows recovery option that removes all files from the device.

Find the key **now**, while the machine works. Microsoft's Reset your PC page also says to know your BitLocker key before you reset.

## Choosing between options

| Problem | Reach for | Why not something bigger |
| --- | --- | --- |
| Deleted or overwrote a file | Your file backup (File History, Windows Backup, Time Machine) | System Restore and reset do not bring back personal files |
| A recent update or driver broke something | Uninstall the update; System Restore or point-in-time restore | A reset also erases your apps and settings when a smaller undo would fix it |
| Windows or macOS will not start | The recovery environment: Startup Repair, Uninstall Updates, System Restore (Windows); Disk Utility or Time Machine (macOS) | Try the smaller tools first; each bigger option costs more of your setup |
| The system is unrecoverable, or you want a clean slate | Reset this PC or Reinstall macOS, after checking your backup | It rebuilds the system; only a backup brings your files back |

Why the smallest tool that fits wins: each step down this list changes more of your machine and takes longer to put back. Try the cheap, reversible layer first.

## Common mistakes

- **No restore test.** A backup that has never been restored may be empty, incomplete, or unreadable. Restore a test file.
- **Backup on the same drive as the originals.** If that drive fails, both copies go together. Keep at least one copy on a different device.
- **Treating recovery as backup.** Reset this PC and macOS Recovery rebuild the system; they do not hold your files.
- **Picking "Remove everything" without a backup.** It does what it says.
- **Not knowing your BitLocker key.** Without it, a locked drive means erasing everything.
- **Making a recovery drive on a USB stick you still use.** Microsoft's page says creating it erases the stick.
- **Updating with no backup.** Apple's update page recommends backing up before you update.

## Where this shows up

- [3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/) builds the first layer.
- [6. Reach recovery options](/windows-macos/walkthroughs/6-reach-recovery-options/) has you open each recovery environment before you need one.
- [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/) sends you to the right layer for a machine that will not start.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
