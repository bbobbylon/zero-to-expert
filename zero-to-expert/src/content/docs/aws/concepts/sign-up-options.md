---
title: "Sign-up options: new vs. advanced"
description: "AWS now has two ways to create an account. What each one gives you, what it takes away, and which one this guide uses."
domain: aws
pageType: explanation
level: 0
status: draft
sources:
  - title: "Compare sign-up options"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/sign-up-for-aws.html"
    publisher: "AWS Account Management Reference Guide"
  - title: "Sign up for AWS (advanced)"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/getting-started.html"
    publisher: "AWS Account Management Reference Guide"
tags: [aws, account, sign-up]
sidebar:
  order: 10
---

:::note
AWS says the new sign-up experience is being released to a limited number of customers, so you may not see it yet. Check the source links before you sign up; this area is changing.
:::

## The two options

AWS documents two ways to sign up:

- **Sign up for AWS (new):** you sign in with a login you already own, and AWS creates an environment with preconfigured defaults in selected Regions. Your resources live in **projects**; each project contains an AWS account and settings for sharing with collaborators.
- **Sign up for AWS (advanced):** the classic account. You get complete control over account configuration and where your content is stored. AWS points regulated workloads (HIPAA, FedRAMP) here.

Analogy: "new" is a furnished apartment where the landlord keeps the master key and manages the building rules for you. "Advanced" is an empty house you own outright: more work, but every wall is yours to move.

## What changes between them

| Feature | New | Advanced |
| --- | --- | --- |
| Root user | Not created; AWS gives you and your team admin access to projects | Created at sign-up (your email + password) |
| Pick the Region for your resources | No; your content is stored in a designated Region chosen from your contact information | Yes |
| Opt-in Regions | No | Yes |
| IAM Access Analyzer | No | Yes |
| AWS Marketplace | No | Yes |
| Savings Plans | No | Yes |
| Spend limits (a monthly pre-tax cost cap per project, paid plan) | Yes | No |
| AWS Organizations and IAM Identity Center | Automatically opted in; AWS manages the organization's SCPs and RCPs | You set them up and manage them yourself |
| Alternate contacts, account alias, enabling/disabling Regions | Not applicable | Yes |

AWS also says you can activate advanced features on a "new" account later if you need something it doesn't support.

## Which one this guide uses

This guide uses **advanced**, for three reasons:

1. **The later levels need it.** Choosing Regions, IAM Access Analyzer, writing your own service control policies, and fine-grained IAM are core expert-level skills, and AWS lists them as unavailable or AWS-managed in the new experience.
2. **You learn the real building blocks.** The new experience hides Organizations, Identity Center, and root management behind defaults. Setting them up yourself once is how you understand what those defaults are doing.
3. **It's what employers run.** AWS's own guidance steers regulated and fine-grained-control workloads to advanced.

The one real advantage of "new" is the **spend limit**, a hard monthly cap that advanced accounts don't offer. On an advanced account you compensate with budgets and alerts (see [Billing, credits, and the Free Tier](/aws/concepts/billing-and-free-tier/)), which warn but don't stop spending.
