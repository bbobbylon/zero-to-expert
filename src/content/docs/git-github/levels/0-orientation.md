---
title: "Level 0: Orientation"
description: "The five words Git is built on — repository, commit, staging area, branch, remote — plus the two choices you'll keep meeting: HTTPS or SSH, merge or rebase."
domain: git-github
pageType: level
level: 0
status: draft
safetyCritical: false
sources:
  - title: "Getting Started - What is Git?"
    url: "https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F"
    publisher: "Pro Git book (git-scm.com)"
  - title: "Getting Started - First-Time Git Setup"
    url: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup"
    publisher: "Pro Git book (git-scm.com)"
  - title: "Git Basics - Recording Changes to the Repository"
    url: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository"
    publisher: "Pro Git book (git-scm.com)"
  - title: "Git Basics - Working with Remotes"
    url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes"
    publisher: "Pro Git book (git-scm.com)"
  - title: "Git Branching - Branches in a Nutshell"
    url: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"
    publisher: "Pro Git book (git-scm.com)"
  - title: "Git Branching - Rebasing"
    url: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
    publisher: "Pro Git book (git-scm.com)"
  - title: "git-checkout"
    url: "https://git-scm.com/docs/git-checkout"
    publisher: "Git documentation"
  - title: "git-switch"
    url: "https://git-scm.com/docs/git-switch"
    publisher: "Git documentation"
  - title: "git-merge"
    url: "https://git-scm.com/docs/git-merge"
    publisher: "Git documentation"
  - title: "git-rebase"
    url: "https://git-scm.com/docs/git-rebase"
    publisher: "Git documentation"
  - title: "git-fetch"
    url: "https://git-scm.com/docs/git-fetch"
    publisher: "Git documentation"
  - title: "git-pull"
    url: "https://git-scm.com/docs/git-pull"
    publisher: "Git documentation"
  - title: "git-push"
    url: "https://git-scm.com/docs/git-push"
    publisher: "Git documentation"
  - title: "About remote repositories"
    url: "https://docs.github.com/en/get-started/git-basics/about-remote-repositories"
    publisher: "GitHub Docs"
  - title: "gh auth setup-git"
    url: "https://cli.github.com/manual/gh_auth_setup-git"
    publisher: "GitHub CLI Manual"
tags: [git, github, fundamentals]
sidebar:
  order: 10
---

## What you'll be able to do

By the end of Level 0 you can:

- Say what a repository, a commit, the staging area, a branch, and a remote are, and sketch how a change travels through them.
- Explain why Git stores snapshots rather than diffs, and why almost everything works with no network.
- Pick HTTPS or SSH for talking to GitHub, and say why.
- Choose merge or rebase for a given situation, and state the one rule that keeps rebase safe.
- Open the [cheat sheet](/git-github/cheat-sheet/) and go straight to the right section for the job in front of you.

## Learning path

This guide has no walkthroughs yet, so the path pairs each idea below with a cheat-sheet section to try it in. Do it in a throwaway folder — nothing here needs a GitHub account until step 4. Roughly an hour (estimate).

