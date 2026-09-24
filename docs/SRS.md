# Software Requirements Specification

| | |
| --- | --- |
| **Version** | 1.2 |
| **Written** | 2026-09-20 |
| **Changed in 1.2** | 2026-09-23: home page is the manual's contents page (FR-13), site speaks in the owner's first person (FR-15), accessibility re-audited for the new design |
| **Changed in 1.1** | Accessibility status in section 4: audited by tools, results linked |
| **Describes** | Phase 1 (the static site), package version 0.0.1 |
| **Related** | [ARCHITECTURE](./ARCHITECTURE.md) (how it is built), [UI-DESIGN](./UI-DESIGN.md) (how it looks), [DEPLOYMENT](./DEPLOYMENT.md) (how it ships), [README](../README.md) (commands), [CLAUDE.md](../CLAUDE.md) (content rules) |

This document was written after Phase 1 was built, from the code and the rules already in the repo. Where the owner has not set a target, it says so with `TODO(owner)` instead of inventing one.

## 1. Executive Summary

**Zero to Expert** is a set of field guides that take a reader from first steps to mastery across tech, trades, and survival. Every page says plainly whether it has been fact-checked, and the build refuses to publish a page that claims to be verified without a date and sources.

**Goals**

1. Teach each subject in six levels (0 Orientation to 5 Mastery), with step-by-step walkthroughs and a tiered cheat sheet.
2. Never let an unchecked page look trustworthy.
3. Keep the content portable: Phase 2 is a Spring Boot + Angular app that reads the same Markdown files.

**Stakeholders**

| Who | Interest |
| --- | --- |
| Site owner | Sole author, fact-checker, and maintainer. Runs all git and GitHub steps. |
| Readers | People learning a subject or following a walkthrough mid-job, often on a phone. |
| AI coding agents | Draft pages and build the site under the rules in `CLAUDE.md`. They may never mark a page `review` or `verified`. |

## 2. System Overview

**Problem.** How-to content online is scattered, uneven in quality, and rarely says whether anyone checked it. For brakes, mains voltage, or a cloud bill, an unchecked instruction is a real risk.

**Users.** Self-learners from complete beginner to professional, across 15 guides in two groups: Tech (8) and Hands-on (7). The list lives in `src/domains.mjs`.

**Main features**

- One guide per subject, each with an overview, six level pages, concept pages, a cheat sheet, and walkthroughs.
- A fact-check status on every page: `planned`, `draft`, `review`, or `verified`.
- A home page that is the manual's contents page, computed from the content: a note from the owner, numbered chapters, the six levels, the jobs index, and the inspection log (verification backlog).
- Full-text search, light and dark themes, and a layout that works on a phone.

**Current state (2026-09-20).** All 15 guides have overview pages. AWS has Level 0, five concept pages, six walkthroughs, and a cheat sheet. Git & GitHub has a cheat sheet. No page is verified yet; the home page's inspection log shows the live numbers.

## 3. Functional Requirements

Each requirement below is implemented today unless marked otherwise.

### Content model

| ID | Requirement |
| --- | --- |
| FR-1 | The list of guides has one source (`src/domains.mjs`). Adding an entry adds the guide to the sidebar, the contents page, the footer, and the set of valid `domain` values; its position in the list is its chapter number. |
| FR-2 | Every page declares `domain`, `pageType` (`overview`, `level`, `walkthrough`, `cheatsheet`, `explanation`, `reference`), and `status`. `level` pages must set `level` 0-5; `walkthrough` pages must set `difficulty` (`easy`, `moderate`, `hard`, `expert`). |
| FR-3 | A page may list `sources` (title, absolute URL, optional publisher), `tags`, `time`, `tools`, `parts`, and `safetyCritical`. |
| FR-4 | A `verified` page must have `lastVerified` and at least one source. A `safetyCritical` page must have at least one source before it can be `review` or `verified`. |
| FR-5 | Cheat sheets have three tiers: Common, Uncommon, Rare. Every Rare entry links to official documentation. |

### Trust and safety

| ID | Requirement |
| --- | --- |
| FR-6 | Every page that is not `verified` shows a banner derived from its `status` (`src/routeData.ts`). Nobody writes these banners by hand, so a page cannot look checked while its frontmatter says otherwise. |
| FR-7 | Wherever a page is listed or titled (contents lines, jobs index, chapter contents, page header block), its status is shown beside it as a tag or an inspection stamp. A verified page's stamp names who checked it and when. Status is never conveyed by color alone. |
| FR-8 | `safetyCritical` pages are flagged in the title strip and open with a `:::danger` aside. |
| FR-9 | New pages start as `draft`. Only the owner promotes a page to `review` or `verified`. |

### Build gates

| ID | Requirement |
| --- | --- |
| FR-10 | The build fails on any frontmatter that breaks FR-2 to FR-4, naming the file, field, and rule. |
| FR-11 | The build fails on any broken internal link or missing heading anchor in Markdown content. |
| FR-12 | A failed build publishes nothing; the live site keeps its last good version. |

### Reading experience

| ID | Requirement |
| --- | --- |
| FR-13 | The home page is the manual's contents page, computed at build time: a signed note from the owner with the honest counts, one numbered contents line per guide (pages written, pages checked, status), the six levels as a ruler, every walkthrough with difficulty, time, and status, and an inspection log of pages by status. |
| FR-14 | Each guide overview shows the chapter's contents: which of the six levels exist (linked, with status), walkthrough and concept counts, and the cheat sheet once written. |
| FR-15 | Every guide page shows its chapter number, chapter name, and page type above the title, and its level (as a gauge), difficulty, time, safety flag, and inspection stamp below it. Site copy speaks in the owner's first person and is signed with his first name (`OWNER_NAME` in `src/site.mjs`); it makes no claims about him beyond the site's purpose. |
| FR-16 | Every page has a primary navigation bar, a sidebar of all guides, full-text search, a light/dark theme switch, and a footer with links to every guide (numbered), Terms of Use, Privacy Policy, and Contact Us. |
| FR-17 | Commands that differ by operating system are shown in synced Windows/macOS tabs. |

