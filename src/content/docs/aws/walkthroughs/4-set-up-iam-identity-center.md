---
title: "4. Set up IAM Identity Center"
description: "Create your everyday sign-in: enable Identity Center with AWS Organizations, make an Admins group and a user, assign AdministratorAccess and PowerUserAccess, and retire the root user."
domain: aws
pageType: walkthrough
level: 0
difficulty: easy
status: draft
time: "30-45 minutes (estimate)"
tools: ["Root sign-in with MFA", "A second email address you can open now (for your admin user)", "A passkey, security key, or authenticator app for the new user"]
sources:
  - title: "Enable IAM Identity Center"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/enable-identity-center.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Account instances of IAM Identity Center"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/account-instances-identity-center.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Quick start: Setting up IAM Identity Center"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/awsapps-identity-center-quick-start.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Configure user access with the default IAM Identity Center directory"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/quick-start-default-idc.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Assign user or group access to AWS accounts"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Manage AWS accounts with permission sets"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Configuring IAM Identity Center authentication with the AWS CLI (PowerUserAccess recommendation)"
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html"
    publisher: "AWS CLI User Guide"
  - title: "AWS Free Tier FAQs (Organizations and credit activities)"
    url: "https://aws.amazon.com/free/free-tier-faqs/"
    publisher: "AWS"
tags: [aws, iam, identity-center, organizations, permission-sets]
sidebar:
  order: 140
---

:::caution[Not yet run end to end]
Steps follow AWS's documentation as of September 2026. If a label doesn't match, follow the linked source.
:::

:::danger[Before you start: credits]
This walkthrough creates an AWS Organization. Per the Free Tier FAQ, remaining Explore AWS credit activities expire when an account joins an organization. If you want those credits, finish them first (walkthrough 3, part E).
:::

## What you'll end up with

- An **Admins** group containing your user.
- Two permission sets on your account: **AdministratorAccess** (for setup and rare admin work) and **PowerUserAccess** (for everyday development).
- A bookmarked **AWS access portal** you sign in to instead of root.

Background: [Identities, credentials, and MFA](/aws/concepts/identities-and-credentials/).

## Why "with AWS Organizations"

A standalone account can create either instance type, and the choice matters:

| | Organization instance | Account instance |
| --- | --- | --- |
| Gives users sign-in access to **AWS accounts** (console, CLI) | Yes, via permission sets | No |
| Gives users access to **applications** | Yes | Yes, within that one account |
| Requires | An AWS Organizations management account | Nothing extra |
| Use it for | This walkthrough | Isolated app deployments |

The whole point here is account access, so you need the organization instance. Enabling it from a standalone account sets up an organization with your account as the management account.

## Steps

### A. Pick your working Region

1. Signed in as root, use the **Region selector** (top right) to choose the Region you'll normally work in, usually the one closest to you.
2. Remember it: Identity Center is enabled in the Region you're in, and later you'll give that Region to the CLI as the "SSO region".

### B. Enable IAM Identity Center

1. Open the **IAM Identity Center** console.
2. Choose **Enable**.
3. Choose to enable it **with AWS Organizations** (an organization instance). Don't choose the account-instance option.
4. Wait for the dashboard to load. Note the **AWS access portal URL** it shows; you'll bookmark it later.

> TODO(test): record the exact wording of the Enable screen and where the portal URL appears on a fresh account.

### C. Create a group

Assigning access to groups instead of individual users means adding someone later is one click, not a whole assignment.

1. In the Identity Center navigation pane, choose **Groups**, then create a group named `Admins`.

> TODO(test): record the create-group screen labels.

### D. Create your user

1. Choose **Users**, then add a user.
2. Username: something like `bobby`. Enter your name and the **admin email address** (one you can open now; it can differ from the root email).
3. Add the user to the **Admins** group.
4. Finish. Identity Center emails the user an invitation.

> TODO(test): record the add-user screen labels and the password-setup option.

### E. Assign AdministratorAccess to the group

1. In the navigation pane, under **Multi-account permissions**, choose **AWS accounts**.
2. Select the checkbox for your **management account** (your account), then choose **Assign users or groups**.
3. **Step 1, Select users and groups:** choose the **Admins** group. Choose **Next**.
4. **Step 2, Select permission sets:** choose **Create permission set**. A new tab opens:
   1. Select permission set type: **Predefined permission set**, then **AdministratorAccess**. Choose **Next**.
   2. Specify details: keep the defaults. Choose **Next**.
   3. Review and choose **Create**.
5. Back on the assignment tab, refresh the permission set list, select **AdministratorAccess**, and choose **Next**.
6. **Step 3, Review and submit:** check the group and permission set, then choose **Submit**. Assignment can take a few minutes.

What happened underneath: Identity Center created an IAM role in your account with the AdministratorAccess policy attached. When your user picks AdministratorAccess in the portal, they assume that role and get temporary credentials.

### F. Add PowerUserAccess for everyday work

AWS recommends not working as an administrator day to day. After creating the admin permission set, create a more restrictive one and assign it too; their developer example is **PowerUserAccess**, and the AWS CLI guide recommends it for SDK and CLI work.

1. Repeat part E, but in Step 2 create a predefined **PowerUserAccess** permission set and select it.
2. The Admins group now has both permission sets on your account.

> TODO(source): link AWS's description of exactly what PowerUserAccess allows and denies (it notably excludes most IAM management).

### G. Activate the user

1. **Sign out of the console** (you're still root).
2. In the admin email inbox, open the message titled **Invitation to join AWS IAM Identity Center** and choose **Accept invitation**.
3. Set a password (use your password manager).
4. Sign in, then **register an MFA device** for this user when prompted.
5. The **AWS access portal** opens.

### H. Sign in through the portal

1. In the portal, expand your account. You'll see **AdministratorAccess** and **PowerUserAccess**.
2. Choose **PowerUserAccess**. You land in the console as a role session.
3. **Bookmark the portal URL.** This is your front door from now on.

### I. Retire root

Root's jobs for this account are done. Store its credentials as described in walkthrough 2 and don't use them for daily work. Come back to root only for the tasks on the root-only list.

## Check it worked

| Check | Expected |
| --- | --- |
| Portal shows your account | Two options: AdministratorAccess and PowerUserAccess |
| Console as PowerUserAccess | Services work; the account menu shows a role session, not root (TODO(test): record exact display) |
| Console as AdministratorAccess | Billing → Budgets opens (it only works because you activated IAM billing access in walkthrough 3) |

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No **AWS accounts** item under Multi-account permissions | You created an account instance | Account access needs an organization instance; see "Enable IAM Identity Center" |
| Billing console says access denied | IAM billing access not activated | Do walkthrough 3 part A as root. If it still fails under PowerUserAccess, switch to AdministratorAccess. TODO(test): confirm whether PowerUserAccess can open Billing. |
| No invitation email | Spam filter or a typo in the user's email | Check spam and the user's details. TODO(source): how to resend an invitation |
| Portal shows no accounts | Assignment still provisioning, or it's on the wrong group/user | Wait a few minutes; re-check part E |

## Next

[5. Install the AWS CLI](/aws/walkthroughs/5-install-the-aws-cli/)
