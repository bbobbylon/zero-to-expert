---
title: "1. Create an AWS account"
description: "Sign up with the advanced option: root email, account name, password rules, plan choice, payment, phone verification, and activation."
domain: aws
pageType: walkthrough
level: 0
difficulty: easy
status: draft
time: "20-30 minutes, plus up to 24 hours for activation (estimate)"
tools: ["An email address you control long-term", "A phone that can receive SMS or calls", "A payment card"]
sources:
  - title: "Sign up for AWS (advanced)"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/getting-started.html"
    publisher: "AWS Account Management Reference Guide"
  - title: "Compare sign-up options"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/sign-up-for-aws.html"
    publisher: "AWS Account Management Reference Guide"
  - title: "Explore AWS services with AWS Free Tier"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
    publisher: "AWS Billing User Guide"
tags: [aws, account, sign-up]
sidebar:
  order: 110
---

:::caution[Not yet run end to end]
These steps follow AWS's documentation as of September 2026. AWS renames buttons from time to time; if a label doesn't match, follow the linked source for that step.
:::

## Before you start: three decisions

### Which email becomes the root user?

This email is the root user's sign-in name **and** the account recovery path: whoever controls the inbox can reset the root password.

| Option | Pros | Cons |
| --- | --- | --- |
| **A dedicated address or alias** (e.g. `you+aws-root@...` or a separate mailbox) | Easy to tell apart from daily mail; can be locked down | One more inbox to secure |
| Your everyday personal email | Nothing new to set up | Mixed in with everything else; a compromise of that inbox is a compromise of AWS |
| A work address | — | You lose the account if you leave the job. AWS recommends a secured distribution list for business accounts, not a person's address. |

Recommendation: a dedicated address with its own strong password and MFA. Whatever you choose, you must be able to receive mail there, because AWS sends a verification code.

### What do you name the account?

The account name shows on invoices and in the Billing and Organizations consoles. AWS suggests `first-last-purpose` for personal accounts (their example: `paulo-santos-testaccount`). Something like `bobby-lab` works.

### Free plan or Paid plan?

See [Billing, credits, and the Free Tier](/aws/concepts/billing-and-free-tier/). Short version: **Free** if you're only learning and want zero risk of a charge for up to six months; **Paid** if you want the account to keep running and have every service available. You can upgrade Free to Paid later.

## Steps

1. Open the **Sign up for AWS** page (linked from the "Sign up for AWS (advanced)" source). If AWS offers you the new sign-up experience, see [Sign-up options](/aws/concepts/sign-up-options/) for why this guide uses the advanced path.
2. Enter the **root user email address** and **AWS account name**, then choose **Verify email address**.
3. Enter the verification code from your inbox and choose **Verify**.
4. Create the **root password**. AWS requires:
   - 8 to 128 characters;
   - at least three of: uppercase, lowercase, numbers, and the symbols `! @ # $ % ^ & * () <> [] {} | _+-=`;
   - not identical to the account name or email.

   Use a password manager to generate a long random one; don't pick something memorable.
5. Choose your **account plan** (Free or Paid).
6. Enter your **contact information**, then read and accept the AWS Customer Agreement.
7. Enter **billing information**. You can't continue without a valid payment method, even on the Free plan.
8. **Confirm your identity** if asked: enter a phone number you can answer in the next few minutes, choose **Send SMS**, and enter the code.
9. Choose a **Support plan**. (Compare plans on AWS's Support page linked from the source; for a personal lab, the free option is typical.)

   > TODO(source): confirm the current name and price of the free Support tier.
10. Choose **Complete sign up**.
11. Watch your email **and spam folder** for the activation message. Activation usually takes a few minutes but can take up to 24 hours.
12. After activation, sign in to the AWS Management Console as the **root user** with the email and password.

## Check it worked

- You received the "account activated" email.
- You can sign in as root and see the Console Home page.
- The Region selector (top right) shows a Region. Note which one; you'll pick your working Region deliberately in step 4 of this series.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No verification code | Spam filter or a typo in the address | Check spam, then restart sign-up with the correct address |
| Password rejected | Fewer than three character types, or it matches the email/name | Generate a new one that meets all three rules |
| Stuck at payment | Card declined or address mismatch | Try another card, or check the billing address |
| No activation email after 24 hours | — | TODO(source): link AWS's troubleshooting page for account activation |

## Next

[2. Protect the root user](/aws/walkthroughs/2-protect-the-root-user/). Do it right away: right now the only thing protecting this account is a password.
