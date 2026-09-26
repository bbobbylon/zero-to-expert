---
title: "VS Code: tips and tricks"
description: "The VS Code habits that save the most time, with the exact Windows and macOS keys for each, and the files behind them: settings.json, keybindings.json, snippets, tasks.json, launch.json."
domain: ides
pageType: explanation
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Visual Studio Code Tips and Tricks"
    url: "https://code.visualstudio.com/docs/getstarted/tips-and-tricks"
    publisher: "Visual Studio Code Docs"
  - title: "Keyboard shortcuts for Visual Studio Code"
    url: "https://code.visualstudio.com/docs/configure/keybindings"
    publisher: "Visual Studio Code Docs"
  - title: "Default keyboard shortcuts reference"
    url: "https://code.visualstudio.com/docs/reference/default-keybindings"
    publisher: "Visual Studio Code Docs"
  - title: "Basic editing"
    url: "https://code.visualstudio.com/docs/editing/codebasics"
    publisher: "Visual Studio Code Docs"
  - title: "Code navigation"
    url: "https://code.visualstudio.com/docs/editing/editingevolved"
    publisher: "Visual Studio Code Docs"
  - title: "User interface"
    url: "https://code.visualstudio.com/docs/getstarted/userinterface"
    publisher: "Visual Studio Code Docs"
  - title: "Terminal basics"
    url: "https://code.visualstudio.com/docs/terminal/basics"
    publisher: "Visual Studio Code Docs"
  - title: "User and workspace settings"
    url: "https://code.visualstudio.com/docs/configure/settings"
    publisher: "Visual Studio Code Docs"
  - title: "Settings Sync"
    url: "https://code.visualstudio.com/docs/configure/settings-sync"
    publisher: "Visual Studio Code Docs"
  - title: "Snippets in Visual Studio Code"
    url: "https://code.visualstudio.com/docs/editing/userdefinedsnippets"
    publisher: "Visual Studio Code Docs"
  - title: "Extension Marketplace"
    url: "https://code.visualstudio.com/docs/configure/extensions/extension-marketplace"
    publisher: "Visual Studio Code Docs"
  - title: "Using Git source control in VS Code"
    url: "https://code.visualstudio.com/docs/sourcecontrol/overview"
    publisher: "Visual Studio Code Docs"
  - title: "Integrate with External Tools via Tasks"
    url: "https://code.visualstudio.com/docs/debugtest/tasks"
    publisher: "Visual Studio Code Docs"
  - title: "Debugging"
    url: "https://code.visualstudio.com/docs/debugtest/debugging"
    publisher: "Visual Studio Code Docs"
  - title: "Command Line Interface (CLI)"
    url: "https://code.visualstudio.com/docs/configure/command-line"
    publisher: "Visual Studio Code Docs"
  - title: "Resolving extension issues with bisect"
    url: "https://code.visualstudio.com/blogs/2021/02/16/extension-bisect"
    publisher: "Visual Studio Code Blog"
tags: [vscode, ide, tips]
sidebar:
  order: 50
---

## The one-line version

You don't need to memorise VS Code. You need one shortcut that finds every other feature by name, and a handful of habits that pay off every single day. This page is those habits, each with the exact keys on Windows and macOS.

Analogy: an old telephone switchboard. You didn't need to know the wiring; you told the operator who you wanted and she connected you. In VS Code the operator is the **Command Palette**. Every feature on this page can be reached by typing its name there, and the shortcuts are just speed-dial numbers you learn once you find yourself asking for the same thing daily.

:::note
macOS keys are written the way VS Code's own documentation writes them: ⌘ Command, ⌥ Option (labelled "alt" on many Mac keyboards), ⌃ Control, ⇧ Shift. "Ctrl+K Ctrl+S" is a two-step chord: press the first pair, release, press the second.
:::

## The Command Palette: the one entry point

**What it is.** A search box for every command VS Code and your extensions know about, filtered to what makes sense in your current context.

