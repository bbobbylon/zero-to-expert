---
title: "Install Studio and open your first place from a template"
description: "Install Roblox Studio, sign in, open the Baseplate template, find the Explorer, Properties, Toolbox, and Output windows, and run your first playtest."
domain: roblox-studio
pageType: walkthrough
level: 0
status: draft
difficulty: easy
safetyCritical: false
time: "30-60 minutes"
tools:
  - "A Windows or macOS computer that meets the requirements listed under Before you start"
  - "An internet connection"
  - "A Roblox account (free; you can create one at roblox.com)"
parts: []
sources:
  - title: "Get Studio"
    url: "https://create.roblox.com/docs/studio/setup"
    publisher: "Roblox Creator Hub documentation"
  - title: "Studio interface overview"
    url: "https://create.roblox.com/docs/studio/ui-overview"
    publisher: "Roblox Creator Hub documentation"
  - title: "Create a project"
    url: "https://create.roblox.com/docs/tutorials/curriculums/core/building/create-a-project"
    publisher: "Roblox Creator Hub documentation"
  - title: "Roblox experiences"
    url: "https://create.roblox.com/docs/experiences"
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
  - title: "Studio testing modes"
    url: "https://create.roblox.com/docs/studio/testing-modes"
    publisher: "Roblox Creator Hub documentation"
  - title: "Place files"
    url: "https://create.roblox.com/docs/projects/place-files"
    publisher: "Roblox Creator Hub documentation"
tags: [roblox, studio, install, template, baseplate, playtest]
sidebar:
  order: 100
---

:::caution[Not yet run in Studio]
This walkthrough follows the official Roblox Creator Hub documentation, read on 2026-09-26. It has not been run on a real machine, and Studio's buttons and menus change often. If something on your screen is labeled differently, trust your screen.
:::

You install Studio, sign in, open a blank place from the **Baseplate** template, look around, and run your first playtest. Every later walkthrough starts from a place like this one.

## Before you start

- Check your computer against the requirements the docs list (as of 2026-09-26):

  | | Minimum | Recommended |
  | --- | --- | --- |
  | Operating system | Windows 10 or macOS 10.14 | Windows 11 or macOS 14 and up |
  | Memory | 3 GB | 8 GB |
  | Screen resolution | Not stated | 1600 by 900 or higher |

- Have your Roblox login ready. If you do not have an account, create one at roblox.com first. Studio needs you to sign in.
- Read [Level 0: Orientation](/roblox-studio/levels/0-orientation/) if the words Explorer, Properties, or playtest are new. This walkthrough shows where they are, and that page explains what they do.

## Steps

1. **Start the download.** On the Roblox website, begin the Studio download, then click the **Download Studio** button in the pop-up dialog.

   > TODO(source): the first installation step in the official setup page was cut off in the copy read on 2026-09-26. Find the exact page and button that opens the pop-up (open create.roblox.com/docs/studio/setup and read step 1).

2. **Run the installer.** Find the installer in your browser's download history and double-click it. On Windows the file is `RobloxStudio.exe`. On a Mac it is `RobloxStudio.dmg`. You should see an installer window and a progress indicator.

   Why: Studio is a desktop application, not a website, so it needs its own installer.

3. **Launch Studio.** When installation finishes, a pop-up confirmation appears. Click **Launch Studio**.

4. **Sign in.** Studio asks you to sign in with your Roblox account. Enter your login. You should reach Studio's start screen.

5. **Start a new experience.** Click the **New Experience** button in the upper-left corner. Select the **Baseplate** template. A new place opens with a flat ground surface and a `SpawnLocation` object, the spot where your avatar appears.

   Why Baseplate: it is the blank starting point the official beginner course uses, and it is the place the next walkthrough builds on. The docs also list Platformer, Laser Tag, and Racing templates for beginners; you can open one later to see how a finished project is organized.

   > TODO(test): confirm on your version of Studio that **New Experience** is in the upper-left corner and that a template named **Baseplate** is offered.

6. **Find the Explorer and Properties windows.** If you cannot see them, open the **Window** menu and choose **Explorer**, then open **Window** again and choose **Properties**. You should see a list of objects on one side (Explorer) and a settings panel on the other (Properties).

7. **Open the Workspace.** In the Explorer, click the arrow next to **Workspace** to expand it. You should see at least `Baseplate` and `SpawnLocation` listed inside it.

8. **Select the Baseplate.** Click `Baseplate` in the Explorer. The viewport outlines it, and **Properties** now shows its settings. Scroll the Properties list until you find `Anchored`, `CanCollide`, `Transparency`, and `Material`. You do not have to change them yet; you are learning where they live.

   Why: every object you build in this guide is controlled the same way: select it, then read or change its properties.

