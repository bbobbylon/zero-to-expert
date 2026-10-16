---
title: "Diagnose from symptoms"
description: "A method and a set of decision tables for the bugs every Roblox beginner hits: a script that does nothing, nil errors, parts that fall, Touched that never fires, and code that works in Studio but not live."
domain: roblox-studio
pageType: explanation
level: 1
status: draft
safetyCritical: false
sources:
  - title: "Output"
    url: "https://create.roblox.com/docs/studio/output"
    publisher: "Roblox Creator Hub documentation"
  - title: "Developer Console"
    url: "https://create.roblox.com/docs/studio/developer-console"
    publisher: "Roblox Creator Hub documentation"
  - title: "Debugging"
    url: "https://create.roblox.com/docs/studio/debugging"
    publisher: "Roblox Creator Hub documentation"
  - title: "Studio testing modes"
    url: "https://create.roblox.com/docs/studio/testing-modes"
    publisher: "Roblox Creator Hub documentation"
  - title: "Script Editor"
    url: "https://create.roblox.com/docs/studio/script-editor"
    publisher: "Roblox Creator Hub documentation"
  - title: "Explorer window"
    url: "https://create.roblox.com/docs/studio/explorer"
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
  - title: "BasePart"
    url: "https://create.roblox.com/docs/reference/engine/classes/BasePart"
    publisher: "Roblox Creator Hub documentation"
  - title: "Instance"
    url: "https://create.roblox.com/docs/reference/engine/classes/Instance"
    publisher: "Roblox Creator Hub documentation"
  - title: "Techniques and conversion (instance streaming)"
    url: "https://create.roblox.com/docs/workspace/streaming/techniques"
    publisher: "Roblox Creator Hub documentation"
  - title: "Server authority"
    url: "https://create.roblox.com/docs/projects/server-authority"
    publisher: "Roblox Creator Hub documentation"
  - title: "Remote events and callbacks"
    url: "https://create.roblox.com/docs/scripting/events/remote"
    publisher: "Roblox Creator Hub documentation"
  - title: "Client-server runtime"
    url: "https://create.roblox.com/docs/projects/client-server"
    publisher: "Roblox Creator Hub documentation"
  - title: "Functions"
    url: "https://create.roblox.com/docs/luau/functions"
    publisher: "Roblox Creator Hub documentation"
  - title: "Leaderboards"
    url: "https://create.roblox.com/docs/players/leaderboards"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create and publish games and places"
    url: "https://create.roblox.com/docs/production/publishing/publish-games-and-places"
    publisher: "Roblox Creator Hub documentation"
  - title: "Release game updates"
    url: "https://create.roblox.com/docs/projects/update-games"
    publisher: "Roblox Creator Hub documentation"
  - title: "Version History"
    url: "https://create.roblox.com/docs/projects/version-history"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create a coin collection mechanic"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/scripting/script-game-behavior"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create player hazards"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/scripting/create-player-hazards"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, debugging, output, breakpoints, troubleshooting, diagnosis]
sidebar:
  order: 54
---

## The one-line version

Every Roblox bug has a **side** (server or client), a **place** (which script, which line), and a **cause**. Do not start by changing code. Start by finding the side and the place, using the instruments Studio gives you, and only then read the decision table for your symptom.

Analogy: a mechanic does not replace parts until the fault is found. They plug in the scanner (Output), note the fault code (the error message and line), and check the cheapest cause first. The tables below are ordered the same way: cheapest check first.

## How it works

### The instruments

Studio's instruments, as documented (read 2026-09-26):

