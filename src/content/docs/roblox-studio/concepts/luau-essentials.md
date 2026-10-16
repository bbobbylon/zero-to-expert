---
title: "Luau essentials"
description: "The parts of Luau you need to read and write Roblox scripts: variables, functions, tables, events, waiting with the task library, and an introduction to strict typing."
domain: roblox-studio
pageType: explanation
level: 1
status: draft
safetyCritical: false
sources:
  - title: "Luau"
    url: "https://create.roblox.com/docs/luau"
    publisher: "Roblox Creator Hub documentation"
  - title: "Scripting"
    url: "https://create.roblox.com/docs/scripting"
    publisher: "Roblox Creator Hub documentation"
  - title: "Variables"
    url: "https://create.roblox.com/docs/luau/variables"
    publisher: "Roblox Creator Hub documentation"
  - title: "Functions"
    url: "https://create.roblox.com/docs/luau/functions"
    publisher: "Roblox Creator Hub documentation"
  - title: "Tables"
    url: "https://create.roblox.com/docs/luau/tables"
    publisher: "Roblox Creator Hub documentation"
  - title: "Control structures"
    url: "https://create.roblox.com/docs/luau/control-structures"
    publisher: "Roblox Creator Hub documentation"
  - title: "Type checking"
    url: "https://create.roblox.com/docs/luau/type-checking"
    publisher: "Roblox Creator Hub documentation"
  - title: "Events"
    url: "https://create.roblox.com/docs/scripting/events"
    publisher: "Roblox Creator Hub documentation"
  - title: "task"
    url: "https://create.roblox.com/docs/reference/engine/libraries/task"
    publisher: "Roblox Creator Hub documentation"
  - title: "Script Editor"
    url: "https://create.roblox.com/docs/studio/script-editor"
    publisher: "Roblox Creator Hub documentation"
  - title: "Introduction to scripting"
    url: "https://create.roblox.com/docs/tutorials/use-case-tutorials/scripting/basic-scripting/intro-to-scripting"
    publisher: "Roblox Creator Hub documentation"
  - title: "Roblox/creator-docs repository (licenses)"
    url: "https://github.com/Roblox/creator-docs"
    publisher: "GitHub (Roblox)"
tags: [roblox, luau, scripting, variables, functions, tables, events, task, types]
sidebar:
  order: 53
---

## The one-line version

**Luau** is the language you write Roblox scripts in. Roblox describes it as a fast, small, safe, gradually typed language derived from Lua 5.1: all valid Lua 5.1 code is valid Luau, but not the other way round, because Luau adds optional types, string interpolation, and generalized table iteration.

Analogy for the four ideas you will use in every script:

| Idea | Kitchen analogy | Luau shape |
| --- | --- | --- |
| Variable | A labeled jar: the label is the name, the contents are the value | `local sugar = 10` |
| Function | A recipe you can cook again and again | `local function bake() ... end` |
| Table | A shelf with numbered slots (array) or a spice rack with labels (dictionary) | `{"h", "e"}` or `{fruitName = "Lemon"}` |
| Event | A doorbell that runs your code when it rings | `part.Touched:Connect(onTouched)` |

The Script Editor gives you autocomplete, syntax highlighting, static linting, type checking, and script analysis. Errors are underlined in the editor as you type, and the Script Analysis window (the **Analysis** button in the **Script** tab) lists the warnings.

## How it works

### Data types

Luau has six primary data types (Luau page, read 2026-09-26):

| Type | What it is |
| --- | --- |
| Nil | Represents non-existence or nothing. It counts as false in a condition. |
| Boolean | `true` or `false` |
| Number | Double-precision (64-bit) floating-point |
| String | A sequence of characters |
| Table | An array or a dictionary of any value except `nil` |
| Enum | A fixed list of items |

By default Luau is dynamically typed: a variable can hold anything. You can add type annotations when you want the checker's help (see below).

### Variables

A variable is a name that holds a value. Names can contain letters, digits, and underscores, cannot start with a digit, and are case-sensitive. The docs recommend `PascalCase` for classes and Roblox APIs, `camelCase` for local variables and functions, and `LOUD_SNAKE_CASE` for constants.

Variables are global by default, but the docs say it is almost always better to make them local, because Luau accesses local variables faster than global ones. Write `local` every time:

