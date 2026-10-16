---
title: "Parts, Anchored, collisions, and Touched"
description: "What a Part is, why Anchored decides whether physics moves it, and how CanCollide, CanTouch, and the Touched event fit together."
domain: roblox-studio
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Parts"
    url: "https://create.roblox.com/docs/parts"
    publisher: "Roblox Creator Hub documentation"
  - title: "BasePart"
    url: "https://create.roblox.com/docs/reference/engine/classes/BasePart"
    publisher: "Roblox Creator Hub documentation"
  - title: "Materials"
    url: "https://create.roblox.com/docs/parts/materials"
    publisher: "Roblox Creator Hub documentation"
  - title: "Models"
    url: "https://create.roblox.com/docs/parts/models"
    publisher: "Roblox Creator Hub documentation"
  - title: "Client-server runtime"
    url: "https://create.roblox.com/docs/projects/client-server"
    publisher: "Roblox Creator Hub documentation"
  - title: "Events"
    url: "https://create.roblox.com/docs/scripting/events"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create a coin collection mechanic"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/scripting/script-game-behavior"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create player hazards"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/scripting/create-player-hazards"
    publisher: "Roblox Creator Hub documentation"
  - title: "Introduction to scripting"
    url: "https://create.roblox.com/docs/tutorials/use-case-tutorials/scripting/basic-scripting/intro-to-scripting"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, parts, anchored, collision, touched, physics]
sidebar:
  order: 51
---

## The one-line version

A **Part** is Roblox's basic building brick. Four settings decide almost everything a beginner sees it do: **Anchored** (does physics move it), **CanCollide** (is it solid), **CanTouch** (does it report contact), and **Transparency** (can you see it).

Analogy: a Part is a brick on a table. An *anchored* brick is glued to the table: gravity, bumps, and overlaps cannot move it, although you can still move it yourself in Studio or from a script. An *unanchored* brick sits loose and falls, slides, and gets pushed. *CanCollide* decides whether it is solid or a hologram you can walk through, and *CanTouch* decides whether it tells anyone when something touches it.

## How it works

### The properties that matter first

Parts are descendants of the `BasePart` class. Shapes you can insert from the **Home** or **Model** tab's Part button include Block (the default), Sphere, Wedge, Corner Wedge, and Cylinder; a `TrussPart` (a beam characters can climb) is inserted from the Explorer window instead. As documented (read 2026-09-26):

| Property | What it does | Watch out for |
| --- | --- | --- |
| `Anchored` | When true, the part is immovable by physics: no gravity, collisions, or overlaps move it. Changing its `CFrame` or `Position` still moves it. | Set it on every platform and pickup. An unanchored part is affected by gravity, so a platform you forgot to anchor falls when the playtest starts. |
| `CanCollide` | Whether the part physically interacts with others. When false, other parts pass straight through. | A part with `CanCollide` off can still fire `Touched` (see below). |
| `CanTouch` | Whether `Touched` and `TouchEnded` events fire on the part. Both the part and the thing touching it need `CanTouch` on. | Setting it to false after you connected a `Touched` handler disconnects that handler. |
| `Transparency` | 0 is fully visible, 1 is fully transparent | Transparency 1 hides a part but does not stop it colliding. |
| `Size` | The part's visual dimensions, each from 0.001 to 2048 | Dimensions below 0.05 are simulated as 0.05 physically, though rendered at their real size. |
| `Material` | The part's texture and default physical properties (density, friction) | Materials such as Ice, Rubber, and Concrete differ in how slippery or heavy they are. |
| `Color` | The part's color. `BrickColor` is the closest named match. | |

### Touched: when it fires and when it stays silent

`Touched` is an event on a part. It fires when the part touches another object. It only fires when the engine's rules line up:

| Situation | Does `Touched` fire? | Why |
| --- | --- | --- |
| Two anchored parts touch | Never | Roblox docs: two anchored parts never fire `Touched` on each other |
| An anchored part and a player's character touch | Yes | The character is not anchored, so it is simulated |
| The part has `CanCollide` off (walk-through) | Yes, unless `CanTouch` is also off | `CanCollide` and `CanTouch` are independent switches |
| `CanTouch` is off on the part or on the thing touching it | No | `CanTouch` gates the event |

This explains the coin in the Roblox coin tutorial. The coin is anchored (so it hangs in the air) and has `CanCollide` off (so the character walks through it), and `Touched` still fires because the character is free to move and `CanTouch` was never turned off.

