---
title: "Storage, drives, and health"
description: "How hard drives and SSDs store data, how SATA, NVMe, and M.2 fit together, and what each operating system can and can't tell you about a drive's health."
domain: computers
pageType: explanation
level: 1
status: draft
safetyCritical: false
sources:
  - title: "How do HDDs and SSDs store data?"
    url: "https://www.seagate.com/blog/how-do-hdds-and-ssds-store-data/"
    publisher: "Seagate"
  - title: "SSD types explained: SATA, NVMe, M.2, U.2 and PCIe"
    url: "https://www.seagate.com/blog/ssd-types/"
    publisher: "Seagate"
  - title: "Internal SSD installation (FAQ)"
    url: "https://semiconductor.samsung.com/consumer-storage/support/faqs/internalssd-installation/"
    publisher: "Samsung Semiconductor"
  - title: "Initialize new disks"
    url: "https://learn.microsoft.com/en-us/windows-server/storage/disk-management/initialize-new-disks"
    publisher: "Microsoft Learn"
  - title: "What to do about a critical warning for a storage device"
    url: "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/what-to-do-about-a-critical-warning-for-a-storage-device"
    publisher: "Microsoft Support"
  - title: "Get-PhysicalDisk"
    url: "https://learn.microsoft.com/en-us/powershell/module/storage/get-physicaldisk?view=windowsserver2025-ps"
    publisher: "Microsoft Learn"
  - title: "Get-StorageReliabilityCounter"
    url: "https://learn.microsoft.com/en-us/powershell/module/storage/get-storagereliabilitycounter?view=windowsserver2025-ps"
    publisher: "Microsoft Learn"
  - title: "Get-Disk"
    url: "https://learn.microsoft.com/en-us/powershell/module/storage/get-disk?view=windowsserver2025-ps"
    publisher: "Microsoft Learn"
  - title: "Troubleshoot blue screen errors"
    url: "https://support.microsoft.com/en-us/windows/troubleshoot-blue-screen-errors-5c62726c-6489-52da-a372-3f73142c14ad"
    publisher: "Microsoft Support"
  - title: "Repair a storage device in Disk Utility on Mac"
    url: "https://support.apple.com/en-us/102611"
    publisher: "Apple Support"
  - title: "smartctl(8): control and monitor utility for SMART disks"
    url: "https://manpages.debian.org/testing/smartmontools/smartctl.8.en.html"
    publisher: "Debian manpages (smartmontools 7.5)"
  - title: "lsblk(8)"
    url: "https://man7.org/linux/man-pages/man8/lsblk.8.html"
    publisher: "man7.org (Linux man-pages)"
  - title: "Back up business data (3-2-1 rule)"
    url: "https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data"
    publisher: "CISA"
tags: [computers, storage, ssd, hdd, nvme, sata, m2, smart, health, backups]
sidebar:
  order: 53
---

## The one-line version

Storage is where a computer keeps things when the power is off. Two different technologies do it (spinning magnetic disks and flash memory), and two different "languages" connect them to the computer (SATA and NVMe). **Health** is what the drive itself, and the operating system, can tell you about how close it is to failing. Analogy: a shipping container has a size (the **form factor**, such as M.2), travels on a road (the **interface**), and carries paperwork in a particular language (the **protocol**, SATA or NVMe). Two containers of the same size can use different roads and different paperwork, so "M.2" alone doesn't tell you which one you have.

## How it works

### Hard drives and SSDs

| | Hard disk drive (HDD) | Solid-state drive (SSD) |
| --- | --- | --- |
| How it stores data | Magnetizes tiny regions on spinning platters; a read/write head on a voice-coil arm finds the tracks (Seagate) | Traps electrons in floating-gate transistors in NAND flash cells; the presence or absence of electrons stores a 0 or 1 (Seagate) |
| Moving parts | Yes: platters and heads | None |
| Speed | Slower mechanical access | Quicker retrieval, all electronic |
| Physical shock | Vulnerable | More resilient |
| How it fails | Mechanical wear over time | Gradual cell degradation |
| Cell types | n/a | SLC, MLC, TLC, QLC store 1 to 4 bits per cell |

