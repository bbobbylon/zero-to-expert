---
title: "Install Claude Code and run your first session"
description: "Install the CLI, sign in, ask it about a project you know, make one change, and undo it."
domain: ai-agents
pageType: walkthrough
difficulty: easy
level: 1
status: draft
safetyCritical: false
time: "20 minutes"
tools:
  - "A terminal (PowerShell on Windows, Terminal on macOS)"
  - "A Claude subscription (Pro, Max, Team, or Enterprise) or a Claude Console account"
  - "A project folder you already understand"
sources:
  - title: "Overview"
    url: "https://code.claude.com/docs/en/overview"
    publisher: "Claude Code documentation"
  - title: "Quickstart"
    url: "https://code.claude.com/docs/en/quickstart"
    publisher: "Claude Code documentation"
  - title: "How Claude Code works"
    url: "https://code.claude.com/docs/en/how-claude-code-works"
    publisher: "Claude Code documentation"
  - title: "Choose a permission mode"
    url: "https://code.claude.com/docs/en/permission-modes"
    publisher: "Claude Code documentation"
tags: [claude-code, install, first-session]
sidebar:
  order: 100
---

The first session with a coding agent should be on a project you know well, so you can tell when it is right. This walkthrough installs Claude Code, asks it three questions you already know the answers to, has it make one small change, and undoes that change. Nothing here touches git.

:::note
Claude Code also runs inside VS Code and JetBrains IDEs, as a desktop app, and on the web. The terminal is the version everything else is built on, so start there; the [Editors & IDEs](/ides/) chapter covers the extensions.
:::

## Steps

1. **Install.** Pick the command for your shell. On Windows, the prompt tells you which shell you are in: `PS C:\` is PowerShell, `C:\` alone is Command Prompt.

   | Shell | Command |
   | --- | --- |
   | macOS, Linux, WSL | `curl -fsSL https://claude.ai/install.sh \| bash` |
   | Windows PowerShell | `irm https://claude.ai/install.ps1 \| iex` |
   | Windows Command Prompt | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` |
   | Homebrew (macOS) | `brew install --cask claude-code` |
   | WinGet (Windows) | `winget install Anthropic.ClaudeCode` |

   The native install (first three rows) updates itself in the background. Homebrew and WinGet installs do not: run `brew upgrade claude-code` or `winget upgrade Anthropic.ClaudeCode` yourself. On native Windows, install [Git for Windows](https://git-scm.com/downloads/win) too, so Claude Code gets a Bash tool; without it, it uses PowerShell as its shell.

   > TODO(test): the install commands are copied from the documentation; Claude Code was already installed on the machine used for this page, so none of them were run for it.

2. **Confirm it installed.** Open a new terminal and run:

   ```sh
   claude --version
   ```

   You should see a version number followed by `(Claude Code)`. On my machine that was `2.1.260 (Claude Code)`.

3. **Open a project and sign in.** Change into a project folder and start a session:

   ```sh
   cd path/to/your-project
   claude
   ```

   On first use it prompts you to log in; follow the prompts to finish in your browser. If you have set `ANTHROPIC_API_KEY`, it skips the login and asks you to approve the key instead. Later, `/login` inside a session switches accounts.

4. **Pick a careful permission mode.** Press `Shift+Tab` until the indicator says **plan**. In plan mode Claude explores and proposes but does not edit your files, which is exactly right for a first session. (On Pro, Max, and Team plans the starting mode is **auto**, where a classifier reviews actions instead of you; switch away from it until you have watched a few sessions.)

5. **Ask three things you already know.** Type each one and read the answer against what you know to be true:

   ```text
   what does this project do?
   ```

   ```text
   where is the main entry point?
   ```

   ```text
   explain the folder structure
   ```

   Claude reads the files it needs; you do not have to paste anything in. Judge it the way you would judge a new colleague's first-day summary.

6. **Make one small change.** Press `Shift+Tab` to leave plan mode for **manual** (the indicator shows no mode name, or `default`), then ask for something tiny with a checkable result, for example:

   ```text
   add a hello world function to the main file
   ```

   Claude finds the file and shows the change. When it asks before editing, read the diff, then choose **Yes**.

7. **Undo it.** Press `Esc` twice to open the rewind, and restore the state from before the edit. File edits are checkpointed before they happen, so this always works for local file changes. (It does not cover anything that left the machine: pushes, deploys, API calls.)

8. **Leave.** Type `/exit`, or press `Ctrl+D` twice.

> TODO(test): steps 3 to 8 describe an interactive session and were written from the documentation, not exercised while writing this page. Check the mode names against what your version shows.

## Check it worked

- `claude --version` prints a version and `(Claude Code)`.
- The three answers in step 5 matched what you know about the project.
- After step 7, the file is back to how it was (`git diff` shows nothing for it if the project is in git).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `The token '&&' is not a valid statement separator` | You ran the Command Prompt install line in PowerShell | Use the PowerShell line (`irm ... \| iex`) |
| `'irm' is not recognized as an internal or external command` | You ran the PowerShell line in Command Prompt | Use the Command Prompt line, or open PowerShell |
| Install fails with a `403`, `syntax error near unexpected token '<'`, or another curl error | Network or proxy in the way | The documentation's [installation troubleshooting](https://code.claude.com/docs/en/troubleshoot-install) page matches the error to a fix and lists alternative install methods |
| `claude` is not found after install | The terminal was open before the install changed `PATH` | Open a new terminal |
| It asks to approve an API key you did not expect | `ANTHROPIC_API_KEY` is set in your environment | Unset it if you meant to sign in with a subscription |
| It edits files without asking | The session started in auto mode (Pro/Max/Team) or accept-edits mode | `Shift+Tab` to manual or plan; `/permissions` to see the rules |

## Next

[Level 0: Orientation](/ai-agents/levels/0-orientation/) explains what you just drove, and the [cheat sheet](/ai-agents/cheat-sheet/) lists the commands and shortcuts by how often you will need them.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