### Operations

| ID | Requirement |
| --- | --- |
| FR-18 | One entry script (`run.sh`, `run.ps1`, `run.cmd`) offers the same commands on every OS: `setup`, `dev`, `build`, `start`, `check`, `pages`, `clean`. |
| FR-19 | A push to the deploy branch builds, validates, and publishes the site to GitHub Pages with no manual step. See the known issue in [DEPLOYMENT](./DEPLOYMENT.md#known-issue-branch-name). |
| FR-20 | No repository name or site URL is hard-coded; the base path and origin come from the environment, so renaming the repo or adding a custom domain needs no code change. |

### Phase 2 (not built)

Accounts and saved progress in a Spring Boot + Angular app that reads the same Markdown and frontmatter. No requirements are written for it yet. `TODO(owner)`.

## 4. Non-Functional Requirements

| Area | Requirement | Status |
| --- | --- | --- |
| Accuracy | Specifics (commands, torque values, part numbers, dosages, prices) come only from a listed source, preferring primary sources. Unknowns are left as marked gaps (`TODO(source)`, `TODO(test)`), never guessed. | Enforced by process (`CLAUDE.md`) and partly by the build (FR-4) |
| Portability | Content is plain Markdown plus a small allowed component set (`Tabs`, `TabItem`, `Steps`, `Badge`) and Markdown asides, so the Phase 2 app can render it. Site chrome never leaks into content files. | Met |
| Accessibility | Target WCAG 2.1 AA: contrast, keyboard access, screen-reader structure, reduced motion, forced colors. | **Checked by tools on 2026-09-20, not certified.** axe-core: 0 violations after 1 fix. Measured text contrast: 0 failures after 4 fixes. Still missing: a screen-reader pass by a person, zoom and forced-colors tests. Details: [UI-DESIGN §5](./UI-DESIGN.md#5-accessibility-a11y) |
| Privacy | No accounts, ads, analytics, or tracking cookies. Fonts are self-hosted, so browsers contact no third party. Browser storage holds only the theme choice and sidebar state. | Met; stated in the Privacy Policy (draft) |
| Security | Static files only: no server code, database, or secrets. Served over HTTPS by GitHub Pages. CI runs with least-privilege permissions. | Met; see [ARCHITECTURE §8](./ARCHITECTURE.md#8-security-considerations) |
| Reliability | Deploys are atomic: build and validation must pass before anything is published (FR-12). Uptime is whatever GitHub Pages provides. | Met; no uptime target set |
| Performance | Pages are pre-rendered static HTML with no client framework. The home page makes no image requests. | No numeric target set. `TODO(owner)`: choose one (for example a Lighthouse performance score) if wanted |
| Compatibility | Pages are pre-rendered HTML; JavaScript is used for search, the theme switch, and tabs. Newer CSS features are progressive enhancements: the reading-progress line needs CSS scroll-driven animations and falls back to a static line. | Met. Not tested with JavaScript disabled or across a browser matrix |
| Maintainability | Every source file opens with a comment explaining what it does and how it relates to the rest of the codebase. | Met |

## 5. User Stories

- As a **beginner**, I want a Level 0 page that names the parts and the vocabulary, so that the later levels make sense.
- As a **reader mid-job**, I want the difficulty, time, and tools before step 1, so that I know whether to start.
- As a **reader mid-job**, I want to see whether a walkthrough has been fact-checked before I rely on a spec or command in it.
- As a **reader**, I want to search every guide from any page, so that I can find a fix by its error message.
- As a **returning reader**, I want each guide's overview to show which levels exist, so that I can see where the guide currently stops.
- As the **owner**, I want the build to refuse a "verified" page without a date and sources, so that I cannot publish an unbacked promise by accident.
- As the **owner**, I want the inspection log to show how many pages are verified, so that I can see my fact-checking backlog at a glance.
- As the **owner**, I want the site to read as mine — my voice, my name on the stamp — so that the people I send here know who is standing behind each page.
- As an **AI coding agent**, I want one command that proves my work is valid (`run check`), so that I know when I am done.

## 6. Success Criteria

- `./run.sh check` exits 0 on every commit to the deploy branch.
- Every published page shows its true status; the share of `verified` pages (home page inspection log) rises over time.
- Each guide eventually has all six levels, a cheat sheet, and walkthroughs. The guide progress panels show how far along each one is.
- The same Markdown files render correctly in the Phase 2 app with no content edits.

`TODO(owner)`: no numeric targets or dates have been set (for example "AWS Level 0-2 verified by a given date").

## 7. Constraints

**Technical**

- Node.js 22.12 or newer (`.nvmrc` pins major 22). Astro 7 and Starlight 0.42; config shapes change between releases, so check installed versions before trusting older examples.
- Hosting is GitHub Pages, which is free for public repositories; a private repository needs a paid plan.
- Content may use only the allowed components. Each new one is another thing the Phase 2 app must render, so additions need the owner's approval.

**Timeline.** None set. `TODO(owner)`.

**Resources.** One person writes, fact-checks, and maintains everything. Fact-checking is the bottleneck by design: agents can draft quickly, but only the owner can verify.

**Legal.** The repo has no `LICENSE` file, and the Terms of Use and Privacy Policy pages are drafts awaiting the owner's review, including the content license and governing law.
