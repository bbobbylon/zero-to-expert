---
title: "Accounts, admin rights, and permissions"
description: "What standard and administrator accounts are, how Windows UAC and macOS sudo let you approve one powerful action at a time, and which account to use for what."
domain: windows-macos
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "How User Account Control works"
    url: "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works"
    publisher: "Microsoft Learn"
  - title: "Manage User Accounts in Windows"
    url: "https://support.microsoft.com/en-us/windows/create-a-local-user-or-administrator-account-in-windows-20de74e0-ac7f-3502-a866-32915af2a34d"
    publisher: "Microsoft Support"
  - title: "Get-LocalUser"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.localaccounts/get-localuser"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "whoami"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/whoami"
    publisher: "Microsoft Learn"
  - title: "winget install command"
    url: "https://learn.microsoft.com/en-us/windows/package-manager/winget/install"
    publisher: "Microsoft Learn"
  - title: "Add a user or group on Mac"
    url: "https://support.apple.com/guide/mac-help/add-a-user-or-group-mchl3e281fc9/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Enter administrator commands in Terminal"
    url: "https://support.apple.com/guide/terminal/enter-administrator-commands-apd5b0b6259-a7d4-4435-947d-0dff528912ba/mac"
    publisher: "Apple Support (Terminal User Guide)"
  - title: "Enable or disable the root user on Mac"
    url: "https://support.apple.com/en-us/102367"
    publisher: "Apple Support"
  - title: "Safely open apps on your Mac"
    url: "https://support.apple.com/en-us/102445"
    publisher: "Apple Support"
  - title: "Homebrew FAQ"
    url: "https://docs.brew.sh/FAQ"
    publisher: "Homebrew (third party, not Apple)"
tags: [windows, macos, accounts, admin, uac, sudo, permissions, security]
sidebar:
  order: 51
---

## The one-line version

Every action on a computer is done by some account, and permissions belong to the account. A **standard** account can run apps and change its own settings; an **administrator** account can also change the system for everyone. Both systems let an administrator approve a single powerful action without holding that power all the time.

Think of a hotel. A guest key opens your room; the master key opens every door. Nobody carries the master key around all day. Instead, when the maid needs a locked store cupboard, the front desk hands over the master key for that one door and takes it back. On Windows the front desk is the elevation prompt. On a Mac it is the administrator password prompt, or `sudo` in Terminal.

## How it works

### Windows: two tokens and a prompt

When an administrator signs in, Windows creates two **access tokens**: a standard one and an administrator one. The desktop (`Explorer.exe`) and everything you start normally run on the standard token. The administrator token is held back until you approve an **elevation prompt** for a specific program. Microsoft's User Account Control (UAC) documentation, read on 2026-09-26, describes it this way, and adds that Microsoft recommends the account you use every day be a standard user.

```
Sign in as an administrator
        |
        +--> standard token ------> Explorer.exe and everything you start normally
        |
        +--> administrator token -> held back; used only by a program you approve at a prompt
```

You can see the split. In a normal (non-elevated) PowerShell window on an administrator account, `whoami /groups` still lists `BUILTIN\Administrators`, but marked "Group used for deny only", next to `Mandatory Label\Medium Mandatory Level`. On the Windows 11 Pro machine used to check this guide, that is what appeared on 2026-09-26. The group is present but switched off until you elevate.

> TODO(source): Microsoft's `whoami` page documents the `/groups` switch but not the "deny only" wording; link the page that explains it.

There are two kinds of prompt, and which one you get says which account you are:

| Prompt | Who sees it | What you do |
| --- | --- | --- |
| **Consent prompt** (Admin Approval Mode) | An administrator | Click to approve |
| **Credential prompt** | A standard user | Type an administrator's name and password |

The credential prompt is why a standard daily account is safer: a click is not enough, because someone has to know an administrator password. By default the prompt appears on the **secure desktop**, which dims the screen. A **shield icon** on a button or link marks a task that needs the administrator token.

