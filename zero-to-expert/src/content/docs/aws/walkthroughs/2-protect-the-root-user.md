---
title: "2. Protect the root user"
description: "Two MFA devices, no access keys, alternate contacts, and a safe place to keep root credentials."
domain: aws
pageType: walkthrough
level: 0
difficulty: easy
status: draft
time: "20-30 minutes (estimate)"
tools: ["Root sign-in", "A passkey or FIDO security key (preferred) and/or an authenticator app", "A password manager"]
sources:
  - title: "Enable a virtual MFA device for the root user (console)"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-virt-mfa-for-root.html"
    publisher: "AWS IAM User Guide"
  - title: "AWS Multi-factor authentication in IAM"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
    publisher: "AWS IAM User Guide"
  - title: "Root user best practices for your AWS account"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html"
    publisher: "AWS IAM User Guide"
  - title: "Security best practices in IAM"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
    publisher: "AWS IAM User Guide"
  - title: "Getting set up with Billing (alternate contacts)"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html"
    publisher: "AWS Billing User Guide"
tags: [aws, root, mfa, security]
sidebar:
  order: 120
---

:::caution[Not yet run end to end]
Steps follow AWS's documentation as of September 2026. If a label doesn't match, follow the linked source.
:::

## Why this comes second

The root user can do anything, including closing the account, and IAM policies can't restrict it. Right now it's protected by a password alone. MFA means a stolen password isn't enough. See [Identities, credentials, and MFA](/aws/concepts/identities-and-credentials/) for the background.

## Steps

### A. Register your first MFA device

1. Sign in as the root user.
2. On the right of the navigation bar, choose your **account name**, then **Security credentials**.
3. In **Multi-factor authentication (MFA)**, choose **Assign MFA device**.
4. Type a **device name** you'll recognize later, like `root-yubikey` or `root-phone`.
5. Pick the device type:
   - **Passkey or security key** (preferred; phishing-resistant): follow the browser prompts to register it.

     > TODO(test): record the passkey/security key screens.
   - **Authenticator app**: choose **Authenticator app**, then **Next**.
     1. In your authenticator app, add a new account.
     2. In the AWS wizard, choose **Show QR code** and scan it with the app. (If you can't scan, choose **Show secret key** and type it into the app.)
     3. Type the code the app shows into **MFA code 1**. Wait for the app to show the next code (up to 30 seconds), and type that into **MFA code 2**.
     4. Choose **Add MFA** straight away. If you wait too long after generating the codes, the device registers but ends up out of sync.
6. The device appears in the MFA list.

:::tip[Back up the secret]
AWS notes the QR code and secret key are tied to your account and can be reused to set up a replacement device if you lose the original. If you back them up, store the backup like a password.
:::

### B. Register a second device

Repeat part A with a different device, for example a security key plus a phone app. The root user can hold up to eight. Store the backup somewhere physically separate from the first.

### C. Confirm there are no root access keys

Still on **Security credentials**, check the **Access keys** section is empty. If a key exists, delete it. Root access keys would give any script unrestricted, permanent access to the whole account; nothing you'll build needs them.

### D. Add alternate contacts

Alternate contacts let AWS reach someone besides the root email about specific issues. AWS contacts each type for:

| Contact | When AWS uses it |
| --- | --- |
| **Billing** | Invoices are ready or the payment method needs updating (also gets PDF invoices if enabled in billing preferences) |
| **Operations** | A service is or will be unavailable in one or more Regions |
| **Security** | Security issues, or possible abuse or fraud on your account |

For a personal account, your everyday email is a reasonable security and operations contact, so a warning doesn't sit unread in the root inbox. Don't put sensitive details in the name fields; they may appear in email subjects.

> TODO(test): record the console path to Alternate contacts (account settings page).

### E. Store root credentials properly

- Password in a password manager, in its own entry.
- Note where each MFA device is kept.
- Sign out of root when you finish the next two walkthroughs, and don't sign back in for everyday work.

## Check it worked

1. Sign out and sign back in as root. You're asked for MFA after the password.
2. **Security credentials** lists two MFA devices and no access keys.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Codes rejected, or device "out of sync" | Codes submitted too late, or the phone's clock is off | Set the phone to automatic time; resync the device (see "AWS Multi-factor authentication in IAM") |
| Lost every MFA device | — | Follow AWS's "Recovering a root user MFA device" procedure; if that fails, you have to contact AWS customer service to remove MFA protection. TODO(source): add the direct link. |

## Next

[3. Set up billing guardrails](/aws/walkthroughs/3-set-up-billing-guardrails/). Stay signed in as root: the first step there requires it.
