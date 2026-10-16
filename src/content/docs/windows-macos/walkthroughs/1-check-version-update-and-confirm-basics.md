---
title: "1. Check your version, update, and confirm the basics"
description: "Find out which version of Windows or macOS you are running, install the available updates safely, and confirm the firewall is on and file extensions are visible."
domain: windows-macos
pageType: walkthrough
level: 1
difficulty: easy
status: draft
safetyCritical: false
time: "30-45 minutes (estimate; longer if a large update downloads)"
tools: ["A Windows 11 PC or a Mac", "An administrator account and its password", "A power connection, if it is a laptop", "A text file or notebook for a short log"]
parts: []
sources:
  - title: "Find information about your Windows device"
    url: "https://support.microsoft.com/en-us/windows/which-version-of-windows-operating-system-am-i-running-628bec99-476a-2c13-5296-9dd081cdd808"
    publisher: "Microsoft Support"
  - title: "Install Windows Updates"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/install-windows-updates"
    publisher: "Microsoft Support"
  - title: "Tips to improve PC performance in Windows"
    url: "https://support.microsoft.com/en-us/windows/experience/performance-optimization/tips-to-improve-pc-performance-in-windows"
    publisher: "Microsoft Support"
  - title: "Troubleshoot problems updating Windows"
    url: "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/troubleshoot-problems-updating-windows"
    publisher: "Microsoft Support"
  - title: "Recovery options in Windows"
    url: "https://support.microsoft.com/en-us/windows/recovery-options-in-windows-31ce2444-7de3-818c-d626-e3b5a3024da5"
    publisher: "Microsoft Support"
  - title: "Firewall and network protection in the Windows Security app"
    url: "https://support.microsoft.com/en-us/windows/security/windows-security/firewall-and-network-protection-in-the-windows-security-app"
    publisher: "Microsoft Support"
  - title: "Turn Microsoft Defender Firewall on or off"
    url: "https://support.microsoft.com/en-za/help/4028544/windows-10-turn-windows-defender-firewall-on-or-off"
    publisher: "Microsoft Support"
  - title: "File Explorer in Windows"
    url: "https://support.microsoft.com/en-us/windows/experience/fileexplorer/file-explorer-in-windows"
    publisher: "Microsoft Support"
  - title: "Update macOS on Mac"
    url: "https://support.apple.com/en-us/108382"
    publisher: "Apple Support"
  - title: "Change firewall settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-firewall-settings-on-mac-mh11783/14.0/mac/14.0"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Show or hide filename extensions on Mac"
    url: "https://support.apple.com/guide/mac-help/mchlp2304/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "sw_vers(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/sw_vers.1.html"
    publisher: "keith.github.io xcode-man-pages"
tags: [windows, macos, updates, firewall, setup, beginner]
sidebar:
  order: 100
---

:::caution[Not yet run end to end]
Steps follow Microsoft's and Apple's documentation as read on 2026-09-26. Menu labels move between releases; if one does not match, follow the linked source. Lines marked "to test" have not been checked on a real machine.
:::

## Before you start

- **Sign in as an administrator.** Installing updates needs one. On a Mac the update asks for an administrator's password.
- **Plug in a laptop** and keep it connected until the update finishes.
- **Have enough free space.** Microsoft's update troubleshooting page lists 20 GB free for a 64-bit installation among its checks. If you are short, see the disk-full table in [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/).
- **Back up first if the machine holds anything you cannot replace.** Apple's update page recommends backing up before you update. If you have no backup yet, do [3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/) first and come back here.
- **Save and close your open work.** An update can restart the machine.

## Steps

### A. Find out what you are running

Do the block for your system and write the result in your log.

**On Windows**

1. Right-click **Start** and choose **Settings**.
2. Select **System**, then **About**. The shortcut `ms-settings:about` opens the same page.
3. Under **Windows specifications**, note the **Edition**, **Version**, and **OS build**. You should see all three listed.

**On macOS**

1. Choose the **Apple menu**, then **About This Mac**.
2. Note the macOS version shown.
3. Optionally, open Terminal and run `sw_vers`. It prints `ProductName`, `ProductVersion`, and `BuildVersion`.

> TODO(test): confirm what About This Mac shows on the current macOS, and run `sw_vers` on a real Mac.

Why: every guide, driver page, and forum answer depends on the version. Without the number you cannot tell which advice applies.

### B. Install updates

**On Windows**

1. Select **Start > Settings > Windows Update**.
2. Choose **Check for Windows updates**. Wait while Windows looks.
3. If updates appear, choose **Download & install**.
4. When Windows asks you to restart, do it: **Start > Power > Restart**. You should see the machine come back to the sign-in screen.
5. Return to **Windows Update** and check again. Repeat until it lists nothing left to install.
6. Open **Advanced options > Optional updates**. Read what is offered before you install any of it.

**On macOS**

1. Open **System Settings > General > Software Update**.
2. If an update is listed, follow the prompts to install it. Enter your administrator password when asked.
3. Let the Mac restart if it needs to, and return to **Software Update** to check again.

> TODO(test): the exact wording and buttons on the Windows Update and Software Update screens, and what Windows shows when it is fully up to date.

Why the repeat check: an update can unlock the next update, so one pass is often not the last.

### C. Confirm the firewall is on

A firewall decides which incoming network connections your machine accepts.

**On Windows**

1. Open the **Windows Security** app and select **Firewall & network protection**. The shortcut `windowsdefender://network/` opens it directly.
2. You will see three network profiles: **Domain network** (workplace), **Private network** (trusted, such as home), and **Public network** (untrusted, such as a cafe). Select each in turn.
3. Under **Microsoft Defender Firewall**, confirm the setting is **On**. If it is Off, toggle it to **On**.

Do not turn the firewall off to make an app work. Microsoft's advice is to allow the app through the firewall instead.

**On macOS**

1. Open **System Settings > Network > Firewall**.
2. Read the options Apple lists: **Block all incoming connections**, **Automatically allow built-in software**, **Automatically allow downloaded signed software**, **Enable stealth mode**, and a list of apps you can add or remove.

> TODO(test): how to switch the Mac firewall on and off, and whether it is on by default on a fresh install. Apple's page names the settings but the on/off toggle was not recorded.

### D. Make file names honest

1. **Windows:** in File Explorer, open the **View** menu, choose **Show**, and select **File name extensions**. You should now see `.pdf` or `.txt` on the end of every file name. Optionally, select **Hidden items** too.
2. **macOS:** in Finder, choose **Finder > Settings**, click **Advanced**, and turn on **Show all filename extensions**.

Why: a file called `invoice.pdf.exe` shows as `invoice.pdf` when extensions are hidden. Seeing the real ending is a cheap defense, and you need it when the next walkthroughs ask you to check what a file is.

### E. Write it down

In your log note today's date, the version before and after, the updates installed, and anything odd. It takes a minute, and if something breaks later, "what changed?" is the first question you will need to answer. See [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/).

## Check it worked

1. The **About** page (Windows) or **About This Mac** shows the same or a newer version or build than in step A.
2. **Windows Update** or **Software Update** reports nothing left to install (wording may differ; see the test note above).
3. The Windows firewall shows **On** for each profile you checked.
4. File names in File Explorer or Finder now show their extensions.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Windows Update fails or stalls | A general update problem | Follow Microsoft's order: run **Settings > System > Troubleshoot > Other troubleshooters > Windows Update > Run**; confirm you are connected and plugged in; confirm your account is an administrator; free disk space; then run Windows Update again and restart |
| Windows still fails to update | Files or components in a bad state | See the DISM and `sfc /scannow` section in [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/) |
| The Mac asks for a password you do not have | You are signed in as a standard user | Ask an administrator, or sign in as one. See [2. Manage accounts and admin rights](/windows-macos/walkthroughs/2-manage-accounts-and-admin-rights/) |
| The machine misbehaves after an update | The update itself | Windows: Microsoft's recovery options page lists uninstalling an update and going back to the previous version (available for 10 days). See [Backups, restore points, and recovery](/windows-macos/concepts/backups-and-recovery/). Mac: restore from Time Machine if you have a backup |
| The Windows firewall setting is missing or cannot be changed | Another program or a work policy is managing it | TODO(source): what Windows Security shows when the firewall is managed by another product or by policy |
| A Mac update will not download or install | Unknown from the sources read | TODO(source): Apple's troubleshooting steps for a failed macOS update |

## Next

[2. Manage accounts and admin rights](/windows-macos/walkthroughs/2-manage-accounts-and-admin-rights/). You will keep the administrator account you just used for changes, and start working from a standard one.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