### SATA, NVMe, and M.2: three different questions

Seagate separates three ideas that people often mix up:

- **Form factor** is the shape and size of the hardware (for example, M.2, or a 2.5-inch drive).
- **Interface** is how the parts physically connect.
- **Protocol** governs how the motherboard reads and interacts with the drive.

**SATA SSDs** use the same protocol as traditional hard drives. It's well-known and widely used, but Seagate notes that the protocol can't make full use of how fast SSDs can be. **NVMe** is a newer protocol designed for SSDs; it moves data over several parallel PCIe lanes for faster speeds and lower latency. **M.2** is only a form factor, and an M.2 drive can be either SATA or NVMe. The **key** (the notches in the gold contacts) tells you which:

| M.2 key | Compatible with | Notes |
| --- | --- | --- |
| **M** | PCIe / NVMe | Samsung's M-key NVMe drives can't fit a B-key slot |
| **B** | SATA | |
| **B+M** | Both | Two notches in the contacts |

Sizes use a four-digit code: M.2 2280 is 22 mm wide and 80 mm long (Seagate, Samsung). The socket also has to physically be able to hold the length, and where the mounting screw goes depends on the length: your motherboard manual shows the positions.

### Partition style and formatting

A brand-new drive has to be **initialized** and **formatted** before Windows will show it as a place to store files. Microsoft's Disk Management guide says to choose a partition style when you initialize, that **GPT** is the default, and that initializing a disk erases its contents, so never do it to a disk that holds data you want. The style matters for boot: Windows's startup table pairs BIOS-based computers with MBR boot code and UEFI-based computers with an EFI boot manager ([Firmware and the boot sequence](/computers/concepts/firmware-and-the-boot-sequence/)).

### What "health" means

A drive's electronics keep counts of their own trouble: errors, temperature, hours powered on, and (for SSDs) how much of the flash's rated lifespan is used and how much spare capacity is left. Tools translate this into a verdict. Every tool reads the same source, but each hides some of it and none can promise the future.

| Tool | Drives it covers | What it shows | Limits |
| --- | --- | --- | --- |
| Windows **Settings** > System > Storage > Advanced storage settings > Disks & volumes > Properties | **NVMe SSDs only.** Microsoft says Windows monitors NVM SSDs, not SATA SSDs or HDDs. | Estimated remaining life, Available spare, Temperature; warns about low spare capacity, degraded reliability, or read-only mode | Blind to SATA SSDs and HDDs |
| `Get-PhysicalDisk` (PowerShell) | Drives Windows sees as physical disks | `HealthStatus`: Healthy, Warning, Unhealthy, or Unknown; `OperationalStatus` | A coarse verdict |
| `Get-StorageReliabilityCounter` | Same | Temperature, wear, read and write error counts, power-on hours | Needs an elevated PowerShell (see below) |
| macOS **Disk Utility > First Aid** | Storage devices Disk Utility lists | Finds and repairs errors in the formatting and directory structure | A structure check, not a wear report |
| `smartctl` (Linux, smartmontools) | Most SATA and NVMe drives | Overall health, full SMART attributes, self-tests | Needs the smartmontools package; may need elevated privileges |

On the Windows machine read for this guide (2026-09-26), `Get-PhysicalDisk` worked in a normal PowerShell window and `Get-StorageReliabilityCounter` failed with a permission error there, so the second needs "Run as administrator."

> TODO(test): run `Get-PhysicalDisk | Get-StorageReliabilityCounter` in an elevated PowerShell and record which properties a typical NVMe drive fills in. The docs' own example shows blank values for properties a device doesn't report.

> TODO(source): how macOS shows SMART status for internal drives in the current macOS version. The Apple pages read cover First Aid only.

