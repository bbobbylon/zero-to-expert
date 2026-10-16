---
title: "3. Set up a backup and test a restore"
description: "Turn on File History (Windows) or Time Machine (macOS), then delete a test file and bring it back from the backup so you know the backup works before you need it."
domain: windows-macos
pageType: walkthrough
level: 1
difficulty: moderate
status: draft
safetyCritical: false
time: "45-60 minutes (estimate; the first backup of a full drive can take much longer)"
tools: ["An external drive for the backup (nothing on it that you need)", "A Windows 11 PC or a Mac", "A plain text file you create for the test", "A password manager, if you turn on Time Machine encryption"]
parts: []
sources:
  - title: "Backup and restore with File History"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/backup-and-restore-with-file-history"
    publisher: "Microsoft Support"
  - title: "Back up and restore with Windows Backup"
    url: "https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338"
    publisher: "Microsoft Support"
  - title: "Backup, restore, and recovery in Windows"
    url: "https://support.microsoft.com/en-us/windows/backup-restore-and-recovery-in-windows-e6d629c4-2568-4406-814f-209a2af06ef7"
    publisher: "Microsoft Support"
  - title: "Back up your Mac with Time Machine"
    url: "https://support.apple.com/en-us/104984"
    publisher: "Apple Support"
  - title: "Restore items backed up with Time Machine on Mac"
    url: "https://support.apple.com/guide/mac-help/restore-files-mh11422/12.0/mac/12.0"
    publisher: "Apple Support (macOS User Guide)"
tags: [windows, macos, backup, restore, file-history, time-machine, beginner]
sidebar:
  order: 102
---

:::caution[Not yet run end to end]
Steps follow Microsoft's and Apple's documentation as read on 2026-09-26. No backup was created or restored while writing this page. Lines marked "to test" have not been checked on a real machine. Menu labels differ between releases; follow the linked source if one does not match.
:::

## Before you start

The idea of this job is one sentence: **a backup you have never restored from is a hope, not a backup.** So you will set the backup up, then prove it works by deleting a test file and bringing it back. Read [Backups, restore points, and recovery](/windows-macos/concepts/backups-and-recovery/) for the background.

**Pick your tool.** Each system has one built-in way to keep a copy on a drive you own:

| | Windows | macOS |
| --- | --- | --- |
| What you use here | **File History**, to a drive you select | **Time Machine**, to a backup disk |
| Also available | **Windows Backup**: copies Desktop, Documents, Pictures, Videos, and Music, plus settings, apps, and Wi-Fi information, to OneDrive. It needs a personal Microsoft account, not a work or school one, and the free OneDrive allowance was 5 GB when Microsoft's page was read on 2026-09-26 | Nothing else covered here |
| Why this one | The copy lives on a drive you own and can unplug | It is Apple's own tool, and you restore by opening the folder and entering Time Machine |

Why File History first on Windows: the copy lives on a drive you own, so you can see it, unplug it, and restore from it directly. Windows Backup makes a good second copy of your key folders in the cloud. Using both protects against more kinds of failure than either alone, but File History is the simpler place to start.

> TODO(source): Windows Backup setup steps and File History's default folder set and schedule, from Microsoft's pages read in full. This page does not describe them.

**Get a drive ready.** For Time Machine, Apple says the backup disk needs capacity of at least twice the Mac's storage. For File History, pick a drive with plenty of free space. Either tool may need to prepare the drive, so use one that holds nothing you need.

:::caution[The drive may be erased]
Time Machine can offer to erase the disk when you set it up. Do not accept if the disk holds anything you have not copied elsewhere.
:::

You also need about an hour, and a folder you use every day, such as Documents.

## Steps

### A. Windows: turn on File History

1. Plug in the backup drive. You should see it appear in File Explorer.
2. Open **Control Panel**, then **System and Security**, then **Save backup copies of your files with File History**.
3. Choose **Select drive** and pick your backup drive.
4. Choose **Turn on**. The status should change to show File History is on and name your drive.
5. Note in your log the drive name and today's date.

> TODO(test): how to open Control Panel on Windows 11, what the status line reads after turning File History on, and how to run a backup immediately.

