---
title: "Client, server, and script types"
description: "Why every Roblox game is a server plus many clients, which of Script, LocalScript, and ModuleScript runs where, how RemoteEvents cross the gap, and why the server must never trust the client."
domain: roblox-studio
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Client-server runtime"
    url: "https://create.roblox.com/docs/projects/client-server"
    publisher: "Roblox Creator Hub documentation"
  - title: "Script types and locations"
    url: "https://create.roblox.com/docs/scripting/locations"
    publisher: "Roblox Creator Hub documentation"
  - title: "Data model"
    url: "https://create.roblox.com/docs/projects/data-model"
    publisher: "Roblox Creator Hub documentation"
  - title: "BaseScript"
    url: "https://create.roblox.com/docs/reference/engine/classes/BaseScript"
    publisher: "Roblox Creator Hub documentation"
  - title: "LocalScript"
    url: "https://create.roblox.com/docs/reference/engine/classes/LocalScript"
    publisher: "Roblox Creator Hub documentation"
  - title: "Reuse code"
    url: "https://create.roblox.com/docs/scripting/module"
    publisher: "Roblox Creator Hub documentation"
  - title: "Events"
    url: "https://create.roblox.com/docs/scripting/events"
    publisher: "Roblox Creator Hub documentation"
  - title: "Remote events and callbacks"
    url: "https://create.roblox.com/docs/scripting/events/remote"
    publisher: "Roblox Creator Hub documentation"
  - title: "Server authority model"
    url: "https://create.roblox.com/docs/projects/server-authority"
    publisher: "Roblox Creator Hub documentation"
  - title: "Security and cheat mitigation tactics"
    url: "https://create.roblox.com/docs/scripting/security/security-tactics"
    publisher: "Roblox Creator Hub documentation"
  - title: "Access control and confidentiality"
    url: "https://create.roblox.com/docs/scripting/security/access-control"
    publisher: "Roblox Creator Hub documentation"
  - title: "Server-side detection and consequencing"
    url: "https://create.roblox.com/docs/scripting/security/server-side-detection"
    publisher: "Roblox Creator Hub documentation"
  - title: "Script an upgrade button"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/scripting/script-an-upgrade-button"
    publisher: "Roblox Creator Hub documentation"
  - title: "Roblox/creator-docs repository (licenses)"
    url: "https://github.com/Roblox/creator-docs"
    publisher: "GitHub (Roblox)"
tags: [roblox, client-server, replication, script, localscript, modulescript, remoteevent, security]
sidebar:
  order: 52
---

## The one-line version

Every Roblox game is one **server** plus one **client** per player. The server owns the truth about the game; each client shows the world, reads its player's input, and asks the server to change things. You decide which side a script runs on by *where you put it* and *what kind of script it is*, and when the two sides need to talk, you use a RemoteEvent or RemoteFunction, and the server checks everything it is told.

Analogy: a card game with a dealer. The dealer (server) holds the real deck and the score. Each player (client) sees their own hand and can say "I play this card". The dealer checks the play is legal before it counts. A player who scribbles on their own scorecard has changed nothing at the table.

## How it works

### Two sides, and what each one does

From the client-server docs (read 2026-09-26):

| | Server | Client |
| --- | --- | --- |
| Role | The ultimate authority for the game's state. Keeps every connected client in sync. | Receives a copy of the runtime data model and renders the 3D world for one player |
| Also does | Filters chat before it reaches other players. Can own and simulate physics for assemblies. | Handles player set-up such as the backpack and GUI, and runs the scripts meant for it |
| With `StreamingEnabled` on | Unaffected | Initially receives only the `Workspace` content near the player |

**Replication** is how changes travel between them: data model changes (client to server, server to one client, or server to all clients), physics simulation (whichever side owns an assembly simulates it and the other side receives the movement), and chat. Two rules from the Data model docs shape everything you build:

- Any change that occurs on the client persists there but is **not replicated to the server**.
- The server can overwrite changes on the client to keep things consistent.

So a LocalScript that recolors a Part changes that one player's screen, and nobody else's. To change what everyone sees, the change has to happen on the server.

### The three script types

| Script type | Runs on | Typical use | Runs by itself? |
| --- | --- | --- | --- |
| `Script` | Server, or client if its `RunContext` is `Client` | Game rules, rewards, spawning, anything that must be trusted | Yes, when placed in a valid container |
| `LocalScript` | Client only | Input, GUI, camera, effects for one player | Yes, when placed in a valid client container |
| `ModuleScript` | Whichever side `require`s it | Reusable code: a table or function you share | No. It runs when another script calls `require`, once per side, and returns one value that is then cached. |

The `RunContext` property of a `Script` (not available on LocalScripts) decides where it runs:

