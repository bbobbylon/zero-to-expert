---
title: "Windows & macOS"
description: "Using Windows and macOS from first setup to power-user and admin work, with a cheat sheet of common, uncommon, and rare commands for each."
domain: windows-macos
pageType: overview
status: draft
safetyCritical: false
sources: []
tags: [windows, macos, operating-systems, admin, troubleshooting]
sidebar:
  label: Overview
  order: 0
---

Using Windows and macOS from first setup to power-user and admin work, with a cheat sheet of common, uncommon, and rare commands for each.

This guide is for anyone who uses a Windows PC or a Mac every day and wants to stop guessing: to know what an admin prompt is really asking, where the data lives, what to check first when the machine is slow, and how to get back to a working system when something breaks. You need no background. Every job is written for both systems side by side, so you can learn the one you own and read across to the other.

## How the guide is laid out

- **Levels** teach one stage at a time, from names and vocabulary up to internals.
- **Concepts** explain why things work the way they do: files and paths, accounts and admin rights, processes and startup items, backups and recovery. One concept page is a symptom-first debugging guide with decision tables.
- **Walkthroughs** are single jobs from start to finish, each with a "Check it worked" step and a troubleshooting table.
- The **cheat sheet** lists commands and shortcuts for both systems by how often you need them.

Where a step needs the command line, the guide says which system it is for and flags anything that has not been run on a real machine with a visible "to test" note. Read those notes as "not checked yet".

## Roadmap

| Level | Name | You can... |
| --- | --- | --- |
| 0 | Orientation | Name the parts of each system (accounts, file system, processes, startup items, updates, recovery), find version and settings, open a command line, and sort any action into safe, settings-changing, or data-losing. |
| 1 | Beginner | Update a machine safely, keep a standard account for daily use and an administrator account for changes, back up and test a restore, install and remove apps with a package manager, find what is using CPU, memory, disk, or a network port, and reach recovery options before you need them. |
| 2 | Intermediate | Automate routine work in PowerShell and in the Mac shell, manage startup items and services, read system logs, manage disks and encryption, and fix common problems from symptoms without a walkthrough. |
| 3 | Advanced | Diagnose slow, unstable, or unbootable machines from symptoms, script maintenance, configure networking, firewall, and permissions by hand, and keep several machines consistent. |
| 4 | Expert | Do professional-grade administration: baseline hardening, deployment and imaging, encryption and recovery-key custody, and recovery planning for a whole household or office. |
| 5 | Mastery | Explain how each system boots, schedules work, manages memory, and lays out its file system, and read low-level traces and crash output to find root causes. |

Only levels 0 and 1 are written so far. Each level page links to its walkthroughs.

**Start here:** [Level 0: Orientation](/windows-macos/levels/0-orientation/).

See [how these guides work](/about/how-guides-work/) for what the levels, tiers, and page statuses mean.