9. **Move the camera.** In the viewport, use the documented controls: `W` `A` `S` `D` to move, `Q` and `E` to go down and up, hold the right mouse button and drag to rotate, and use the mouse wheel to zoom. Hold `Shift` while moving to change speed. With the Baseplate selected, press `F` to focus on it. You should be able to fly around the place and return to the Baseplate.

10. **Look at the Toolbox.** Open the **Window** menu and choose **Toolbox**. You should see four tabs: **Creator Store**, **Inventory**, **Recent**, and **Creations**. Do not insert anything yet.

    :::note[Assets can contain scripts]
    The docs warn that some assets include scripts that act at runtime, such as animating or playing a sound. If you insert an asset and want none of its scripts to run, right-click the object in the Explorer and choose **Disable Scripts**.
    :::

11. **Open the Output window.** Open the **Window** menu and choose **Output**, or use the **Script** tab. You should see an empty (or nearly empty) message list. Later, this is where your script errors and `print()` messages appear.

12. **Run your first playtest.** In the dropdown at the left of the top bar, choose **Test**, then click the **Play** button to its right. Or press `F5`. Studio starts simulating the place and puts your avatar at the `SpawnLocation`. Move your avatar around with the controls you would use in Roblox.

    > TODO(test): confirm the dropdown and Play button layout. The docs' own tutorials describe this as "the Test dropdown, then Play" in some places and "the Test tab" in others.

13. **Switch between server and client.** While the playtest runs, use the client/server toggle in the playtest controls. The viewport border turns **blue** for the client view (you control your avatar) and **green** for the server view (you fly a free camera and your avatar is present but not controlled). Switch back to the client view.

    Why: Studio really does run a server and a client at once. Seeing both is the first step to understanding why some code must run on one side and not the other.

14. **Stop the playtest.** Press `Shift+F5`, or use the stop control in the playtest bar. The viewport returns to editing, and objects go back to where you placed them.

15. **Try Run mode.** Choose **Run** in the dropdown and click **Play** (or press `F8`). Studio simulates the place but does not insert your avatar. You navigate with a free camera. Stop with `Shift+F5`.

16. **Save a local copy.** Open the **File** menu and choose **Save to File** (or **Download a Copy**). Choose the `.rbxl` format, which is the compact binary place file. Pick a name and a folder, and save. You should now have a place file on your computer that you can reopen in Studio later.

    > TODO(test): confirm the file dialog and that reopening the file in Studio restores the place.

## Check it worked

- Studio is open, you are signed in, and the Baseplate place is on screen.
- The Explorer shows `Workspace` with `Baseplate` and `SpawnLocation` inside it, and selecting an object updates the Properties window.
- You can fly the camera around and return to a selected object with `F`.
- A **Test** playtest put your avatar in the world, and stopping it returned you to editing.
- You saw a blue border for the client view and a green border for the server view.
- The Toolbox and Output windows are open.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| An **Update** button appears in the upper-right corner | Your Studio version is out of date | Click it. Studio asks you to save and close the open place, then updates and restarts itself. |
| Explorer, Properties, Toolbox, or Output is missing | The window was closed | Open the **Window** menu and choose it again. |
| The Toolbox is blank or will not load on Windows | A problem with WebView2, which the Toolbox uses | Close every running copy of Studio first. Then reinstall Windows WebView2, and delete the folder `%LOCALAPPDATA%\Roblox\RobloxStudio\WebView2`. |
| The Toolbox is blank or will not load on a Mac | A problem with WebKit data | Close every running copy of Studio first. Then delete the folders `~/Library/WebKit/com.Roblox.RobloxStudio` and `~/Library/Caches/com.Roblox.RobloxStudio/WebKit`. |
| Toolbox audio previews are silent on Windows | The Edge WebView2 process is muted | Right-click the speaker icon in the taskbar, click **Open Volume Mixer**, and make sure **Microsoft Edge WebView2** is not muted. |
| In **Run** mode your avatar is missing | This is how Run works: it simulates the game without adding your avatar | Use **Test** if you want to control an avatar. |
| In a **Test** playtest you cannot control your avatar | You are looking at the server view (green border) | Use the client/server toggle to switch back to the client view (blue border). |
| You are not sure the playtest has ended | The viewport still shows a blue or green border, or your avatar is still moving | Press `Shift+F5` or use the stop control in the playtest bar. When it has stopped, the border disappears and you can select objects in the Explorer again. |
| The window layout is a mess | You dragged windows around | Reopen missing windows from the **Window** menu and redock them by dragging. Resetting the layout is not covered by the docs read on 2026-09-26. |

## Next

[Build an obstacle path](/roblox-studio/walkthroughs/2-build-an-obstacle-path/): turn this blank place into a path of anchored platforms.

<!-- Every spec and procedure detail above must trace to an entry in `sources` (frontmatter). The list renders itself at the end of the page; don't write a "Sources" section. -->
