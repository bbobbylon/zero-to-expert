# UI/UX Design Documentation

| | |
| --- | --- |
| **Version** | 2.0 |
| **Written** | 2026-09-23 |
| **Changed in 2.0** | New design system, "The Manual", replacing the cinema theme of 1.x: new palette, fonts, logo, home page (a contents page), page header block with inspection stamp, chapter contents on overviews, index-and-colophon footer, first-person copy. Accessibility audit re-run (section 5). |
| **Changed in 1.2** | First accessibility audit; `MarkdownContent` override |
| **Applies to** | Astro 7.3, Starlight 0.42.2 |
| **Related** | [SRS](./SRS.md) (requirements), [ARCHITECTURE](./ARCHITECTURE.md) (build and data model), [DEPLOYMENT](./DEPLOYMENT.md) (shipping), [README](../README.md) (commands), [CLAUDE.md](../CLAUDE.md) (content rules) |

## 1. Design System

### Direction: "The Manual"

The site is a set of field guides, so it looks like one: a well-made printed shop manual. Paper and ink, one spot colour (safety yellow), square corners, heavy rules, numbered chapters, a thumb-index tab on every page, and an inspection stamp for fact-check status. The dark theme is the same manual under a shop light; the light theme is the manual on paper.

**Why this and not the previous theme.** Version 1.x ("Premiere Night", a cinema look) was reviewed by the owner as "too literal" and then as looking "too much like all other AI-curated UI menus": a centred glowing hero, a row of stat tiles, identical rounded cards in a grid, pills everywhere, gradient text. Version 2.0 replaces that template with an identity the content already has — the guides are manuals — and with the owner's own voice.

**Voice.** The site speaks in the first person and is signed with the owner's first name (`OWNER_NAME` in `src/site.mjs`). The story it tells is the true one: he already knows most of this and wanted one trustworthy place to send family, friends, and coworkers. Home-page copy and the footer come from that; do not add biography.

House rules (each exists because its opposite made the site look machine-made):

1. **Two-colour printing.** Ink on paper plus yellow. Yellow is a **fill** (tabs, highlighter, progress, the phone menu button, primary buttons); text on it is always ink (`--zx-on-yellow`). No gradients, glows, glass, or drop shadows.
2. **Rules and numbers give structure, not boxes.** Sections open with a 2px ink rule; lists are ruled with hairlines; chapters are numbered. No rounded cards, no pills, no chips with 999px corners.
3. **Display type is for titles; monospace is for labels, numbers, and stamps.** Body text stays the system sans, because people read these pages mid-job, often on a phone.
4. **The theme never outranks the truth.** Wherever a page is listed or titled, its fact-check status is shown, so a draft never looks more trustworthy in a list than it does on its own page.
5. **Every text/background pair meets WCAG AA**, measured (section 5). Re-measure after changing any colour.

### The motif: levels are a gauge

Guides run Level 0 to Level 5. The level is drawn as **five marks filled up to the level**, like the scale on a tool: Level 0 (Orientation) is an empty gauge, Level 5 (Mastery) a full one. The same gauge appears on the contents page (the level ruler), on every guide page under the title, and in a chapter's contents list. Component: `src/components/LevelGauge.astro`.

### Colour

All tokens live in `src/styles/theme.css`. Starlight's `--sl-color-*` tokens are overridden first; house tokens use the `--zx-` prefix.

| Token | Dark (shop light) | Light (paper) | Used for |
| --- | --- | --- | --- |
| `--sl-color-black` (page bg) | `#15171a` | `#f4f1e8` | Canvas |
| `--sl-color-gray-6` (nav/sidebar bg) | `#1c1f23` | `#e4dfd1` | Chrome |
| `--sl-color-gray-1` / `gray-2` (body text) | `#ebe8de` / `#cfccc1` | `#211f1b` / `#33312b` | Paragraphs |
| `--sl-color-gray-3` (muted text) | `#9d9a90` | `#5b584f` | Captions, notes, running heads |
| `--sl-color-white` (strong text) | `#faf7ee` | `#161512` | Headings, titles |
| `--zx-ink` | `#ebe8de` | `#161512` | Heavy rules, gauge marks, button borders |
| `--zx-yellow` | `#f2c200` | `#f2c200` | Fills only: tabs, buttons, current page, banner, progress |
| `--zx-on-yellow` | `#161512` | `#161512` | The one text colour allowed on yellow |
| `--zx-label` | `#f2c200` | `#161512` | Small monospace labels (chapter numbers, part names) |
| `--zx-marker` | yellow at 22% | `#ffe27a` | Highlighter swipe under links and on hover |
| `--zx-red` | `#ff8a80` | `#a8231b` | Safety-critical, hard/expert difficulty |
| `--zx-surface` | `#1c1f23` | `#ece8dc` | The few tinted panels (search dialog, code) |
| `--zx-hairline` | `#33373d` | `#cfc9b9` | Thin rules between list rows |
| `--sl-color-accent` (links) | `#f2c200` | `#161512` | In the light theme links are ink with a marker underline |