| Instrument | Open it from | What it tells you | Watch out for |
| --- | --- | --- | --- |
| **Output** | **Window** menu or the **Script** tab | Script errors, engine messages, and everything from `print()` and `warn()`. Filter by type (Error, Warning), by context (Client, Server, User Plugin), or by text. Clear with `Ctrl+K` (`Cmd+K` on Mac). | A filter left on can hide the very message you need. Turn on **Show Source** to see the script name and line, and **Show Context** to see Client or Server. |
| **Script Analysis** | The **Analysis** button in the **Script** tab | Static analysis before you run anything: errors underlined in the editor, warnings explained in the window | It catches mistakes it can see in the text, not wrong values at runtime |
| **Breakpoints** | Click in the gutter to the right of a line number, or right-click the gutter | Pauses the playtest on that line so you can look at variables. A yellow arrow marks the next line to run. | Deleting a breakpoint discards its condition and log message. Disable instead. |
| **Watch and Call Stack windows** | **Script** tab toolbar, or **Window** > **Debug** | Watch shows in-scope variables and expressions you type. Call Stack shows the chain of function calls that reached this line. | They only fill in while paused |
| **Test modes** | The dropdown at the left of the mezzanine (the top section of the Studio window), with the **Play** button to its right | A real client and server, and up to eight clients at once with **Server & Clients**. Output messages are labeled blue (client) or green (server). | Solo testing hides multi-player bugs |
| **Developer Console** | `F9`, or type `/console` in chat, in a running experience | Client and Server log views, memory, network, and a script profiler | The Server view is only visible to the experience's owner or group members with edit permission |

Stepping controls while paused: **Resume Scripts**, **Step Over** (`F10`), **Step Into** (`F11`), **Step Out** (`Shift+F11`), and **Stop**.

### The routine

1. **Reproduce it on purpose.** A bug you cannot repeat, you cannot fix. Write down the exact steps.
2. **Clear Output and repeat.** Press `Ctrl+K`, run it again, and read only the new messages. The first error is usually the real one; later ones are often fallout.
3. **Read the message.** It names the problem and, with **Show Source** on, the script and line.
4. **Name the side.** In a **Server & Clients** test, the label and color tell you which side printed it: blue is client, green is server. A client error and a server error need different fixes.
5. **Bisect with a print.** Add `print("got here")` lines to find the last point that runs. Or use a breakpoint and read the values. A logpoint (right-click the gutter, **Insert Logpoint**) prints without changing your code.
6. **Change one thing, test again.** Two changes at once means you will not know which one worked.

## Choosing between options

### Which instrument to reach for

| Instrument | Use it when | Avoid it when |
| --- | --- | --- |
| Script Analysis | Before pressing Play, or the script does nothing at all | The code is fine but the values are wrong |
| `print` and `warn` | You want a quick yes or no ("did this line run?") | You need to inspect many values at once; that is what breakpoints are for |
| Breakpoint | You need to see variables and step through a function | Pausing would change what you are trying to observe. A logpoint logs without pausing. |
| Logpoint | You want a print without editing the script, and you do not need to stop | You need to look at other variables at that moment; use a breakpoint instead |
| Conditional breakpoint | The bug only happens when a value is a certain number, such as `var == 10` | The bug does not depend on any value you can write as a condition |
| Developer Console | The bug only happens in the published game | You are testing in Studio, where Output already shows everything |

### The tables below

Each table is ordered: do the first check first. "Then what?" tells you where to go if the check does not explain it.

## Symptom 1: My script does nothing

Nothing prints, nothing changes, no error.

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Output is open and its filters are off. Clear it (`Ctrl+K`) and run again. | A red error appears | The script ran and failed. This is not "does nothing". | Go to Symptom 2 |
| 2 | Add `print("script started")` as the very first line. Run. | The message never appears | The script is not running at all: go to checks 3 to 5 | Continue |
| 3 | Open the **Script Analysis** window (the **Analysis** button, **Script** tab). | A syntax error is listed | The script cannot run as written | Fix each listed error, top to bottom |
| 4 | Compare the script's parent with the locations table in [Client, server, and script types](/roblox-studio/concepts/client-server-and-scripts/). | A `Script` in `ReplicatedStorage` with `RunContext` still `Legacy`; a `LocalScript` outside the client containers; any script in `ServerStorage` | The script is in a container where its kind does not run. Legacy Scripts run only in server containers such as `ServerScriptService` or `Workspace`; scripts do not run in `ServerStorage`. | Move it to a container that runs its kind, or set `RunContext` deliberately |
| 5 | Select the script and look at its **Enabled** property in Properties. | **Enabled** is unticked | The script is switched off | Tick **Enabled** |
| 6 | The start message appears, but your event handler never does. Put a `print` at the top of the handler. | It never prints | The event never fires: the handler is connected to a different object than you think, or the rules for the event are not met | For `Touched`, go to Symptom 4. For remotes, go to Symptom 7. |
| 7 | The output looks empty but only in one view. Check the Output **context** filter. | A message exists on Server but you are filtering to Client | You are looking at the wrong side | Set the filter to show both Client and Server |
| 8 | The start message appears, then nothing more. Look for `WaitForChild` or an event `:Wait()` earlier in the script. | Output shows a warning after 5 seconds | The script is waiting for something that never arrives. A `WaitForChild` with no timeout prints a warning after 5 seconds. | Fix the name or the location of the thing it waits for, or give `WaitForChild` a timeout and handle `nil` |