```lua
local nilVar
local x = 10
local word = "Hello"
local boolean = true

print(nilVar) -- nil
print(x) -- 10
print(word) -- Hello
print(boolean) -- true
```

A local declared without a value is `nil`. Extra names on the left get `nil`, and extra values on the right are dropped:

```lua
local a, b, c = 1, 2, 3
local d, e, f = 4, 5 -- extra variable
local g, h = 7, 8, 9 -- extra value

print(a, b, c) -- 1, 2, 3
print(d, e, f) -- 4, 5, nil
print(g, h) -- 7, 8
```

:::caution[The const keyword]
The Variables docs page, as read on 2026-09-26, also describes a `const` keyword that stops a variable from being reassigned. This chapter's walkthroughs do not use it.
:::

> TODO(test): confirm in Studio that `const` is available in your Studio version before relying on it.

### Functions

A function has the `function` keyword, a name (camelCase), parameters in parentheses, a body, and `end`. Calling it means writing its name with parentheses. Missing arguments become `nil`, and extra arguments are ignored. `return` sends results back, and a function can return several values.

```lua
local function addNumbers(num1, num2)
	print(num1 + num2)
end

addNumbers(2, 3) -- 5
addNumbers(5, 6, 7) -- 11
addNumbers(9) -- attempt to perform arithmetic (add) on number and nil
```

```lua
local function addAndSubtract(num1, num2)
	local sum = num1 + num2
	local difference = num1 - num2
	return sum, difference
end

local sum, difference = addAndSubtract(2, 3)
print(sum) -- 5
print(difference) -- -1
```

The last line of the first example is a real error message worth memorizing: **`attempt to perform arithmetic (add) on number and nil`** means a value you expected to be a number was `nil`, usually because an argument was missing or a lookup found nothing.

A function without a name is an **anonymous function**. It is how you hand a piece of code to something else, typically an event:

```lua
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
	print(player.Name .. " joined the game!")
end)
```

### Tables

A table is either an **array** (ordered, numbered) or a **dictionary** (labeled). **Luau arrays start at 1, not 0**: the first item is `[1]`.

```lua
local testArray = {"A string", 3.14159, true, "New string"}
for index, value in testArray do
	print(index, value)
end

local testDictionary = {fruitName = "Lemon", fruitColor = "Yellow", sour = true}
for key, value in testDictionary do
	print(key, value)
end
```

Adding and removing (from the Tables docs):

```lua
table.insert(testArray, "New string")
testArray[#testArray+1] = "Another new string"
table.insert(testArray, 2, "NEW ITEM #2")
table.remove(testArray, 2)
testDictionary.sour = nil -- removes a dictionary pair
```

`#testArray` is the array's length, which is why `testArray[#testArray+1]` adds to the end.

### Decisions and loops

Everything except `false` and `nil` counts as true in a condition, including `0` and the empty string.

```lua
if 2 + 2 == 5 then
	print("Two plus two is five")
elseif 2 + 3 == 5 then
	print("Two plus three is five")
else
	print("All conditions failed")
end

for counter = 1, 3 do
	print(counter)
end
```

`while` repeats while its condition is true, `repeat ... until` runs at least once, and `break` and `continue` leave a loop or skip to the next round. A `while` loop that never ends must contain a wait, or the game freezes. The intro scripting tutorial says so directly: never omit the wait in an infinite loop.

### Events

An event is something an Instance announces, such as a part being touched or a player joining. You **connect** a function to it, and Roblox calls the function each time the event fires, passing the event's arguments:

```lua
-- Assumes the script is parented to the part
local part = script.Parent

-- The function you want to run
local function onPartTouched(object)
	print("Part was touched by", object:GetFullName())
end

-- Connect the function to the part's Touched event
part.Touched:Connect(onPartTouched)
```

`Connect` returns an `RBXScriptConnection`. Call `:Disconnect()` on it to stop listening. For a one-time reaction use `:Once()` instead of connecting and disconnecting by hand, and `:Wait()` pauses the script until the event fires and gives you its arguments:

```lua
local Workspace = game:GetService("Workspace")

local part = Workspace.Part
local touchedPart = part.Touched:Wait()
print("The part was touched by", touchedPart:GetFullName())
```