Status colours reuse Starlight's semantic hues: green = verified (filled), blue = in review (double border), orange = draft (solid border), gray = planned (dashed border). Each state differs by border style as well as colour.

### Typography

| Role | Font | Where |
| --- | --- | --- |
| Titles | **Barlow Condensed** 600/700 (the condensed grotesque of parts catalogues and manual covers) | Site title, page `<h1>`, section headings, chapter titles, level names, signature |
| Labels, numbers, stamps | **IBM Plex Mono** 400/600 | Running heads, chapter numbers, nav, sidebar part names, spec keys, status tags and stamps, figures, banner, buttons |
| Body | System sans-serif (Starlight default stack) | Everything you read for more than a line |
| Code | IBM Plex Mono (`--sl-font-mono`) | Code blocks and inline code share the label face |

Fonts are **self-hosted npm packages** (`@fontsource/barlow-condensed`, `@fontsource/ibm-plex-mono`; Latin subset, two weights each), registered in `customCss` in `astro.config.mjs`. No font CDN: builds work offline, and readers' browsers never contact a font provider — the [privacy policy](../src/content/docs/about/privacy.md) states this, so keep it true.

Sizes use Starlight's `--sl-text-*` scale. Display sizes use `clamp()` so they scale between phone and desktop without breakpoints.

### Spacing, shape, motion

- Radius: `--zx-radius` is `2px` everywhere (tags, buttons, code, focus ring). Nothing is rounder.
- Rules: 2px `--zx-ink` for section and table-header rules; 1px `--zx-hairline` between rows.
- Contents-page sections are separated by `clamp(3.5rem, 2.5rem + 3vw, 5.5rem)`.
- Motion: almost none. Link marker fills on hover (`0.15s`); the reading-progress line is scroll-driven; the stamp's `-2deg` tilt is static. `prefers-reduced-motion: reduce` disables animation, transitions, and the stamp tilt.

### Icons and imagery

No image files and no icon font. The logo (`src/assets/logo.svg`), favicon (`public/favicon.svg`), and the cover mark in `Hero.astro` / `Footer.astro` are one drawing: a yellow square with a registration mark (circle and crosshair) in ink. The hazard mark is the text character `▲` beside the words "Safety-critical". The home page makes zero image requests.

## 2. Component Library

Everything is in `src/components/`. Each file opens with a comment explaining what it changes and why.

### Starlight overrides (registered in `astro.config.mjs` → `components`)

| Component | Replaces | What it adds |
| --- | --- | --- |
| `Header.astro` | Starlight header | Primary nav as a running head: Contents, Tech, Hands-on, How it works, in monospace with a yellow bar under the current section. Layout grid copied from Starlight 0.42.2. |
| `Hero.astro` | Starlight hero | The manual's cover on the home page: running head (edition line and counts), title, cover mark, tagline, two square buttons. Also styles Starlight's built-in 404 ("Error 404 / Page not found"). |
| `PageTitle.astro` | Starlight page title | Chapter line above the title (yellow chapter tab, chapter name / page type); header block below it with the spec strip (level gauge, difficulty, time, safety) and the inspection stamp. On guide overview pages it also renders `GuideHub.astro`. |
| `Footer.astro` | Starlight footer | Keeps edit link / last updated / pagination; adds the index and colophon (section 3). |
| `MarkdownContent.astro` | Starlight Markdown wrapper | Same markup, plus a small script that makes a table keyboard-focusable while it scrolls sideways (section 5). Content files stay plain Markdown. |