| RunContext | Where it runs | Container rule |
| --- | --- | --- |
| `Legacy` (the default) | Server | Only runs in server containers such as `ServerScriptService` or `Workspace` |
| `Server` | Server | Can also run in `ReplicatedStorage`, though that is not recommended |
| `Client` | Client | Runs in `ReplicatedStorage`, `StarterCharacterScripts`, and `StarterPlayerScripts` |

The docs' recommended shape is one `Script` with `RunContext` set to `Client` in `ReplicatedStorage`, plus ModuleScripts that both sides require from central entry points.

### Where each kind of thing goes

| Location | What it holds | Notes |
| --- | --- | --- |
| `ServerScriptService` | Server `Script`s and the ModuleScripts they use | Never replicated to clients. The default home for game logic. |
| `ServerStorage` | Server-only objects and ModuleScripts | Scripts placed here do not run, but server scripts can `require` modules stored here |
| `Workspace` | The 3D world, and server Scripts that control an object's behavior | A Script parented to a Part runs on the server |
| `ReplicatedStorage` | Things both sides need: shared ModuleScripts, RemoteEvents, client-run Scripts | Both server and clients can see it |
| `ReplicatedFirst` | Minimal loading-screen assets | Replicated to clients (not back to the server) first |
| `StarterPlayer` > `StarterPlayerScripts` | LocalScripts that run when a player joins | The server cannot access this container at runtime |
| `StarterPlayer` > `StarterCharacterScripts` | LocalScripts that run each time the character spawns | Do not persist when the player respawns |
| `StarterGui` | GUI objects, with LocalScripts to manage them | Copied into `PlayerGui`; emptied on respawn |
| `StarterPack` | Tools, and LocalScripts for the backpack | Copied into `Backpack` |

### Crossing the boundary: remotes

Two sides need a doorway. Roblox provides three, all of which must sit where both sides can see them, normally `ReplicatedStorage`:

| Tool | Direction and style | The sender... |
| --- | --- | --- |
| `RemoteEvent` | One way, asynchronous. Fire and move on. | Does not wait |
| `UnreliableRemoteEvent` | One way, for non-critical data that changes continuously; favors network performance over reliability | Does not wait |
| `RemoteFunction` | Two way, synchronous. Asks a question and waits for the answer. | Yields until a reply arrives |

The methods and handlers pair up like this:

| Direction | Sender calls | Receiver connects to | Receiver gets |
| --- | --- | --- | --- |
| Client to server | `remoteEvent:FireServer(...)` | `remoteEvent.OnServerEvent` | The `Player` who fired it (added automatically) as the first argument, then your arguments |
| Server to one client | `remoteEvent:FireClient(player, ...)` | `remoteEvent.OnClientEvent` | Your arguments only |
| Server to every client | `remoteEvent:FireAllClients(...)` | `remoteEvent.OnClientEvent` | Your arguments only |
| Client asks server | `remoteFunction:InvokeServer(...)` | `remoteFunction.OnServerInvoke = function` | The `Player`, then your arguments. Whatever the function returns goes back. |

The docs' own client-to-server example (code samples from the Roblox creator-docs are MIT-licensed):

```lua
-- LocalScript (client)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

remoteEvent:FireServer(Color3.fromRGB(255, 0, 0), Vector3.new(0, 25, -20))
```

```lua
-- Script (server)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onCreatePart(player, partColor, partPosition)
	print(player.Name .. " fired the RemoteEvent")
	local newPart = Instance.new("Part")
	newPart.Color = partColor
	newPart.Position = partPosition
	newPart.Parent = Workspace
end

remoteEvent.OnServerEvent:Connect(onCreatePart)
```

Read the server half as a security review: it builds a part wherever, and in whatever color, the client says. That is fine for a demo and unsafe for a real game. The next section is the fix.

What survives the trip is limited (from the same docs page):

| You send | The receiver gets |
| --- | --- |
| A function | `nil` |
| A table with non-string keys, such as Instances as keys | The keys turned into strings |
| A table mixing numeric and named keys, or holding `nil` | Unreliable. Keep tables purely numeric-indexed or purely dictionary-style, with no `nil` values. |
| A table | A copy, not the same table |
| A table with a metatable | The plain table; the metatable is lost |
| An Instance the receiver cannot see (for example, something in `ServerStorage` sent to a client, or a part created only on a client) | `nil` |

### Never trust the client

Roblox's security docs state the principle plainly: a determined exploiter has complete control over their local state and network traffic, so anything a client sends can be fabricated. The server "must be the ultimate source of truth for all simulation states, rules, player progression, and critical decisions". The server model is: receive the client's *request*, validate it, carry it out, and replicate the result. Clients are trusted only to report their own inputs.