Because Roblox has many events across client and server, the platform is *event-driven*: most of a game is "when this happens, run that".

### Waiting and scheduling: the task library

| Function | What it does |
| --- | --- |
| `task.wait(seconds)` | Pauses the current thread. With no argument it resumes on the next Heartbeat. Returns the real time elapsed. Unlike the old global `wait()`, it does not throttle. |
| `task.spawn(fn, ...)` | Runs a function or thread right now, in its own thread |
| `task.defer(fn, ...)` | Schedules it to run at the end of the current resume point, for when it does not need to run immediately |
| `task.delay(seconds, fn, ...)` | Runs a function after the given time |
| `task.cancel(thread)` | Stops a thread that has not finished |

```lua
local thread = task.delay(5, function()
	print("Hello world!")
end)

task.cancel(thread)
```

The global `wait()` is deprecated. Write `task.wait()`.

### An introduction to strict typing

Types are optional. You turn on checking per script with a comment on its first line:

| First line | What it does |
| --- | --- |
| `--!nocheck` | Do not check types |
| `--!nonstrict` | Check only variables you explicitly annotated |
| `--!strict` | Check everything, using annotations and inference |

The default for scripts that have no such line comes from the `Workspace.LuauTypeCheckMode` property. Mismatches show up as underlines in the editor and as warnings in the Script Analysis window. Annotations go after a colon:

```lua
local foo: string = "bar"
local x: number = 5

local function add(x: number, y: number): number
	return x + y
end

local maybe: string? = nil -- the ? means "a string or nil"
```

Add types once a script has grown past a page: the checker then catches a `nil` where a number belongs before you ever press Play.

## Choosing between options

### Ways to wait

| Option | Use it when | Avoid it when |
| --- | --- | --- |
| `task.wait(n)` | Pausing this script for `n` seconds, or running a loop on a timer | You need something to happen in the background while this script continues (use `task.spawn` or `task.delay`) |
| `task.delay(n, fn)` | Run `fn` later without pausing the current script | You need to stop early. Keep the returned thread and use `task.cancel`. |
| `task.spawn(fn)` | Start a second piece of work now so the current one is not blocked (the docs' hazard tutorial uses it so a `WaitForChild` cannot stall a player loop) | The work can wait a moment (use `task.defer`) |
| `wait()` | Never in new code | Always. It is deprecated and throttles. |

### Ways to react to an event

| Option | Use it when |
| --- | --- |
| `:Connect(fn)` | Every time the event fires, for as long as the script lives |
| `:Once(fn)` | Only the first time |
| `:Wait()` | The rest of the script should pause until it fires once |

### Ways to loop over a table

| Loop | Use it when |
| --- | --- |
| `for index, value in someTable do` | Any table, array or dictionary. The simplest form and the one the docs use throughout. |
| `for index = 1, #someArray do` | An array, when you need the index to do arithmetic |

## Common mistakes

- **Counting from 0.** The first array item is `[1]`.
- **Leaving out `local`.** The variable becomes global, and the docs note that Luau reaches local variables faster than global ones.
- **An infinite loop without a wait.** The game freezes.
- **Reading an error as a mystery.** `attempt to perform arithmetic (add) on number and nil` names the operation and the two types. The `nil` is the clue.
- **Using `wait()`.** Use `task.wait()`.
- **Forgetting to disconnect.** A connection keeps calling your function until you call `Disconnect` on it or `Destroy` the Instance it belongs to (`Destroy` disconnects everything on that Instance).
- **Putting `nil` in a table.** Tables cannot hold `nil` values, so a `nil` leaves a gap where you expect data. To remove a dictionary entry, set it to `nil` on purpose.

## Where this shows up

- [Write your first script](/roblox-studio/walkthroughs/3-write-your-first-script/) uses a variable, two functions, a `while` loop, `task.wait`, and the `Touched` event.
- [Collect coins and show a leaderboard](/roblox-studio/walkthroughs/4-collect-coins-and-show-a-leaderboard/) loops over a folder's children and uses `task.wait` for a cooldown.
- [Diagnose from symptoms](/roblox-studio/concepts/diagnose-from-symptoms/) uses the `nil` error above.
- [Cheat sheet](/roblox-studio/cheat-sheet/) lists the one-liners.

<!-- Every fact above that isn't common knowledge traces to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