## Symptom 2: An error such as "attempt to index nil"

The Output message names an operation and a `nil`. The clue is always the same: a value you expected to exist was `nil`. Your job is to find out where that `nil` came from.

First, find the line (Output, **Show Source**), then find which variable on that line is `nil` (add a `print`, or set a breakpoint and hover over the variable, or add it to the Watch window). Then match its origin:

| # | Where the `nil` came from | How to confirm | Fix |
| --- | --- | --- | --- |
| 1 | `FindFirstChild` found nothing. It returns `nil` when there is no child with that name. | Compare the string in the script with the Explorer name, letter for letter. Names are case-sensitive. | Correct the name, or the parent you asked. Check for `nil` before using the result: `if door then ... end`. |
| 2 | A dot path passed through something missing, such as `Workspace.World.Coins` when the folder is called `Coin` | The error names the first missing member | Correct the name in the script or in the Explorer |
| 3 | The object exists but not yet. It is created or replicated after your script asks. | It exists in the Explorer after a moment, and the script fails at the start | Use `WaitForChild("Name")`. Add a timeout as the second argument if the object might never arrive. |
| 4 | Instance streaming is on and the content is not near the player yet | `Workspace.StreamingEnabled` is ticked. `FindFirstChild` returns `nil` for content that has not streamed in, and dot paths error. | `WaitForChild` with a timeout when you need it, or `FindFirstChild` plus an `if` when you can continue without it. For a model that must arrive whole, set its `ModelStreamingMode` to `Atomic`. |
| 5 | `Players:GetPlayerFromCharacter(model)` returned `nil` because the toucher was not a player's character | `otherPart.Parent` is a hat, a stray part, or an NPC | Guard with `if player then`, as the Roblox coin and hazard tutorials do |
| 6 | `GetAttribute("Name")` for an attribute that was never set | Select the Instance and look at its **Attributes** section | Set it in code first with `SetAttribute`, or in Properties |
| 7 | A function argument was missing. The docs' own example: calling `addNumbers(9)` gives `attempt to perform arithmetic (add) on number and nil`. | Compare the call with the function's parameter list | Pass every argument, or give the parameter a default inside the function |
| 8 | `player.Character` is `nil` because the character has not spawned yet | The error happens right when a player joins | Use `player.Character or player.CharacterAdded:Wait()`, which is what the Roblox upgrade tutorial does |
| 9 | A remote delivered `nil` in place of what you sent: a function, or an Instance the receiver cannot see | Print the arguments on the receiving side | Send plain values (names, numbers, ids) and look the Instance up on the receiving side. See Symptom 7. |
| 10 | The script's own `script.Parent` is not what you assumed, because the script was moved | Select the script and look at its parent in the Explorer | Move the script back, or change the reference |

## Symptom 3: A part falls, slides, or passes through

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Select the part. Look at **Anchored** in Properties. | Unticked | The part is affected by gravity and collisions. It falls or slides when the playtest starts. | Tick **Anchored**. To find all offenders at once, type `Anchored=false` in the Explorer's search box. |
| 2 | **CanCollide** | Unticked | Players and other parts pass through it | Tick it if the part should be solid |
| 3 | Is a script setting these properties? Use Find All in the Script Editor (`Ctrl+Shift+F`) and search for the part's name or for `CanCollide`. | A script sets `CanCollide` or `Transparency` on a timer | A script is doing it on purpose (the disappearing platform does exactly this) | Change or remove that script's logic |
| 4 | **Size** | A dimension is very small | Dimensions below 0.05 are simulated as 0.05, though drawn at their real size, so it may feel different from how it looks | Make the part thicker |
| 5 | The part is in a Model. Look at where it went. | A Model that falls below `Workspace.FallenPartsDestroyHeight` is destroyed automatically | The model fell out of the world | Anchor the parts, or find why it fell |
| 6 | A player walks through something that looks solid | The part is Transparency 1 or `CanCollide` is off | The part is invisible on purpose or non-solid | Check both properties |
| 7 | The part moves even though it is anchored | A script or you moved its `CFrame` or `Position` | Anchored stops physics, not scripts | Look for scripts that set `CFrame` or `Position` |