**After a Starlight upgrade**, diff `Header.astro`, `Footer.astro`, and `MarkdownContent.astro` against their originals in `node_modules/@astrojs/starlight/dist/components/`. `src/starlight-virtual.d.ts` supplies editor types for the `virtual:starlight/*` imports those files use.

### Shared pieces

| Component | Purpose |
| --- | --- |
| `LevelGauge.astro` | Five-mark level gauge. Decorative for screen readers; emits one sentence ("Level 3 of 5") unless the caller states the level in text. |
| `StatusChip.astro` | Fact-check status as a small `tag` (in lists) or a full inspection `stamp` (once per page, under the title). Each state has its own word and border style. A verified stamp names who checked the page (`OWNER_NAME`) and the `lastVerified` date. |
| `GuideHub.astro` | "In this chapter" on every guide overview: the six levels as ruled lines (a written level is a link with its status tag; an unwritten one says so), then walkthrough and concept counts, the cheat sheet (linked once written), and the hazard mark. Same build-time data as the contents page. |

### Home page (`src/components/home/`)

| Component | Purpose |
| --- | --- |
| `SectionHeading.astro` | 2px rule, section number in the margin, condensed title, one factual note on the right. Carries the anchor id (`#contents`, `#levels`, `#jobs`, `#fact-check`). |
| `OwnerNote.astro` | "A note from Bobby": the site's purpose in the first person, signed, with three margin figures (chapters, pages written, pages checked). Replaces the stat tiles of 1.x. |
| `ContentsEntry.astro` | One chapter as a contents line: number, title (with hazard mark), dotted leader, "N pages · M checked", status tag of the overview page, description beneath. The figures sit on the title's last line, as in print. |
| `LevelRuler.astro` | The six levels as a ruler: heavy edge, six ticks, gauge and name under each. Turns vertical under `40rem`. |
| `WalkthroughList.astro` | The jobs index: title and status tag, then chapter, difficulty, and time in monospace. |
| `InspectionLog.astro` | "N / M written pages checked" headline and a ruled tally table of pages by status, with each status's tag. |

### Finishes applied to Starlight's own parts (in `theme.css` unless noted)

| Part | Finish |
| --- | --- |
| Header | 2px ink rule beneath. On guide pages a 4px yellow line under it fills left to right as the page scrolls (reading progress). CSS scroll-driven animation, no JavaScript; unsupported browsers have no line; removed under reduced motion. |
| Sidebar | Part names ("Start here", "Tech", "Hands-on") as monospace labels with a hairline between parts. The current page is a yellow block with ink text, like a place marked with a highlighter. |
| Status banner (`src/routeData.ts`) | A yellow slip with ink monospace text, ruled beneath. |
| Headings | Each `<h2>` in content opens with a full-width 2px ink rule. |
| Links in content | Underlined, with a yellow marker swipe along the baseline that fills the line on hover. |
| Tables | Heavy ink rules above and below the header row, hairlines between rows, monospace uppercase headers, no zebra stripes, no outer box. |
| Asides | Square, 1.5px border with a thick inline-start edge, monospace uppercase title. `:::danger` gets an 8px band of yellow-and-ink hazard stripes across the top: the one pattern on the site. |
| Code blocks | 2px radius and hairline via `expressiveCode.styleOverrides` in `astro.config.mjs`. |
| Search dialog | 2px ink border with a flat offset shadow; matched words highlighted with the marker. Only testable on a production build (`run build`, then `run start`). |
| Phone menu button | Yellow square with an ink icon. |
| Pagination | Previous/next as ruled entries (2px rule above) with condensed titles. |
| Tabs | Square; the selected tab carries an ink marker. |
| Buttons (`sl-link-button`) | Square; primary is yellow with ink text. |

### Link-preview image

`public/og.png` (1200×630) is what chat apps and social sites show for a shared link. Its source, with regeneration steps, is `docs/og-image.html`. `astro.config.mjs` adds the `og:image` tags only when `SITE_URL` is set (scrapers need an absolute URL), so they appear in the CI build, not locally.

### Data, not hand-typed content

The contents page is computed at build time by `src/lib/guide-stats.ts` from `src/domains.mjs` and page frontmatter. A guide's chapter number is its 1-based position in `DOMAINS` (`chapterLabel()` prints "04"), so reordering that list renumbers the manual everywhere at once. `src/lib/levels.ts` mirrors the level table in `about/how-guides-work.md` — keep the two in sync.