| # | Read | Then do | You'll have |
| --- | --- | --- | --- |
| 1 | [Repository and commit](#a-repository-is-the-album-a-commit-is-one-photo) | [Identity, once per machine](/git-github/cheat-sheet/#identity-once-per-machine), then `git init` in an empty folder | A repo that signs commits with your name |
| 2 | [The staging area](#the-staging-area-is-the-tray) | [The daily loop](/git-github/cheat-sheet/#the-daily-loop): make three commits, using `git diff --staged` before each | A history you can read with `git log --oneline --graph` |
| 3 | [Branches](#a-branch-is-a-bookmark) | [Branches](/git-github/cheat-sheet/#branches): branch, commit twice, merge back, delete the branch | One merge in the graph |
| 4 | [Remotes](#a-remote-is-the-copy-you-sync-with) and [HTTPS or SSH](#https-or-ssh) | [Remotes and GitHub](/git-github/cheat-sheet/#remotes-and-github): create a GitHub repo, `git push -u`, then `git fetch` and `git pull` | The same history on GitHub |
| 5 | [Merge or rebase](#merge-or-rebase) | [Undo the small stuff](/git-github/cheat-sheet/#undo-the-small-stuff) and the [reset table](/git-github/cheat-sheet/#which-git-reset-mode) | Knowing which undo to reach for |
| 6 | — | Read the [Rare](/git-github/cheat-sheet/#rare) section once | Recognizing those situations when they happen |

## The five ideas

Git is a small vocabulary used precisely. Every command on the cheat sheet moves something between these five things.

```
 working tree  --git add-->  staging area  --git commit-->  local history (.git)
 (your files)                (the tray)                          |        ^
                                                        git push |        | git fetch / git pull
                                                                 v        |
                                                          remote ("origin", usually GitHub)
```

### A repository is the album; a commit is one photo

A **repository** is your project folder plus a hidden `.git` directory that holds the project's entire history. Analogy: a photo album that also keeps every negative. Because the whole history sits on your disk, nearly every Git operation is local — browsing history, comparing versions, and committing all work on a plane, and the network is only needed to sync with a remote.

A **commit** is one snapshot of every tracked file at a moment, plus a message, an author, a date, and a pointer to the commit before it. This is the part most people get wrong at first: a commit is not "the list of what changed," it's the whole state, like a save point in a game. Git stores unchanged files once and links to them, so the snapshots stay small. Each commit is named by a checksum of its contents (a 40-character SHA-1 hash, which you refer to by its first several characters), so a commit can't be altered without its name changing — and since Git almost only ever adds data, a committed snapshot is very hard to lose. Uncommitted work is the fragile part.

### The staging area is the tray

Between your files and the history sits the **staging area** (also called the **index**). Analogy: a tray on which you lay out exactly which photos go on the next album page before you glue them in. A file can be in three states: *modified* (changed on disk), *staged* (added to the tray with `git add`), or *committed* (glued in with `git commit`). Two things follow from this that trip people up:

- `git commit` records the tray, not your files. Edit a file after staging it and the commit gets the version you staged, unless you `git add` it again.
- Files Git has never been told about are *untracked* — they never reach a commit on their own, however many times you commit.

Why bother with a tray at all? So a commit can be one clean idea even when your working folder is messy: stage the fix, leave the half-done experiment unstaged, commit, carry on.

### A branch is a bookmark

A **branch** is a lightweight, movable pointer to a commit — nothing more. Analogy: a bookmark in the album that slides forward every time you add a page after it. Making a branch costs nothing and copies nothing, which is why Git users branch for every small task. **`HEAD`** is a pointer to the branch you're currently on, so when you commit, `HEAD`'s branch moves forward and the other bookmarks stay put.

The default branch (`main` here, `master` in older repos) is not special. It's just the branch `git init` created first; Git treats it exactly like any other.

If `HEAD` points straight at a commit instead of at a branch, you're in a **detached `HEAD`** state — you've opened the album to an old page without leaving a bookmark. It's fine for looking around, but commits made there belong to no branch, and Git will eventually throw them away unless you give them one (`git switch -c <name>`). The [Rare](/git-github/cheat-sheet/#rare) section covers the way out.

### A remote is the copy you sync with

A **remote** is another copy of the repository somewhere else — on GitHub, on a server, even in another folder on your machine. `origin` is simply the default name Git gives the remote you cloned from. Analogy: a copy of the album at a friend's house that only changes when one of you explicitly carries pages over.

Three verbs cover the carrying:

| Command | Direction | What it changes on your side |
| --- | --- | --- |
| `git fetch` | remote → you | Only your `origin/...` remote-tracking branches. Your own branches and files are untouched, so it's always safe. |
| `git pull` | remote → you | `git fetch` plus integrating the remote branch into your current branch — so it does change your files. |
| `git push` | you → remote | Sends your branch's new commits up. Refused if someone pushed in the meantime, so you fetch, integrate, and push again. |

## HTTPS or SSH?

Every GitHub repo has two URLs that reach the same place. The choice is about how you prove who you are.

| | HTTPS | SSH |
| --- | --- | --- |
| URL looks like | `https://github.com/<user>/<repo>.git` | `git@github.com:<user>/<repo>.git` |
| You prove who you are with | Your GitHub sign-in, held by a credential helper — GitHub no longer accepts a plain password for Git, so it's a token or the GitHub CLI behind the scenes | A key pair: the private key stays on your machine, the public key is added to your GitHub account |
| Behind a firewall or proxy | Works | May be blocked; GitHub documents SSH over the HTTPS port as the workaround |
| Set-up on a new machine | `gh auth setup-git` once the GitHub CLI is signed in | Generate a key, start the agent, add the key to GitHub (the [SSH key setup](/git-github/cheat-sheet/#ssh-key-setup) tabs) |
| Pick it when | You want the least setup, or you're on a corporate network | You already live with SSH keys, or you never want a credential prompt |

**Pick HTTPS with `gh auth setup-git` to start.** It's one command, it works everywhere, and it's the fix the cheat sheet's very first entry came from. Switch to SSH later if you want it; `git remote set-url origin <url>` swaps an existing repo between the two in one line. The most common failure on either path is the same: the remote is set to one scheme while your credentials are set up for the other — `git remote -v` tells you which you're on.

## Merge or rebase?

Both bring the commits from one branch into another. They leave different histories behind.

| | `git merge` | `git rebase` |
| --- | --- | --- |
| What it does | Joins the two histories with a *merge commit* that has both as parents (or, if your branch hasn't moved, just fast-forwards the pointer) | Lifts your branch's commits off and replays them one by one on top of the other branch, creating *new* commits |
| History afterwards | Branching lines that show what actually happened, merge commits included | One straight line, as if the work had been done in sequence |
| Safe for commits already pushed | Yes — nothing existing is changed | No — the replayed commits are new ones, so anyone who had the old ones now has a history that no longer matches yours |
| Pick it when | Integrating into a branch other people use, and for anything that's already been pushed | Tidying up your own unpushed commits so they land cleanly on top of the latest `main` |

The rule that settles it, straight from the Pro Git book: **rebase to clean up local work before you push it; never rebase anything you've already pushed.** Rewriting published commits forces everyone downstream to repair their history, and it's how duplicate commits and baffling conflicts get into a shared repo. Inside that rule, rebase gives a cleaner story and merge gives an honest record — teams differ on which they value, and neither is wrong.

This shows up daily as `git pull`. By default it only fast-forwards and refuses when your branch and the remote have both moved. If the commits on your side are unpushed, `git pull --rebase` replays them on top of the remote's, and the rule above is satisfied. If they're pushed, merge.

## Practice project

In an empty folder: `git init`, set your name and email, and make three commits to a text file, checking `git status` and `git diff --staged` before each. Create a branch, add two commits to it, switch back, and merge. Then run `git log --oneline --graph --all` and `git reflog` and match each line to something you did. Finish by deleting the branch, and — with the deletion message still on screen — recreating it with `git branch <name> <hash>` to prove the commits never went away.

## Check yourself

1. You edit `notes.md`, run `git add notes.md`, then edit it again and run `git commit -m "notes"`. Which version is in the commit?
2. A commit is 40 hex characters long. What is it a checksum of, and why does that matter?
3. What does creating a branch copy?
4. `git fetch` finished and nothing in your working folder changed. Did it fail?
5. `git status` says `HEAD detached at 3ab4529`. You've made two commits. What do you do before switching away?
6. A teammate says "just force-push it." What question do you ask first, and which flag would you use?
7. Your `git pull` was refused because the branches diverged. You have two commits nobody has seen yet. Merge or rebase?

<details>
<summary>Answers</summary>

1. The first version — the one you staged. The staging area holds what you added, not the file on disk; the second edit is still unstaged.
2. Of the commit's contents. Change anything and the name changes, so history can't be quietly altered, and the same commit has the same name in every copy of the repo.
3. Nothing. A branch is a pointer to a commit, so creating one writes one small reference.
4. No. Fetch only updates the `origin/...` remote-tracking branches; your branches and files are meant to stay untouched. Look at `git log --oneline main..origin/main` to see what arrived.
5. Give the commits a branch: `git switch -c <name>`. Otherwise no branch points at them, and Git will eventually garbage-collect them.
6. "Has anyone else pushed to that branch, or based work on it?" If it's your own branch and you must, `git push --force-with-lease`, which fails instead of overwriting commits you haven't seen. Never on a shared branch.
7. Rebase: `git pull --rebase`. The commits are local and unpushed, so replaying them on top of the remote's rewrites nothing anyone else has.

</details>

## Next

Level 1 (coming next): a walkthrough series — clone, branch, commit, push, and open a pull request — plus reading a diff and writing a commit message someone else can use.
