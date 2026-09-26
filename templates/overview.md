---
# TEMPLATE: one per guide, the chapter's opening page. Copy to src/content/docs/<domain>/index.md
# The chapter number, the level list with statuses, and the page counts are computed at build
# time (src/components/GuideHub.astro); do not list levels or pages by hand here.
title: "Guide name"             # the chapter title, e.g. "Car mechanics"
description: "One sentence: what this chapter covers, from where to where."
domain: cars                    # must exist in src/domains.mjs
pageType: overview
status: draft                   # planned | draft | review | verified (owner promotes)
safetyCritical: false           # true if any job in this chapter can hurt someone
sources: []                     # usually empty: an overview makes no claims. Rendered at the end of the page only if listed
tags: []
sidebar:
  label: Overview
  order: 0
---

One or two sentences on who this chapter is for and what it will let them do. Say what a reader should already know, if anything.

## Roadmap

| Level | Name | You can... |
| --- | --- | --- |
| 0 | Orientation | Name the parts, tools, and vocabulary, and know the safety basics. |
| 1 | Beginner | Complete common jobs by following a walkthrough. |
| 2 | Intermediate | Do routine work on your own and spot mistakes. |
| 3 | Advanced | Take on multi-part jobs and diagnose problems from symptoms. |
| 4 | Expert | Do professional-grade work. |
| 5 | Mastery | Handle rare and complex work, and explain why things work the way they do. |

Make the "You can..." column specific to this subject: "Change your own oil and brake pads" beats "Complete common jobs".

**Start here:** [Level 0: Orientation](/cars/levels/0-orientation/).

## Safety

Only if `safetyCritical` is true: the standing rules for every job in this chapter (securing the vehicle, isolating mains power, and so on) and where the model-specific specs come from.

See [how these guides work](/about/how-guides-work/) for what the levels, tiers, and page statuses mean.
