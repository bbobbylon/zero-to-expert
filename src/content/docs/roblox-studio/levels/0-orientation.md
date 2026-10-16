---
title: "Level 0: Orientation"
description: "Name every part of the Studio window, picture a place as a tree of Instances, and know the difference between a Part, a server, a client, and a playtest before you build anything."
domain: roblox-studio
pageType: level
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Get Studio"
    url: "https://create.roblox.com/docs/studio/setup"
    publisher: "Roblox Creator Hub documentation"
  - title: "Studio interface overview"
    url: "https://create.roblox.com/docs/studio/ui-overview"
    publisher: "Roblox Creator Hub documentation"
  - title: "Explorer window"
    url: "https://create.roblox.com/docs/studio/explorer"
    publisher: "Roblox Creator Hub documentation"
  - title: "Properties window"
    url: "https://create.roblox.com/docs/studio/properties"
    publisher: "Roblox Creator Hub documentation"
  - title: "Toolbox"
    url: "https://create.roblox.com/docs/projects/assets/toolbox"
    publisher: "Roblox Creator Hub documentation"
  - title: "Output"
    url: "https://create.roblox.com/docs/studio/output"
    publisher: "Roblox Creator Hub documentation"
  - title: "Data model"
    url: "https://create.roblox.com/docs/projects/data-model"
    publisher: "Roblox Creator Hub documentation"
  - title: "Parts"
    url: "https://create.roblox.com/docs/parts"
    publisher: "Roblox Creator Hub documentation"
  - title: "BasePart"
    url: "https://create.roblox.com/docs/reference/engine/classes/BasePart"
    publisher: "Roblox Creator Hub documentation"
  - title: "Client-server runtime"
    url: "https://create.roblox.com/docs/projects/client-server"
    publisher: "Roblox Creator Hub documentation"
  - title: "Script types and locations"
    url: "https://create.roblox.com/docs/scripting/locations"
    publisher: "Roblox Creator Hub documentation"
  - title: "Studio testing modes"
    url: "https://create.roblox.com/docs/studio/testing-modes"
    publisher: "Roblox Creator Hub documentation"
  - title: "Place files"
    url: "https://create.roblox.com/docs/projects/place-files"
    publisher: "Roblox Creator Hub documentation"
  - title: "Roblox experiences"
    url: "https://create.roblox.com/docs/experiences"
    publisher: "Roblox Creator Hub documentation"
  - title: "Build your first experience (Island Jump curriculum)"
    url: "https://create.roblox.com/docs/tutorials/first-experience"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create a project"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/building/create-a-project"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, studio, orientation, fundamentals]
sidebar:
  order: 10
---

:::caution[Not yet run in Studio]
This page was written from the official Roblox Creator Hub documentation, read on 2026-09-26. It has not been checked by running Studio, and Studio's menus and layout change often. Where a label or path looks different on your screen, trust your screen and tell the owner.
:::

## What you'll be able to do

- Name the parts of the Studio window and say what each one is for.
- Explain what a **place**, an **experience**, and a **playtest** are.
- Describe a place as a tree of **Instances** and name the top-level services.
- Explain what a **Part** is and what **Anchored**, **CanCollide**, and **Transparency** decide.
- Say which code runs on the **server**, which on the **client**, and why that split exists.
- Start the right kind of playtest and read the **Output** window.

## Concepts

### The big picture: a workshop with a stage

Analogy: Studio is a **workshop with a stage in the middle**. The stage is the **3D viewport**, where your world appears. Around it are stations: a parts list (**Explorer**), a settings panel for whatever you are holding (**Properties**), a shelf of ready-made pieces (**Toolbox**), and a log book where the stage manager writes down what went wrong (**Output**). When you press Play, the workshop becomes a rehearsal: Studio pretends to be a Roblox server and a player, and you watch your own show.

Vocabulary, in the docs' terms:

| Word | Means | Everyday comparison |
| --- | --- | --- |
| **Experience** (older docs say **game**) | A playable 3D world that players can join | A theme park |
| **Place** | One 3D space inside an experience, saved as a place file | One ride or one zone in the park |
| **Instance** | Any object in a place: a Part, a Script, a light, a folder | An item in a warehouse database |
| **Property** | A setting on an Instance, such as `Anchored` | The dial position on a light switch |
| **Playtest** | Running your place inside Studio to try it | A dress rehearsal |
| **Publish** | Sending your place to Roblox so other people can play it | Opening the park to visitors |

The docs describe the normal loop as **create, script, test, publish**, and this guide follows it in that order.

### Get Studio (as documented on 2026-09-26)

Studio is free. The docs list these system requirements:

| | Minimum | Recommended |
| --- | --- | --- |
| Operating system | Windows 10 or macOS 10.14 | Windows 11 or macOS 14 and up |
| Memory | 3 GB | 8 GB |
| Screen resolution | Not stated | 1600 by 900 or higher |

You download the installer from the Roblox website (`RobloxStudio.exe` on Windows, `RobloxStudio.dmg` on Mac), launch Studio when the installer finishes, and sign in with your Roblox account. The [first walkthrough](/roblox-studio/walkthroughs/1-install-studio-and-open-a-template/) covers each step. Studio updates itself: an **Update** button appears in the upper-right corner when a new version is available, and it asks you to save and close your place first.

### The Studio window

The top of the window is the **mezzanine**: playtest controls on the left, collaboration and account options on the right, and the toolbar tabs in the middle. The default tabs are **Home**, **Model**, **Avatar**, **UI**, **Script**, and **Plugins**. Under the tabs sit the tools for whichever tab is active.