**Why it saves time.** It replaces the menu hunt. Type a few letters of what you want ("format", "zen", "terminal", "settings json") and press Enter. When a command has a shortcut, the palette shows it next to the name, so the palette teaches you the shortcuts as you go.

| Action | Windows | macOS |
| --- | --- | --- |
| Open the Command Palette | `Ctrl+Shift+P` (or `F1`) | `⇧⌘P` |

The palette is really one mode of a wider box. The same box, opened with Quick Open (next section), changes what it searches depending on the first character you type:

| Prefix | What the box searches |
| --- | --- |
| `>` | Commands (this is the Command Palette) |
| `@` | Symbols in the current file (functions, classes, headings); `@:` groups them by kind |
| `#` | Symbols across the whole workspace |
| `?` | A list of the prefixes it understands |

## Quick Open: files without the mouse

**What it is.** Fuzzy search over file names in your workspace.

**Why it saves time.** The Explorer is for discovering what exists. Once you know a file's name, typing five letters of it beats scrolling a tree, every time.

| Action | Windows | macOS |
| --- | --- | --- |
| Quick Open (go to file) | `Ctrl+P` | `⌘P` |
| Cycle through recently opened editors | `Ctrl+Tab` | `⌃Tab` |
| Open recent files and folders | `Ctrl+R` | `⌃R` |
| Go to line | `Ctrl+G` | `⌃G` |

## Multi-cursor and column selection

**What it is.** Several cursors typing the same thing at once. Column (box) selection is the same idea for a rectangle of text.

**Why it saves time.** Renaming five variables by hand, or adding a comma to the end of twenty lines, is exactly the kind of job that invites typos. With multiple cursors you make the edit once and it lands everywhere.

| Action | Windows | macOS |
| --- | --- | --- |
| Add a cursor where you click | `Alt+Click` | `Option+Click` |
| Add a cursor on the line below / above | `Ctrl+Alt+↓` / `Ctrl+Alt+↑` | `⌥⌘↓` / `⌥⌘↑` |
| Select the word at the cursor, then the next occurrence, then the next... | `Ctrl+D` | `⌘D` |
| Add a cursor at every occurrence of the selection | `Ctrl+Shift+L` | `⇧⌘L` |
| Column (box) selection with the mouse | `Shift+Alt+drag` | `Shift+Option+drag` |
| Expand / shrink the selection to the enclosing block | `Shift+Alt+→` / `Shift+Alt+←` | `⌃⇧⌘→` / `⌃⇧⌘←` |

Two settings worth knowing:

- **Column Selection Mode** (menu **Selection > Column Selection Mode**, setting **Editor: Column Selection**): while it's on, the Status Bar shows an indicator and the arrow keys and mouse make box selections instead of normal ones. Turn it off from that Status Bar indicator when you're done, or every selection you make will be a rectangle.
- `editor.multiCursorModifier`: if `Alt+Click` clashes with something on your machine, set it to `ctrlCmd` (Ctrl on Windows, Cmd on macOS). The menu item **Selection > Switch to Ctrl+Click for Multi-Cursor** does the same thing.

## Zen mode, minimap, breadcrumbs

**Zen mode** hides everything except the editor. Use it when you need to read a long file without the sidebar and panel pulling your eye.

| Action | Windows | macOS |
| --- | --- | --- |
| Toggle Zen mode (also **View > Appearance > Zen Mode**) | `Ctrl+K Z` | `⌘K Z` |
| Leave Zen mode | press `Esc` twice | press `Esc` twice |
| Toggle the Side Bar | `Ctrl+B` | `⌘B` |
| Toggle the Panel (terminal, problems, output) | `Ctrl+J` | `⌘J` |

**The minimap** is the miniature of the file on the right edge of the editor. It's a scroll aid, not a reading aid. If it steals space you want, set `"editor.minimap.enabled": false`; if you just want it out of the way, `"editor.minimap.side": "left"`.

