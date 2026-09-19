---
title: "The shared responsibility model"
description: "Exactly which security work AWS does, which is yours, and how the split moves as services get more managed."
domain: aws
pageType: explanation
level: 0
status: draft
sources:
  - title: "Shared Responsibility Model"
    url: "https://aws.amazon.com/compliance/shared-responsibility-model/"
    publisher: "AWS"
tags: [aws, security, compliance]
sidebar:
  order: 50
---

## The one-line version

AWS is responsible for security **of** the cloud. You're responsible for security **in** the cloud.

Analogy: an apartment building. The landlord (AWS) secures the structure, the lobby door, the wiring, and the elevators. You decide who gets a copy of your key, whether you lock your door, and what you leave on the balcony. A break-in through a door you left open isn't the landlord's fault.

## What AWS covers ("of" the cloud)

AWS protects the infrastructure that runs every AWS service: the hardware, software, networking, and facilities. In practice that means AWS runs, manages, and controls everything from the host operating system and virtualization layer down to the physical security of the data centers.

## What you cover ("in" the cloud)

Your share depends on **which services you choose**. The more a service abstracts away, the less you manage, but it never drops to zero.

| Service style | Example | AWS manages | You manage |
| --- | --- | --- | --- |
| Infrastructure as a Service (IaaS) | Amazon EC2 | Physical hosts, host OS, virtualization | The guest OS (including updates and security patches), any software you install, and the security group (firewall) on each instance |
| Abstracted service | Amazon S3, Amazon DynamoDB | Infrastructure, operating system, and platform | Your data (including encryption options), classifying your assets, and IAM permissions |

In Spring Boot terms: EC2 is renting a bare VM where you install the JDK, patch the OS, and open ports yourself. S3 is calling someone else's hosted API; you never see the server, but you still decide who's allowed to call it and what you store in it.

## Controls: inherited, shared, customer-specific

AWS extends the model to IT controls (the checks an auditor asks about) and sorts them into three kinds:

| Control type | Meaning | AWS's examples |
| --- | --- | --- |
| **Inherited** | You get it entirely from AWS | Physical and environmental controls |
| **Shared** | Both sides do it, each in its own layer | **Patch management:** AWS patches its infrastructure; you patch your guest OS and apps. **Configuration management:** AWS configures its devices; you configure your OS, databases, and apps. **Awareness and training:** AWS trains its staff; you train yours. |
| **Customer-specific** | Only you can do it | Routing or zoning data within specific security environments |

## Why this matters on day one

The things that most often go wrong for beginners sit entirely on **your** side of the line:

- Who can sign in, and with what credentials (the root user, MFA, access keys).
- What's exposed publicly (a storage bucket or port opened to the internet).
- What you spend (nothing stops a forgotten resource except you).

That's why Level 0 is almost entirely about identities, MFA, and billing alerts. They're your half of the model, and AWS can't do them for you.

## Check yourself

1. Your EC2 instance runs an unpatched OS. Whose responsibility is the patch?
2. Your S3 data is readable by anyone on the internet because of a permission you set. Is that AWS's side or yours?
3. Name one control you fully inherit from AWS.
