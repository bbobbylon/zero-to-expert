---
title: "Build an obstacle path"
description: "Organize your place with a World folder, build a rising path of anchored platforms, and playtest it with the jump-power method from Roblox's greybox tutorial."
domain: roblox-studio
pageType: walkthrough
level: 1
status: draft
difficulty: easy
safetyCritical: false
time: "45-90 minutes"
tools:
  - "Roblox Studio with the Baseplate place from the previous walkthrough"
parts: []
sources:
  - title: "Create a project"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/building/create-a-project"
    publisher: "Roblox Creator Hub documentation"
  - title: "Greybox a playable area"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/building/greybox-a-playable-area"
    publisher: "Roblox Creator Hub documentation"
  - title: "Parts"
    url: "https://create.roblox.com/docs/parts"
    publisher: "Roblox Creator Hub documentation"
  - title: "BasePart"
    url: "https://create.roblox.com/docs/reference/engine/classes/BasePart"
    publisher: "Roblox Creator Hub documentation"
  - title: "Models"
    url: "https://create.roblox.com/docs/parts/models"
    publisher: "Roblox Creator Hub documentation"
  - title: "Explorer window"
    url: "https://create.roblox.com/docs/studio/explorer"
    publisher: "Roblox Creator Hub documentation"
  - title: "Properties window"
    url: "https://create.roblox.com/docs/studio/properties"
    publisher: "Roblox Creator Hub documentation"
  - title: "Align tool"
    url: "https://create.roblox.com/docs/studio/align-tool"
    publisher: "Roblox Creator Hub documentation"
  - title: "Studio testing modes"
    url: "https://create.roblox.com/docs/studio/testing-modes"
    publisher: "Roblox Creator Hub documentation"
  - title: "Terrain Editor"
    url: "https://create.roblox.com/docs/studio/terrain-editor"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, parts, anchored, greybox, obstacle-path, platformer]
sidebar:
  order: 101
---

:::caution[Not yet run in Studio]
This walkthrough follows the official Roblox Creator Hub documentation, read on 2026-09-26. It has not been run in Studio. The platform sizes and positions below are suggested starting values chosen for this guide, not numbers from the docs, so expect to adjust them when you playtest.
:::

You build the world your later scripts will run in: a `World` folder holding a `Blockout_Parts` model, and a path of anchored platforms that climbs higher at each step. Building a level from plain shapes first is called **greyboxing**. The docs define it as building a level with simple shapes before investing in scripting or final art, so you can test and change it cheaply.

## Before you start

- Finish [Install Studio and open your first place from a template](/roblox-studio/walkthroughs/1-install-studio-and-open-a-template/), so you have a Baseplate place open in Studio with the **Explorer** and **Properties** windows visible.
- Read the [parts concept page](/roblox-studio/concepts/parts-anchoring-and-touch/) if `Anchored` is new to you. This walkthrough anchors every platform, and that page explains why.
- Names in Studio are case-sensitive. The scripts in later walkthroughs look objects up by name (`World`, `Coins`), so spell them exactly as written here.

## Steps

1. **Remove the Baseplate.** In the Explorer, expand **Workspace**, right-click **Baseplate**, and delete it. You should see an empty viewport with only the `SpawnLocation` left in the middle.

   Why: the docs' course removes the Baseplate so the path floats over open space. Anything that falls off has nowhere to land. If you would rather keep a floor while learning, skip this step; every later step still works.

   > TODO(test): a character that falls below `Workspace.FallenPartsDestroyHeight` is removed, and Roblox respawns it. Confirm what happens on your version when you fall off the path with no Baseplate.

2. **Create the `World` folder.** In the Explorer, hover over **Workspace**, click the **+** button that appears, and choose **Folder**. Name it `World` (set its `Name` property in **Properties**). You should see a folder called `World` inside Workspace.

   Why a Folder: it only organizes. Later scripts find your coins with `Workspace.World.Coins`, so the folder gives them a stable address.

3. **Create the `Blockout_Parts` model.** Hover over `World`, click **+**, and choose **Model**. Name it `Blockout_Parts`. You should see it nested inside `World`.

   Why a Model: a Model groups physical objects so they can be moved as one. See [data model and Instances](/roblox-studio/concepts/data-model-and-instances/) for Folder versus Model.