**Breadcrumbs** are the path above the editor: folder, file, then the symbol your cursor is inside. They're a navigation tool as much as a label: toggle them with the **View: Toggle Breadcrumbs** command, focus them with `Ctrl+Shift+.` (macOS `⇧⌘.`), and use the arrow keys to walk sideways to sibling files and symbols.

## The integrated terminal

**What it is.** A real shell (PowerShell, bash, zsh, whatever you use) inside the editor, opening at the root of your workspace, with file paths and error output turned into clickable links.

**Why it saves time.** Alt-tabbing to a separate terminal window costs a few seconds and a little attention each time; over a day that adds up. The terminal lives in the Panel, so the shortcut that opens it also hides it.

| Action | Windows | macOS |
| --- | --- | --- |
| Toggle the terminal (also **View: Toggle Terminal**, or **Terminal > New Terminal**) | ``Ctrl+` `` | ``⌃` `` |
| Create another terminal | ``Ctrl+Shift+` `` | ``⌃⇧` `` |
| Split the current terminal | `Ctrl+Shift+5` | `⌘\` |
| Close a terminal | select its tab, press `Delete` (or the trash icon) | select its tab, press `Delete` (or the trash icon) |

## Settings: UI vs JSON, user vs workspace

**What it is.** Every preference in VS Code is a key/value pair. You can edit them through a searchable form (the Settings editor) or directly in a JSON file; both edit the same data.

| Action | Windows | macOS |
| --- | --- | --- |
| Open the Settings editor (also **File > Preferences > Settings**) | `Ctrl+,` | `⌘,` |
| Open the user JSON file directly | Command Palette: **Preferences: Open User Settings (JSON)** | same |
| Open the workspace JSON file directly | Command Palette: **Preferences: Open Workspace Settings (JSON)** | same |

Two choices compete here, and beginners get both wrong for the same reason: they don't know which one they're editing.

| Choice | Pick it when | Avoid it when |
| --- | --- | --- |
| **Settings editor (UI)** | You don't know the exact setting name; you want the description, the default, and the allowed values in front of you | You're changing many settings at once or copying a block from a teammate |
| **`settings.json`** | You know the key, you're pasting a block, or you want the file under version control | You're unsure of the key name (a typo in JSON silently does nothing) |

| Scope | Where it lives | Wins when | Use it for |
| --- | --- | --- | --- |
| **User** | Windows: `%APPDATA%\Code\User\settings.json`; macOS: `$HOME/Library/Application Support/Code/User/settings.json` | Nothing more specific overrides it | Personal taste: font, theme, keybinding modifiers, auto-save |
| **Workspace** | `.vscode/settings.json` in the project root | Always beats User settings for that project | Project rules: formatter, tab width, linter paths, anything the whole team must share |

The full precedence order, lowest to highest, is: Default, User, Remote, Workspace, Workspace Folder, then the language-specific version of each of those, then Policy settings (set by an administrator). The rule of thumb that covers 95% of cases: **the more specific scope wins**.

Undoing a change: hover a setting in the Settings editor, click its gear icon, and choose **Reset Setting**. To wipe everything, delete the entries between the braces in `settings.json`, but there is no undo for that, so copy the file somewhere first.

## Settings Sync

**What it is.** VS Code backs up your configuration to the cloud, tied to a Microsoft or GitHub account (GitHub Enterprise accounts don't work), and applies it on any machine you sign into.

**Why it saves time.** The hour you spend re-installing extensions and re-typing settings on a new laptop disappears. It syncs Settings, Keyboard Shortcuts, User Snippets, User Tasks, UI State, Extensions, and Profiles.

- Turn it on from the Manage menu (the gear at the bottom of the Activity Bar) with **Backup and Sync Settings**, or from the Accounts menu, then sign in.
- Keyboard shortcuts sync **per platform** by default, which is what you want: `Ctrl` on Windows is `⌘` on a Mac. Only disable `settingsSync.keybindingsPerPlatform` if you deliberately keep identical bindings everywhere.
- Turn it off with the **Settings Sync: Turn off** command. The **Settings Sync is On** entry in the Manage menu offers a checkbox to clear the data in the cloud as well.

## Keybindings: `keybindings.json`

**What it is.** A visual editor for every shortcut, backed by a JSON file that holds only *your* changes.

**Why it saves time.** Coming from another editor? Keep its muscle memory instead of relearning. Colliding with an OS shortcut? Move it.

| Action | Windows | macOS |
| --- | --- | --- |
| Open the Keyboard Shortcuts editor (also **File > Preferences > Keyboard Shortcuts**, or the **Preferences: Open Keyboard Shortcuts** command) | `Ctrl+K Ctrl+S` | `⌘K ⌘S` |
| Open `keybindings.json` | the **Open Keyboard Shortcuts (JSON)** button in that editor's title bar | same |
| See every default binding | Command Palette: **Preferences: Open Default Keyboard Shortcuts (JSON)** | same |
| Printable reference card | **Help > Keyboard Shortcut Reference** ([Windows PDF](https://go.microsoft.com/fwlink/?linkid=832145)) | **Help > Keyboard Shortcut Reference** ([macOS PDF](https://go.microsoft.com/fwlink/?linkid=832143)) |

Each entry in `keybindings.json` pairs a key with a command ID, for example `{ "key": "ctrl+f", "command": "actions.find" }` or `{ "key": "f5", "command": "workbench.action.debug.start" }`. Your entries are appended after the defaults and rules are evaluated from the bottom up, so the last matching rule wins: that's how a one-line file can override a built-in shortcut without you deleting anything.

## Snippets

**What it is.** Templates for code you type repeatedly (a for-loop, a test case, a Spring `@RestController` skeleton), triggered by a short prefix and filled in with tab stops.

**Why it saves time.** Anything you've typed three times is a snippet waiting to happen, and a snippet never forgets the closing brace.

- Create one with **File > Preferences > Configure Snippets** (or the **Snippets: Configure Snippets** command). Pick a language to get a per-language file such as `javascript.json`, or **New Global Snippets file** for a `.code-snippets` file that can serve several languages via a `scope` field.
- Each snippet has a `prefix` (what you type), a `body` (an array of lines), and an optional `description`. `$1`, `$2` are tab stops in order, `$0` is where the cursor ends, and `${1:array}` is a tab stop with placeholder text.
- Insert one by typing the prefix and accepting the IntelliSense suggestion (`Ctrl+Space` on Windows, `⌃Space` on macOS opens suggestions by hand), by running **Insert Snippet** from the Command Palette, or, if you set `"editor.tabCompletion": "on"`, by typing the prefix and pressing `Tab`.

The example from the docs, which is a good shape to copy:

```json
{
  "For Loop": {
    "prefix": ["for", "for-const"],
    "body": ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"],
    "description": "A for loop."
  }
}
```

## Extensions

**What it is.** The Extension Marketplace is where languages, debuggers, linters, themes, and tools plug in. VS Code ships lean; extensions are how it becomes a Java, Python, or Angular editor.

| Action | Windows | macOS |
| --- | --- | --- |
| Open the Extensions view (also **View: Extensions**) | `Ctrl+Shift+X` | `⇧⌘X` |

- **Install** from the view; the button turns into a **Manage** gear, which is where **Disable** (globally or for this workspace only) and **Uninstall** live. Either prompts you to **Restart Extensions**.
- Extensions update themselves by default; `extensions.autoUpdate` controls that.
- **Share a recommended set with your team.** Run **Extensions: Configure Recommended Extensions (Workspace Folder)** and VS Code creates `.vscode/extensions.json` holding a `recommendations` list of extension IDs in `publisher.name` form. Anyone who opens the folder is prompted to install them, and **Extensions: Show Recommended Extensions** lists them at any time. Commit this file; it's the cheapest onboarding document you'll ever write.

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

- On disk, extensions live in `%USERPROFILE%\.vscode\extensions` on Windows and `~/.vscode/extensions` on macOS. You rarely need to go there, but it's where "why is this still installed?" gets answered.

## The Source Control view and the diff editor

**What it is.** A Git client that lives in the Side Bar, plus a diff editor that opens whenever you click a changed file.

**Why it saves time.** You see what you're about to commit, line by line, without leaving the editor, and you can stage or throw away individual blocks from the diff itself.

| Action | Windows | macOS |
| --- | --- | --- |
| Open Source Control | `Ctrl+Shift+G` | `⌃⇧G` |
| Commit the typed message | `Ctrl+Enter` | `⌘Enter` |
| Compare the active file with the clipboard | `Ctrl+K C` | `⌘K C` |
| Compare the active file with its saved version | `Ctrl+K D` | `⌘K D` |

- The view groups files into **CHANGES**, **STAGED CHANGES**, and (mid-merge) **MERGE CHANGES**, with a commit graph underneath. Stage and unstage through the inline actions or by drag and drop.
- Selecting a file opens the diff editor; the middle gutter has actions to stage or revert a block of lines.
- In any editor, the left gutter marks what's changed since the last commit: a green bar for added lines, a blue bar for modified ones, a red triangle where lines were deleted.
- The **Timeline** view at the bottom of the Explorer shows a single file's history, both Git commits and local saves, which is your safety net for "I had it working ten minutes ago".
- Blame is a toggle: **Git: Toggle Git Blame Editor Decoration** and **Git: Toggle Git Blame Status Bar Item**. When Git does something surprising, **View > Output** and pick **Log (Git)** to see the exact commands VS Code ran.

## Tasks: `tasks.json`

A task is a saved command line that VS Code can run, watch, and parse for errors, so `mvn -q verify` or `npm run lint` becomes a menu item instead of something you retype. **Terminal > Configure Tasks** creates `.vscode/tasks.json`; **Configure Default Build Task** marks one task as the one `Ctrl+Shift+B` (macOS `⇧⌘B`) runs, and **Tasks: Run Task** lists all of them. VS Code also auto-detects tasks from npm, Gulp, Grunt, and Jake without any file at all. A minimal task is a `label`, a `type` (`shell` or `process`), a `command`, a `group` such as `build` or `test`, and a `problemMatcher` that turns the output into clickable entries in the Problems panel (an empty `[]` means "don't parse it"):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run tests",
      "type": "shell",
      "command": "./scripts/test.sh",
      "group": "test",
      "problemMatcher": []
    }
  ]
}
```

