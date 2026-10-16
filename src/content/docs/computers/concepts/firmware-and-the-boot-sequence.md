---
title: "Firmware and the boot sequence"
description: "What happens between pressing the power button and seeing your desktop: firmware, the power-on self-test, UEFI versus BIOS, Secure Boot, and how to tell where startup stopped."
domain: computers
pageType: explanation
level: 1
status: draft
safetyCritical: false
sources:
  - title: "Windows startup issues troubleshooting"
    url: "https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/windows-boot-issues-troubleshooting"
    publisher: "Microsoft Learn"
  - title: "UEFI firmware requirements"
    url: "https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-uefi"
    publisher: "Microsoft Learn"
  - title: "Secure boot"
    url: "https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-secure-boot"
    publisher: "Microsoft Learn"
  - title: "Windows 11 and Secure Boot"
    url: "https://support.microsoft.com/en-us/windows/security/devicesecurity/windows-11-and-secure-boot"
    publisher: "Microsoft Support"
  - title: "Windows Recovery Environment (Windows RE)"
    url: "https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment"
    publisher: "Microsoft Support"
  - title: "shutdown"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown"
    publisher: "Microsoft Learn"
  - title: "Z790-C user manual (example motherboard manual)"
    url: "https://download.asrock.com/Manual/Z790-C.pdf"
    publisher: "ASRock"
  - title: "Resolve no power, no POST, no boot, or no video issues with your Dell computer"
    url: "https://www.dell.com/support/kbdoc/en-us/000125609/resolve-no-power-no-post-no-boot-or-no-video-issues-with-your-dell-computer"
    publisher: "Dell Support"
  - title: "Internal SSD installation (FAQ)"
    url: "https://semiconductor.samsung.com/consumer-storage/support/faqs/internalssd-installation/"
    publisher: "Samsung Semiconductor"
tags: [computers, firmware, uefi, bios, post, secure-boot, boot, cmos]
sidebar:
  order: 52
---

## The one-line version

**Firmware** is software stored on the motherboard that runs before any operating system. It wakes the hardware, tests it (the **power-on self-test**, or POST), finds a disk to start from, and hands control to the operating system. Analogy: the opening routine at a shop. The caretaker unlocks the door, turns on the lights, and checks the till and the fridge (POST). Only then does the manager (the operating system) walk in. If the caretaker finds a fault, the shop doesn't open, and *how* they tell you about it (lights, beeps, a note on the door) depends on the shop, so you look up that shop's rules.

## How it works

Microsoft divides a Windows startup into four phases and says to start any startup diagnosis by finding out which phase the computer got stuck in.

```
power on
   |
   v
1. PreBoot: firmware runs POST and loads firmware settings.
   Ends when the firmware finds a valid system disk.
   |
   v
2. Windows Boot Manager: finds the Windows loader on the boot partition.
   |
   v
3. Windows OS Loader: loads the drivers the kernel needs, starts the kernel.
   |
   v
4. Windows NT kernel: loads the registry and boot-start drivers,
   then hands over to the session manager (Smss.exe), which starts
   the remaining devices and drivers.
```

| Phase | BIOS-based computer | UEFI-based computer |
| --- | --- | --- |
| 1. PreBoot | Master boot record (MBR) or boot sector code | UEFI firmware |
| 2. Boot Manager | `bootmgr` in the system drive | `\EFI\Microsoft\Boot\bootmgfw.efi` |
| 3. OS Loader | `winload.exe` | `winload.efi` |
| 4. Kernel | `ntoskrnl.exe` | `ntoskrnl.exe` |

> TODO(source): the equivalent startup phases for macOS and Linux. Everything on this page about phases comes from Microsoft's Windows documentation, read 2026-09-26.

### Where did it stop?

Microsoft's article gives observable clues for each phase. It is written for support agents and IT professionals, so treat the repair methods it lists as advanced; the *clues* are for everyone.

| Where it stopped | What you see | What it means |
| --- | --- | --- |
| Phase 1 (firmware) | Disconnect external peripherals first. The hard-drive light doesn't work, or the NumLock key's light doesn't toggle when you press it. | Startup is stuck in the BIOS phase. Microsoft says there might be a hardware issue. |
| Phase 2 to 3 (boot loader) | A black screen with a blinking cursor, or a message such as "Boot Configuration Data (BCD) missing or corrupted," "Boot file or MBR corrupted," "Operating system missing," "Boot sector missing or corrupted," "Bootmgr missing or corrupted," or "Unable to boot due to system hive missing or corrupted." | The boot loader can't find or read what it needs. Startup Repair from the Windows Recovery Environment is the first tool Microsoft lists. |
| Phase 4 (kernel) | A stop error after the Windows logo splash, a code such as "inaccessible boot device," a "spinning wheel" that never ends, or a black screen after the splash. | Windows started but a driver or system component failed. Microsoft's first suggestions are Safe Mode and Event Viewer. |

