---
title: "Diagnose from symptoms"
description: "A method for finding the cause of a slow, full, frozen, unbootable, or offline computer, with ordered checks and decision tables for Windows and macOS."
domain: windows-macos
pageType: explanation
level: 1
status: draft
safetyCritical: false
sources:
  - title: "Tips to improve PC performance in Windows"
    url: "https://support.microsoft.com/en-us/windows/experience/performance-optimization/tips-to-improve-pc-performance-in-windows"
    publisher: "Microsoft Support"
  - title: "Free up drive space in Windows"
    url: "https://support.microsoft.com/en-us/windows/free-up-drive-space-in-windows-85529ccb-c365-490d-b548-831022bc9b32"
    publisher: "Microsoft Support"
  - title: "Free up storage space on your Mac"
    url: "https://support.apple.com/en-us/102624"
    publisher: "Apple Support"
  - title: "Troubleshoot problems updating Windows"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/troubleshoot-problems-updating-windows"
    publisher: "Microsoft Support"
  - title: "Force an app to quit on Mac"
    url: "https://support.apple.com/en-us/102586"
    publisher: "Apple Support"
  - title: "Windows recovery environment"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment"
    publisher: "Microsoft Support"
  - title: "Start your PC in safe mode in Windows"
    url: "https://support.microsoft.com/en-gb/windows/start-your-pc-in-safe-mode-in-windows-92c27cff-db89-8644-1ce4-b3e5e56fe234"
    publisher: "Microsoft Support"
  - title: "Recovery options in Windows"
    url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5"
    publisher: "Microsoft Support"
  - title: "Find your BitLocker recovery key"
    url: "https://support.microsoft.com/en-us/windows/security/encryption/find-your-bitlocker-recovery-key"
    publisher: "Microsoft Support"
  - title: "How to use macOS Recovery"
    url: "https://support.apple.com/en-us/102518"
    publisher: "Apple Support"
  - title: "Start up your Mac in safe mode"
    url: "https://support.apple.com/guide/mac-help/start-up-your-mac-in-safe-mode-mh21245/12.0/mac/12.0"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Repair a Mac storage device with Disk Utility"
    url: "https://support.apple.com/en-us/102611"
    publisher: "Apple Support"
  - title: "Use the System File Checker tool to repair missing or corrupted system files"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files"
    publisher: "Microsoft Support"
  - title: "Fix Wi-Fi connection issues in Windows"
    url: "https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c"
    publisher: "Microsoft Support"
  - title: "If your Mac isn't connecting to Wi-Fi"
    url: "https://support.apple.com/en-us/101588"
    publisher: "Apple Support"
  - title: "ipconfig"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig"
    publisher: "Microsoft Learn"
  - title: "Test-NetConnection"
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "taskkill"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill"
    publisher: "Microsoft Learn"
  - title: "Get-Process"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "View information about processes in Activity Monitor on Mac"
    url: "https://support.apple.com/guide/activity-monitor/view-information-about-processes-actmntr1001/mac"
    publisher: "Apple Support (Activity Monitor User Guide)"
  - title: "top(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/top.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "df(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/df.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "du(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/du.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "ifconfig(8) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/ifconfig.8.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "networksetup(8) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/networksetup.8.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "ping(8) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/ping.8.html"
    publisher: "keith.github.io xcode-man-pages"
tags: [windows, macos, troubleshooting, diagnosis, slow, disk-full, frozen, boot, network]
sidebar:
  order: 54
---

## The one-line version

Diagnosing a computer is narrowing, not guessing: name the symptom exactly, look before you touch anything, try the cheapest reversible fix first, and change one thing at a time. A doctor takes your temperature before ordering a scan. This page gives you the temperature checks for five common symptoms on both systems.

## The method

1. **Name the symptom exactly.** "Slow" is not a symptom; "slow for two minutes after sign-in, then fine" is. Note when it started and what changed just before: a new app, an update, a new device.
2. **Look before you touch.** Use the read-only tools first (Task Manager, Activity Monitor, `Get-Process`, `df -h`). They cannot make things worse.
3. **Cheapest, most reversible fix first.** A restart costs nothing. A reset costs your setup.
4. **One change at a time, and write down the old value.** If you change three things and it works, you do not know which one mattered, and you cannot undo just one.
5. **Stop before anything that can lose data.** Back up first. See [Backups, restore points, and recovery](/windows-macos/concepts/backups-and-recovery/).

| What changed recently? | First suspect | Cheapest test |
| --- | --- | --- |
| Installed an app | That app | Disable its startup entry, or uninstall it |
| Installed an update | That update | Windows: uninstall the update from the recovery tools. Mac: see the safe mode row below |
| Plugged in a new device | That device | Unplug it and restart |
| Nothing you can name | Slow accumulation (startup items, a full disk) | Work through the slow and disk-full tables below |

> TODO(test): every macOS command and menu path on this page (`top`, `df`, `du`, `ifconfig`, `networksetup`, `ping`, Activity Monitor, safe mode, Disk Utility) has not been run on a real Mac. Windows commands that only read were run on a Windows 11 Pro machine on 2026-09-26; commands that change settings were not.

## Symptom: it is slow

Work down the list and stop when the problem is solved.

| # | Check | What it tells you | If yes, do this |
| --- | --- | --- | --- |
| 1 | **Restart.** Windows: **Start > Power > Restart**. Mac: Apple menu > Restart. | Whether it is a temporary state that a fresh start clears | If it is fast after restarting and slow again within a day or two, keep going |
| 2 | **What is busy?** Windows: `Ctrl+Shift+Esc`, **Processes** tab. Mac: Activity Monitor, **CPU** and **Memory** tabs; or `top -o cpu`. | One program is using far more than the rest | Ask it to quit (see [processes](/windows-macos/concepts/processes-services-and-startup/)); if it comes back, update or remove that app |
| 3 | **What starts at sign-in?** Windows: Task Manager > **Startup apps**, note the impact ratings. Mac: **System Settings > General > Login Items & Extensions**. | Many items launching together slow the first minutes | Windows: right-click an app and choose **Disable**. Mac: remove it from **Open at Login** |
| 4 | **Is the disk nearly full?** Windows: **Settings > System > Storage**. Mac: **System Settings > General > Storage**. | Little free space slows a system | Go to the disk-full table below |
| 5 | **Any updates waiting?** Windows: **Start > Settings > Windows Update > Check for updates**, then **Advanced options > Optional updates**. Mac: **System Settings > General > Software Update**. | You may be running a bug that has a fix | Install them; on a Mac, back up first |
| 6 | **Windows only: run a malware scan.** **Start > Settings > Privacy & security > Windows Security > Virus & threat protection > Quick scan**. | Unwanted software can take resources | Follow what Windows Security reports |
| 7 | **Windows only: power mode.** **Start > Settings > System > Power & battery > Power mode > Best performance**. | A saver power mode limits speed | Switch it if you are on mains power, and note the old value |
| 8 | **Windows only: repair system files.** In an elevated Command Prompt run `DISM.exe /Online /Cleanup-image /Restorehealth`, then `sfc /scannow`. | Damaged system files can cause odd slowness and errors | See [the System File Checker section](#when-system-files-are-damaged) |

Microsoft's performance tips also include closing unused apps and restarting, adjusting visual effects, and optimizing drives; each is in the linked page.

## Symptom: the disk is full

Free space matters beyond your own files: Microsoft's update troubleshooting page lists 20 GB free for a 64-bit installation (16 GB for 32-bit) among its steps for failed updates, so a full disk can stop updates from working.

| # | Check | What it tells you | If yes, do this |
| --- | --- | --- | --- |
| 1 | **Where is the space going?** Windows: **Settings > System > Storage**. Mac: **System Settings > General > Storage** (macOS Ventura 13 and later). | Which category is big: apps, documents, temporary files, system data | Work on the largest category first |
| 2 | **Windows: run Storage Sense.** **Settings > System > Storage > Storage Sense > Run Storage Sense now**. | Temporary and unneeded files Windows can clear on its own | Let it run |
| 3 | **Windows: clear temporary files.** **Settings > System > Storage > Temporary files > Remove files**. Read the list before you confirm. | Files programs left behind | Remove the ones you do not need |
| 4 | **Windows: Cleanup recommendations, or the Disk Cleanup app.** Start > type "Disk Cleanup". | More reclaimable space | Accept what you understand |
| 5 | **Mac: Trash, Downloads, unused apps.** Empty the Trash, review the Downloads folder, and uninstall apps you do not use. | The usual big-ticket items | Delete what you no longer need |
| 6 | **Mac, command line: which volume, which folder?** `df -h` shows each volume with free space. `du -hd 1 <folder>` shows the size of each item one level down. | Where the space is, one folder at a time | Repeat `du` on the biggest folder until you find it |
| 7 | **Windows: uninstall unused apps.** **Settings > Apps > Installed apps > More options > Uninstall**. | Apps you never use | Uninstall them |
| 8 | **Still short?** Copy your files to an external drive or cloud storage, open a few to confirm the copy worked, and only then delete the originals. | Whether you need more storage | Add storage, or move older files off the machine |

:::caution[Deleting frees space, but it is permanent once the Recycle Bin or Trash is emptied]
Empty the Trash or Recycle Bin last, after you are sure. If a cleanup step asks you to confirm a list, read it.
:::

## Symptom: an app is frozen

| # | Check | What it tells you | If yes, do this |
| --- | --- | --- | --- |
| 1 | **Wait a minute.** Is the disk light on, or is the CPU busy in Task Manager or Activity Monitor? | It may be busy, not frozen | If it finishes, nothing more to do |
| 2 | **Ask it to quit.** Mac: choose Quit from the app's menu. Windows: `taskkill /pid <PID>` (find the PID with `Get-Process -Name <name>`; it is the `Id` column). | Whether it responds to a polite request | It closes and can save |
| 3 | **Force it.** Mac: press `Option-Command-Esc`, or Apple menu > **Force Quit**, select the app, and confirm. Windows: `taskkill /pid <PID> /f`. | Forces the end | Unsaved work in that app is lost |
| 4 | **The whole machine is frozen.** Mac: restart from the Apple menu; if that fails, hold the power button for up to 10 seconds. | Apple's own order of steps | Restart, and reopen apps |
| 5 | **Find out why.** Does it freeze every time? | A pattern points at the app, a full disk, or too many startup items | Update or reinstall the app, check disk space, review startup items |

> TODO(source): Task Manager's End task button and its location, and what to do when a Windows PC is fully frozen, from a Microsoft page. Only the command-line route (`taskkill`) is sourced above.

Finder is a special case: Apple's Force Quit page says that for Finder the button reads **Relaunch**.

## Symptom: it will not start

First confirm the basics: the charger or power cable is connected and the outlet works. Then find out how far it gets.

| Stage | What you see | Likely meaning | Do this |
| --- | --- | --- | --- |
| 0 | Nothing happens at all | No power reaching the machine | Try another outlet or charger. If it is still dead, this page cannot help; see the hardware section of your manufacturer's manual |
| 1 | Windows fails to start normally, or drops to a recovery screen | Windows cannot start normally | Use the recovery environment (below) |
| 2 | A prompt asking for a **48-digit BitLocker recovery key** (Windows) | BitLocker could not unlock the drive automatically | Find the key at `account.microsoft.com/devices/recoverykey` (personal) or `aka.ms/aadrecoverykey` (work or school). Microsoft Support cannot recover a lost key |
| 3 | It starts but freezes at sign-in, or fails after an update | A recent change | Boot to safe mode and remove the change |
| 4 | Apple silicon Mac will not boot | Start macOS Recovery | Shut down, hold the power button until startup options appear, then **Options > Continue** |
| 5 | Intel Mac will not boot | Start macOS Recovery | Hold `Command-R` at power-on |

**Windows:** reach the recovery environment by interrupting the boot three times in a row, or from a recovery drive or installation media. Inside it, try the tools in this order, smallest first:

1. **Startup Repair.**
2. **Uninstall Updates**, if it began after an update.
3. **System Restore**, if it began after installing something; it does not touch personal files.
4. **Startup Settings > Restart**, then press `4` or `F4` for Safe Mode (or `5` or `F5` for Safe Mode with Networking). To leave safe mode, restart. If it keeps returning to Safe Mode, run `msconfig`, open the **Boot** tab, and clear **Safe boot**.
5. **Reset this PC**, choosing **Keep my files** first. This reinstalls Windows and is the biggest step; know your BitLocker key before you begin.

**Mac:** in macOS Recovery, the utilities are Restore from Time Machine, Reinstall macOS, Disk Utility, and Terminal. To try safe mode: on Apple silicon, shut down, hold the power button until "Loading startup options" appears, select a volume, hold `Shift`, and click **Continue in Safe Mode**; on Intel, hold `Shift` at startup. You will see "Safe Boot" in the menu bar, and you can confirm it in **About This Mac > System Report > Software > Boot Mode**. For a disk suspected of errors, run **First Aid** in Disk Utility from Recovery (choose **View > Show All Devices**, and repair from the bottom up: volumes, then the container, then the device).

:::caution[Before you Reset, Reinstall, or Erase]
Those steps rebuild the system. Confirm you have a backup and, on Windows, your BitLocker key. If you are not sure what a screen will do, stop and read [Backups, restore points, and recovery](/windows-macos/concepts/backups-and-recovery/).
:::

### When system files are damaged

Microsoft's guidance on missing or corrupted system files is to run **DISM first**, then the System File Checker, both from an elevated Command Prompt (search for `cmd`, right-click **Command Prompt**, choose **Run as administrator**):

```
DISM.exe /Online /Cleanup-image /Restorehealth
sfc /scannow
```

Do not close the window until the scan reaches 100 percent. `sfc` ends with one of four messages:

| Message | What it means |
| --- | --- |
| "Windows Resource Protection did not find any integrity violations." | Nothing corrupt was found |
| "Windows Resource Protection could not perform the requested operation." | Run the scan again in safe mode |
| "Windows Resource Protection found corrupt files and successfully repaired them." | Fixed |
| "Windows Resource Protection found corrupt files but was unable to fix some of them." | Manual intervention needed; see Microsoft's page |

> TODO(test): neither `DISM` nor `sfc /scannow` was run, because both need an elevated session and change system files.

## Symptom: no internet

Think of a phone call. Is the phone on? Is there a dial tone? Does the number ring? Test each link from your device outward, and the first one that fails is your problem.

| Rung | Test | Windows | macOS | If it fails |
| --- | --- | --- | --- | --- |
| 1 | **Is this device connected to the network?** | Network icon on the taskbar shows **Connected**; **Settings > Network & Internet > Airplane mode** is off | Check the Wi-Fi connection first (Apple's first step) | Turn airplane mode off; reconnect; on Windows, **Settings > Network & internet > Wi-Fi > Manage known networks**, select the network, **Forget**, then reconnect with the password |
| 2 | **Do other devices work?** | Try another laptop or phone on the same network | Same | If all fail, the fault is the router, modem, or provider. Unplug the modem and router, wait at least 30 seconds, plug the modem in first, then the router |
| 3 | **Does this device have an address and a gateway?** | `ipconfig`; look for the **IPv4 Address** and **Default Gateway** in the adapter block | `ifconfig`, or `networksetup -getinfo "<service name>"` | No address: on Windows, in an elevated Command Prompt run `ipconfig /release`, then `ipconfig /renew`. On a Mac, restart it and check the router |
| 4 | **Can it reach the router?** | `ping <Default Gateway address>` | `ping -c 4 <gateway address>` | Router or Wi-Fi problem. Try connecting on the other frequency band (2.4 GHz or 5 GHz) |
| 5 | **Do names resolve?** | Pings by address work but names do not: in an elevated Command Prompt run `ipconfig /flushdns` | `networksetup -getdnsservers "<service name>"` shows the DNS servers in use | If flushing does not help, check your DNS settings. Changing them on a Mac needs administrator rights and is a settings change, so note the old value first |
| 6 | **Can it reach a specific site or port?** | PowerShell: `Test-NetConnection -ComputerName <name> -Port <port>`; look at `PingSucceeded` and `TcpTestSucceeded` | `ping -c 4 <host>` | If the ping works and the port test fails, something is blocking that port (firewall, VPN, or the site) |

If the ladder does not find it, Microsoft's Wi-Fi page continues with these steps, in order. The commands need an elevated Command Prompt: `netsh winsock reset`, `netsh int ip reset`, `ipconfig /release`, `ipconfig /renew`, `ipconfig /flushdns`. Then uninstall the network adapter driver in Device Manager (tick **Attempt to remove the driver**, then restart), turn off the adapter's power-saving option (**Device Manager > Network adapters > adapter Properties > Power Management**, clear **Allow the computer to turn off this device**), check for Windows updates, and restart. The last resort on Windows 11 is **Settings > Network & internet > Advanced network settings > Network reset > Reset now**. Microsoft warns that network reset may require you to reinstall networking software such as VPN clients or Hyper-V virtual switches, and that it may set each known network to a public profile.

Apple's Wi-Fi page runs in this order: check the Wi-Fi connection, restart the Mac, check the date and time, update macOS, check any VPN or security software, check the router, use **Wi-Fi Recommendations** and **Wireless Diagnostics** (Option-click the Wi-Fi icon in the menu bar), and try another network or contact your internet provider.

> TODO(test): the `netsh`, `ipconfig /release`, `/renew`, `/flushdns`, and network-reset steps change settings and were not run. `ipconfig` and `Test-NetConnection` were not run against the network from this machine.
>
> TODO(test): the macOS `ifconfig`, `networksetup`, and `ping` commands were not run.

## Choosing when to stop and rebuild

| Situation | Keep diagnosing | Rebuild instead |
| --- | --- | --- |
| A single problem with a clear pattern | Yes; one of the tables above will find it | No |
| Several unrelated problems after one event | Try System Restore or uninstalling the update first | If those fail |
| Data you cannot replace is at risk | Back up before any further step | Only after a verified backup |

Why not rebuild first: a reset or reinstall costs your apps and settings, so it should be the last step, not the first.

## Common mistakes

- **Changing several things at once.** You lose the ability to say what worked or to undo one change.
- **Skipping the read-only look.** Task Manager, Activity Monitor, and `df -h` cost nothing.
- **Forgetting what changed.** An update yesterday is the most useful clue you have.
- **Running `sfc` without administrator rights.** Microsoft's instructions require an elevated Command Prompt.
- **Forcing a quit first.** Ask nicely, then force.
- **Starting a reset before finding your BitLocker key.** If you cannot unlock the drive, Microsoft's page says your only path is an option that removes all files.

## Where this shows up

- [5. Find what is using CPU, memory, disk, or a port](/windows-macos/walkthroughs/5-find-what-is-using-cpu-memory-disk-or-a-port/) is the practical version of the slow and frozen tables.
- [6. Reach recovery options](/windows-macos/walkthroughs/6-reach-recovery-options/) practices the start-up tables before you need them.
- [Processes, services, and startup items](/windows-macos/concepts/processes-services-and-startup/) explains the tools named in the tables.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
