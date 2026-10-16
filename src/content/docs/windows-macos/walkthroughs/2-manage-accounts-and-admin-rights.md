---
title: "2. Manage accounts and admin rights"
description: "Add a second administrator account, confirm it works, then switch your everyday account to standard so a mistake or a bad program cannot change the whole system."
domain: windows-macos
pageType: walkthrough
level: 1
difficulty: moderate
status: draft
safetyCritical: false
time: "30-40 minutes (estimate)"
tools: ["A Windows 11 PC or a Mac", "The administrator account you use now", "A password manager or a sealed note for the new administrator password"]
parts: []
sources:
  - title: "Manage User Accounts in Windows"
    url: "https://support.microsoft.com/en-us/windows/create-a-local-user-or-administrator-account-in-windows-20de74e0-ac7f-3502-a866-32915af2a34d"
    publisher: "Microsoft Support"
  - title: "How User Account Control works"
    url: "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/how-it-works"
    publisher: "Microsoft Learn"
  - title: "Get-LocalUser"
    url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.localaccounts/get-localuser"
    publisher: "Microsoft Learn (PowerShell)"
  - title: "whoami"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/whoami"
    publisher: "Microsoft Learn"
  - title: "Starting Windows PowerShell"
    url: "https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/starting-windows-powershell"
    publisher: "Microsoft Learn"
  - title: "Add a user or group on Mac"
    url: "https://support.apple.com/guide/mac-help/add-a-user-or-group-mchl3e281fc9/mac"
    publisher: "Apple Support (macOS User Guide)"
  - title: "Enter administrator commands in Terminal"
    url: "https://support.apple.com/guide/terminal/enter-administrator-commands-apd5b0b6259-a7d4-4435-947d-0dff528912ba/mac"
    publisher: "Apple Support (Terminal User Guide)"
  - title: "Open or quit Terminal on Mac"
    url: "https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac"
    publisher: "Apple Support (Terminal User Guide)"
tags: [windows, macos, accounts, admin, uac, standard-user, beginner]
sidebar:
  order: 101
---

:::caution[Not yet run end to end]
Steps follow Microsoft's and Apple's documentation as read on 2026-09-26; no account was created or changed while writing this page. Lines marked "to test" have not been checked on a real machine. Read the order of steps before you start: changing your own account to standard before the second administrator works can leave you unable to change the system.
:::

## Before you start

Read [Accounts, admin rights, and permissions](/windows-macos/concepts/accounts-admin-and-permissions/) first if you have not. In short: a standard account can run apps and change its own settings; an administrator can change the system for everyone. Microsoft recommends that the account you use daily be a standard user, and it advises limiting the number of administrators.

The plan has four moves, and the order matters:

1. Add a **second administrator** account. This will be the "master key".
2. **Sign in to it** and confirm it works.
3. From it, change your **everyday account** to standard.
4. Sign back in to your everyday account and use it normally.

You need:

- Your current administrator account (this is the one you will demote).
- A name and a strong password for the new administrator, saved in a password manager before you begin.
- About 30 minutes.

:::caution[Do not delete anything in this walkthrough]
Removing an account can remove its files, and this job never needs it. If a screen offers to delete an account or its data, stop. Have a backup before you touch accounts: [3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/).
:::

## Steps

### A. Windows

1. **See what you have.** Open PowerShell (Start menu, type **Windows PowerShell**, select it, then **Open**) and run `Get-LocalUser`. You should see a table with `Name`, `Enabled`, and `Description`, including built-in accounts as well as yours. Note your account name. You do not need administrator rights to run this.
2. **See your current rights.** Run `whoami /groups`. In a normal window on an administrator account, you should see `BUILTIN\Administrators` marked "Group used for deny only", next to `Mandatory Label\Medium Mandatory Level`. That is your filtered token: the group is present but switched off until you approve an elevation prompt.
3. **Open the accounts page.** Go to **Start > Settings > Accounts** and find the **Other user** section.
4. **Add the new account.** Choose **Add account**. When Windows asks for a Microsoft account sign-in, choose **Add a user without a Microsoft account** to create a local account. Type the user name and password you prepared. Why local: an administrator account you use only for changes does not need cloud sign-in.
5. **Make it an administrator.** Select the new account, open the account options, choose **Change account type**, and pick **Administrator**. You should see the account listed as an administrator.
6. **Sign in to the new account.** Sign out of your current account and sign in as the new one. Windows will set up a fresh profile the first time, which takes a minute.
7. **Confirm it is an administrator.** Open PowerShell as this account and run `whoami /groups`. You should see a `BUILTIN\Administrators` line in the list, as in step 2.
8. **Demote your everyday account.** Still signed in as the new administrator, go to **Start > Settings > Accounts > Other user**, select your everyday account, choose **Change account type**, and pick **Standard User**.
9. **Sign out and back in to your everyday account.** It keeps all its files and settings; only its rights changed.

