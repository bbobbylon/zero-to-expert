---
title: "Billing, credits, and the Free Tier"
description: "How AWS charges you, how the post-July-2025 Free Tier really works, the credit trap with AWS Organizations, and the guardrails that keep a lab from becoming a bill."
domain: aws
pageType: explanation
level: 0
status: draft
sources:
  - title: "Explore AWS services with AWS Free Tier"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html"
    publisher: "AWS Billing User Guide"
  - title: "Earning additional credits"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans-activities.html"
    publisher: "AWS Billing User Guide"
  - title: "AWS Free Tier FAQs"
    url: "https://aws.amazon.com/free/free-tier-faqs/"
    publisher: "AWS"
  - title: "AWS Free Tier Terms"
    url: "https://aws.amazon.com/free/terms"
    publisher: "AWS"
  - title: "AWS Free Tier update: up to $200 in credits"
    url: "https://aws.amazon.com/blogs/aws/aws-free-tier-update-new-customers-can-get-started-and-explore-aws-with-up-to-200-in-credits"
    publisher: "AWS News Blog"
  - title: "Control Your AWS Costs (hands-on tutorial)"
    url: "https://docs.aws.amazon.com/hands-on/latest/control-your-costs-free-tier-budgets/control-your-costs-free-tier-budgets.html"
    publisher: "AWS"
  - title: "Getting set up with Billing"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html"
    publisher: "AWS Billing User Guide"
  - title: "Overview of managing access permissions (Billing)"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html"
    publisher: "AWS Billing User Guide"
  - title: "Using a budget template (simplified)"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html"
    publisher: "AWS Cost Management User Guide"
tags: [aws, billing, free-tier, budgets, credits]
sidebar:
  order: 30
---

:::caution
Most AWS tutorials written before mid-2025 describe "12 months free" of EC2, RDS, and S3. That model no longer applies to accounts created on or after **July 15, 2025**. Older accounts stay on the legacy Free Tier.
:::

## Pay-as-you-go

AWS bills pay-as-you-go: you pay for what you use, metered per service. Many resources, such as instances and databases, keep costing money while they exist, busy or idle.

> TODO(source): link the EC2 and RDS pricing pages that state how running time is billed.

The billing period closes at midnight on the last day of each month, and most bills can be downloaded by the seventh accounting day of the next month.

Analogy: a utility meter, not a subscription. Leaving a light on in an empty room still runs the meter.

## The two account plans (new accounts)

| | Free account plan | Paid account plan |
| --- | --- | --- |
| Sign-up credits | USD $100 | USD $100 |
| Extra credits for activities | Up to $100 more | Up to $100 more |
| Can you be charged? | No, until you upgrade | Yes, once usage exceeds credits or a service isn't covered by credits |
| How long | Ends after **six months** or when credits run out, whichever comes first | Ongoing |
| Free Tier offers active | Always Free only | Always Free and short-term trials |
| Services | Some services that would burn the whole credit amount quickly, and hardware purchases, aren't available | All |
| Best for | Learning and proofs of concept | Anything you want to keep running |

Both plans include more than 30 **Always Free** services with monthly usage limits. Go over an Always Free limit and your credits pay first; on the paid plan, you pay standard rates once credits are gone or have expired.

**Credit expiry:** the Free Tier terms say credits expire twelve months after the account is opened. If you upgrade from Free to Paid within six months of opening the account, you stay eligible for the credits.

## Earning the extra $100

New accounts can earn up to $100 more by completing guided activities in the **Explore AWS** widget on the Console Home dashboard. AWS's tutorial lists them at $20 each:

| Activity | What you do |
| --- | --- |
| Amazon EC2 | Launch a virtual machine, then clean it up |
| Amazon RDS | Launch a relational database and explore its configuration |
| AWS Lambda | Build a simple web app with a function URL |
| Amazon Bedrock | Submit a prompt in the Bedrock playground |
| AWS Budgets | Create a cost budget that alerts you |

Rules from the FAQ:

- Activities must be completed **within six months** of opening the account, by each activity's own complete-by date.
- The activities themselves **incur charges**, which are deducted from your credits.
- Earned credits can take **up to 30 minutes** to appear on the **Credits** page of the Billing console, and they expire **12 months** from account creation.

:::danger[The AWS Organizations credit trap]
The FAQ says the activities **expire immediately**, and you can't earn more credits, **when you join an AWS Organization or set up an AWS Control Tower landing zone**.

Enabling IAM Identity Center the recommended way (with AWS Organizations) creates an organization. AWS's wording says "join," and it isn't explicit about whether creating your own organization counts. This guide assumes it does. **Finish the credit activities you want before you enable IAM Identity Center.**
:::

## Guardrails: budgets alert, they don't stop

AWS Budgets watches spending and emails you when it crosses a threshold. Templates on the simplified path include:

| Template | Alerts when |
| --- | --- |
| **Zero spend budget** | Spending goes past Free Tier limits, so any real charge |
| **Monthly cost budget** | You exceed, or are forecasted to exceed, an amount you choose |

A budget is a smoke alarm, not a sprinkler: it tells you there's a fire and you still have to put it out. Advanced-sign-up accounts have no hard spend cap (the new sign-up experience's spend limit isn't available on them), so the alarm plus your own habits are the protection:

- Delete lab resources the same day you create them.
- Check **Bills** in the Billing console after every lab session.
- Tag lab resources so they're easy to find and delete. (Cost allocation tags are covered at Level 1.)

## Who can see billing

By default, **IAM users and roles can't open the Billing and Cost Management console**, even if their policies allow billing actions. The root user must turn on **Activate IAM access** once for the account. Then the identity also needs a policy granting billing permissions; `AdministratorAccess` covers that for your admin.

This switch gates the Budgets, Bills, Credits, Cost Explorer, and Payment pages, among others. It doesn't gate the Budgets and Cost Explorer APIs, so the CLI can reach budgets even when the console page is blocked.

## Check yourself

1. You're on the Free plan and it's month seven. What happened to your account?
2. Why should you finish the Explore AWS activities before enabling IAM Identity Center with Organizations?
3. Does a zero spend budget stop a runaway resource?
4. Your admin role has AdministratorAccess but the Billing console says access denied. What's missing?