## Symptom 4: Touched never fires, or fires too often

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Are both the touching object and the part anchored? | Both anchored | Two anchored parts never fire `Touched` on each other | Let one of them move. In a normal game the player's character is the mover. |
| 2 | **CanTouch** on the part | Unticked | `CanTouch` gates `Touched` and `TouchEnded`, and both sides need it | Tick it |
| 3 | The handler is connected to the wrong object, or only some objects | Only some coins react | The loop that connects handlers ran once at script start over `GetChildren()`, so parts added later were never connected | Connect them too, or create all parts before the script runs |
| 4 | Handler runs but does nothing | `print(otherPart)` shows a hat or foot | Every part that touches fires the event. You did not check that it is a player. | `GetPlayerFromCharacter(otherPart.Parent)` and `if player then` |
| 5 | The handler runs more than once for one pickup | The same message repeats | `Touched` can fire again while your handler is still in its cooldown, because nothing tells the event the coin is already collected | Add a guard flag. The coin tutorial uses an `Enabled` attribute: check it first, set it false when collected, and set it true after the cooldown. |
| 6 | The part has `CanCollide` off and you expected silence, or you expected events to stop | Events still arrive, or you assumed nothing would | `CanCollide` off does not stop `Touched`. Only `CanTouch` gates the event. | Turn `CanTouch` off if you want no events |

## Symptom 5: It works in Studio but not in the published game

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Did you publish after your last change? | The change is not in the live game | Playing in Studio runs the place open in Studio. The live game runs the last published version. | **File** > **Publish to Roblox** |
| 2 | Are live servers still on the old version? | You published, but a running server behaves as before | Servers keep running the old version until they shut down or you restart them | In the Creator Dashboard, open your experience, then **Configure** > **Server Management**, choose **Restart Servers**, and confirm. Or wait for servers to empty naturally. |
| 3 | Did you publish the right place? | Nothing changed in the experience you expected | **Publish to Roblox As...** sent it to a different experience or place | Check the Creator Dashboard for which experience the new version landed in |
| 4 | Did you restore an old version and forget to publish it? | The live game did not roll back | The docs are explicit: restoring a place to a previous version does not automatically publish it | Publish the restored place manually, then restart servers |
| 5 | Network delay | Works instantly in Studio, breaks live | The Roblox docs say most players play with 100 to 300 milliseconds of network latency, which a local test does not have | Open Studio's Network settings (`Alt+S` on Windows, `Option+S` on Mac) and set inbound and outbound delays to at least 50 to 150 milliseconds, then retest |
| 6 | Instance streaming | Errors only for players far from an object | `StreamingEnabled` limits what a client has. Dot paths and `FindFirstChild` fail for content that has not arrived. | See Symptom 2, row 4 |
| 7 | What does the live game say? | You are not in Studio, so you have no Output window | The live game has its own log viewer | In the live game press `F9` (or type `/console`). The **Client** view is open to everyone. The **Server** view is only visible to the experience owner or group members with edit permission. |

