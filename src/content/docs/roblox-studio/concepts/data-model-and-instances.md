---
title: "The data model and Instances"
description: "Why everything in a Roblox place is an Instance in a tree, what the top-level services are for, and how scripts find things in that tree."
domain: roblox-studio
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Data model"
    url: "https://create.roblox.com/docs/projects/data-model"
    publisher: "Roblox Creator Hub documentation"
  - title: "Explorer window"
    url: "https://create.roblox.com/docs/studio/explorer"
    publisher: "Roblox Creator Hub documentation"
  - title: "Properties window"
    url: "https://create.roblox.com/docs/studio/properties"
    publisher: "Roblox Creator Hub documentation"
  - title: "Instance"
    url: "https://create.roblox.com/docs/reference/engine/classes/Instance"
    publisher: "Roblox Creator Hub documentation"
  - title: "Services"
    url: "https://create.roblox.com/docs/scripting/services"
    publisher: "Roblox Creator Hub documentation"
  - title: "Models"
    url: "https://create.roblox.com/docs/parts/models"
    publisher: "Roblox Creator Hub documentation"
  - title: "Techniques and conversion (instance streaming)"
    url: "https://create.roblox.com/docs/workspace/streaming/techniques"
    publisher: "Roblox Creator Hub documentation"
  - title: "Greybox a playable area"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/building/greybox-a-playable-area"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, data-model, instance, explorer, services]
sidebar:
  order: 50
---

## The one-line version

A Roblox place is one big tree of objects called **Instances**. Parts, scripts, lights, folders, and even the Players who join are all Instances, each with a parent and any number of children. The Explorer window draws that tree, and every script you write finds things by walking it.

Analogy: the tree is the folder structure on your computer. A file can only live in one folder at a time (an Instance has exactly one parent), folders can nest, and the top-level folders (the services) each have a special job, such as "things that appear in the 3D world" or "things only the server may touch".

## How it works

### The tree and the Instance class

The **data model** is the hierarchy of objects that represents everything in a place. It is the engine's source of truth for the place's state. **Instance** is the base class every Roblox object inherits from, so every object shares the same generic pieces:

| Piece | What it is | Everyday analogy | Example |
| --- | --- | --- | --- |
| Property | A named value describing how the object looks or behaves | The dial position on a light switch | `Transparency`, `Anchored`, `Name` |
| Method | Something you can tell the object to do | Flipping the switch | `:Destroy()`, `:Clone()`, `:FindFirstChild("Door")` |
| Event | Something the object announces when it happens | The doorbell | `.Touched`, `.PlayerAdded` |

The Explorer window shows the tree. The Properties window shows the properties of whatever is selected, grouped into sections such as Appearance and Transform. Both open from the **Window** menu or the **Home** tab.

### Services: the top-level branches

At the top of the tree sit **services**: container objects that each have a specific job. As listed in the Data model docs (read 2026-09-26):

| Service | What it is for |
| --- | --- |
| `Workspace` | Everything in the 3D world that renders on clients |
| `Lighting` | Global lighting, atmosphere, and sky settings |
| `ReplicatedStorage` | Objects available to both the server and connected clients: shared resources such as ModuleScripts and RemoteEvents |
| `ReplicatedFirst` | Essential objects replicated to a client first when it joins (the docs suggest it for a minimal loading screen) |
| `ServerScriptService` | Server-only `Script` and `ModuleScript` objects. Its scripts are never replicated to clients, which is what makes server-side logic secure. |
| `ServerStorage` | Server-only objects to clone at runtime. Scripts do not run here, but scripts in `ServerScriptService` can `require` ModuleScripts stored here. |
| `StarterGui` | GUI objects copied into each player's `PlayerGui` |
| `StarterPack` | Tools copied into each player's `Backpack` |
| `StarterPlayer` | Holds `StarterPlayerScripts` and `StarterCharacterScripts` |
| `Players` | At runtime, the container for the `Player` objects |

### Edit tree versus runtime tree

What you build in Studio is the **edit** data model. What runs when you playtest or when players join is the **runtime** data model. When a client connects, the server copies objects from the "Starter" containers into that player's own branch of `Players`: `StarterGui` becomes `PlayerGui`, `StarterPack` becomes `Backpack`, `StarterPlayerScripts` becomes `PlayerScripts`, and `StarterCharacterScripts` is copied into the character each time it spawns. The docs also note that the contents of `PlayerGui` are emptied when a player respawns (the upgrade-button walkthrough turns off `ResetOnSpawn` on its GUI, following the official tutorial).