### What `Touched` hands you, and what to do with it

`Touched` passes the *other* part. That part could be a foot, a hat, a stray brick, or another player's arm. So the standard pattern from the docs is:

1. Take `otherPart.Parent`, which for a character part is the character model.
2. Ask the `Players` service whether that model belongs to a player: `Players:GetPlayerFromCharacter(character)`. It returns `nil` if it does not.
3. Only act `if player then`.

The coin script then flips an attribute (`Enabled`) to false while the coin is hidden, so a second touch during the cooldown is ignored. This is a guard flag, often called a debounce.

### Hiding a part: three different tools

| Goal | Do this | Effect | Example in the docs |
| --- | --- | --- | --- |
| Make it invisible only | `Transparency = 1` | You cannot see it. Nothing else changes, so it can still block players. | The coin is set to Transparency 1 while it is collected, and back to 0 after the cooldown |
| Make it walk-through only | `CanCollide = false` | Players pass through; you still see it | The coin, from the start |
| Make it invisible and walk-through | `Transparency = 1` and `CanCollide = false` | Gone for practical purposes, but the part still exists and can come back | The disappearing platform in the intro scripting tutorial, and the invisible water hazard |
| Remove it for good | `part:Destroy()` | The Instance is gone and cannot be reused | Clean-up in code |

Pick `Transparency` and `CanCollide` when the part must come back (a coin that respawns after a cooldown, a platform that reappears). Pick `Destroy` when it never returns.

> TODO(test): confirm in Studio that a part with Transparency 1 and CanCollide left on still stops a character, and that its Touched event still fires.

### Models and physics ownership

When parts are welded or otherwise joined, Roblox treats them as an assembly: one rigid body. The server can hand each assembly's physics simulation to a client or keep it, automatically, so a player's own character feels responsive. You rarely need to think about this at Level 0, but it is the reason security guidance says never to trust what a client reports about physics, and it comes back in the [client-server page](/roblox-studio/concepts/client-server-and-scripts/).

A **Model** groups parts into one movable object (select them, then `Ctrl+G` on Windows or `Cmd+G` on Mac). Give it a `PrimaryPart` to control its pivot. Folders only organize; see [The data model and Instances](/roblox-studio/concepts/data-model-and-instances/).

## Choosing between options

| If the part is... | Anchored | CanCollide | Why |
| --- | --- | --- | --- |
| Scenery, a platform, a wall | On | On | Nothing should push it, and players should stand on it |
| A pickup such as a coin | On | Off | It hangs in place and players walk through it to trigger `Touched` |
| An invisible kill zone | On | Off | Players fall through it and its `Touched` handler fires |
| A loose object that should fall, roll, or be pushed | Off | On | You want physics to move it |

Anchor by default. An unanchored part is subject to gravity and collisions, so anything you place and expect to stay put should be anchored, and every walkthrough in this chapter anchors what it builds.

## Common mistakes

- **Forgetting to anchor.** The part drops or slides away when the playtest starts. Fix: tick `Anchored` in the Properties window. To find stragglers, type `Anchored=false` in the Explorer's search box (the Explorer supports property searches such as `Anchored=true CanCollide=true`).
- **Expecting `Touched` between two anchored parts.** It never fires. One of the two must be able to move, which is normally the player's character.
- **Assuming `CanCollide` off means silent.** It does not. Turn `CanTouch` off too if you want no events.
- **Not checking that the toucher is a player.** Every stray part fires `Touched`. Without `GetPlayerFromCharacter` and an `if player then`, a script meant for players runs for anything.
- **Confusing invisible with gone.** A Transparency 1 part still collides. If players bump into "nothing", look for an invisible part.
- **Changing a part from a LocalScript and expecting others to see it.** The change stays on that one client. See [Client, server, and script types](/roblox-studio/concepts/client-server-and-scripts/).

## Where this shows up

- [Build an obstacle path](/roblox-studio/walkthroughs/2-build-an-obstacle-path/) anchors every platform and checks for stragglers.
- [Write your first script](/roblox-studio/walkthroughs/3-write-your-first-script/) makes a platform disappear by changing `CanCollide` and `Transparency`.
- [Collect coins and show a leaderboard](/roblox-studio/walkthroughs/4-collect-coins-and-show-a-leaderboard/) uses `Touched` on an anchored, non-colliding coin.
- [Diagnose from symptoms](/roblox-studio/concepts/diagnose-from-symptoms/) has decision tables for parts that fall, pass through, or never fire `Touched`.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