**How to read `smartctl -H`.** The smartctl manual says a failing health status means the device has *already failed* or is *predicting its own failure within the next 24 hours*. That is a narrow claim: a pass means the drive isn't reporting that state at this moment; it doesn't mean the drive is healthy, and it doesn't mean your data is safe.

## Choosing between options

### Which drive for which job

| Type | Use it when | Avoid it when |
| --- | --- | --- |
| HDD | You need large, cost-efficient storage for archives and backups (Seagate: over 90% of cloud data uses HDDs) | The drive is the one Windows runs from, or it gets moved around (vulnerable to physical shock) |
| SATA SSD | The machine has a SATA port but no M.2 socket, or you need the drive to survive movement | You need the top speeds the SATA protocol can't deliver |
| NVMe SSD (M.2 or PCIe) | The board has a matching **M-key** NVMe socket and you want the best speed and responsiveness | The socket only supports SATA M.2 (a B-key socket), or you're not sure; check the manual first |

**Recommendation:** use an SSD for the drive the operating system lives on, NVMe if the board has an M-key NVMe socket, because retrieval is quicker, it has no moving parts, and the NVMe protocol was built for it. Use an HDD only for bulk or archive storage where cost per stored gigabyte matters more than speed. The alternatives lose for the system drive because mechanical access is slower and shock-prone (HDD) or is limited by an older protocol (SATA).

### What to do with a warning

| You see | Meaning | Do this |
| --- | --- | --- |
| Windows "critical warning" | Spare capacity below the maker's threshold, degraded reliability, or read-only mode | Back up your data first, then contact support (Microsoft's two recommendations) |
| `HealthStatus` of Warning or Unhealthy | The drive reports a problem | Back up now, then follow the maker's guidance |
| First Aid "found errors it can't repair" | The structure is damaged beyond repair | Back up if you still can. Apple says erasing the disk is an option after that. |
| `smartctl -H` says failing | Failed or predicted to fail within 24 hours (smartctl manual) | Copy your data off immediately |

## Common mistakes

| Mistake | Why it costs you | Instead |
| --- | --- | --- |
| Assuming "M.2" means "NVMe" | M.2 is a form factor; the key tells you SATA or PCIe/NVMe | Read the key and the label (Seagate) |
| Buying a drive for a socket you haven't checked | An M-key drive won't fit a B-key slot | Confirm the socket in the manual first (Samsung) |
| Trusting Settings' drive health for every drive | It monitors NVMe SSDs only | Use `Get-PhysicalDisk` or `smartctl` for the rest |
| Reading "Healthy" as "safe" | A verdict is not a backup | Follow 3-2-1: three copies, two kinds of media, one off-site (CISA) |
| Filling the system drive | Microsoft advises keeping 10-15% of the drive free for system functions | Free space with Storage Sense |
| Initializing a drive that has data on it | Initializing erases the contents (Microsoft) | Only initialize new or empty disks |
| Using the drive `InterfaceType` for identification | On the machine read for this guide, NVMe drives reported "SCSI" in a legacy property | Use `BusType` from `Get-PhysicalDisk` or `Get-Disk` |

## Where this shows up

- [Install an M.2 SSD](/computers/walkthroughs/4-install-an-m2-ssd/) applies the key and socket rules.
- [Check drive health](/computers/walkthroughs/6-check-drive-health/) walks the health tools above on each operating system.
- [Diagnose from symptoms](/computers/concepts/diagnose-from-symptoms/) has a "drive errors" table.
- [Identify your components](/computers/walkthroughs/1-identify-your-components/) shows how to read your own drive's type and bus.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). Read 2026-09-26. Microsoft's storage cmdlet pages are versioned for Windows Server 2025 and dated 2016-12-20 for the article text; behavior was checked on Windows 11 Pro. The InterfaceType observation comes from running Get-CimInstance Win32_DiskDrive on that machine and is not from a fetched page. -->