**Links in components** must go through `href()` / `entryHref()` in `src/lib/links.ts`. Components bypass both the Markdown base-path plugin and the links validator, so a raw `/aws/` would 404 on GitHub Pages.

## 3. Layout Patterns

| Page | Layout |
| --- | --- |
| Contents page (`src/pages/index.astro`) | Starlight `splash` template: no sidebar, content up to `67.5rem`. Cover → owner's note → Contents (Part 1 beside Part 2 from `64rem`) → level ruler → Jobs beside Inspection log (from `64rem`). |
| Guide pages | Starlight default: left sidebar (`18.75rem`), content column (`45rem`), right "On this page". Chapter line → title → header block (specs + stamp) → content. |
| Footer (every page) | Owner's word and signature; Part 1 and Part 2 chapter lists, numbered; About links (Contents, How these guides work, Inspection log, Source on GitHub); then the legal row (© year, "No accounts, no ads, no tracking cookies", Terms of Use, Privacy Policy); then "Contact Us" set apart underneath. |

Breakpoints (Starlight's, plus two for the nav):

| Width | What changes |
| --- | --- |
| < `30rem` | Contents lines drop their leader; figures move under the title. |
| < `40rem` | Level ruler turns vertical. |
| < `50rem` | Sidebar becomes the mobile menu; nav bar hidden (the menu lists everything). |
| ≥ `56rem` | Owner's note shows its margin figures as a column on the right. |
| ≥ `60rem` | Nav bar appears on pages without a sidebar (the contents page). |
| ≥ `64rem` | Contents parts side by side; Jobs beside Inspection log. |
| ≥ `72rem` | Right-hand "On this page" appears (Starlight). |
| ≥ `82rem` | Nav bar appears on guide pages too (they need room for the sidebar-aligned title column). |

## 4. User Flows

```
                       ┌──────────────────────────────┐
  Search (any page) ──▶│                              │
                       │          Guide page          │
  Contents ─┬─ chapter line ─▶ chapter overview ─▶ level ─▶ walkthrough
            ├─ job line ─────────────────────────────────────▲
            ├─ "How the guides work" ─▶ How these guides work
            └─ inspection log ─▶ How these guides work #page-status

  Footer (every page): any chapter · Terms · Privacy · Contact Us ─▶ new GitHub issue
```

1. **New reader:** lands on the contents page → reads the owner's note → "How the guides work" → picks a chapter.
2. **Returning reader mid-job:** search or sidebar → walkthrough. The header block tells them the level, difficulty, time, and whether the page is checked before they start.
3. **Owner:** the inspection log shows the verification backlog at a glance; a verified page's stamp shows his name and the date.

## 5. Accessibility (A11y)

Target: **WCAG 2.1 AA**.

- **Contrast:** measured, not estimated (see the audit record below). Body and muted text exceed 4.5:1 in both themes. Yellow is never a text colour; text on yellow is always ink.
- **Never colour alone:** status tags and stamps pair a word with a distinct border style (dashed, solid, double, filled); difficulty and safety flags are text; the hazard mark is a character plus the words.
- **Keyboard:** everything is a native link or button; visible yellow `:focus-visible` ring with an ink inner line so it shows on paper. Each contents line is one link. Starlight's skip link still targets the page `<h1>` (`id="_top"`).
- **Screen readers:** decorative SVG and the gauge marks are `aria-hidden`; gauges emit one sentence unless the level is stated in text; the contents page uses real `<section aria-labelledby>`, `<h2>`/`<h3>`, `<dl>`, `<ol>`, and a real `<table>` for the tally.
- **Motion:** `prefers-reduced-motion` honoured, including the stamp tilt. **Forced colours:** gauge marks fall back to `CanvasText`.
- **Wide tables:** a table that scrolls sideways becomes keyboard-focusable while it overflows (`MarkdownContent.astro`).

### Audit record: 2026-09-23 (version 2.0)

Both checks from the 1.2 audit were re-run against the dev server in headless Microsoft Edge on the final 2.0 code. Neither replaces a person with a screen reader.

**1. axe-core 4.13.0** (rule tags: WCAG 2.0 and 2.1, levels A and AA, plus best practices). 18 runs covering the contents page, a written chapter overview, a planned safety-critical overview, a walkthrough, a level page, cheat sheets, "How these guides work", Privacy, and the 404 page; in both themes, at desktop and phone width, and with the phone menu open. **0 violations in all 18 runs** (36 to 55 rules passed per page).

**2. Rendered-pixel contrast measurement** (method as in 1.2: hide the text, screenshot, compare each text colour with the pixels actually behind it; a run fails when its 5th-percentile pixel is under 4.5:1, or 3:1 for large text). 27 runs: the pages above in both themes, phone widths, the open phone menu, the skip link while focused, and a self-test with a planted `#777` on white, which it caught at 4.48:1.

| Result | Detail |
| --- | --- |
| **0 failing text runs in all 26 real runs** (59 to 270 runs measured per page) | No fixes were needed: the palette was chosen with the ratios in hand (muted text `#9d9a90` on `#15171a` is 6.4:1; `#5b584f` on `#f4f1e8` is 6.3:1; ink on yellow is 10.9:1; yellow on the dark canvas is 10.7:1). |
| Closest passes | Syntax colours inside code blocks in the light theme (Expressive Code's defaults on our code background): 4.85:1 for strings and 4.87:1 for identifiers. The `Caution` aside title in the light theme: 6.0:1. Everything else measures 6.3:1 or better. |
| Probe fix | The first pass reported five failures that were all text inside a closed `<details>` (collapsed sidebar groups, the phone TOC dropdown, a quiz-answers block): Chromium still reports layout rects for that content, positioned over whatever is painted there. The probe now skips everything in a closed `<details>` except its summary. |

**Known limits of check 2.** It does not cover hover, active, or visited states; the open search dialog; placeholder text; or non-text graphics such as the gauge marks and stamp borders (those are ink on the canvas, ≥ 6:1 by construction).

**Still not done:**

- No screen-reader pass by a person (NVDA, VoiceOver, or TalkBack). Automated tools catch only part of what a person would, so AA is **checked by tools, not certified**.
- No test at 200% and 400% browser zoom, and no test with forced colours (Windows High Contrast) switched on.
- The audit tools were one-off scripts and are not in the repo. Re-run an audit after any change to colours in `theme.css`.

## 6. Styling Conventions

- **Tokens first.** Re-skin through `--sl-*` / `--zx-*` custom properties in `theme.css`; add rules only for chrome Starlight has no token for.
- **Global rules are unlayered on purpose.** Starlight's CSS lives in cascade layers, and unlayered rules beat layered ones — so no `!important` (the reduced-motion block is the one exception) and no specificity tricks.
- **Component styles are scoped** in each `.astro` file's `<style>`. Shared values come from tokens, not copy-pasted hex codes. The two exceptions are the cover mark and the hazard stripes, which use the fixed yellow `#f2c200` and ink `#161512` because they are the same in both themes by design.
- **Contents-page content sits in `.not-content`** to opt out of Starlight's Markdown typography.
- **Content portability is untouched.** No new Markdown/MDX component was added; all of this is site chrome. The Phase 2 app renders the same Markdown and is free to build its own shell.
- Naming: lowercase, hyphenated class names describing the thing (`.running-head`, `.chapter-line`, `.leader`), not its look.
- **Copy:** first person, plain, signed with the first name. No film references, no marketing lines. Labels are the words a manual would use: chapter, part, contents, jobs, inspection log, checked.

## 7. Screenshot/Mockup References

There is no Figma file; the design was built directly in code. To see the current state, run `./run.sh dev` (or `run dev`) and open:

| URL | Shows |
| --- | --- |
| `/` | Contents page: cover, owner's note, contents, level ruler, jobs, inspection log, footer |
| `/aws/` | Chapter overview with "In this chapter" (one level written) |
| `/cars/` | Chapter overview for a planned chapter (nothing written, safety-critical) |
| `/aws/walkthroughs/1-create-an-account/` | Guide page: chapter line, header block with specs and stamp, asides, tables, reading-progress line |
| `/git-github/cheat-sheet/` | Cheat-sheet tables; stamp alone in the header block |
| `/about/how-guides-work/` | A page about the site (no chapter line, no stamp) |
| `/any-missing-page/` | 404 |

Check each in both themes (header theme switch) and at phone width.
