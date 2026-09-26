# CLAUDE.md

Instructions for AI coding agents (Claude Code) working in this repo. Read fully before changing anything.

## What this project is

"Zero to Expert": field guides from beginner to mastery across tech, trades, and survival, published to GitHub Pages with Astro Starlight. Phase 2 is a Spring Boot + Angular app that reads the **same Markdown files**, so content must stay portable.

## Commands

Always use the entry script; don't document or rely on raw npm/Maven commands.

| Task | Command (macOS/Linux) | Windows |
| --- | --- | --- |
| Install exact dependencies (checks Node version) | `./run.sh setup` | `run setup` |
| Dev server for humans (http://localhost:4321/) | `./run.sh dev` | `run dev` |
| Dev server for agents (keeps the terminal free) | `npx astro dev --background`, then `npx astro dev stop` | same |
| Build + validate (frontmatter, links) | `./run.sh build` | `run build` |
| Serve the production build | `./run.sh start` | `run start` |
| Build and preview as GitHub Pages serves it | `./run.sh pages` | `run pages` |

**Definition of done:** `./run.sh check` exits 0. It fails on invalid frontmatter or any broken internal link. Never work around a failure by loosening the schema or the validator.

**Entry script contract:** `run.sh` and `run.ps1` must keep the same commands and behavior. Change both together, keep `run.ps1` compatible with Windows PowerShell 5.1 (no `&&`, `??`, or ternaries), and document every new command in the README. When a `backend/` is added, the scripts switch to Maven automatically; update CI with `actions/setup-java` at the same time.

## Git

Do not run `git commit`, `git push`, or create branches or repos. The owner runs all git and GitHub steps himself. When work is ready, list the changed files and suggest a commit message.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/domains.mjs` | The list of guides. Adding a guide starts here. |
| `src/content.config.ts` | Frontmatter schema and cross-field rules (the content contract). |
| `src/routeData.ts` | Adds the "not fact-checked" banner from `status`, and the Sources entry to "On this page". |
| `src/lib/sources.ts` | The one rule for which pages get a Sources section and what its summary says; used by `Sources.astro` and `routeData.ts`. |
| `src/plugins/base-links.mjs` | Adds the GitHub Pages base path to root links at build time. |
| `src/pages/index.astro` | Home page: the manual's contents page. Computed from `domains.mjs` and page frontmatter; never list guides by hand. |
| `src/components/` | UI chrome: Starlight overrides (`Header`, `Hero`, `PageTitle`, `Footer`, `MarkdownContent`), shared pieces (`LevelGauge`, `StatusChip`, `GuideHub`, `Sources`), and the home page's sections in `home/`. |
| `src/site.mjs` | GitHub repo and contact URLs (from CI env vars, with a local fallback) and `OWNER_NAME`, the first name the site signs with. |
| `src/lib/` | Build-time helpers. `links.ts` has `href()`: every internal link in a component must use it, because components skip the base-path plugin and the links validator. |
| `src/styles/theme.css` | Design tokens and global styles. Rationale and rules: `docs/UI-DESIGN.md`. |
| `docs/` | `SRS.md`, `ARCHITECTURE.md`, `UI-DESIGN.md`, `DEPLOYMENT.md`. Update the matching one when behavior, structure, UI, or the pipeline changes. |
| `src/content/docs/<domain>/` | Content for one guide. |
| `templates/` | Page templates (overview, level, concept, walkthrough, cheat sheet). Copy them; don't edit them for one-off pages. |
| `src/content/i18n/en.json` | Starlight UI strings overridden in the site's voice (404 text, sidebar landmark). Not guide content. |
| `.github/workflows/deploy.yml` | CI/CD to GitHub Pages; calls the entry script. |
| `run.sh`, `run.ps1`, `run.cmd` | The one entry point for every OS. |

Each guide folder follows:

```
<domain>/
  index.md                overview + level roadmap   (sidebar order 0)
  levels/<n>-<name>.md    one per level, 0-5         (order 10 + n)
  concepts/<slug>.md      deep explanations          (pageType: explanation)
  cheat-sheet.md(x)       common / uncommon / rare   (order 90)
  walkthroughs/<slug>.md  one job each               (order 100+)
```

## Content rules

**Levels:** 0 Orientation, 1 Beginner, 2 Intermediate, 3 Advanced, 4 Expert (professional-grade), 5 Mastery. In tech guides, Level 5 covers internals and research papers. In hands-on guides, Level 5 is master-level craft; never claim a page replaces hands-on practice.

**Walkthroughs:** one job per page. Difficulty is `easy | moderate | hard | expert` (brake pads = easy, transmission rebuild = expert). Each has safety notes where relevant, numbered steps, "Check it worked", and troubleshooting. Tools, parts, and sources go in frontmatter (`tools`, `parts`, `sources`), which the page renders itself; don't write "Tools" or "Sources" sections in the body.

**Cheat sheets:** three tiers. Common (most jobs), Uncommon (specific situations), Rare (recovery, niche, or risky). Every Rare entry links to official documentation. Use `<Tabs syncKey="os">` for Windows/macOS variants.

**Teaching style:** explain new concepts with an analogy to something familiar, and use a comparison table whenever options compete. Say why the recommended option is right and why the alternatives are worse.

## Fact-checking rules (non-negotiable)

1. **New pages start as `status: draft`.** Never set `review` or `verified` yourself; the owner promotes a page after checking it.
2. **Never invent specifics.** Commands, flags, torque values, fluid types, part numbers, wire gauges, dosages, and prices must come from a source listed in `sources`. If you can't source it, leave a marked gap: `> TODO(source): torque spec for caliper bracket bolts`.
3. **Prefer primary sources:** official docs (AWS, Microsoft, Apple, Roblox Creator Hub), manufacturer service manuals, electrical codes, recognized first-aid curricula. Blogs and forums only as supporting context.
4. **Vehicle, appliance, and electrical specs are model-specific.** Say so and point to the manual for the exact model instead of giving one "typical" number.
5. **Commands must be run before verification.** Mark any command you haven't executed with `> TODO(test)`. Write these markers exactly (`TODO(source)`, `TODO(test)`): the build refuses a `verified` page that still contains one, so a misspelt marker is a gap the build can't see.
6. **Don't copy copyrighted material** (manuals, books, paid courses). Summarize in your own words and link.
7. **`safetyCritical: true`** on anything involving brakes, steering, suspension, fuel, lifting vehicles, mains voltage, TV or microwave power supplies, gas, or medical care. These pages open with a `:::danger` aside.
8. **If you're unsure, say so on the page** with a `:::caution` aside. An honest gap beats a confident error.

## Portability (for the Phase 2 app)

- Prefer `.md`. Use `.mdx` only when a page needs a component with no Markdown equivalent (currently `Tabs`).
- Allowed components: `Tabs`, `TabItem`, `Steps`, `Badge`. Asides use Markdown directives (`:::note`, `:::tip`, `:::caution`, `:::danger`). Every new component is one more thing the Angular app must render, so ask before adding one.
- Internal links are root links without the base path: `[AWS](/aws/)`. Never hard-code the repo name and never use relative links (`../`).
- Diagrams are SVG files in `src/assets/` with meaningful alt text.

## Astro reference

Full docs: https://docs.astro.build. Starlight docs: https://starlight.astro.build. This project is on Astro 7 and Starlight 0.42; check the installed versions in `package-lock.json` before trusting older examples, because config shapes have changed between releases (for example, autogenerated sidebar groups moved inside `items` in Starlight 0.39).