```
game (DataModel)
├── Workspace
│   ├── World (Folder)            <- your own organization
│   │   └── Blockout_Parts (Model)
│   └── SpawnLocation
├── ReplicatedStorage
├── ServerScriptService
├── ServerStorage
├── StarterGui
├── StarterPack
├── StarterPlayer
│   ├── StarterPlayerScripts
│   └── StarterCharacterScripts
└── Players            <- at runtime, one Player per person
```

### How a script finds things in the tree

A script starts from `game` and gets a service with `game:GetService("Name")`. The docs say to retrieve a service once per script and to name the variable after the service:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
```

From a service or any Instance, you have three ways to reach a child:

| Way | Written as | If the child is missing | Use it when |
| --- | --- | --- | --- |
| Dot | `Workspace.World.Coins` | Raises an error | You know for certain it exists, for example an object you placed in Studio in a server script |
| `FindFirstChild` | `parent:FindFirstChild("Door")` | Returns `nil` | The child may legitimately not exist. Check the result with `if door then`. |
| `WaitForChild` | `parent:WaitForChild("Door")` | Waits until it appears. With a timeout as the second argument, it returns `nil` when the time runs out. Without one, Studio prints a warning after 5 seconds. | The child will exist soon but not yet (client scripts, streamed content) |

Roblox makes no guarantees about loading order, which is why the docs use `WaitForChild` when a script requires something stored in `ReplicatedStorage`.

## Choosing between options

### Folder or Model

| | Folder | Model |
| --- | --- | --- |
| What it is | A plain container for organizing the Explorer | A container for physical objects: parts, welds, joints, other models |
| Extra behavior | None | Can be moved as one object (`PivotTo`, `MoveTo`), has a `PrimaryPart` and pivot, and is destroyed if it falls below `Workspace.FallenPartsDestroyHeight` |
| Make one by | Hover over the parent, click the plus button, choose Folder. Or select several objects, right-click, **Group As a Folder** | Select the objects, right-click, **Group** (`Ctrl+G` on Windows, `Cmd+G` on Mac) |
| Use it for | Sorting things: a `Coins` folder, a `Hazards` folder | Anything that should move, spawn, or be positioned as one physical object |

Pick a Folder when you are only organizing, and a Model when the group is a physical thing. The Roblox greybox tutorial does both: a `World` Folder in `Workspace` holds a `Blockout_Parts` Model. It also warns that names are case-sensitive, which matters as soon as a script looks something up by name.

### Where to keep a value: property, attribute, or ValueObject

| Option | What it is | Use it when |
| --- | --- | --- |
| Property | A built-in field on the class (`Transparency`) | It already exists for what you need |
| Attribute | Custom data you add to any Instance in the Properties window (**Attributes** section, plus button) or in code with `SetAttribute` and `GetAttribute`. `GetAttribute` returns `nil` if unset. | You want a small custom value on one object, such as a coin's `Enabled` flag |
| Value object | An Instance such as `IntValue` with a `Value` property | Something else needs to see the value as an object. Roblox's leaderboard reads `IntValue` children of a player's `leaderstats` folder. |

## Common mistakes

- **Putting a script where it never runs.** Scripts in `ServerStorage` do not run. Scripts belong in `ServerScriptService`, `Workspace`, or a client container, depending on the job. See [Client, server, and script types](/roblox-studio/concepts/client-server-and-scripts/).
- **Trusting a dot path on the client.** With instance streaming on, `workspace.House1.Door` raises an error if any part of the path has not streamed in, and `FindFirstChild` returns `nil` for content that is not there yet. Use `WaitForChild` (with a timeout) when you need it, or check for `nil` when you can carry on without it.
- **Misspelling a name.** A script that asks for `Workspace.World.Coins` fails if the Folder is called `Coin` or `coins`. Names are case-sensitive.
- **Setting `Parent` too early.** Roblox's `Instance` docs recommend setting `Parent` last when you create an object in code and set several properties on it, because parenting into a replicated container sends the object to everyone.
- **Using `Destroy` loosely.** `Destroy` sets the parent to `nil`, locks the parent, disconnects all connections, and destroys the children. It is the right way to dispose of an Instance you are done with, and you cannot reuse it afterwards.

## Where this shows up

- [Level 0: Orientation](/roblox-studio/levels/0-orientation/) names the windows and services.
- [Client, server, and script types](/roblox-studio/concepts/client-server-and-scripts/) explains which containers run which scripts.
- [Write your first script](/roblox-studio/walkthroughs/3-write-your-first-script/) uses `script.Parent` and events on an Instance.
- [Collect coins and show a leaderboard](/roblox-studio/walkthroughs/4-collect-coins-and-show-a-leaderboard/) uses folders, attributes, `ServerStorage`, and value objects together.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