| Window | What it is for | Open it from | Shortcut listed in the docs |
| --- | --- | --- | --- |
| **3D Viewport** | The view of your world. You move the camera, select objects, and playtest here. | Always visible | See camera controls below |
| **Explorer** | A hierarchical list of every Instance in the place | **Window** menu or **Home** tab | `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac) jumps to its search box |
| **Properties** | The settings of the selected object, grouped in sections such as Appearance and Transform | **Window** menu or **Home** tab | `Ctrl+Shift+P` or `Cmd+Shift+P` jumps to its filter |
| **Toolbox** | Models, images, meshes, audio, plugins, videos, and fonts from Roblox and the community, plus your own published creations | **Window** menu or **Home** tab | None listed |
| **Output** | Script errors, engine messages, and everything your scripts `print()` or `warn()` | **Window** menu or **Script** tab | `Ctrl+K` or `Cmd+K` clears it |
| **Asset Manager** | Manages places, images, meshes, audio, and bulk imports | **Window** menu or **Home** tab | None listed |
| **Command Bar** | Runs a line of Luau code without a script | **Script** tab or **Window** > **Script** | `Ctrl+9` or `Cmd+9` |

If a window is missing, reopen it from the **Window** menu. You can drag windows to redock them, group them as tabs, pin them to an edge, or leave them floating.

> TODO(source): how to reset Studio's window layout to the default. The interface docs read on 2026-09-26 do not describe a reset.

The **Home** tab holds the transform tools, the Part inserter, the color and material widgets, and grouping, locking, and anchoring. The **Model** tab adds pivot and align tools, effects, constraints, and solid-modeling tools. The **Script** tab holds the script and debugging tools.

**Camera controls in the viewport** (as documented):

| Do this | To do this |
| --- | --- |
| `W` `A` `S` `D` | Move forward, left, back, right |
| `Q` and `E` | Move down and up |
| Hold `Shift` while moving | Change camera speed |
| `F` | Focus on the selected object |
| Hold right mouse button and drag | Rotate the view |
| Mouse wheel | Zoom |
| Hold middle mouse button and drag | Pan |

To select several objects, hold `Shift` (or `Ctrl` on Windows, `Cmd` on Mac) while clicking.

### The data model: a place is a tree

Everything in a place is an **Instance**, and Instances form a tree. Each has one parent and any number of children. The **Explorer** draws that tree. At the top sit the **services**, containers that each do one job:

| Service | Job |
| --- | --- |
| `Workspace` | Everything in the 3D world |
| `ReplicatedStorage` | Objects both the server and the players' clients can see |
| `ServerScriptService` | Server-only scripts, never sent to players |
| `ServerStorage` | Server-only objects to clone at runtime |
| `StarterGui`, `StarterPack`, `StarterPlayer` | Templates copied to each player who joins |
| `Lighting` | Lighting, atmosphere, and sky |

Analogy: the tree is the folders on your computer, with a few special top-level folders. The [data model concept page](/roblox-studio/concepts/data-model-and-instances/) explains each service, the edit versus runtime tree, and how a script finds an object by name.

### Parts: the bricks

A **Part** is Roblox's basic building block. Shapes you can insert include Block, Sphere, Wedge, Corner Wedge, and Cylinder. Four properties do most of the work:

| Property | Question it answers | If you get it wrong |
| --- | --- | --- |
| `Anchored` | Does physics move this part? | A platform you forgot to anchor falls when you press Play |
| `CanCollide` | Is it solid? | Players fall through, or bump into something they cannot see |
| `CanTouch` | Does it report contact to scripts? | A `Touched` script never runs |
| `Transparency` | Can you see it? | An invisible part can still block you |

Analogy: an anchored part is glued to the table; an unanchored one is a loose brick that falls, slides, and gets pushed. The [parts concept page](/roblox-studio/concepts/parts-anchoring-and-touch/) explains when to use each combination.

### Server, client, and the three script kinds

When a player joins your experience, two kinds of computer are involved. The Roblox **server** is the authority for the game's state and keeps every player in sync. Each player's device is a **client**: it renders the world and runs the scripts meant for one player. A change made only on a client stays on that client and is not replicated to the server.

Analogy: the server is a card dealer who holds the real deck; each client is a player who sees their own hand and says "I play this card". The dealer checks before it counts.

| Script kind | Runs on | Use it for | Where it lives |
| --- | --- | --- | --- |
| `Script` | Server (or client, if its `RunContext` is `Client`) | Rules, rewards, spawning: anything that must be trusted | `ServerScriptService` or `Workspace` for server scripts |
| `LocalScript` | The player's client | Input, camera, interface for one player | Client containers such as `StarterPlayerScripts` and `StarterGui` |
| `ModuleScript` | Whichever side requires it | Code shared between scripts | `ReplicatedStorage` (both sides) or `ServerStorage` (server only) |

The [client-server concept page](/roblox-studio/concepts/client-server-and-scripts/) covers this in full, including remote events and the "never trust the client" rule.

### Playtesting

The playtest controls are at the left of the mezzanine: a dropdown of modes, and a **Play** button to its right. The docs list these modes:

| Mode | Shortcut | What it does |
| --- | --- | --- |
| **Test** | `F5` | Simulates the game and puts your avatar at a `SpawnLocation` (or default coordinates) |
| **Test Here** | None listed | The same, but your avatar starts in front of the camera's current position |
| **Run** | `F8` | Simulates the game without adding your avatar; you fly a free camera |
| **Server & Clients** | `F7` to start | Runs a server and up to eight clients at once, to test multiplayer |
| **Team Test** | Press **Play** | Collaborators join one session from their own Studios |

Stop a playtest with `Shift+F5`. In **Test** and **Test Here**, Studio runs two simulations, and a toggle switches between them: a **blue** border around the viewport means the client view, a **green** border means the server view. Output messages carry the same colors, so you can tell which side printed them.

> TODO(test): confirm the exact position and label of the client and server toggle on your version of Studio, and whether the Test dropdown and the Play button are labeled as this page describes. The docs' own tutorials word this differently in places ("Test dropdown, then Play" versus the "Test tab").

### Saving, copies, and publishing

| Action | What it does, per the docs |
| --- | --- |
| **File** > **Publish to Roblox** | The first publish of a place: a window asks for name, description, creator, and devices. Later it updates the existing place. |
| **File** > **Save to File** or **Download a Copy** | A local copy of the place as `.rbxl` (compact binary) or `.rbxlx` (larger, XML) |

> TODO(test): the docs word the difference between "Save to Roblox" and "Publish to Roblox" differently on different pages. Confirm in Studio what each does on a brand-new place before relying on either.

Publishing is covered step by step in the [multi-client test and publish walkthrough](/roblox-studio/walkthroughs/6-test-with-multiple-clients-and-publish/).

## Walkthroughs at this level

- [Install Studio and open your first place from a template](/roblox-studio/walkthroughs/1-install-studio-and-open-a-template/): download, sign in, open the Baseplate template, find every window, and run your first playtest.

## Practice project

A short tour that uses everything above. Use the Baseplate place from the walkthrough.

1. In the viewport, use the camera controls to fly around until you can see the Baseplate and the `SpawnLocation`.
2. From the **Home** tab, insert a **Part** (the default is a Block). Open **Properties** and change its `Color` and `Material`.
3. Look at the `Anchored` property in **Properties** and untick it if it is ticked (do not assume the default). Then press `2` for the Move tool and lift the part well above the ground.
4. Press **Play** with **Test** selected. The part falls, because it is not anchored. Stop with `Shift+F5`.
5. In **Properties**, tick `Anchored` and playtest again. The part now hangs in the air. Stop the playtest.
6. Untick `Anchored` once more, then type `Anchored=false` in the Explorer search box. Your part appears in the results. Tick `Anchored` again and your part no longer appears in the results.
7. Start a **Test** playtest and use the client/server toggle. Note the border color for each side.
8. Open **Output** and press `Ctrl+K` (`Cmd+K` on Mac) to clear it.

> TODO(test): run this practice project in Studio and confirm each step, including that the Move tool key is `2` and that the search shows the expected result.

## Check yourself

1. You insert a Part, press Play, and it drops out of the sky. Which property do you check first, and what do you set it to?
2. In the Explorer, which service holds scripts that players can never read or change?
3. What is the difference between a `Script` and a `LocalScript`?
4. You changed a Part's color from a `LocalScript` while playtesting. Will another player see the new color? Why?
5. Which playtest mode lets you test with several players at once, and how many clients can it simulate?
6. In a **Test** playtest, the viewport has a green border. Which side are you looking at?
7. A friend asks, "Is a place the same as an experience?" What do you say?

<details>
<summary>Answers</summary>

1. `Anchored`. Set it to true (ticked). An unanchored part is subject to gravity, so it falls.
2. `ServerScriptService`. Its contents are never replicated to clients.
3. A `Script` runs on the server by default, so its code is trusted. A `LocalScript` runs only on one player's client. A `Script` can also be set to run on the client through its `RunContext` property.
4. No. A change made on a client persists on that client but is not replicated to the server, so other players never see it. To change what everyone sees, make the change from a server `Script`.
5. **Server & Clients**. The docs say usually one or two clients is enough, and you can simulate up to eight.
6. The server. The green border is the server view; blue is the client view.
7. Not quite. An experience is the playable world. A place is one 3D space inside it, and an experience can hold several places.

</details>

## Next

[Level 1: Beginner](/roblox-studio/levels/1-beginner/) turns this into a game: an obstacle path, a first script, coins with a leaderboard, an upgrade button the server checks, and a multi-client test and publish. If you want the reasoning behind the vocabulary first, read the [data model](/roblox-studio/concepts/data-model-and-instances/), [parts](/roblox-studio/concepts/parts-anchoring-and-touch/), and [client-server](/roblox-studio/concepts/client-server-and-scripts/) concept pages.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
