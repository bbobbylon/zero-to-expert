---
title: "Identities, credentials, and MFA"
description: "The root user, IAM users, roles, and IAM Identity Center: what each is, what it can do, and which one to use when."
domain: aws
pageType: explanation
level: 0
status: draft
sources:
  - title: "AWS account root user (includes Tasks that require root user credentials)"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html"
    publisher: "AWS IAM User Guide"
  - title: "Root user best practices for your AWS account"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html"
    publisher: "AWS IAM User Guide"
  - title: "AWS security credentials"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html"
    publisher: "AWS IAM User Guide"
  - title: "Security best practices in IAM"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
    publisher: "AWS IAM User Guide"
  - title: "AWS Multi-factor authentication in IAM"
    url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html"
    publisher: "AWS IAM User Guide"
  - title: "Assign user or group access to AWS accounts"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/assignusers.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Manage AWS accounts with permission sets"
    url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html"
    publisher: "AWS IAM Identity Center User Guide"
  - title: "Secure root user access for member accounts in AWS Organizations"
    url: "https://aws.amazon.com/blogs/security/secure-root-user-access-for-member-accounts-in-aws-organizations/"
    publisher: "AWS Security Blog"
tags: [aws, iam, identity-center, root, mfa, credentials]
sidebar:
  order: 20
---

## Two questions every request answers

Every call to AWS, from a console click or the CLI, answers two questions:

1. **Who are you?** (authentication: a password plus MFA, or temporary credentials)
2. **What are you allowed to do?** (authorization: the policies attached to that identity)

You already know this split from Spring Security: the filter chain authenticates, then `@PreAuthorize` or the access rules authorize. AWS IAM is the same idea for every API in AWS.

## The identities

| Identity | Credentials | Lifetime | Use it for |
| --- | --- | --- | --- |
| **Root user** | The sign-up email + password (+ MFA) | Permanent | Only the tasks that require it (list below) |
| **IAM Identity Center user** | Password + MFA at a sign-in portal, which hands out temporary role credentials | Temporary, per session | Every person, every day. AWS's recommended default. |
| **IAM role** | Temporary credentials when "assumed" by a person or a workload | Temporary | Workloads (EC2, Lambda, CI/CD) and the roles Identity Center creates for you |
| **IAM user** | Long-term password and/or access keys | Until you rotate or delete them | Only when something truly needs long-term credentials |

AWS's guidance is consistent: prefer roles and temporary credentials for both people and workloads, and require MFA wherever an IAM user or the root user does exist.

### Why temporary credentials win

A long-term access key is a house key cut once and never changed: whoever copies it can use it until you notice. Temporary credentials are hotel key cards that stop working at checkout. If one leaks, the damage window is short.

## The root user

The root user is created when you sign up (advanced sign-up) and has complete access to every service and resource in the account. Key facts from the IAM docs:

- **IAM policies can't restrict it.** You can't use an IAM policy to explicitly deny the root user. Only an AWS Organizations service control policy (SCP) can limit it.
- **Recovery runs through its email.** Lose the password and you need access to the account's email address to reset it. Protect that inbox like the account itself.
- **MFA is mandatory.** AWS enforces MFA for root users; if it isn't set up yet, you must register a device within 35 days of your first sign-in attempt.
- **No access keys.** AWS recommends not creating root access keys at all.

### Tasks that only the root user can do

From "Tasks that require root user credentials" (standalone account; some can be delegated in an AWS Organization):

| Area | Task |
| --- | --- |
| Account | Change the account's email address, root password, or root access keys (other settings like account name, contacts, and Regions don't need root) |
| Account | Close the account |
| Account | Restore IAM permissions if the only IAM admin locked themselves out |
| Billing | **Activate IAM access to the Billing and Cost Management console** |
| Billing | Some other billing tasks, and viewing certain tax invoices |
| GovCloud | Sign up for AWS GovCloud (US); request GovCloud root access keys from Support |
| EC2 | Register as a seller in the Reserved Instance Marketplace |
| KMS | Recover an unmanageable KMS key (Support confirms via the root user's primary phone number) |
| Mechanical Turk | Link your AWS account to an MTurk Requester account |
| S3 | Configure MFA delete on a bucket; edit or delete a bucket policy that denies all principals |
| SQS | Edit or delete a queue policy that denies all principals |

The Billing row matters on day one: until root activates it, **no IAM user or role, including your Identity Center admin, can open the Billing console**. The walkthroughs handle this.

## IAM Identity Center: how your daily sign-in works

1. You sign in to the **AWS access portal** with your Identity Center user (password + MFA).
2. The portal lists the accounts you can reach and a **permission set** for each (for example `AdministratorAccess`).
3. Choosing one signs you in to the console as an **IAM role** that Identity Center created in that account, with the permission set's policies attached.

A **permission set** is a template; assigning it to a user for an account makes Identity Center create and manage the matching role. Change the permission set and Identity Center updates the roles to match.

AWS recommends not living in `AdministratorAccess`: after creating the admin permission set, create a more restrictive one (their example is `PowerUserAccess` for developers) and use that day to day.

## MFA options

| Type | How it works | Phishing-resistant? |
| --- | --- | --- |
| Passkey or FIDO security key | A device or platform authenticator signs the sign-in challenge | Yes. AWS's recommended choice. |
| Hardware TOTP token | A physical device showing a 6-digit code that changes over time | No |
| Virtual authenticator app | An app on your phone generating the same kind of code | No |

The root user and each IAM user can register **up to eight** MFA devices of any type. Register at least two so one lost phone doesn't lock you out.

AWS used to give eligible customers free MFA security keys; that program was **discontinued on November 6, 2025**, so budget for your own key if you want one.

## Check yourself

1. Why can't an IAM policy stop the root user, and what can?
2. Your Identity Center admin gets "access denied" on the Billing console. What's the likely cause?
3. Why is a leaked temporary credential less dangerous than a leaked access key?
4. What's the difference between a permission set and an IAM role?