4. **Insert the first platform.** On the **Home** tab, click the **Part** button. A block appears in the Workspace. (Click and hold the small corner arrow of the button to pick another shape such as Cylinder. The docs' course uses cylinders; this walkthrough uses blocks because they need no rotation.)

5. **Move it into the model.** In the Explorer, drag the new `Part` onto `Blockout_Parts`. You should see it nested three levels deep: `Workspace`, `World`, `Blockout_Parts`, `Part`.

6. **Anchor it.** With the part selected, find `Anchored` in **Properties** and tick it.

   Why: an unanchored part is affected by gravity and collisions, so a platform you forgot to anchor falls when the playtest starts. Every platform in this path must be anchored.

7. **Size and place it.** In **Properties**, set `Size` and `Position` (use the **Transform** section). For the first platform try `Size` of 16, 2, 16 and `Position` of 0, 8, -20. You should see a flat platform hovering above and in front of the spawn. Set its `Name` to `Platform_1`.

   > TODO(test): confirm that `Size` and `Position` are in the Transform section and accept typed values on your version of Studio.

8. **Duplicate it three times.** Select `Platform_1` in the Explorer and press `Ctrl+D` (`Cmd+D` on Mac). The duplicate appears in the same model. Repeat until you have four platforms.

9. **Set each platform's height and distance.** Select each duplicate and change `Position` and `Name` as in this table.

   | Name | `Position` (X, Y, Z) | Note |
   | --- | --- | --- |
   | `Platform_1` | 0, 8, -20 | First step |
   | `Platform_2` | 0, 20, -40 | |
   | `Platform_3` | 0, 35, -60 | |
   | `Platform_4` | 0, 55, -80 | The top of this simple path |

   These heights (8, 20, 35, 55) are the first four of the height values that the docs' sample game lists, reused here as a starting point. The docs' own wording is that the sample uses seven height levels and gradually increasing differences, so the further up you go, the bigger each step. Follow that idea more than the exact numbers.

   > TODO(test): the docs describe their numbers as height differences for their own 18-platform layout, so these positions are a suggested starting point rather than a tested layout. Check reachability in step 14 and adjust.

10. **Check that nothing is loose.** Click the search box at the top of the Explorer and type `Anchored=false`. You should see no platforms in the results. If one appears, select it and tick `Anchored`.

11. **Optional: line up the platform bottoms.** If you made platforms of different thicknesses, select all of them in the Explorer, open the **Model** tab, and click **Align**. In the tool set **Mode** to **Min**, **Align In** to **World** with only **Y** ticked, and **Relative To** to **Selection Bounds**, then click **Align**. The bottom edges line up. If all your platforms share the same `Size`, skip this step.

12. **Playtest the layout.** Choose **Test** in the playtest dropdown and click **Play** (or press `F5`). Your avatar spawns at the `SpawnLocation`. Note which platforms you can reach by jumping and which you cannot.

13. **Set up the jump-power test.** While the playtest runs, expand your character in the Explorer, select its **Humanoid**, and in **Properties** tick `UseJumpPower`. Then set `JumpPower` to 0. You should see your avatar unable to jump.

14. **Increase jump power in steps of 30.** Raise `JumpPower` by 30 (to 30), try to reach `Platform_1`, then raise it by another 30 and try `Platform_2`, and so on. Write down the `JumpPower` you needed for each platform. Aim for a path where each platform needs one more upgrade than the last. If a platform needs much more or much less, stop the playtest, change that platform's `Position` height, and repeat.

    Why: later in this guide, players buy jump upgrades that add 30 to their jump power. Your path is fun only if each upgrade lets them reach roughly one more platform.

15. **Stop the playtest.** Press `Shift+F5`. Changes you made to the Humanoid while playtesting are gone, because a playtest changes a temporary copy of your place, not the place you are editing. Your platforms stay because you built them in edit mode.

    > TODO(test): confirm that Humanoid property changes made during a playtest do not persist after you stop.

## Optional detour: add terrain

The docs' course places an island of terrain under the platforms with the **Terrain Editor**. You open it from the **Home** tab or from **Window** > **3D**. Its **Create** tab has **Import**, **Generate**, and **Clear** tools. The **Generate** tool procedurally generates terrain in a region you select, with settings for **Biomes**, **Blending**, **Caves**, **Biome Size**, and **Seed**. The **Edit** tab has tools to draw, sculpt, smooth, paint, and flatten by brush.

> TODO(test): the terrain steps are not walked through here. Try the Generate tool on a small region and record the exact button labels before this page is promoted.

## Check it worked

- `Workspace` contains a `World` folder, which contains a `Blockout_Parts` model, which contains four platforms.
- The search `Anchored=false` shows none of your platforms.
- In a **Test** playtest, you can reach every platform by raising `JumpPower` in steps of 30, and each platform needs a little more jump power than the one before.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| A platform falls when you press Play | `Anchored` is off | Stop the playtest, select the platform, tick `Anchored`. Use the `Anchored=false` search to find every miss. |
| A platform is not where you typed | You typed into `Size` instead of `Position`, or the wrong axis | Select it and check both properties. Y is height. |
| Your avatar walks through a platform | `CanCollide` is off | Select the platform and tick `CanCollide`. |
| Your avatar cannot jump at all in the playtest | `UseJumpPower` is off, or `JumpPower` is 0 | That is correct at `JumpPower` 0. Raise it in steps of 30 as in step 14. |
| Your `JumpPower` change disappears after the playtest | Runtime changes are temporary | Record the value on paper. Change platform heights in edit mode, not the Humanoid. |
| The duplicate stacks exactly on top of the original | Duplicate copies the position | Change the duplicate's `Position` as in step 9. |
| A later script cannot find `World` | The folder name is misspelled or in the wrong parent | Check the Explorer: `World` must be directly inside `Workspace`, spelled with a capital W. |
| The Explorer search shows nothing when you expect results | A typo in the query | Type it exactly as `Anchored=false`, with no spaces around `=`. |

## Next

[Write your first script](/roblox-studio/walkthroughs/3-write-your-first-script/): add a platform that disappears and reappears on a timer, and read your first Output message.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