## Launch and debug: `launch.json`

The Run and Debug view (`Ctrl+Shift+D`, macOS `⇧⌘D`) is the debugger's home. Its configuration lives in `.vscode/launch.json`; create it from the **create a launch.json file** link in that view or from **Run > Add Configuration**. `F5` starts debugging (`Ctrl+F5`, macOS `⌃F5`, runs without the debugger attached), `F9` toggles a breakpoint on the current line (clicking the gutter left of the line number does the same), and the floating toolbar maps to `F10` step over, `F11` step into, `Shift+F11` step out, and `Shift+F5` stop. JavaScript, TypeScript, and Node.js debugging are built in; Java, Python, C#, and the rest arrive with their language extension, which also documents the `launch.json` fields it understands. The Debug Console under the editor is a REPL against the paused program.

## The `code` command line

**What it is.** VS Code installs a `code` command. On the Windows machine this page was drafted on it was already on `PATH` after a standard install; on macOS run **Shell Command: Install 'code' command in PATH** from the Command Palette once.

**Why it saves time.** `cd` into a project and type `code .` and you're editing it. Everything below was read from `code --help` on VS Code 1.138.0 on this machine.

| Command | What it does |
| --- | --- |
| `code .` | Open the current folder |
| `code -r .` / `--reuse-window` | Open it in the last active window instead of a new one |
| `code -n` / `--new-window` | Force a new window |
| `code -g path/to/file:10:5` / `--goto` | Open a file at a line (and optional column) |
| `code --diff a.txt b.txt` / `-d` | Open the two files in the diff editor |
| `code -a folder` / `--add` | Add a folder to the last active window (multi-root workspace) |
| `code -w file` / `--wait` | Wait until the file is closed before returning, which is what makes `code` usable as Git's editor |
| `code --list-extensions` (add `--show-versions`) | List installed extensions, one `publisher.name` per line |
| `code --install-extension publisher.name` | Install or update an extension; append `@1.2.3` for a specific version |
| `code --uninstall-extension publisher.name` | Remove an extension |
| `code --disable-extensions` | Start with every extension off, for that window only |
| `code --user-data-dir <dir>` | Keep settings and state in another folder, which gives you a second, independent VS Code |
| `code --profile <name>` | Open with a named profile, creating it if needed |
| `code --version` / `-v` | Print the version, commit, and architecture |

