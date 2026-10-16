---
title: "Roblox Studio"
description: "Building games in Roblox Studio, from the editor basics to Luau scripting and publishing."
domain: roblox-studio
pageType: overview
status: draft
safetyCritical: false
sources: []
tags: [roblox, roblox-studio, luau, game-development]
sidebar:
  label: Overview
  order: 0
---

This chapter is for anyone who wants to make a real, playable Roblox experience: a complete beginner, or a developer coming from another engine. You need a Windows or macOS computer that meets Studio's requirements and a free Roblox account. You do not need to know how to program. The chapter teaches the editor, the Luau language, the client-server model that every Roblox game runs on, and how to test and publish.

Everything here is built from Roblox's official Creator Hub documentation (create.roblox.com/docs). Roblox changes Studio's menus and its API often, so each page says which docs it was read against. This first pass was read on 2026-09-26 and has not been run in Studio yet: steps that were not copied word for word from the docs carry a visible test-me note, and a page stays a draft until the owner has checked it.

## Roadmap

| Level | Name | You can... |
| --- | --- | --- |
| 0 | Orientation | Name the windows in Studio (Explorer, Properties, Toolbox, Viewport, Output), explain that everything in a place is an Instance in a tree, say which of Script, LocalScript, and ModuleScript runs on the server or the client, and run and stop a playtest. |
| 1 | Beginner | Build an anchored obstacle path, write your first Script, collect coins into a leaderboard, add an upgrade button that the server checks, test with several simulated players, and publish the result. |
| 2 | Intermediate | Split code into ModuleScripts shared by server and client, pass data through RemoteEvents and RemoteFunctions with checked arguments, pause on breakpoints and read variables in the Watch window, and write scripts that survive instance streaming. |
| 3 | Advanced | Diagnose "works for me but not for others" and "works in Studio but not live" bugs by working out which side of the client-server boundary is at fault, and apply the server authority model to movement and game state. |
| 4 | Expert | Run a live experience: keep server logic and data where exploiters cannot read them, roll out updates with server restarts, roll back with version history, and profile scripts with the Developer Console. |
| 5 | Mastery | Explain replication, physics ownership, and the script scheduler well enough to design your own architecture, and read the engine API reference to solve problems no tutorial covers. |

Only Levels 0 and 1 are written so far. The concept pages, the walkthroughs, and the cheat sheet already cover the material Levels 2 to 5 will build on.

**Start here:** [Level 0: Orientation](/roblox-studio/levels/0-orientation/).

See [how these guides work](/about/how-guides-work/) for what the levels, tiers, and page statuses mean.
