---
title: "Level 0: Orientation"
description: "Explain what an AI agent is, name its parts, and know what never to let one do unattended."
domain: ai-agents
pageType: level
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Building effective agents"
    url: "https://www.anthropic.com/engineering/building-effective-agents"
    publisher: "Anthropic"
  - title: "How Claude Code works"
    url: "https://code.claude.com/docs/en/how-claude-code-works"
    publisher: "Claude Code documentation"
  - title: "Overview"
    url: "https://code.claude.com/docs/en/overview"
    publisher: "Claude Code documentation"
  - title: "How Claude remembers your project"
    url: "https://code.claude.com/docs/en/memory"
    publisher: "Claude Code documentation"
  - title: "Choose a permission mode"
    url: "https://code.claude.com/docs/en/permission-modes"
    publisher: "Claude Code documentation"
  - title: "Interactive mode"
    url: "https://code.claude.com/docs/en/interactive-mode"
    publisher: "Claude Code documentation"
tags: [ai, agents, claude-code, orientation]
sidebar:
  order: 10
---

## What you'll be able to do

- Say what separates an agent from a chatbot and from a scripted workflow, in one sentence each.
- Name the four parts of any agent (model, context window, tools, memory) and what each is for.
- Look at a list of tools and say which ones can do something you cannot undo.
- Choose a permission mode on purpose, and name the jobs you never leave an agent to do unattended.
- Install a coding agent, ask it about a project, make a change, and undo it.

## Concepts

### A chatbot answers; an agent acts

A chatbot is a helpline: you describe the problem, it tells you what to do, and you go and do it. An agent is the contractor you let into the house: it looks around, picks tools off the van, does the work, checks the result, and comes back to you only when it needs a decision. Same knowledge, different job. The difference is **tools** (it can act on the world) plus a **loop** (it acts, sees the result, and decides what to do next).

Anthropic's own definition, from its engineering team: a *workflow* is a model and some tools wired together along code paths you wrote in advance; an *agent* is a system where the model directs its own process and its own tool use.

| | Chatbot | Workflow | Agent |
| --- | --- | --- | --- |
| Who picks the next step | Nobody: one question, one answer | Your code | The model, from what it just learned |
| Can it change things | No | Only where you wired it in | Yes: files, commands, the web, other systems |
| Cost of a mistake | You read a wrong answer | A step produces a wrong output | Something changes that you may not have wanted |
| Use it for | Explaining, drafting, summarising | Repeatable pipelines with known steps | Open-ended jobs where the steps can't be listed in advance |

[What an AI agent actually is](/ai-agents/concepts/what-is-an-agent/) goes deeper, including the five workflow shapes agents are often built from.

### The loop

Claude Code's documentation describes the loop as three phases that blur into each other: **gather context** (search, read, run something to see what happens), **take action** (edit, create, run), and **verify** (run the tests, re-read, compare with the request). Then round again, until the model decides the job is done, or a limit you set is reached, or you interrupt.

You are part of the loop. Pressing `Esc` stops the current step and hands control back; typing a correction while it works queues the message for its next step. Nothing about steering is a failure.

### The four parts

| Part | What it is | Analogy | In Claude Code |
| --- | --- | --- | --- |
| Model | The reasoning engine that reads the situation and picks the next step. Different models trade speed for depth. | The contractor's judgement | `/model` switches it |
| Context window | Everything the model can see right now: your request, the instructions, files it has read, command output. Finite; when it fills, older material is cleared or summarised. | The workbench: what is on it is in reach, and when it is full something comes off | `/context` shows what is using space |
| Tools | What lets it act: read and edit files, search, run commands, browse the web, delegate to a subagent, ask you a question. Each result feeds the next decision. | The toolbox, plus the phone to call you | Categories: file operations, search, execution, web, code intelligence |
| Memory | What survives between sessions. Each session starts blank; `CLAUDE.md` is the note you write for it, auto memory is the note it writes for itself. | The job sheet pinned to the van wall | `/init` drafts a CLAUDE.md; `/memory` edits it |

### Where an agent can do harm

The tools decide the risk. Claude Code snapshots a file before it edits it, so file changes can be rewound (`Esc` twice opens the rewind menu). What cannot be checkpointed is anything that leaves the machine or that the tool itself makes permanent: pushes, deployments, database writes, API calls, deleted branches, sent messages, money spent. Treat those the way you treat power tools: fine with your hand on them, never left running.