Pipe a list of extensions into a file and you have a portable "install my setup" script: `code --list-extensions` on the old machine, `code --install-extension` per line on the new one (or let Settings Sync do it).

## Common mistakes

- **Learning shortcuts before learning the Command Palette.** Every shortcut on this page is one `Ctrl+Shift+P` / `⇧⌘P` and a few letters away. Memorise the palette first; let it teach you the rest.
- **Personal taste in workspace settings.** A font size or colour theme in `.vscode/settings.json` gets committed and imposed on every teammate. Taste goes in User settings; project rules go in Workspace settings.
- **Project rules in user settings.** The mirror image: your formatter config lives only on your machine, so the build server and your colleagues format differently and every pull request is full of whitespace noise.
- **Copying a Windows `keybindings.json` onto a Mac.** `ctrl` isn't `cmd`. Settings Sync keeps shortcuts per platform for exactly this reason; leave that default alone.
- **Blaming VS Code for an extension's bug.** Slow startup, a frozen window, odd completions: start with `code --disable-extensions`, and if that fixes it, run **Help: Start Extension Bisect** to find the culprit in a handful of reload-and-answer steps instead of toggling extensions one at a time.
- **Emptying `settings.json` to "reset".** It works, and there is no undo. Back the file up first.
- **`Ctrl+F` when you meant `Ctrl+Shift+F`.** The first searches the open file; the second (`⇧⌘F` on macOS) searches the whole workspace. Beginners lose minutes hunting through files one by one because the find box "found nothing".

## Where this shows up

- The [Editors & IDEs cheat sheet](/ides/cheat-sheet/) lists every shortcut above by how often you'll need it, with Windows and macOS side by side.
- The [Editors & IDEs guide](/ides/) starts at Level 0, which names the five parts of the window these tips refer to.

## Check yourself

1. You want a project's tab width to be the same for everyone who clones it. User or Workspace settings?
2. Your Mac shortcut for "toggle terminal" starts with which modifier: ⌘ or ⌃?
3. VS Code got slow after you installed six extensions last week. What's the fastest way to find which one?

<details>
<summary>Answers</summary>

1. Workspace: `.vscode/settings.json`, committed with the project.
2. ⌃ (Control): ``⌃` ``. It is one of the few everyday shortcuts that keeps Control on macOS.
3. Start with `code --disable-extensions .` to confirm an extension is the cause, then **Help: Start Extension Bisect** to find it by halving.

</details>

> TODO(test): No shortcut or command on this page was pressed or executed while drafting, except `code --version` and `code --help` (run on VS Code 1.138.0, Windows). Every key combination was read from the VS Code documentation pages listed in `sources`; press each one on a real Windows and macOS machine before promoting this page.
