---
title: "AI agents & coding with agents"
description: "What AI agents are and how they work, building agents, and coding with AI agents day to day."
domain: ai-agents
pageType: overview
status: draft
safetyCritical: false
sources: []
tags: [ai, agents, claude-code, llm]
sidebar:
  label: Overview
  order: 0
---

This chapter is for anyone who has used a chatbot and wants to know what changes when the model can *do* things: read files, run commands, open pull requests. It covers what an agent is under the hood, how to work with one every day without handing over the keys, and eventually how to build your own. The worked examples use Claude Code, because that is what I use; the ideas transfer to any agent.

You need a terminal and a project to point the agent at. No maths and no machine-learning background.

## Roadmap

| Level | Name | You can... |
| --- | --- | --- |
| 0 | Orientation | Explain what an agent is, name its parts (model, context, tools, memory), and know what never to let one do unattended. |
| 1 | Beginner | Install a coding agent, give it a task, review what it changed, and undo it. |
| 2 | Intermediate | Write a `CLAUDE.md` that sticks, use permission modes on purpose, and split big jobs into ones an agent finishes. |
| 3 | Advanced | Extend the agent with skills, hooks, MCP servers, and subagents; run it in CI. |
| 4 | Expert | Build your own agent on the API: a tool loop, structured outputs, evals that prove it works. |
| 5 | Mastery | Explain the research behind tool use, context management, and evaluation, and know where the field is going. |

**Start here:** [Level 0: Orientation](/ai-agents/levels/0-orientation/). The [cheat sheet](/ai-agents/cheat-sheet/) lists the Claude Code commands, slash commands, and shortcuts by how often you need them.

See [how these guides work](/about/how-guides-work/) for what the levels, tiers, and page statuses mean.