> TODO(test): the exact Windows 11 wording of each Accounts screen (Other user, Add account, Add a user without a Microsoft account, Change account type), how to sign out and in, what `whoami /groups` shows for the new administrator, and whether an account type change needs a sign-out to take effect.

### B. macOS

1. **See what you have.** Open **System Settings > Users & Groups**. Apple's account types are **Administrator**, **Standard**, and **Sharing Only**. The first account created when you set up the Mac is an administrator, so yours probably is.
2. **Add the new account.** In **Users & Groups**, add a user, choose **Administrator** as the account type, and fill in the name, account name, and password you prepared.
3. **Sign in to the new account.** Log out of your current account and log in as the new one.
4. **Confirm it works.** Open **System Settings > Users & Groups**. The new account should be listed as an administrator.
5. **Demote your everyday account.** Still signed in as the new administrator, open **Users & Groups**, click the **Info** button (i) next to your everyday account, and turn off **Allow user to administer this computer**. You may be asked to authenticate.
6. **Log out and back in to your everyday account.**

> TODO(test): the exact macOS labels for adding a user and the account type dropdown, the Log Out steps, how the new account is listed in Users & Groups, and whether an authentication prompt appears when demoting.

### C. Both systems

1. **Save the administrator password** in your password manager, in an entry that names the machine. Do not use the new administrator for browsing or email.
2. **Use the administrator only for changes.** When you need it, either sign in to it, or approve a prompt from your everyday account by typing the administrator's name and password.

## Check it worked

**On Windows**

1. In your everyday account, run `Get-LocalUser`. Both accounts appear and are `Enabled`.
2. Run `whoami /groups`. `BUILTIN\Administrators` should no longer appear in the list.
3. Do something that needs an administrator, such as installing a program in [4. Install and remove apps with a package manager](/windows-macos/walkthroughs/4-install-and-remove-apps-with-a-package-manager/). Windows should show a **credential prompt** asking for an administrator's name and password, instead of a click-to-approve **consent prompt**. That difference is the sign that you are now a standard user.

**On macOS**

1. In your everyday account, open **System Settings > Users & Groups**. Your account should no longer be listed as an administrator.
2. Try a change that needs an administrator; you should be asked for an administrator's name and password.
3. In Terminal, `sudo` will be refused for your standard account. Apple's guide says only administrators can use it.

> TODO(test): confirm on real machines that `whoami /groups` drops `BUILTIN\Administrators` for a standard account, that the credential prompt appears, and how a refused `sudo` reads on macOS.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| **Change account type** is missing or disabled | You are signed in as a standard user | Sign in as an administrator and try again |
| The new account will not sign in | A typo in the password, or the account was not created as you intended | Recreate it from an administrator account, and copy the password from your password manager |
| You demoted your everyday account and cannot approve anything | The second administrator was never confirmed | Sign in to the second administrator account; if it will not sign in, TODO(source): Microsoft's or Apple's steps to regain administrator access |
| A credential prompt asks for a password you do not have | You are a standard user and only the administrator knows it | Use the administrator account. This is the design working |
| Files seem to be missing after switching accounts | You are signed in to the new account, which has its own empty folders | Sign back in to your everyday account; your files never moved |
| A prompt appeared that you did not trigger | Something you did not start asked for administrator rights | Say no. Look at the program name and its color (gray means Windows or a verified publisher; yellow means unsigned) before you approve anything |

## Next

[3. Set up a backup and test a restore](/windows-macos/walkthroughs/3-set-up-a-backup-and-test-a-restore/). Accounts protect your system from mistakes; backups protect your files when the machine fails.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
