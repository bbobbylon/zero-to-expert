---
title: "What an AI agent actually is"
description: "The difference between a chatbot, a workflow, and an agent, and the loop that makes an agent work."
domain: ai-agents
pageType: explanation
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
tags: [ai, agents, llm, tools]
sidebar:
  order: 50
---

## The one-line version

An agent is a language model that can use tools, in a loop, until the job is done. Take away the tools and you have a chatbot. Take away the loop and you have a script that happens to call a model.

Think of three ways to get a leaking tap fixed. You can ring a helpline that tells you what to do (a chatbot: it can only talk). You can follow a laminated card that says "step 1 turn off the water, step 2 call this number if the washer looks like picture B" (a workflow: the steps are fixed in advance, and a model fills in the judgement at each step). Or you can let a plumber in, who looks under the sink, picks tools off the van, tries something, checks whether it still drips, and comes back to you only when they need a decision (an agent: it chooses its own next step from what it just learned).

Anthropic's engineering team draws the line the same way: workflows are systems where models and tools are wired together through code paths you wrote in advance; agents are systems where the model directs its own process and its own tool use.

## How it works

Every agent, whatever the product name, is built from the same parts:

| Part | What it is | Analogy |
| --- | --- | --- |
| Model | The reasoning engine. Reads what is in front of it and picks the next step. | The plumber's judgement. |
| Context window | Everything the model can see right now: your request, the instructions, the files it has read, the output of commands it ran. Finite. | The workbench. Whatever is on it is in reach; when it is full, something has to come off. |
| Tools | Functions the model can call: read a file, edit it, run a command, search the web, ask you a question. Each call returns a result the model reads next. | The toolbox, plus the phone to call you. |
| Memory | Whatever survives between jobs: notes you wrote for it, notes it wrote for itself. Without it, every session starts blank. | The job sheet pinned to the van wall. |

Anthropic calls the model-plus-retrieval-plus-tools-plus-memory bundle the *augmented LLM*: the model generates its own searches, picks its own tools, and decides what is worth keeping.

The loop is what turns those parts into an agent. Claude Code's documentation describes it as three phases that blur into each other:

1. **Gather context.** Search files, read them, run a command to see what happens.
2. **Take action.** Edit, create, run.
3. **Verify.** Run the tests, re-read the file, compare the output with what was asked.

Then it goes round again. Each tool result changes what the model does next, which is why nobody can list the steps in advance. A question about a codebase might need only step 1; a bug fix cycles through all three repeatedly. The loop stops when the model decides the task is complete, when it hits a stopping condition you set (a turn limit, a budget), or when you interrupt it.

You are inside the loop, not outside it. Interrupting, adding context, and saying "not that way" are normal moves, not failures.

## Choosing between options

The article's advice is to find the simplest thing that works and add complexity only when it earns its keep. Most jobs do not need an agent.

| Option | Who decides the next step | Use it when | Avoid it when |
| --- | --- | --- | --- |
| Single model call | Nobody: one question, one answer. | Classify, summarise, extract, translate, draft. | The answer depends on looking things up or trying things out. |
| Workflow | Your code. The model fills in judgement at fixed points. | The steps are known and repeatable, and you want them predictable and cheap. | You cannot say in advance how many steps there are. |
| Agent | The model, from what it just learned. | Open-ended problems where the number of steps can't be predicted: "find why the build is red and fix it". | A mistake is expensive and hard to undo, or you cannot check the result. |

The five workflow shapes in the article are worth knowing by name, because agents are often built from them:

| Pattern | Shape | Example |
| --- | --- | --- |
| Prompt chaining | Steps in sequence, each checked by code before the next. | Draft an outline, check it has five sections, then write each one. |
| Routing | Classify the input, then send it to the right specialist. | Support tickets: refunds go one way, bug reports another. |
| Parallelisation | Run pieces at the same time, then combine. Either split the work ("sectioning") or ask several times and take a vote ("voting"). | Review a file for security and for style in parallel. |
| Orchestrator–workers | One model breaks the job into parts and hands them to workers, then merges the results. | Rewrite five files, each by a separate worker. |
| Evaluator–optimiser | One model produces, another critiques, and they loop. | Translate, have a second pass grade the translation, and revise. |

Pick the workflow when you can draw the diagram before you start. Pick the agent when you can't.

## Common mistakes

- **Treating it like a search engine.** An agent shines when it can *try* things. "Run the tests and fix what fails" beats "what is wrong with my tests".
- **Giving it a job with no way to check the result.** If nothing can tell the agent it is done (a test, a build, a diff you will read), it will decide for itself, and it is optimistic.
- **Building the agent first.** The article's own advice: start with a single call, add a workflow, reach for an agent when the simpler versions run out.
- **Vague tools.** The agent can only use a tool as well as its description. Anthropic's guidance on the agent–computer interface is to document tools the way you would for a new colleague: clear description, example calls, formats that are hard to get wrong, and test them by watching the model use them.

## Where this shows up

- [Level 0: Orientation](/ai-agents/levels/0-orientation/) uses these parts to explain what an agent can and cannot be trusted with.
- [CLAUDE.md, skills, hooks, MCP, and subagents](/ai-agents/concepts/extending-claude-code/) covers the memory and tools parts in one real agent.
- The [cheat sheet](/ai-agents/cheat-sheet/) is the loop's controls: start, steer, stop, undo.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