## Symptom 6: It works for me but not for other players

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Is the effect made by a LocalScript or a client-run Script? | Only your screen shows it | Changes made on the client stay on that client and are not replicated to the server | Make the change in a server `Script`, or have the client fire a RemoteEvent and let the server make the change (after checking the request) |
| 2 | Can other players open the experience at all? | They cannot find it or cannot join | Its audience is Private, or Limited to playtesters, friends, or members | In the Creator Dashboard, go to the experience's **Configure** > **Settings** > **Audience**. Private is only for people with edit permission, and users with only playtest permission cannot play a Private experience. |
| 3 | Are they on the latest version? | They see old behavior | They joined a server that is still running the old version | Restart servers (Symptom 5, row 2) |
| 4 | Reproduce it with two clients | Run **Server & Clients** with 2 clients. Compare each client window, and Output blue and green lines. | Bugs that depend on more than one player only show up here | Fix the difference between the two clients |
| 5 | The GUI is gone after a player respawns | The button appears once, then never again | `PlayerGui` contents are emptied on respawn | Turn off **ResetOnSpawn** on the ScreenGui, as the upgrade-button tutorial does |
| 6 | State is shared by accident | One player's coins change another's | Data is stored in one variable instead of per player | Key it by the player, as the tutorial's `PlayerData` module does with `UserId` |
| 7 | Something is decided by the client | One player can do something others cannot, such as report a different position | The server took the client's word for it. The docs' rule is to never trust a client to report its own position or state. | Move the decision to the server. See the server authority docs. |

## Symptom 7: A RemoteEvent or RemoteFunction does nothing

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | Where is the remote? | It is in `ServerStorage` or another container only one side can see | One side cannot see it, so a `WaitForChild` on it warns after 5 seconds | Store it where both server and client can access it, such as `ReplicatedStorage` |
| 2 | Is the receiving script running? | The server script never printed | The receiver has its own problem. See Symptom 1. | Fix the receiver first |
| 3 | The receiver's parameters | Values arrive shifted by one | `OnServerEvent` handlers get the `Player` automatically as the first argument, but `OnClientEvent` handlers do not | Add `player` as the first parameter on the server; leave it off on the client |
| 4 | The arguments | `nil` arrives where you sent something | You sent a function, or an Instance the receiver cannot see, or a table with mixed or non-string keys, or used a metatable | Send plain values and rebuild on the other side |
| 5 | `FireClient` | Nothing arrives | The first argument to `FireClient` must be the target `Player` | Pass the player |
| 6 | A `RemoteFunction` call never returns | The calling script hangs | The other side never returned a value. If the server is invoking the client, the server waits forever. | Do not invoke clients from the server. Use a RemoteEvent. |
| 7 | The remote fires but the request is refused | Nothing changes | The server-side check refused it: the player cannot afford it, the state is wrong, or the values are out of range | Print inside the handler to see which check failed. Do not remove the check. |

## Symptom 8: The leaderboard is missing or wrong

| # | Check | What you see | Likely cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | The folder's name | `Leaderstats`, `leaderStats`, or `stats` | The folder must be named exactly `leaderstats`, all lowercase, or Roblox does not add the player to the leaderboard | Rename it |
| 2 | Where the folder is created | It is a child of something other than the `Player` | The folder must be parented to the player | `leaderstats.Parent = player` |
| 3 | The stat objects | Your value is a plain Luau variable | The board reads value objects such as `IntValue`, `NumberValue`, or `StringValue`, and shows the object's **Name** | Create an `IntValue` inside the folder and set its `Value` property |
| 4 | Updating | The number does not change | You changed a variable, not the stat's `Value` | `stat.Value += 1` (or set `.Value`) |
| 5 | Which script creates it | A LocalScript made it | Create it in a server `Script` | Move the code to `ServerScriptService` |

> TODO(test): the ordering and fixes in these tables combine the docs' statements with common Studio behavior. Run each scenario in Studio, confirm the Output wording, and correct any row that does not match before this page is promoted.

## Common mistakes

- **Fixing before finding.** A change made without knowing the cause hides the bug or adds another one.
- **Debugging the wrong side.** Always name it: blue is client, green is server.
- **Reading the last error instead of the first.** Later errors are often fallout from the first one.
- **Leaving an Output filter on.** If the message you expect is missing, clear the filters before you conclude the code did not run.
- **Deleting a breakpoint you will need again.** Deleting discards its condition and log message. Disable it instead.
- **Leaving debugging prints in a finished game.** Remove them, or turn them into logpoints.

## Where this shows up

- [Write your first script](/roblox-studio/walkthroughs/3-write-your-first-script/) has you trigger and read a nil-arithmetic error on purpose.
- [Test with multiple clients and publish](/roblox-studio/walkthroughs/6-test-with-multiple-clients-and-publish/) uses the Server & Clients mode and the live-game checks.
- [Cheat sheet](/roblox-studio/cheat-sheet/) lists the shortcuts and menu paths for every instrument above.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
