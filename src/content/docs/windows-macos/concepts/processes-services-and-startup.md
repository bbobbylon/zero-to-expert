---
title: "Processes, services, and startup items"
description: "What is running on your computer, what starts by itself, which tool shows each on Windows and macOS, and how to stop something gently before forcing it."
domain: windows-macos
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Get-Process"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "Get-Service"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "tasklist"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tasklist"
    publisher: "Microsoft Learn"
  - title: "taskkill"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill"
    publisher: "Microsoft Learn"
  - title: "Configure Startup applications in Windows"
    url: "https://support.microsoft.com/en-us/windows/configure-startup-applications-in-windows-115a420a-0bff-4a6f-90e0-1934c844e473"
    publisher: "Microsoft Support"
  - title: "Tips to improve PC performance in Windows"
    url: "https://support.microsoft.com/en-us/windows/experience/performance-optimization/tips-to-improve-pc-performance-in-windows"
    publisher: "Microsoft Support"
  - title: "View information about processes in Activity Monitor on Mac"
    url: "https://support.apple.com/guide/activity-monitor/view-information-about-processes-actmntr1001/mac"
    publisher: "Apple Support (Activity Monitor User Guide)"
  - title: "Change Login Items & Extensions settings on Mac"
    url: "https://support.apple.com/guide/mac-help/change-login-items-extensions-settings-mtusr003/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Force an app to quit on Mac"
    url: "https://support.apple.com/en-us/102586"
    publisher: "Apple Support"
  - title: "top(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/top.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "ps(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/ps.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "kill(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/kill.1.html"
    publisher: "keith.github.io xcode-man-pages"
  - title: "killall(1) man page (third-party rendering of Apple's man page; supporting source)"
    url: "https://keith.github.io/xcode-man-pages/killall.1.html"
    publisher: "keith.github.io xcode-man-pages"
tags: [windows, macos, processes, services, startup, task-manager, activity-monitor]
sidebar:
  order: 52
---

## The one-line version

A **process** is one running copy of a program. A **service** is a process that works in the background with no window. A **startup item** is a program set to launch when you sign in. Slow, hot, or crowded machines are almost always one process using too much, or too many startup items launching together.

Picture a restaurant. The cooks working orders right now are processes. The dishwashers and the extraction fans that run whether or not anyone looks at them are services. The staff who unlock the kitchen each morning and light the ovens are startup items: everything they start is already using the kitchen before the first customer arrives.

## How it works

### Processes

Every process has a number, its **process ID** (PID). Other tools use the PID to name a process: `taskkill /pid`, `Get-Process -Id`, and `kill` on a Mac all take it. Two processes can share a name, so the PID is how you point at the exact one.

| | Windows | macOS |
| --- | --- | --- |
| Graphical tool | Task Manager (`Ctrl+Shift+Esc`), with Processes, Performance, and Startup apps tabs | Activity Monitor, with CPU, Memory, Disk, and Network tabs |
| Show every process | Task Manager > Processes; `Get-Process`; `tasklist` | Activity Monitor: **View > All Processes**; `ps -ax`; `top` |
| Filter | The `Where-Object` filter: `Get-Process \| Where-Object WorkingSet -GT 20MB` lists processes over 20 MB of working set | The search field in Activity Monitor |

`Get-Process` prints these columns by default: `NPM(K)`, `PM(M)`, `WS(M)`, `CPU(s)`, `Id` (the PID), `SI`, and `ProcessName`. Microsoft's own example filters on `WorkingSet`, which is the `WS` column: the memory a process currently holds. Some options need an elevated session to see processes you do not own: `-IncludeUserName`, `-Module`, and `-FileVersionInfo`.

On a Mac, `top -o cpu` sorts by CPU and `top -o mem` by memory; `q` quits. `ps -A -o pid,%cpu,%mem,comm` prints PID, CPU percentage, memory percentage, and command name for every process. Add `-r` to sort by CPU or `-m` to sort by memory.

> TODO(test): run `top`, `ps`, and the Activity Monitor steps on a real Mac; none has been run for this guide.

### Services

Windows keeps a list of services you can read with `Get-Service`. Each one has a `Status` of `Running` or `Stopped`. To list only the running ones, Microsoft's own example is:

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"}
```

A service can depend on others: `Get-Service -Name <name> -RequiredServices` shows what it needs, and `-DependentServices` shows what needs it. On the Windows 11 Pro machine used to check this guide, `Get-Service` listed 342 services, 141 of them running, on 2026-09-26. Your numbers will differ.

Services are hosted inside processes, and one process can host several. `tasklist /svc` shows that mapping: its columns are `Image Name`, `PID`, and `Services`.

> TODO(source): how to list and manage background services on macOS from an Apple source. Apple's Login Items & Extensions page covers user-visible background items (below) but not the full service list.

### Startup items

| | Windows | macOS |
| --- | --- | --- |
| Where to look | **Settings > Apps > Startup**, or Task Manager > **Startup apps** tab | **System Settings > General > Login Items & Extensions** |
| What you can do | Turn an app on or off. Task Manager shows a startup impact rating: None, Not measured, Low, Medium, or High | **Open at Login**: add or remove an app. **App Background Activity** (**Allow in the Background**) controls items that run without a window |
| Folder method | The `shell:startup` folder (this user) and `shell:common startup` (all users) | TODO(source) |

> TODO(test): confirm how to open the `shell:startup` folder on Windows 11 (the Startup apps page names the location but the launch method was not recorded).

Microsoft's performance tips include disabling startup apps: `Ctrl+Shift+Esc`, then **Startup apps**, then right-click an app and choose **Disable**. Turn off what you do not use: disabling is reversible, uninstalling is not.

### Stopping something: gently first

Ending a process has two strengths. Think of a restaurant manager: "please finish and leave" versus security walking someone out with no time to pack. The first lets the program save its work and clean up; the second does not.

| | Ask it to finish | Force it |
| --- | --- | --- |
| Windows | `taskkill /pid <PID>` | `taskkill /pid <PID> /f` (`/f` forces the end); `/t` also ends child processes |
| Mac, command line | `kill <PID>` sends TERM (signal 15) by default; `killall <name>` sends TERM by default | `kill -9 <PID>`: signal 9 is KILL, which the program cannot catch or refuse |
| Mac, graphical | Quit from the app's menu | **Force Quit**: `Option-Command-Esc`, or Apple menu > Force Quit. In Finder the button reads **Relaunch** |

If Force Quit fails, Apple's steps are to restart from the Apple menu, and if that fails, to hold the power button for up to 10 seconds.

> TODO(source): Task Manager's own **End task** button and where it lives, from a Microsoft page (the Task Manager help page was not found; only community forum threads mention it).

## Choosing between options

| Action | What it does | Use it when | Avoid it when |
| --- | --- | --- | --- |
| **End a process** | Stops it now; it returns if something restarts it | A program is hung and asking it to close did nothing | You do not know what the process is. Look it up first with `Get-Process -Id <PID>` or `tasklist /svc` |
| **Disable a startup item** | Stops the launch at sign-in; the app stays installed | An app you rarely use slows sign-in | It is security software or a backup or sync tool you rely on |
| **Uninstall** | Removes the program | You will not use it again | You only wanted it quiet; disabling is reversible |

Why gentle-first wins: a program asked to close can save its work and release its files. A forced end skips that, so anything unsaved is lost and a half-written file can be left behind. Force is for what refuses to listen.

## Common mistakes

- **Reaching for `/f` or `kill -9` first.** That skips saving and cleanup. Try the gentle version, wait a few seconds, then force.
- **Ending a process you do not recognize.** Look it up first. Two processes can have the same name, so match the PID.
- **Treating a service and a process as the same thing.** One process can host several services, so ending it stops all of them. `tasklist /svc` shows which.
- **Disabling a security or backup tool's startup entry.** It will stay quiet, and so will its protection.
- **Reading "High" startup impact as proof of guilt.** It is a rating of startup cost, not a verdict on whether you need the app.

## Where this shows up

- [5. Find what is using CPU, memory, disk, or a port](/windows-macos/walkthroughs/5-find-what-is-using-cpu-memory-disk-or-a-port/) puts these tools to work.
- [Diagnose from symptoms](/windows-macos/concepts/diagnose-from-symptoms/) uses them when a machine is slow or an app is frozen.
- [Level 0: Orientation](/windows-macos/levels/0-orientation/) introduces the vocabulary.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
