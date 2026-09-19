---
title: "3. Set up billing guardrails"
description: "Let IAM identities see billing, create a zero spend budget and a monthly cost budget, and learn where to check credits and bills."
domain: aws
pageType: walkthrough
level: 0
difficulty: easy
status: draft
time: "15-20 minutes (estimate)"
tools: ["Root sign-in with MFA (from walkthrough 2)", "An email address for alerts"]
sources:
  - title: "Getting set up with Billing (Activate IAM access)"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html"
    publisher: "AWS Billing User Guide"
  - title: "Overview of managing access permissions (Billing)"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html"
    publisher: "AWS Billing User Guide"
  - title: "Using a budget template (simplified)"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html"
    publisher: "AWS Cost Management User Guide"
  - title: "Creating a budget"
    url: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-create.html"
    publisher: "AWS Cost Management User Guide"
  - title: "Earning additional credits"
    url: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans-activities.html"
    publisher: "AWS Billing User Guide"
  - title: "AWS Free Tier FAQs"
    url: "https://aws.amazon.com/free/free-tier-faqs/"
    publisher: "AWS"
tags: [aws, billing, budgets, free-tier]
sidebar:
  order: 130
---

:::caution[Not yet run end to end]
Steps follow AWS's documentation as of September 2026. If a label doesn't match, follow the linked source.
:::

## What you'll end up with

- Your future admin identity able to open the Billing console.
- An email the moment any real charge appears (zero spend budget).
- An email if the month is heading past an amount you choose (monthly cost budget).
- Possibly $20 of Free Tier credit, since creating a cost budget is one of the Explore AWS activities.

Background: [Billing, credits, and the Free Tier](/aws/concepts/billing-and-free-tier/).

## Steps

### A. Activate IAM access to billing (root only)

By default, IAM users and roles can't open the Billing and Cost Management console, **even with policies that allow it**. Only root can switch this on, and it's once per account.

1. Signed in as root, open the **Account** page of the Billing and Cost Management console (`https://console.aws.amazon.com/billing/home?#/account`).
2. Find **IAM user and role access to Billing information** and choose **Edit**.
3. Select **Activate IAM access**.
4. Choose **Update**.

Why now: if you skip this, your Identity Center admin will hit "access denied" on Budgets and Bills later, and fixing it means getting root back out.

### B. Create a zero spend budget

1. Open the Billing and Cost Management console and choose **Budgets** in the navigation pane.
2. Choose **Create budget**.
3. Under **Budget setup**, choose **Use a template (simplified)**.
4. Under **Templates**, choose **Zero spend budget**.
5. Enter the email address(es) that should get the alert.
6. Choose **Create budget**.

It notifies you once spending goes past Free Tier limits: effectively, the first real charge.

### C. Create a monthly cost budget

1. Choose **Create budget** again, then **Use a template (simplified)**.
2. Choose **Monthly cost budget**.
3. Set the **amount** to the most you'd be comfortable spending in a month by accident (for a lab, something like $10-$20).
4. Enter alert email address(es) and choose **Create budget**.

This one alerts when you exceed the amount **or are forecasted to**, so it can warn you mid-month that you're on track to overspend.

> TODO(test): record the default alert thresholds the Monthly cost budget template applies.

:::note
Creating your first budget may enable Cost Explorer automatically; AWS documents that Budgets enables it when you create your first budget. That's expected.
:::

### D. Check your credits

1. In the Billing and Cost Management console, open **Credits**.
2. You should see the sign-up credit and its expiry date. If the Budgets step counted as an Explore AWS activity, a new credit can take up to 30 minutes to appear.

> TODO(test): confirm whether a budget created through the simplified template completes the Explore AWS "Set up a cost budget" activity, or whether the activity must be started from the widget.

### E. Decide about the other credit activities (before walkthrough 4)

The remaining Explore AWS activities (EC2, RDS, Lambda, Bedrock) are worth up to $80 more. They expire, and you can't earn more, once the account joins an AWS Organization, and walkthrough 4 creates one.

| Choice | Do this | Trade-off |
| --- | --- | --- |
| **Earn them first** | Do the activities from the **Explore AWS** widget on Console Home now, then continue | Uses root for a guided session (AWS generally says not to use root for everyday tasks); each activity spends some credits while it runs |
| **Skip them** | Go straight to walkthrough 4 | You forfeit up to $80 of credits, but root goes away immediately |

Either is defensible. If you earn them, do them in one sitting and clean up every resource each activity creates.

## Check it worked

| Check | Where | Expected |
| --- | --- | --- |
| IAM billing access | Billing console → Account → IAM user and role access to Billing information | Activated |
| Budgets | Billing console → Budgets | Zero spend budget and Monthly cost budget listed |
| Credits | Billing console → Credits | Sign-up credit listed with an expiry date |

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No budget alert emails ever | Wrong address, or nothing has been spent | Check the address in each budget; no spend means no alert |
| Admin later can't see Billing | Step A skipped | Sign in as root and do step A |

## Next

[4. Set up IAM Identity Center](/aws/walkthroughs/4-set-up-iam-identity-center/)