The three-line habit this gives you: **note what you saw last, note which lights were on, and decide which phase it reached.** The [diagnosis page](/computers/concepts/diagnose-from-symptoms/) turns that into ordered checks.

## POST: how the machine tells you it failed

POST is the firmware's self-test, part of phase 1. When it fails, the computer has no operating system to print a message, so each maker signals in its own way:

| Signal | Where its meaning comes from | Example |
| --- | --- | --- |
| Beep pattern | The beep-code table in your computer or board manual | Dell says to consult the User Manual for beep-code tables |
| Diagnostic LED or LED pattern | The LED-code table in the manual | Dell lists model-specific LED guides |
| Onboard status lights | The board manual's diagnostics section | ASRock's Post Status Checker (PSC) shows a red light for a dysfunctional CPU, memory (DRAM), graphics (VGA), or storage (BOOT), and the lights go out when all four are working normally |
| Text on the screen | The message itself, plus the manual | Dell describes the computer stopping at the Dell logo or a black screen with text |

**Do not memorize beep codes from a general guide.** They differ by firmware and by maker. Write down what you hear and see, then look it up in the manual for your exact model.

## UEFI and BIOS

**UEFI** (Unified Extensible Firmware Interface) is the modern replacement for the older **BIOS** firmware interface. Microsoft lists these benefits of UEFI:

- It supports security features such as Secure Boot.
- It gives faster boot and resume times.
- It more easily supports large drives (more than 2 terabytes) and drives with more than four partitions.

Windows's Advanced startup menu labels the entry point **UEFI Firmware Settings**. Some machines can run in a legacy mode, often labeled **Legacy BIOS** or **CSM**; Microsoft's Secure Boot guidance says that to use Secure Boot you switch from Legacy BIOS (CSM) mode to UEFI, with manufacturer-specific steps.

| | UEFI | Legacy BIOS (CSM) |
| --- | --- | --- |
| Windows starts from | An EFI boot manager file | The MBR and a `bootmgr` file |
| Secure Boot | Supported | Not available; Microsoft says to switch to UEFI first |
| Large drives | Microsoft says UEFI supports drives over 2 TB, and more than four partitions, more easily | Harder to support, by the same comparison |
| Use it when | The computer and OS support it, as Microsoft's Windows 11 guidance assumes | Only when a specific older install or device needs it; check the maker's guidance |

**Which to pick:** UEFI, because it's the mode current Windows expects and it unlocks Secure Boot. Switching modes on a computer that already has an operating system installed is a change to plan, because the installed OS was set up for one mode; write down the starting state first.

## Secure Boot

Secure Boot is a standard, developed by the PC industry, that helps make sure the computer starts only software its maker trusts. As it starts, the firmware checks the digital signature of each piece of boot software (UEFI drivers, EFI applications, the operating system) and boots only if the signatures are valid. Four stored lists do the work. Analogy: a nightclub's door policy.

| List | What it is | Analogy |
| --- | --- | --- |
| **db** (signature database) | Signers or hashes of boot software allowed to run | The guest list |
| **dbx** (revoked signatures) | Items that are no longer trusted. If something is on both lists, the revoked list wins. | The banned list |
| **KEK** (Key Enrollment Key database) | Keys allowed to *update* the lists above | The people allowed to edit the lists |
| **PK** (platform key) | Signs updates to the KEK, or turns Secure Boot off | The owner's master key |

**Dated notice (read 2026-09-26).** Microsoft's Secure Boot page (last updated 2026-03-10) says that the Secure Boot certificates originally issued in 2011 begin expiring in June 2026, and that supported Windows versions receive updates automatically. The page points to Microsoft's guidance (linked from that page) for the steps to take in advance. This guide doesn't walk you through the certificate update.

> TODO(source): how to check on Windows, macOS, and Linux whether Secure Boot is on and whether a device has the updated certificates. The Microsoft pages read for this guide don't give a way to check.

Microsoft also notes that turning Secure Boot off may sometimes be needed to troubleshoot, and that you should turn it back on afterward.

## Getting into firmware settings

The setup screen is where boot order, Secure Boot, and hardware settings live. You reach it in one of these ways.

