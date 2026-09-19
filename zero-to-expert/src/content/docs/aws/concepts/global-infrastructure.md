---
title: "Global infrastructure: Regions, AZs, and edge"
description: "How AWS's physical footprint is organized, why it matters for every design decision, and the mistakes it causes for beginners."
domain: aws
pageType: explanation
level: 0
status: draft
sources:
  - title: "AWS Regions and Availability Zones"
    url: "https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html"
    publisher: "AWS documentation"
  - title: "Availability Zones (AWS Fault Isolation Boundaries whitepaper)"
    url: "https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html"
    publisher: "AWS whitepaper"
  - title: "Global Infrastructure: Regions and AZs"
    url: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
    publisher: "AWS"
  - title: "Compare sign-up options (opt-in Regions)"
    url: "https://docs.aws.amazon.com/accounts/latest/reference/sign-up-for-aws.html"
    publisher: "AWS Account Management Reference Guide"
tags: [aws, regions, availability-zones, resilience]
sidebar:
  order: 40
---

## The four kinds of location

AWS documents four kinds of location your resources can live in:

| Location | What it is | Analogy | Why you'd use it |
| --- | --- | --- | --- |
| **Region** | A separate geographic area, built to be isolated from every other Region | A city | Data residency, latency to your users, surviving a regional failure |
| **Availability Zone (AZ)** | An isolated location inside a Region | Separate buildings in that city, each on its own power and network | High availability within one Region |
| **Local Zone** | Compute and storage placed closer to end users | A branch office in a suburb | Lower latency for a specific metro area |
| **Wavelength Zone** | AWS compute and storage at the edge of telecom carriers' 5G networks | A kiosk inside the phone company's building | Ultra-low latency to 5G devices |

At Levels 0-3 you'll work almost entirely with Regions and AZs. Local and Wavelength Zones come up in specialized designs.

## Regions in depth

**Isolation is the point.** Each Region is designed to be isolated from the others for fault tolerance and stability. The side effect catches everyone once:

- **Most resources are regional.** A resource belongs to the Region you created it in. When you view resources, you pick a Region and see only that Region's resources.
- **Nothing is copied between Regions for you.** You can replicate some resource types across Regions, but AWS doesn't do it automatically.

:::tip[The #1 beginner mystery]
"My EC2 instance / Lambda function disappeared." Very often it's still there and the console's Region selector (top right) is set to a different Region. Check the Region before you panic.
:::

**Opt-in Regions.** Some Regions aren't available until you enable them for your account. Enabling and disabling Regions is an account setting you manage on an advanced account.

> TODO(source): add the official list of opt-in Regions and the enable/disable steps from "Enable or disable AWS Regions in your account".

## Availability Zones in depth

From AWS's fault-isolation whitepaper:

- An AZ is **one or more discrete data centers** with separate, redundant power, networking, and connectivity.
- AZs in a Region are **meaningfully distant** from each other, up to about 100 km (60 miles), so one flood, fire, or power problem shouldn't hit two at once.
- They're **close enough for synchronous replication** with single-digit-millisecond latency. That's why a database can keep a standby copy in a second AZ without slowing down every write noticeably.
- Common failure points such as generators and cooling aren't shared between AZs, and AWS staggers software deployments across AZs in a Region so one bad update doesn't hit them all at once.
- AWS's global infrastructure page states that every Region has **at least three** AZs.

### What that means for design

| Your design | A single AZ fails | Cost and effort | Good for |
| --- | --- | --- | --- |
| Everything in one AZ | Your app is down until the AZ recovers | Lowest | Labs, learning, throwaway environments |
| Spread across 2-3 AZs in one Region | Survives; the healthy AZs keep serving | Moderate: load balancing, replicated data | Most production apps |
| Multiple Regions | Survives even a Region-wide problem | High: data replication, routing, and consistency get hard | Strict uptime or data-residency requirements |

Analogy: one AZ is keeping your only copy of a file on one laptop. Multi-AZ is a laptop plus an external drive in another room. Multi-Region is a copy in another city: the safest, and the most work to keep in sync.

## Check yourself

1. Why can a database keep a synchronous standby in another AZ, but usually not in another Region?
2. You launched an EC2 instance and now the console shows no instances. What's the first thing you check?
3. What does "at least three AZs per Region" let you build that two wouldn't?