Read the prompt before you approve it. Microsoft's page describes the first two colors below; the last row is this guide's rule of thumb.

| What you see | What it means | What to do |
| --- | --- | --- |
| Gray prompt | The program is from Windows or a verified publisher | Approve only if you just did something that should need it |
| Yellow prompt | The program is not signed | Stop unless you started it on purpose and trust where it came from |
| A prompt you did not cause | Something you did not start asked for admin rights | Say no |

Accounts on Windows can be **local** (stored on this PC) or connected to a **Microsoft account**. `Get-LocalUser` lists the local ones, including built-in accounts, accounts you created, and local accounts connected to Microsoft accounts. Microsoft's account-management page also offers "Add a user without a Microsoft account" when you add someone, and advises limiting the number of administrators.

### macOS: account types, sudo, and root

Apple's account types are **Administrator**, **Standard**, and **Sharing Only**. The first account created when you set up a Mac is an administrator, so the account you set up with is the powerful one. Apple says not to set up automatic login for an administrator.

In Terminal, `sudo` runs one command with administrator rights. Apple's Terminal guide states that only administrators can use it, that it asks for the current user's password, and gives `sudo shutdown` as its example. Do not type that example to try it out: it shuts the Mac down.

There is also a **root user**, the all-powerful Unix account. Apple says it is disabled by default and that `sudo` is the safer approach. If you ever enable it, Apple's instructions run through Directory Utility's **Edit > Enable Root User**, and you should disable it again as soon as the task is done.

Two mechanisms are easy to confuse. **Accounts and `sudo`** decide what *you* may do. **Gatekeeper** decides which *apps* may run: it allows apps from the App Store, or from the App Store plus identified developers, and Apple has required notarization by default since macOS Catalina. A blocked app can be opened anyway from **System Settings > Privacy & Security > Open Anyway**, with Apple's warning that unsigned software is a risk.

## Choosing between options

| Setup | Use it when | Avoid it when |
| --- | --- | --- |
| **Standard account for daily work, separate administrator account for changes** | Always the default. This is what Microsoft recommends. A mistake, or a bad program you run by accident, starts with limited rights, and changing the system means typing an administrator's credentials. | Rarely; the only cost is typing credentials for system changes |
| **Administrator account used daily** | A single-user machine where you accept the extra risk | Any machine that others use, or where you browse the web and open downloads. The administrator token is one prompt away for every program. |
| **Automatic login for an administrator (Mac)** | Never | Always. Apple says not to. |
| **Enabling root (Mac)** | Almost never | Almost always. `sudo` gives one command at a time, and root stays on until you turn it off. |

Why the recommended setup wins: it costs a few extra password entries, and in return every program you run starts with the smallest set of rights that gets the job done. The alternatives spend that safety margin for convenience.

## Common mistakes

- **Approving prompts on autopilot.** A prompt you did not trigger, or a yellow one, is a stop sign.
- **Removing the only administrator.** Before you demote or delete an administrator account, confirm that another administrator account signs in.
- **Deleting an account together with its data.** In Windows, an account is removed through **Account and data**; read the confirmation screen, because removing an account can remove its files too. Back up first.
- **Elevating a whole console for one command.** winget's documentation notes that some installers ask for elevation and advises care in an administrator console. Start ordinary, and let the one command that needs it prompt.
- **Using `sudo` with Homebrew.** Homebrew's FAQ says not to. It is a different job from `sudo` in the rest of Terminal.
- **Sharing one administrator login.** Every action then looks like one person's.

## Where this shows up

- [2. Manage accounts and admin rights](/windows-macos/walkthroughs/2-manage-accounts-and-admin-rights/) walks through setting up a standard daily account.
- [4. Install and remove apps with a package manager](/windows-macos/walkthroughs/4-install-and-remove-apps-with-a-package-manager/) shows where an install triggers a prompt.
- [Level 0: Orientation](/windows-macos/levels/0-orientation/) introduces the vocabulary.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
