---
title: "CLAUDE.md, skills, hooks, MCP, and subagents: which one when"
description: "The five ways to change what a coding agent knows and does, what each costs, and how to pick."
domain: ai-agents
pageType: explanation
level: 2
status: draft
safetyCritical: false
sources:
  - title: "How Claude remembers your project"
    url: "https://code.claude.com/docs/en/memory"
    publisher: "Claude Code documentation"
  - title: "Extend Claude with skills"
    url: "https://code.claude.com/docs/en/skills"
    publisher: "Claude Code documentation"
  - title: "Automate actions with hooks"
    url: "https://code.claude.com/docs/en/hooks-guide"
    publisher: "Claude Code documentation"
  - title: "Connect Claude Code to tools via MCP"
    url: "https://code.claude.com/docs/en/mcp"
    publisher: "Claude Code documentation"
  - title: "Create custom subagents"
    url: "https://code.claude.com/docs/en/sub-agents"
    publisher: "Claude Code documentation"
  - title: "Settings files and precedence"
    url: "https://code.claude.com/docs/en/settings"
    publisher: "Claude Code documentation"
  - title: "How Claude Code works"
    url: "https://code.claude.com/docs/en/how-claude-code-works"
    publisher: "Claude Code documentation"
tags: [claude-code, claude-md, skills, hooks, mcp, subagents]
sidebar:
  order: 51
---

## The one-line version

A coding agent starts every session knowing nothing about your project. There are five ways to fix that, and they are not interchangeable: one is a handbook it reads every time, one is a procedure it pulls out for a specific job, one is a lock that works whether or not it agrees, one is a badge into other systems, and one is a colleague it can hand work to.

Think of onboarding a contractor. You give them the site handbook (**CLAUDE.md**). You keep the detailed procedures in a binder they open only when that job comes up (**skills**). You fit locks and alarms that go off regardless of what anyone decides (**hooks**). You issue a badge that opens the doors to other buildings (**MCP**). And when the job is too big, you let them bring in a specialist and just take the report (**subagents**).

This page uses Claude Code's names and paths. The pattern is the same in other agents; the file names differ.

## How each one works

### CLAUDE.md: the handbook

A Markdown file Claude reads at the start of every session. It is context, not configuration: the model treats it as instructions, so specific and short beats long and vague. The documentation's target is under 200 lines per file.

| File | Who it applies to | Put here |
| --- | --- | --- |
| `~/.claude/CLAUDE.md` | You, in every project | Personal style, your own shortcuts |
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Everyone in the repository | Build commands, architecture, conventions, review checklists |
| `./CLAUDE.local.md` | You, in this project (add to `.gitignore`) | Sandbox URLs, test data, private notes |
| `.claude/rules/*.md` | The repository, one topic per file; can be scoped to file paths | Rules that only matter for some files |

Files from the working directory and every directory above it load at launch; files in subdirectories load when Claude reads something there. `@path/to/file` inside a CLAUDE.md imports another file. `/init` writes a starting CLAUDE.md from what it finds in the project; `/memory` opens the files for editing.

Claude Code also keeps **auto memory**: notes it writes itself from your corrections, loaded at the start of each session (the first 200 lines or 25 KB of its `MEMORY.md`). You write CLAUDE.md to steer it; auto memory is it learning from being steered.

### Skills: the procedure binder

A skill is a folder with a `SKILL.md`: YAML frontmatter that says what it is for, then Markdown instructions. Unlike CLAUDE.md, the content loads only when the skill is invoked, so long reference material costs nothing until it is needed. You invoke one by typing `/skill-name`; Claude can also invoke it on its own when the `description` matches what you are doing.

| Location | Path | Loads in |
| --- | --- | --- |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This repository |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Wherever the plugin is enabled, as `/plugin:name` |

Frontmatter worth knowing: `description` (how Claude decides to use it), `disable-model-invocation: true` (only you can run it; use for deploys and commits), `user-invocable: false` (only Claude runs it; background knowledge), `allowed-tools` (tools pre-approved for that turn), and `$ARGUMENTS` in the body for whatever you typed after the name. The older `.claude/commands/<name>.md` files still work; skills are the current form.

### Hooks: the locks and alarms

A hook is a shell command Claude Code runs at a fixed point in its lifecycle. This is the one mechanism on this page that does not depend on the model's judgement: CLAUDE.md can *ask* Claude not to touch a file, a `PreToolUse` hook can *stop* it. Hooks live under a `hooks` key in a settings file; `/hooks` shows what is configured (read-only; edit the JSON to change them).

| Event | Fires | Typical use |
| --- | --- | --- |
| `SessionStart` | When a session begins or resumes | Inject context, load environment variables |
| `UserPromptSubmit` | When you send a prompt, before Claude sees it | Add context, block prompts |
| `PreToolUse` | Before a tool call; can block it | Protect files, deny risky commands |
| `PostToolUse` | After a tool call succeeds | Run a formatter after every edit |
| `Notification` | When Claude is waiting for input or permission | Desktop notification |
| `Stop` | When Claude finishes responding | Final checks |
| `PreCompact` | Before context compaction | Save what matters |
| `SessionEnd` | When a session ends | Clean up |

