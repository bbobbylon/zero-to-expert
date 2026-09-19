---
title: "6. Sign in from the CLI with IAM Identity Center"
description: "Run aws configure sso, understand every line it writes to ~/.aws/config, log in, prove who you are, and log out."
domain: aws
pageType: walkthrough
level: 0
difficulty: moderate
status: draft
time: "15 minutes (estimate)"
tools: ["AWS CLI 2.22.0 or later (walkthrough 5)", "Your Identity Center user (walkthrough 4)", "A browser on the same machine"]
sources:
  - title: "Configuring IAM Identity Center authentication with the AWS CLI"
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html"
    publisher: "AWS CLI User Guide"
  - title: "AWS IAM Identity Center concepts for the AWS CLI"
    url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso-concepts.html"
    publisher: "AWS CLI User Guide"
  - title: "Sign up for AWS (advanced) — aws login"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/getting-started.html"
    publisher: "AWS Account Management Reference Guide"
tags: [aws, cli, sso, identity-center, profiles]
sidebar:
  order: 160
---

:::caution[Not yet run end to end]
Commands and prompts are from AWS's CLI guide as of September 2026 but haven't been run for this guide yet.
:::

## The idea

You never paste access keys into the CLI. Instead:

1. The CLI opens a browser, and you sign in to Identity Center (password + MFA) exactly like the portal.
2. The CLI caches a **session token** and uses it to fetch **temporary credentials** for the account and permission set you chose.
3. While the session is valid, the CLI renews those temporary credentials automatically.

Analogy: an OAuth login for a desktop app. You authenticate in the browser once; the app holds a refreshable token, never your password.

## Gather two values first

You need your **SSO start URL** and **SSO Region**:

1. Sign in to the AWS access portal.
2. Next to the permission set you'll use (**PowerUserAccess**), choose **Access keys**.
3. In the **Get credentials** dialog, pick your OS tab and choose the **IAM Identity Center credentials** method. It shows the SSO start URL and SSO Region.

The start URL usually looks like `https://<something>.awsapps.com/start`. The SSO Region is the Region where you enabled Identity Center in walkthrough 4.

Don't copy the short-term access keys that dialog also offers; the SSO setup replaces them.

## Steps

### A. Run the wizard

```bash
aws configure sso
```

Answer the prompts:

| Prompt | What to enter | Why |
| --- | --- | --- |
| `SSO session name (Recommended)` | A short name, e.g. `bobby-sso` | Creates a reusable, auto-refreshing session. Leaving it blank falls back to the legacy, non-refreshable setup. |
| `SSO start URL` | Your portal start URL | Where to sign in |
| `SSO region` | The Region hosting Identity Center | Where the sign-in service lives |
| `SSO registration scopes` | `sso:account:access` | Lets the CLI list your accounts and roles |

The CLI opens your browser. Sign in, approve the request (the approval page may mention `botocore`, the Python library the CLI is built on; that's expected), then return to the terminal.

Then:

| Prompt | What to enter |
| --- | --- |
| Account | Skipped automatically if you only have one |
| Role | Choose `PowerUserAccess` |
| `Default client Region` | Your working Region (where commands will act) |
| `CLI default output format` | `json` |
| `Profile name` | e.g. `lab` |

:::tip[Two different Regions]
**SSO region** is where Identity Center lives. **Default client Region** is where your commands create and list resources. They're often the same, but they answer different questions.
:::

### B. Read what it wrote

Open `~/.aws/config` (Windows: `%USERPROFILE%\.aws\config`). You'll see two sections like this:

```ini
[profile lab]
sso_session = bobby-sso
sso_account_id = 111122223333
sso_role_name = PowerUserAccess
region = us-east-2
output = json

[sso-session bobby-sso]
sso_region = us-east-2
sso_start_url = https://my-portal.awsapps.com/start
sso_registration_scopes = sso:account:access
```

(Values are placeholders.)

| Line | Meaning |
| --- | --- |
| `[profile lab]` | A named set of settings you select with `--profile lab` |
| `sso_session` | Which sign-in session this profile uses |
| `sso_account_id`, `sso_role_name` | Which account and permission set to get credentials for |
| `region`, `output` | Defaults for commands run with this profile |
| `[sso-session bobby-sso]` | The shared sign-in: where and how to authenticate |

Why two sections: several profiles (say `lab-admin` with AdministratorAccess and `lab` with PowerUserAccess) can share **one** `sso-session`, so one login covers all of them. It's the same idea as a Spring `@ConfigurationProperties` base class shared by several beans.

### C. Log in

```bash
aws sso login --profile lab
```

Your browser opens; approve it. The terminal confirms it **successfully logged into** your start URL. The token is cached under `~/.aws/sso/cache`.

On a machine without a browser, or to approve from another device, use device authorization instead (a URL plus a short code you enter elsewhere):

```bash
aws sso login --profile lab --use-device-code
```

### D. Prove who you are

```bash
aws sts get-caller-identity --profile lab
```

This asks AWS "who am I right now?" The response includes your **account ID** and an **ARN** showing an assumed-role session for your permission set. It's the CLI equivalent of the console's account menu, and the first command to run whenever something says "access denied".

> TODO(test): paste a real (redacted) response here and annotate each field.

### E. Log out

```bash
aws sso logout
```

It deletes cached credentials for all SSO profiles. Otherwise sessions simply expire; after that, run `aws sso login` again.

## A newer option: `aws login`

AWS's account guide now also recommends `aws login` (CLI **2.32.0+**). It signs the CLI in programmatically, rotates credentials every 15 minutes, and keeps the session valid for up to 12 hours.

> TODO(source): document how `aws login` relates to Identity Center profiles, and when to prefer it over `aws configure sso`, from AWS's "Accessing your AWS account" page.

## Check it worked

- `aws sts get-caller-identity --profile lab` returns your account ID and a role ARN, not a root or IAM-user ARN.
- After `aws sso logout`, the same command fails until you log in again.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Browser doesn't open | No default browser, or a remote/SSH session | Use `--use-device-code`, or open the printed URL manually. PKCE URLs must be opened on the same machine. |
| Credentials expired error | The SSO session ended | `aws sso login --profile lab` |
| Commands act in the wrong Region | Profile's `region` differs from what you expected | Check `region` under the profile, or pass `--region` |
| No `sso-session` section was written | Session name left blank (legacy mode) | Rerun `aws configure sso` and enter a session name |

## You finished Level 0's setup

You now have: a protected root user, billing alerts, an everyday identity with temporary credentials, and a working CLI. Next is [the cheat sheet](/aws/cheat-sheet/), then Level 1.