### B. macOS: turn on Time Machine

1. Connect the backup disk.
2. Open **System Settings > General > Time Machine**.
3. Choose **Add Backup Disk** (or the **+** button), select your disk, and choose **Set Up Disk**.
4. If a message offers to erase the disk, read it. Confirm only if the disk holds nothing you need.
5. If you want the backup encrypted, choose **Encrypt Backup** and enter a password. Save that password in your password manager now.
6. Open **Options** in Time Machine settings and read what it offers. Note the schedule Apple describes: hourly backups for the past 24 hours, daily backups for the past month, and weekly backups after that. The oldest are deleted when the disk fills.

> TODO(test): the exact wording and layout of the Time Machine screens on the current macOS, and where progress is shown.

### C. Create a test file

1. In your Documents folder, create a plain text file named `restore-test.txt`.
2. Type one line into it, such as `restore test 1`, and save it.
3. Wait for a backup to run. Time Machine backs up hourly for the past 24 hours, so allow up to an hour; for File History, wait for a scheduled backup or run one now if you can find how.

Do not delete the test file until you are sure a backup ran after you created it.

> TODO(source): how to see that a File History or Time Machine backup has completed, and how to start one immediately, from a Microsoft or Apple page.

### D. Delete the test file

1. Delete `restore-test.txt` from Documents. You should see it disappear from the folder.
2. Leave the Recycle Bin or Trash alone. Emptying it is a separate, permanent step you do not need here.

### E. Restore it

**On Windows**

1. In File Explorer, go to the folder that contains **Documents** (your user folder).
2. Right-click the **Documents** folder and choose **Restore previous versions**. Windows offers **Open in File History**.
3. In File History, browse to a version from after you created the file.
4. Select `restore-test.txt`.
5. Choose **Restore**, or **Restore to...** if you want to put it somewhere other than its original place. Microsoft warns that a restore replaces the current version; that is why **Restore to...** exists.

**On macOS**

1. Open the Documents folder in Finder.
2. Open Time Machine: click its icon in the menu bar and choose **Enter Time Machine**, or open it from Launchpad.
3. Browse the timeline back to a time after you created the file and before you deleted it.
4. Select `restore-test.txt`.
5. Click **Restore**. The file returns to its original location.

> TODO(test): whether the classic **Restore previous versions** menu item appears directly on Windows 11's right-click menu or under **Show more options**, and the exact button labels in File History and Time Machine.

### F. Confirm and record

1. Open `restore-test.txt` from Documents. It should contain your line of text.
2. In your log, write the backup tool, the drive, the date you tested the restore, and roughly how long it took.

## Check it worked

- `restore-test.txt` is back in Documents and opens with the text you typed.
- You can say, from your own log, which drive holds the backup and when you last proved a restore works.
- The backup is set to run without you: File History on, or Time Machine on with its disk connected.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Time Machine says the disk is too small | Apple says the disk should have at least twice the capacity of the Mac's storage | Use a larger disk |
| Time Machine asks to erase the disk | The disk was formatted for something else | Confirm only if it is empty; otherwise use a different disk |
| **Restore previous versions** shows nothing | No backup has run since the file was created, File History is off, or the folder is not one it backs up | Turn File History on, wait for a backup, and check the folder is covered. TODO(source): how to see which folders File History covers |
| The Windows restore warns it will replace the current file | It will: Microsoft's warning says the current version is replaced | Use **Restore to...** to put a copy somewhere else |
| The Time Machine icon is not in the menu bar | The icon is not shown there | Open Time Machine from Launchpad instead |
| Windows Backup is not offered, or will not turn on | You are signed in with a work or school account | Windows Backup needs a personal Microsoft account; use File History instead |
| The OneDrive allowance is used up | The free allowance was 5 GB when the page was read; check your current allowance | Copy less, or use File History to a drive instead |
| The restore worked once but you do not know what else is backed up | You tested one file, not the whole set | Repeat the test with a file from each important folder |

## Next

[4. Install and remove apps with a package manager](/windows-macos/walkthroughs/4-install-and-remove-apps-with-a-package-manager/). Now that changes are recoverable, you can install and remove software with less worry.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