A hook that exits with code 2 blocks the action and its stderr goes back as the reason. Other events exist (`SubagentStop`, `PostToolUseFailure`, `ConfigChange`, and more); the reference lists them all.

### MCP: the badge

The Model Context Protocol is an open standard for connecting agents to outside tools and data: issue trackers, databases, design tools, your own services. Once a server is connected, Claude can read from and act on that system directly instead of working from what you paste in.

```sh
claude mcp add --transport http <name> <url>      # remote server over HTTP
claude mcp add <name> -- <command> [args...]        # local process (stdio)
claude mcp list                                     # what is configured
claude mcp get <name>
claude mcp remove <name>
```

Scope decides who gets it: `--scope local` (this project, just you; the default), `--scope project` (written to `.mcp.json` and shared through version control), `--scope user` (all your projects). `/mcp` inside a session shows status and completes OAuth sign-in for servers that need it.

> TODO(test): the `claude mcp add` forms above are from the documentation and were not run on this machine during this pass; `claude mcp` appears in `claude --help` on 2.1.260.

### Subagents: the specialist

A subagent is a separate Claude with its own context window, its own system prompt, and its own tool list. The main conversation delegates a task, the subagent works, and only a summary comes back, so a long exploration does not fill your context. Built in: **Explore** (fast, read-only search), **Plan** (research before proposing a plan), and **General-purpose**.

Custom ones are Markdown files with frontmatter:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. Give specific, actionable feedback.
```

Put them in `.claude/agents/` (this project, can be committed) or `~/.claude/agents/` (all your projects). `tools` restricts what it can do; `model` lets a cheap, fast model handle the reading. Ask for one by name ("use the code-reviewer subagent"), or set `claude --agent <name>` for the whole session.

## Choosing between options

| Mechanism | Loads | Enforced by | Costs context | Use for |
| --- | --- | --- | --- | --- |
| CLAUDE.md | Every session, at start | The model's judgement | Always | Things Claude must know every time: commands, conventions, what not to touch |
| Skill | When invoked | The model's judgement | Only when used | Long procedures and reference material; repeatable jobs like `/deploy-staging` |
| Hook | At the event, every time | Your shell script | None | Anything that must *always* happen or *never* happen: format on save, block `rm -rf`, protect files |
| MCP server | When Claude calls its tools | The server's own permissions | Tool names until used | Reaching systems outside the repository |
| Subagent | When delegated to | Its own tool list | A summary | Work that would flood your context, or that needs a narrower tool set |

The test I use: if it is a *fact*, it goes in CLAUDE.md. If it is a *procedure*, it is a skill. If it is a *rule that cannot be broken*, it is a hook. If it needs *another system*, it is MCP. If it is *a lot of reading*, it is a subagent.

### Settings and permissions

All of the above sit on top of settings files, which also hold the permission rules that decide what Claude may do without asking:

| File | Applies to |
| --- | --- |
| `~/.claude/settings.json` | You, every project |
| `.claude/settings.json` | Everyone in the project (commit it) |
| `.claude/settings.local.json` | You, this project only (Claude Code keeps it out of git when it creates the file) |
| Managed settings | Everyone your organisation deploys it to; nothing you set overrides it |

Higher rows lose to lower ones for the same key, managed settings win over everything, and list keys such as `permissions.allow` combine rather than replace. Settings are strict JSON: a trailing comma breaks the file. Where a rule must hold regardless of what the model decides, the documentation's own guidance is to use settings or hooks, not CLAUDE.md.

## Common mistakes

- **A 600-line CLAUDE.md.** Adherence drops as the file grows. Move procedures to skills and file-specific rules to `.claude/rules/`.
- **Using CLAUDE.md as a lock.** "Never edit `schema.sql`" is a request. A `PreToolUse` hook on `Edit|Write` that checks the path is a lock.
- **Contradictory instructions across files.** When two rules disagree, the model picks one. Review the user, project, and local files together now and then.
- **Committing `settings.local.json`.** It is yours; the shared file is `settings.json`.
- **Letting a skill run itself when it has side effects.** Deploy and commit skills get `disable-model-invocation: true`.

## Where this shows up

- [Level 0: Orientation](/ai-agents/levels/0-orientation/) introduces the memory and tools these mechanisms feed.
- [What an AI agent actually is](/ai-agents/concepts/what-is-an-agent/) explains why the context window is finite and why that matters here.
- The [cheat sheet](/ai-agents/cheat-sheet/) lists the commands (`/init`, `/memory`, `/hooks`, `/mcp`, `claude mcp ...`) by how often you need them.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
