---
# TEMPLATE: one teaching page per level. Copy to src/content/docs/<domain>/levels/<n>-<name>.md
title: "Level 0: Orientation"
description: "One sentence on what the reader can do after this level."
domain: aws                # must exist in src/domains.mjs
pageType: level
level: 0                   # 0-5
status: draft              # planned | draft | review | verified
safetyCritical: false      # true if a mistake could hurt someone
# lastVerified: 2026-09-18 # required once status is verified
sources: []
#  - title: "Page title"
#    url: "https://..."
#    publisher: "Who published it"
tags: []
sidebar:
  order: 10                # 10 + level keeps levels in order after the overview (0)
---

## What you'll be able to do

- One outcome per bullet, each something the reader can actually do.

## Concepts

Explain each idea with an analogy to something familiar, then a comparison table where two or more options compete.

| Option | Use it when | Avoid it when |
| --- | --- | --- |
| A | ... | ... |
| B | ... | ... |

## Walkthroughs at this level

- [Walkthrough title](/aws/walkthroughs/example-slug/)

## Practice project

A small, real task that uses everything on this page.

## Check yourself

1. A question the reader should be able to answer now.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
