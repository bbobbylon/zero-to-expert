---
title: "Level 0: Orientation"
description: "The five parts every code editor's window is built from, in VS Code's and IntelliJ IDEA's own words, which editor to reach for, and the one habit — ask by name — that carries over between them."
domain: ides
pageType: level
level: 0
status: draft
safetyCritical: false
sources:
  - title: "User interface"
    url: "https://code.visualstudio.com/docs/getstarted/userinterface"
    publisher: "Visual Studio Code Docs"
  - title: "User interface"
    url: "https://www.jetbrains.com/help/idea/guided-tour-around-the-user-interface.html"
    publisher: "JetBrains IntelliJ IDEA Help"
  - title: "Discover IntelliJ IDEA"
    url: "https://www.jetbrains.com/help/idea/discover-intellij-idea.html"
    publisher: "JetBrains IntelliJ IDEA Help"
  - title: "Extension Marketplace"
    url: "https://code.visualstudio.com/docs/configure/extensions/extension-marketplace"
    publisher: "Visual Studio Code Docs"
  - title: "Install plugins"
    url: "https://www.jetbrains.com/help/idea/managing-plugins.html"
    publisher: "JetBrains IntelliJ IDEA Help"
  - title: "Settings Sync"
    url: "https://code.visualstudio.com/docs/configure/settings-sync"
    publisher: "Visual Studio Code Docs"
  - title: "Share your IDE settings"
    url: "https://www.jetbrains.com/help/idea/sharing-your-ide-settings.html"
    publisher: "JetBrains IntelliJ IDEA Help"
  - title: "Searching Everywhere"
    url: "https://www.jetbrains.com/help/idea/searching-everywhere.html"
    publisher: "JetBrains IntelliJ IDEA Help"
tags: [vscode, intellij, ide, orientation]
sidebar:
  order: 10
---

## What you'll be able to do

By the end of Level 0 you can:

- Name the five parts of a code editor's window and point to each one on screen, whether it's labelled the VS Code way or the IntelliJ way.
- Pick VS Code or IntelliJ IDEA for a given job, and say why the other would be the wrong tool for it.
- Open the one search box each editor is built around, and reach a command, a file, or a setting by typing its name instead of hunting a menu.
- Say what installing an extension or plugin does, and what "syncing your setup" backs up.
- Go to the right tips page or the cheat sheet for the job in front of you.

## Learning path

This guide has no walkthroughs yet, so the path pairs each idea below with something to try in whichever editor you have installed. If you have neither yet, install VS Code, IntelliJ IDEA (the Community/free tier is enough), or both before starting.