| Route | How | Notes |
| --- | --- | --- |
| From Windows | Settings > System > Recovery > Advanced startup > **Restart now**, then Troubleshoot > Advanced options > **UEFI Firmware Settings** | Microsoft's path for Windows 11, read 2026-09-26. Works while Windows still starts. |
| From a command | `shutdown /r /fw /t 0` | Microsoft: `/fw` combined with a shutdown option makes the next restart go to the firmware interface. `/t` is the time-out in seconds with a default of 30, and a time-out above 0 implies `/f`, which closes applications without warning. Save your work first. |
| From Windows RE | The Windows Recovery Environment's Advanced startup menu lists **UEFI Firmware Settings** | Useful when Windows won't start; Windows RE starts automatically after repeated failed starts. |
| At power-on | Press the maker's setup key while the logo appears | The key is model-specific; the screen or the manual for your model tells you. Dell's support article says pressing F12 at the Dell logo opens its boot menu. |

> TODO(test): `shutdown /r /fw /t 0` was not run for this guide, because it restarts the computer.

> TODO(source): the setup key for a given board or laptop is in that model's manual; this guide doesn't list one.

## Resetting firmware settings (clear CMOS)

The board keeps its setup values (system password, date and time, boot settings) in CMOS memory. Clearing CMOS returns them to defaults. The method is **board-specific**, and the two manuals read for this guide differ:

| Maker | Method | Time |
| --- | --- | --- |
| ASRock (Z790-C manual) | Turn off and unplug. Use a jumper cap to short the pins on the CLRMOS1 jumper. Remove the cap afterward. If you've just updated the firmware, boot up and shut down first. | 3 seconds |
| Dell | Disconnect external power, open the cover, move the jumper plug to the RTCRST pins, then return it, replace the cover, and reconnect power. Dell says AC power must be applied for about 10 seconds to clear CMOS. | About 5 seconds |

Dell warns that on most platforms, resetting CMOS also clears the Management Engine BIOS Extension (MEBx) settings including its password. The takeaway: use *your* manual, because the timings and steps differ, and don't do this while the computer is plugged in. It is listed in the [cheat sheet](/computers/cheat-sheet/) as a rare task and isn't part of the Level 1 walkthroughs.

## Choosing between options

| Setting | Change it when | Leave it alone when |
| --- | --- | --- |
| Boot order | You need to start from a USB installer or recovery drive | The computer already boots the right disk |
| UEFI versus Legacy/CSM | You are moving to Secure Boot (Microsoft) | The installed OS boots fine |
| Secure Boot | You must temporarily turn it off to troubleshoot; re-enable afterward (Microsoft) | Otherwise: leave it on |
| SATA mode (AHCI) | Samsung says to activate AHCI mode in firmware before installing the OS for an SSD; exact steps vary by board | The OS is already installed and working |

**Rule:** take a photo of every firmware screen before you change anything, change one setting at a time, and note what you changed. Firmware settings have no undo history. A photo is your undo.

## Common mistakes

| Mistake | Why it hurts | Instead |
| --- | --- | --- |
| Changing several settings at once | You can't tell which one broke or fixed things | One change, then test |
| Trusting a beep-code chart from a general site | Codes differ by firmware and maker | Use the manual for your model |
| Turning Secure Boot off and forgetting to turn it on again | Microsoft says to re-enable it afterward | Write it on your task list |
| Running boot-repair commands before finding the phase | Microsoft's method is to find the phase first | Use the clues table above |
| Clearing CMOS with the power still connected | Both manuals say to power off and unplug first (ASRock) or disconnect external power (Dell) | Unplug, then follow your manual |
| Skipping the 2011 certificate notice | Microsoft says the older certificates begin expiring in June 2026 | Keep Windows updated and read Microsoft's guidance linked from the Secure Boot page |

## Where this shows up

- [Diagnose from symptoms](/computers/concepts/diagnose-from-symptoms/) uses the phases and POST signals as its decision tree.
- [Install an M.2 SSD](/computers/walkthroughs/4-install-an-m2-ssd/) and [Install or reseat RAM](/computers/walkthroughs/3-install-or-reseat-ram/) point here for "does the firmware see the new part."
- [Level 1: Beginner](/computers/levels/1-beginner/) lists this page in the learning path.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). Read 2026-09-26. Phase table and clues: Microsoft Learn (article date 2026-02-12). Secure Boot: Microsoft Learn (article date 2026-03-10). Setup keys, beep codes, and jumper positions are model-specific and come from the model's manual. -->