**Permission modes** set what the agent may do without asking. `Shift+Tab` cycles them in a session; `--permission-mode` sets one at start.

| Mode | Runs without asking | Pick it when |
| --- | --- | --- |
| `default` (shown as Manual) | Reads only | You want to see every action, or the code is unfamiliar. The right starting point. |
| `plan` | Reads; it proposes a plan and edits nothing until you approve | You want to understand before anything changes |
| `acceptEdits` | Reads, file edits, and common file commands (`mkdir`, `mv`, `cp`...) | You are iterating on code you are reviewing as it goes |
| `auto` | Everything, with a second model checking actions in the background. The starting mode on Pro, Max, and Team plans. | Long tasks, once you trust the setup |
| `dontAsk` | Reads and pre-approved tools; anything else is denied rather than asked | CI and scripts with an exact allow-list |
| `bypassPermissions` | Everything, no checks | Isolated containers and VMs only. `claude --help` says it plainly: recommended only for sandboxes with no internet access. |

Rules I keep, whichever mode I am in:

1. It never holds push, deploy, or delete rights while I am not watching.
2. Every task has a checkable end: "the tests pass", "the build exits 0", "the diff does X and nothing else".
3. I read the diff before anything is committed. Reading is faster than debugging.
4. Secrets stay out of any folder it can read. It reads the whole project.
5. When unsure, `plan` mode first.

### Vocabulary

| Word | Meaning |
| --- | --- |
| Prompt | What you type. Also the standing instructions the tool adds around it. |
| Token | The unit text is measured in for context and cost; roughly three-quarters of a word in English. |
| Context window | See above. "Out of context" means the workbench is full. |
| Compaction | Summarising the conversation so far to make room. Early details can be lost, which is why standing rules belong in `CLAUDE.md`, not in chat. |
| Tool call | One use of one tool: read this file, run this command. |
| Session | One conversation with its own context. `claude -c` continues the latest one in this folder; `claude -r` picks an older one. |
| Checkpoint | The snapshot taken before a file edit; what the rewind restores. |
| `CLAUDE.md` | The project handbook the agent reads every session. |
| Skill | A procedure file loaded only when invoked (`/name`). |
| Hook | A shell command that runs at a fixed point, whatever the model decides. |
| MCP | Model Context Protocol: the open standard for plugging outside tools and data into an agent. |
| Subagent | A separate agent with its own context, given one task, returning a summary. |

[CLAUDE.md, skills, hooks, MCP, and subagents](/ai-agents/concepts/extending-claude-code/) explains the last five and when to use each.

## Walkthroughs at this level

- [Install Claude Code and run your first session](/ai-agents/walkthroughs/1-install-and-first-session/) (easy, 20 minutes)

## Practice project

Pick a project you know inside out. Start `claude` in it, switch to `plan` mode, and ask "what does this project do?", "where is the main entry point?", and "what would you change first?". Mark each answer right, wrong, or half-right. Then switch to Manual, ask for one small change with a checkable result, read the diff, approve it, and rewind it with `Esc` `Esc`. You have now driven the whole loop with your hand on the brake.

## Check yourself

1. A script calls a model to classify emails and then runs fixed code for each category. Chatbot, workflow, or agent?
2. Which of the four parts is finite, and what does the tool do when it runs out?
3. Name two actions a checkpoint cannot undo.
4. Which permission mode edits nothing until you approve a plan?
5. Why do standing rules belong in `CLAUDE.md` rather than in the conversation?
6. When is `bypassPermissions` appropriate?

<details>
<summary>Answers</summary>

1. A workflow: the model fills in judgement at a fixed point, but your code decides the steps.
2. The context window. It clears older tool output first, then summarises (compacts) the conversation.
3. Anything that left the machine or that a tool made permanent: a push, a deploy, a database write, an API call, a sent message, a deleted remote branch.
4. `plan`.
5. Compaction can drop early conversation details; `CLAUDE.md` is loaded fresh at the start of every session.
6. Only in an isolated container or VM, ideally with no internet access, for fully unattended runs.

</details>

## Next

Level 1 is not written yet. Until it is, the [cheat sheet](/ai-agents/cheat-sheet/) lists the commands and shortcuts by how often you will need them.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
