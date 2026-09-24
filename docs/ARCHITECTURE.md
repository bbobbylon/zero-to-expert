# Architecture Documentation

| | |
| --- | --- |
| **Version** | 1.0 |
| **Written** | 2026-09-20 |
| **Describes** | Phase 1: the static site. Installed versions below are from `package-lock.json` on that date. |
| **Related** | [SRS](./SRS.md) (what and why), [UI-DESIGN](./UI-DESIGN.md) (look and components), [DEPLOYMENT](./DEPLOYMENT.md) (shipping), [README](../README.md) (commands), [CLAUDE.md](../CLAUDE.md) (content rules) |

## 1. System Architecture

There is no server. The "system" is a build: Markdown goes in, validated static files come out, and GitHub Pages serves them.

If you know Spring and Angular: think of `run build` as `ng build`, with Bean Validation run over every content file first. The output in `dist/` is like a static website in an S3 bucket.

```
 AUTHORING                       BUILD (astro build, via ./run.sh build)                   HOSTING
┌────────────────────┐   ┌──────────────────────────────────────────────────────┐   ┌──────────────┐
│ src/content/docs/  │   │ 1. Load pages           docsLoader                    │   │ GitHub Pages │
│   <guide>/*.md(x)  │──▶│ 2. Validate frontmatter Zod schema + cross-field rules│   │              │
│   + frontmatter    │   │      invalid ─▶ BUILD FAILS, nothing ships            │   │  static      │
├────────────────────┤   │ 3. Markdown ─▶ HTML     Sätteri + base-links plugin   │──▶│  HTML/CSS/JS │
│ src/domains.mjs    │──▶│ 4. Wrap in site chrome  Starlight + our overrides     │   │  + search    │
│  (list of guides)  │   │      route middleware adds the status banner          │   │    index     │
├────────────────────┤   │ 5. Compute contents     src/lib/guide-stats.ts        │   └──────▲───────┘
│ src/components/    │──▶│ 6. Validate links       starlight-links-validator     │          │
│ src/styles/        │   │      broken ─▶ BUILD FAILS, nothing ships             │   GitHub Actions
│ src/pages/         │   │ 7. Index for search     Pagefind                      │   deploy.yml
└────────────────────┘   └──────────────────────────────────────────────────────┘   (build ─▶ deploy)

 PHASE 2 (planned, not built): Spring Boot + Angular app reads the SAME src/content/docs files
 and the SAME frontmatter fields. Site chrome (components, styles) is not shared with it.
```

**Data flow for one page.** A file's frontmatter is parsed and validated; its `status` becomes a banner (route middleware) and an inspection stamp (page header block); its Markdown becomes HTML with root links prefixed by the base path; Starlight wraps it in the header, sidebar, title, and footer components; the links validator checks every internal link in the result; Pagefind indexes the text.

