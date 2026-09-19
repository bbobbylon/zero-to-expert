---
title: "Level 0: Orientation"
description: "Your AWS starting line: how AWS is organized, who secures what, how identity and billing work, and a secured account with a working CLI."
domain: aws
pageType: level
level: 0
status: draft
sources:
  - title: "AWS Regions and Availability Zones"
    url: "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html"
    publisher: "AWS documentation"
  - title: "Shared Responsibility Model"
    url: "https://aws.amazon.com/compliance/shared-responsibility-model/"
    publisher: "AWS"
  - title: "AWS account root user"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
    publisher: "AWS IAM User Guide"
  - title: "Explore AWS services with AWS Free Tier"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
    publisher: "AWS Billing User Guide"
  - title: "Compare sign-up options"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/sign-up-for-aws.html"
    publisher: "AWS Account Management Reference Guide"
tags: [aws, fundamentals]
sidebar:
  order: 10
---

## What you'll be able to do

By the end of Level 0 you can:

- Explain Regions and Availability Zones, and why putting everything in one AZ is a risk.
- Say which security work is AWS's and which is yours, for EC2 versus S3.
- Tell the root user, IAM users, roles, and Identity Center users apart, and know which to use when.
- Explain how the post-July-2025 Free Tier works, including the credit trap with AWS Organizations.
- Stand up a new account with MFA on root, billing alerts, an everyday Identity Center sign-in, and a CLI that uses temporary credentials.

## Learning path

Read each concept, then do the walkthrough it prepares you for. Total time is roughly three to four hours (estimate), plus waiting for account activation.

| # | Read | Then do | You'll have |
| --- | --- | --- | --- |
| 1 | [Sign-up options](/aws/concepts/sign-up-options/) | [Create an AWS account](/aws/walkthroughs/1-create-an-account/) | An active account |
| 2 | [Identities, credentials, and MFA](/aws/concepts/identities-and-credentials/) | [Protect the root user](/aws/walkthroughs/2-protect-the-root-user/) | Root with two MFA devices, no keys |
| 3 | [Billing, credits, and the Free Tier](/aws/concepts/billing-and-free-tier/) | [Set up billing guardrails](/aws/walkthroughs/3-set-up-billing-guardrails/) | Billing visible to IAM, two budgets |
| 4 | [Global infrastructure](/aws/concepts/global-infrastructure/) | [Set up IAM Identity Center](/aws/walkthroughs/4-set-up-iam-identity-center/) | A daily sign-in with Admin and PowerUser access |
| 5 | [Shared responsibility](/aws/concepts/shared-responsibility/) | [Install the AWS CLI](/aws/walkthroughs/5-install-the-aws-cli/) | CLI v2 installed |
| 6 | [CLI cheat sheet](/aws/cheat-sheet/) | [Sign in from the CLI](/aws/walkthroughs/6-configure-cli-sso/) | `aws sts get-caller-identity` working |

## The five ideas, in one paragraph each

**Where AWS runs.** A Region is a separate geographic area, isolated from other Regions; most resources belong to one Region and aren't copied elsewhere for you. Each Region has at least three Availability Zones: separate data centers far enough apart to fail independently, close enough to replicate synchronously. [More](/aws/concepts/global-infrastructure/)

**Who secures what.** AWS secures the cloud itself; you secure what you put in it. On EC2 that includes patching the OS; on S3 it's your data and permissions. Your half never reaches zero. [More](/aws/concepts/shared-responsibility/)

**Who you are.** Root can do anything and IAM can't restrict it, so it gets MFA and goes in a drawer. People sign in through IAM Identity Center and get temporary role credentials; long-term keys are a last resort. [More](/aws/concepts/identities-and-credentials/)

**What it costs.** New accounts pick a Free plan (no charges, ends after six months or when credits run out) or a Paid plan. Credits: $100 on sign-up plus up to $100 for guided activities, which you forfeit if you join an Organization first. Budgets warn; they don't stop spending. [More](/aws/concepts/billing-and-free-tier/)

**How you signed up.** AWS now offers a "new" managed experience and the classic "advanced" account. This guide uses advanced for full control. [More](/aws/concepts/sign-up-options/)

## Check yourself

1. Your EC2 instance runs an unpatched OS. Whose job is the patch?
2. You launch everything in one AZ and that AZ fails. What happens, and what would you change?
3. Why can't an IAM policy stop the root user, and what can?
4. Your Identity Center admin gets "access denied" on the Billing console. Name the most likely cause.
5. Why do the credit activities come before enabling IAM Identity Center?
6. Does a zero spend budget stop AWS from charging you?
7. What does `aws sts get-caller-identity` tell you, and when should you run it?

<details>
<summary>Answers</summary>

1. Yours. On EC2 the guest OS is on your side of the shared responsibility model.
2. Your app goes down with the AZ. Spread across at least two AZs, with load balancing and replicated data.
3. IAM policies can't explicitly deny root; only an AWS Organizations service control policy can limit it.
4. Root hasn't turned on **Activate IAM access** for the Billing console.
5. Enabling Identity Center with Organizations creates an organization, and the Free Tier FAQ says activities expire when an account joins one.
6. No. It emails you; you still have to act.
7. Which account and identity your commands are running as. Run it first whenever something says "access denied."

</details>

## Next

Level 1 (coming next): least-privilege permissions, your first S3 bucket and EC2 instance, tagging, and cleaning up.