| # | Read | Then do | You'll have |
| --- | --- | --- | --- |
| 1 | [The five parts of the window](#the-five-parts-of-the-window) | Open your editor and find all five, using whichever column matches it | The window's layout named, not just recognised |
| 2 | [Ask by name](#ask-by-name-the-one-habit-that-carries-over) | Open the Command Palette or Search Everywhere and open a file by typing part of its name | The one habit both tips pages build on |
| 3 | [Extensions and plugins](#extensions-and-plugins-how-each-editor-grows) | Install one extension or plugin you'll actually use | A marketplace you know how to reach again |
| 4 | [Which editor for the job](#which-editor-for-the-job) | — | A default answer for "which one do I open?" |
| 5 | — | Read the [VS Code tips](/ides/concepts/vscode-tips/) or [IntelliJ tips](/ides/concepts/intellij-tips/) page for whichever editor you use daily | The shortcuts behind the habit from step 2 |

## The five parts of the window

Every code editor arranges the same five stations; VS Code and IntelliJ IDEA just name them differently. Analogy: a cockpit. Different aircraft put the altimeter in a different spot on the panel, but every panel has one, along with a control column, a throttle, and instruments for the engines and the radio. Learn the five stations once and a new aircraft is a relabelling exercise, not a fresh start.

| Station | What it's for | VS Code calls it | IntelliJ IDEA calls it |
| --- | --- | --- | --- |
| The switcher | A strip of icons on the edge that changes which side panel is showing (files, search, version control...) | **Activity Bar** | **Tool window bar** |
| The tree | Lists your project's files and folders | **(Primary) Side Bar**, showing the Explorer view | **Project tool window** |
| The page | Where you actually read and write code, with tabs across the top for open files | **Editor** (its tabs are **Tabs**) | **Editor** |
| The output | Terminal, build output, and problems, below the editor | **Panel** | Bottom **tool windows** (Run, Debug, Terminal, Version Control...) |
| The strip | A thin bar along the very bottom with project and process status | **Status Bar** | **Status bar** |

Two extras worth knowing the names of, because both editors use the same idea for the same reason — a clickable trail of "where am I" above the editor:

- VS Code calls its trail **Breadcrumbs**: the file's path, then the symbol (class, method) your cursor sits inside.
- IntelliJ calls the equivalent the **Navigation bar**: the project structure down to the current file, and it doubles as a lightweight alternative to the Project tool window.

VS Code also has a **Secondary Side Bar** on the opposite edge from the Primary one (by default it holds its Chat view); IntelliJ's Tool window bars run on both the left and right edges, so the same "more tool windows live opposite the main one" idea applies there too.

## Ask by name: the one habit that carries over

Both editors are built around one search box that finds *anything* — a command, a file, a setting, a symbol — by name, so you stop needing to know which menu something lives under. VS Code calls it the **Command Palette**; IntelliJ splits the same idea into **Search Everywhere** (files, classes, symbols, actions, settings, in one tabbed popup) and **Find Action** (actions and settings only, IntelliJ's closest match to the Palette). Learn whichever your editor uses first, before any shortcut on this page's cheat sheet — every shortcut listed there is something you could also have just typed into this box.

| | VS Code | IntelliJ IDEA |
| --- | --- | --- |
| Open it | `Ctrl+Shift+P` / `⇧⌘P` | Search Everywhere: Double Shift · Find Action: `Ctrl+Shift+A` / `⌘⇧A` |
| Full tips | [Command Palette section](/ides/concepts/vscode-tips/#the-command-palette-the-one-entry-point) | [Search Everywhere section](/ides/concepts/intellij-tips/#search-everywhere-and-find-action-the-one-entry-point) |

## Which editor for the job

Both are general-purpose code editors, but they're built for different weights of project.

| | VS Code | IntelliJ IDEA |
| --- | --- | --- |
| Strongest at | Fast, lightweight editing across many languages: web front ends, scripts, config, Markdown — this site was written in it | Deep, language-aware tooling for one platform: the JVM (Java, Kotlin, Groovy, Scala), with project-model-driven navigation and refactoring |
| Starts up and edits | Near-instantly, on modest hardware | Slower to open a project (it builds a project model first), but that model is what powers its navigation and refactors |
| Out of the box | A capable general editor; language depth arrives through extensions | Java, Maven/Gradle, Git, and run/debug are core from the first launch |
| Spring Boot support | None built in; you'd script everything by hand | Full on Ultimate, syntax-only on the free tier below 2025.3 — see [Community vs Ultimate](/ides/concepts/intellij-tips/#community-vs-ultimate) for the exact split |
| Pick it when | The project is JavaScript/TypeScript, Astro, a script, or anything that isn't JVM-based | The project is Java or Kotlin, especially a Spring Boot backend, and you want the IDE to understand the code, not just colour it |

A common split in a full-stack project: VS Code for a JavaScript/TypeScript front end (or a site like this one), IntelliJ IDEA for a Java or Spring Boot backend — the two aren't competitors so much as tools for the two different halves of the stack.

## Extensions and plugins: how each editor grows

Neither editor tries to know every language on day one. Both grow through a marketplace: VS Code's **Extension Marketplace** (`Ctrl+Shift+X` / `⇧⌘X` opens the Extensions view) and IntelliJ's **Plugins** page under Settings. The difference is depth, not existence: a VS Code extension typically adds syntax highlighting, a linter, or a debugger for one more language; an IntelliJ plugin can reach deeper into the IDE's own project model, which is how the Spring-aware features on the Ultimate tier are delivered. Either way, install only what you'll use — every extension or plugin is something that can also go wrong, and both tips pages cover disabling one as the first troubleshooting step ([VS Code](/ides/concepts/vscode-tips/#common-mistakes), [IntelliJ](/ides/concepts/intellij-tips/#common-mistakes)).

## Keep your setup with you

Both editors can carry your settings, keybindings, and extensions or plugins to a new machine: VS Code's **Settings Sync**, tied to a Microsoft or GitHub account, and IntelliJ's **Backup and Sync**, tied to a JetBrains Account. Turn either on once you've set the editor up the way you like it, and a fresh install on another machine starts from where you left off instead of from scratch.

## Practice project

Open whichever editor you'll use for your next project. Use its "ask by name" box (the Command Palette or Search Everywhere) to open a file without touching the mouse, toggle the terminal panel on and off, and install one extension or plugin you expect to actually use. Then find and rename one setting through the box instead of a menu — in VS Code, the Settings editor; in IntelliJ, `/` inside Search Everywhere jumps straight to a settings group. Finish by locating the five stations from the table above on your actual screen.

## Check yourself

1. Your project's file tree, the terminal, and the current file's tabs are three different stations. Name the fifth.
2. What does VS Code call its "ask by name" box? What does IntelliJ call the two halves of the same idea?
3. You're starting a Spring Boot backend from scratch. Which editor, and why?
4. An extension you installed last week seems to be slowing VS Code down. What's the first thing to try, before uninstalling anything?
5. You set up your editor exactly how you like it and are about to reinstall Windows. What feature saves you from redoing that work?

<details>
<summary>Answers</summary>

1. The Status Bar / status bar — the thin strip along the very bottom.
2. VS Code: the Command Palette. IntelliJ: Search Everywhere (files, classes, symbols, actions, settings together) and Find Action (actions and settings only).
3. IntelliJ IDEA — it understands Java and Maven/Gradle out of the box, and with Ultimate, Spring itself, none of which VS Code provides natively.
4. Disable the extension (or run with `--disable-extensions`) to confirm it's the cause before uninstalling; VS Code's Extension Bisect can find the culprit among several without you toggling each one by hand.
5. Settings Sync (VS Code) or Backup and Sync (IntelliJ) — both back up settings, keybindings, and extensions/plugins to your account.

</details>

## Next

Level 1 is not written yet. Until it is, the [cheat sheet](/ides/cheat-sheet/) lists the shortcuts from both tips pages by how often you'll need them, and the [VS Code](/ides/concepts/vscode-tips/) and [IntelliJ](/ides/concepts/intellij-tips/) tips pages are the full reference for each editor.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
