---
# TEMPLATE: one idea explained in depth. Copy to src/content/docs/<domain>/concepts/<slug>.md
# A concept page answers "why" and "how does it work"; it has no steps. Steps belong in a
# walkthrough, which should link here for the background.
title: "The idea, named plainly"
description: "One sentence: what the reader will understand after this page."
domain: aws                     # must exist in src/domains.mjs
pageType: explanation
level: 0                        # the level whose page links here (optional)
status: draft                   # planned | draft | review | verified (owner promotes)
safetyCritical: false
# lastVerified: 2026-09-18      # required once status is verified
sources: []
#  - title: "Page title"
#    url: "https://..."
#    publisher: "Who published it"
tags: []
sidebar:
  order: 50                     # concepts sit between the levels (10-15) and the cheat sheet (90)
---

## The one-line version

The whole idea in one or two sentences, then an analogy to something the reader already knows (a landlord and a tenant, a fuse box, a library card).

## How it works

The mechanism, in the order things happen. Use a diagram (SVG in `src/assets/`, with alt text) when words alone need a second read.

## Choosing between options

Whenever two or more options compete, compare them in a table, then say which one to pick and why the others lose.

| Option | Use it when | Avoid it when |
| --- | --- | --- |
| A | ... | ... |
| B | ... | ... |

## Common mistakes

What people get wrong the first time, and what it costs them.

## Where this shows up

Link the walkthroughs and level pages that rely on this idea.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