**Data flow for the contents page.** `src/pages/index.astro`, `Hero.astro`, and `GuideHub.astro` call `getSiteStats()`, which reads the whole content collection plus `domains.mjs` and returns counts, per-chapter progress (a guide's chapter number is its position in `DOMAINS`), and the walkthrough list. Nothing on those screens is typed by hand.

## 2. Technology Stack

| Layer | Choice | Version | Why |
| --- | --- | --- | --- |
| Site generator | Astro | 7.3.3 | Markdown in, static HTML out; no client framework shipped |
| Docs framework | Starlight | 0.42.2 | Sidebar, search, themes, tabs, and asides built in; every UI part can be overridden |
| Markdown processor | Sätteri (`@astrojs/markdown-satteri`) | 0.4.1 | Astro 7's default; listed directly because `astro.config.mjs` imports it to add one plugin |
| Schema | Zod (via `astro/zod`) | bundled | Frontmatter is validated at build time, so a bad page cannot reach readers |
| Link checking | `starlight-links-validator` | 0.26.0 | Broken internal links fail the build |
| Search | Pagefind | 1.5.2 (via Starlight) | Static index, runs in the browser, no search server |
| Fonts | Fontsource: Barlow Condensed, IBM Plex Mono | 5.3.0 each | Self-hosted, Latin subset, two weights each; no font CDN request |
| Runtime for the build | Node.js | 22.12+ (`.nvmrc` = 22) | |
| Hosting | GitHub Pages | | Free for public repos; deploys from GitHub Actions |
| CI/CD | GitHub Actions | | Official Pages actions, each step visible |
| Backend, database | none | | Phase 2 will add Spring Boot + Angular; the entry scripts already detect `backend/pom.xml` and switch to Maven |

Alternatives considered for the generator and CI are in the README's "Tech choices" table.

## 3. Directory Structure

```
.github/workflows/deploy.yml   CI/CD: build + validate, then publish to GitHub Pages
astro.config.mjs               site identity, base path from env, sidebar, component overrides, plugins
run.sh / run.ps1 / run.cmd     the one entry point on every OS (same commands, same behavior)
public/                        copied as-is: favicon.svg, og.png (link-preview image)
docs/                          SRS, ARCHITECTURE, UI-DESIGN, DEPLOYMENT, og-image.html (og.png source)
templates/                     page templates to copy: level, walkthrough, cheat sheet
src/
├── domains.mjs                THE list of guides (slug, label, group); drives sidebar, schema, contents page, footer; order = chapter number
├── site.mjs                   repo and contact URLs (from CI env vars, local fallback), OWNER_NAME
├── content.config.ts          frontmatter schema + cross-field rules: the content contract
├── routeData.ts               route middleware: status ─▶ warning banner
├── plugins/base-links.mjs     Markdown plugin: prefixes the base path onto root links
├── lib/
│   ├── guide-stats.ts         build-time model for the contents page and chapter contents (chapterLabel, getSiteStats)
│   ├── levels.ts              the six level names (mirrors about/how-guides-work.md)
│   └── links.ts               href() / entryHref(): base-aware links for components
├── pages/index.astro          home page: the manual's contents page
├── components/                Starlight overrides (Header, Hero, PageTitle, Footer, MarkdownContent) + LevelGauge, StatusChip, GuideHub
│   └── home/                  contents-page sections: OwnerNote, SectionHeading, ContentsEntry, LevelRuler, WalkthroughList, InspectionLog
├── styles/theme.css           design tokens and global styles
├── assets/                    logo.svg; diagrams (SVG with alt text)
└── content/docs/
    ├── about/                 pages about the site (domain: meta): how guides work, terms, privacy
    └── <guide>/               one folder per guide; folder name = slug in domains.mjs
        ├── index.md           overview + level roadmap
        ├── levels/<n>-<name>.md
        ├── concepts/<slug>.md
        ├── cheat-sheet.md(x)
        └── walkthroughs/<slug>.md
```

## 4. Key Design Patterns

| Pattern | Where | Why |
| --- | --- | --- |
| **Single source of truth** | `src/domains.mjs` | One list feeds the sidebar, the `domain` enum, the dashboard, and the footer, so they cannot disagree. Like a shared enum imported by both DTOs and Angular models. |
| **Schema as contract** | `src/content.config.ts` | The frontmatter schema is the interface between content and every consumer: this site now, the Phase 2 app later. Like a DTO with Bean Validation plus a class-level validator, run at build time instead of per request. |
| **Derive, don't duplicate** | `routeData.ts`, `guide-stats.ts`, `PageTitle.astro` | Banners, chips, counts, and progress are computed from frontmatter. A hand-written copy would eventually lie. |
| **Fail the build, not the reader** | schema, links validator, CI | Every check runs before deploy. A mistake costs a red build, never a broken live page. |
| **Override, don't fork** | `astro.config.mjs` → `components` | Starlight parts are replaced one at a time. `Header` and `Footer` copy Starlight's layout, so diff them against the originals after an upgrade (see UI-DESIGN §2). |
| **Content and chrome stay apart** | `src/content/` vs everything else | Markdown uses only portable syntax and four allowed components. All styling and UI logic lives outside content, so Phase 2 can render the same files with its own shell. |
| **One interface, many stacks** | `run.*` scripts | Every repo in this family exposes the same verbs. The scripts detect frontend-only vs full-stack and call npm or Maven. |
| **Configuration from the environment** | `SITE_URL`, `BASE_PATH`, `REPO_URL`, `GITHUB_REPOSITORY` | No repo name or URL in code; the same commit works locally, on Pages, and on a custom domain. |

**The base-path rule.** GitHub serves project sites under `/<repo>/`. Markdown links are written as root links (`/aws/`) and the `base-links` plugin prefixes them at build time, before the validator runs. Components bypass both the plugin and the validator, so every internal link in an `.astro` file must go through `href()` or `entryHref()` in `src/lib/links.ts`.

## 5. Data Models

There is one entity: a **page** (a Markdown file). Its fields are Starlight's built-ins (`title`, `description`, `sidebar`, `banner`, `hero`, ...) plus these, defined in `src/content.config.ts`:

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `domain` | enum of guide slugs + `meta` | required | `meta` = pages about the site; exempt from sourcing rules and banners |
| `pageType` | `overview` \| `level` \| `walkthrough` \| `cheatsheet` \| `explanation` \| `reference` | required | Maps onto the Diátaxis framework |
| `level` | integer 0-5 | | Required when `pageType: level` |
| `difficulty` | `easy` \| `moderate` \| `hard` \| `expert` | | Required when `pageType: walkthrough` |
| `status` | `planned` \| `draft` \| `review` \| `verified` | `draft` | Drives banner, chips, and the fact-check meter |
| `lastVerified` | date | | Required when `status: verified` |
| `safetyCritical` | boolean | `false` | Needs a source before `review` |
| `sources` | list of `{ title, url, publisher? }` | `[]` | `url` must be absolute; at least one when `verified` |
| `tags`, `tools`, `parts` | list of strings | `[]` | |
| `time` | string | | Free text, e.g. "15 minutes (estimate)" |

**Relationships.** A guide (an entry in `domains.mjs`) has many pages through `domain`. A guide has at most one overview and one cheat sheet, and at most one level page per level number; these are conventions, not yet enforced by the schema.

**Status lifecycle.**

```
planned ──▶ draft ──▶ review ──▶ verified
(placeholder) (written,   (owner is    (checked on lastVerified,
               unchecked)  checking)     sources listed)
        agents stop here ─┘   only the owner moves a page past draft
```

**Derived model.** `getSiteStats()` returns `SiteStats` (totals, status counts, all walkthroughs) holding one `GuideStats` per guide (pages written, walkthrough count, level pages with their status, cheat sheet, safety flag). It is recomputed on each build and never stored.

## 6. API Endpoints

None. The site is static files, and no page calls an API at runtime. Search reads a static Pagefind index from the same origin.

The public surface is the URL structure, which the Phase 2 app should preserve:

| URL | Page |
| --- | --- |
| `/` | Dashboard |
| `/<guide>/` | Guide overview |
| `/<guide>/levels/<n>-<name>/` | Level page |
| `/<guide>/concepts/<slug>/` | Concept page |
| `/<guide>/cheat-sheet/` | Cheat sheet |
| `/<guide>/walkthroughs/<slug>/` | Walkthrough |
| `/about/how-guides-work/`, `/about/terms/`, `/about/privacy/` | Pages about the site |

On GitHub Pages every URL is prefixed with `/<repo>/`. The Phase 2 API is not designed yet.

## 7. Scalability Considerations

- **Traffic.** Static files on GitHub Pages' CDN; there is no application to scale. GitHub Pages has usage limits on site size and bandwidth; see [GitHub's Pages documentation](https://docs.github.com/en/pages) for the current figures.
- **Content growth.** Build time grows with page count: every page is validated, rendered, link-checked, and indexed on every build. Today 34 pages build in a few seconds. `getSiteStats()` runs once per page that uses it (the dashboard and each guide overview) and filters the whole collection each time; if builds slow down at hundreds of pages, memoize it per build.
- **Search.** The Pagefind index is split into chunks fetched on demand, so its cost to readers grows slowly with content.
- **The real bottleneck is human.** One person fact-checks every page. The status system exists so that drafting can outrun verification without misleading anyone.
- **Sidebar.** Computed when the config loads, from folders that exist. A new `levels/` or `walkthroughs/` folder needs a dev-server restart to appear.

## 8. Security Considerations

| Risk | Mitigation |
| --- | --- |
| **Wrong content hurting someone** (the main risk for a how-to site) | Status on every page and listing; `safetyCritical` flag and `:::danger` asides; sources required before verification; agents may not verify; specifics must come from listed sources. |
| Attack surface of a server | None exists: no server code, database, accounts, forms, or secrets. Nothing to inject into and nothing to steal. |
| Compromised CI publishing bad content | Workflow permissions are least-privilege (`contents: read`, `pages: write`, `id-token: write`); deploys use GitHub's OIDC token; only the build job's artifact is published. |
| Malicious or broken dependency | Exact versions via `package-lock.json` and `npm ci`. No automated dependency audit is configured. `TODO(owner)`: consider Dependabot. |
| Reader privacy | No analytics, ads, or cookies; fonts self-hosted so no third-party request is made; `localStorage`/`sessionStorage` hold only theme and sidebar state. GitHub, as host, logs visitor IP addresses. |
| Transport | GitHub Pages serves the site over HTTPS. |
| Secrets in the repo | None needed. Configuration is non-secret environment variables set by the workflow. |

Related: accessibility targets, the 2026-09-20 audit results, and what is still unverified are in [UI-DESIGN §5](./UI-DESIGN.md#5-accessibility-a11y).