Three practical rules follow.

1. **Keep logic and data on the server.** The docs' instruction is to keep them in `ServerScriptService` from the start and never in replicated containers such as `ReplicatedStorage` or `Workspace`. Anything that replicates to a client can be read: exploiters can decompile any LocalScript, any Script with `RunContext` set to `Client`, and any replicated ModuleScript.
2. **Treat every remote argument as hostile.** The docs' threat-modeling questions are the checklist: what if the client sent arbitrary values? What if it fired the remote 1,000 times a second? Could it harm other players?
3. **Design first, detect second.** The server-side detection page puts design ahead of detection: solid validation and rate limiting are the foundation, and heuristics (an impossibly fast completion time, an impossible earning rate) are a backstop.

A validation checklist for any remote handler on the server (this table is a synthesis of those docs, not a quote):

| Check | Question to ask | In the coin-upgrade example |
| --- | --- | --- |
| Identity | Is the `player` the one whose data I am changing? | The handler only ever touches the `player` it was handed |
| Shape | Are the arguments the right types and in a sane range? | The button sends no arguments at all, so there is nothing to forge |
| State | Does the game state allow this? | The server looks up the player's coins itself and refuses if they are below the price |
| Rate | Could this be spammed? | The tutorial adds no rate limit; the security docs tell you to consider one |
| Effect | Who else is affected? | Only this player's jump power and coin count |

The Roblox upgrade-button tutorial shows the state check in action. The client never says "I have 5 coins"; it only asks, and the server compares the price with its own record of the player's coins before doing anything.

## Choosing between options

### RemoteEvent or RemoteFunction

| | RemoteEvent | RemoteFunction |
| --- | --- | --- |
| Style | Fire and forget | Ask and wait for an answer |
| Client to server | Good default: the client asks, the server acts, and the result comes back through the replicated world or a separate event | Good when the client needs an answer, such as "purchase succeeded: true or false" |
| Server to client | Use this | Avoid it |
| Risk | Little | If the client throws an error, the server throws it too. If the client disconnects mid-call, `InvokeClient` errors. If the client never returns a value, the server waits forever. |

Pick `RemoteEvent` unless you truly need a return value, and never invoke a client from the server. The upgrade tutorial uses a `RemoteFunction` from client to server because the button wants to know whether the purchase went through.

### Which script type for a job

| Job | Use | Put it in |
| --- | --- | --- |
| Give coins, change health, spawn things, anything that affects the game state | `Script` | `ServerScriptService` (or as a child of the Part it controls in `Workspace`) |
| Show a button, read keyboard or touch input, drive the camera | `LocalScript`, or a `Script` with `RunContext` = `Client` | `StarterPlayerScripts` or `StarterGui`, or `ReplicatedStorage` for the client-run Script |
| Shared constants or helper functions used by both sides | `ModuleScript` | `ReplicatedStorage` |
| Server-only data or helpers | `ModuleScript` | `ServerStorage` or `ServerScriptService` |
| Passing a message between two scripts on the *same* side | `BindableEvent` | Wherever both can reach it |

Do not write one ModuleScript that mixes server-only and client-only code and put it in a replicated container: the client receives the whole file.

## Common mistakes

- **Putting game rules in a LocalScript.** The client can be modified by the player running it. Rewards, prices, health, and saved data belong on the server.
- **Expecting a client-side change to show for everyone.** It will not; see the replication rules above.
- **Trusting a remote's arguments.** Read `OnServerEvent` handlers as if a stranger wrote every argument.
- **Storing a script in `ServerStorage` and wondering why it never runs.** Scripts do not run in `ServerStorage`; only `require`d ModuleScripts do anything there.
- **Putting the remote where only one side can see it.** A RemoteEvent in `ServerStorage` is invisible to clients. The docs place remotes in `ReplicatedStorage`.
- **Passing a function or a mixed table through a remote.** Both arrive damaged. Send plain values.
- **Testing only alone.** Playing solo hides bugs that appear with two players. Use the multi-client test in [Test with multiple clients and publish](/roblox-studio/walkthroughs/6-test-with-multiple-clients-and-publish/).

## Where this shows up

- [Level 0: Orientation](/roblox-studio/levels/0-orientation/) introduces the split.
- [Collect coins and show a leaderboard](/roblox-studio/walkthroughs/4-collect-coins-and-show-a-leaderboard/) keeps coin logic in a server Script and server-only ModuleScripts.
- [Add a server-checked upgrade button](/roblox-studio/walkthroughs/5-add-a-server-checked-upgrade-button/) is a complete remote round trip with a server-side check.
- [Diagnose from symptoms](/roblox-studio/concepts/diagnose-from-symptoms/) has the decision tables for "works for me but not for others".

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
