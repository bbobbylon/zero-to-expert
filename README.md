# Zero to Expert

Field guides from first steps to mastery across tech, trades, and survival. Each guide has six levels (0-5), step-by-step walkthroughs graded easy to expert, and a cheat sheet split into common, uncommon, and rare entries.

Every page carries a fact-check status, and the build refuses to publish a page marked "verified" without a verification date and sources.

**Status:** Phase 1. All 15 guides have overview pages. The AWS pilot has a complete draft of Level 0: a hub page, five concept pages, six walkthroughs, and a CLI cheat sheet. Git & GitHub has a draft cheat sheet. Nothing is verified yet; the home page's inspection log shows the live counts.

## Quick start (local)

Prerequisites: Node.js 22.12 or newer (the repo pins major version 22 in `.nvmrc`) and npm. A future backend will also need a JDK; the scripts check for it only when `backend/` exists.

Everything runs through one entry script with the same commands on every OS:

| OS | Run |
| --- | --- |
| Windows (cmd or PowerShell) | `run dev` |
| Windows, calling PowerShell directly | `.\run.ps1 dev` |
| macOS / Linux | `./run.sh dev` |

| Command | What it does |
| --- | --- |
| `setup` | Checks your Node version against `package.json`, then installs exact dependency versions (`npm ci`) |
| `dev` | Live-reload dev server at http://localhost:4321/ (installs first if needed) |
| `build` | Production build into `dist/`, validating every page's frontmatter and every internal link. Exits non-zero on any error. |
| `start` | Serves the production build locally |
| `check` | Full validation without deploying |
| `pages` | Builds and previews exactly as GitHub Pages will serve it, under `/<repo-folder-name>/`. Override with `BASE_PATH`. |
| `clean` | Deletes `dist/` and `.astro/` |

Mental model if you know Angular: `build` is `ng build`. Markdown goes in, static HTML/CSS/JS comes out in `dist/`, and any static host can serve it, the same way S3 serves a static website.

### Why a script, and where Maven fits

Every repo in this family exposes the same verbs (`setup`, `dev`, `build`, `start`, `check`, `pages`, `clean`), whatever stack sits underneath. It's a Java interface with one implementation per repo: you always type `run dev`, and the script knows what that means here.

The scripts detect two modes:

- **Frontend-only** (no `backend/pom.xml`): commands call npm. This repo today.
- **Full-stack** (`backend/pom.xml` present): Maven becomes the build of record. `build` runs `mvnw package`, `start` runs the resulting jar, `dev` runs `spring-boot:run` alongside the frontend dev server, and `check` adds `mvnw verify`.

For the Phase 2 app, the plan is for the backend's pom to build the frontend itself (for example with `frontend-maven-plugin`) and package it into the Spring Boot jar, so one `mvnw package` produces one runnable artifact. That pom doesn't exist yet; the full-stack branch of the scripts is written but can only be tested once it does.

Why not wrap this repo in Maven today: it would require a JDK to build a Node-only site and add a layer that does nothing until there's Java to compile.

### Windows notes

- `run.cmd` starts `run.ps1` with `-ExecutionPolicy Bypass` for that one process only. That avoids Windows' default script policy blocking it without changing any setting on your machine.
- Git on Windows may not keep the executable bit on `run.sh`. CI calls it as `bash run.sh`, so that doesn't matter there. If you want `./run.sh` to work for macOS/Linux users, run `git update-index --chmod=+x run.sh` once before committing.

## Deploy to GitHub Pages (one-time setup)

GitHub Pages is free for **public** repositories on GitHub Free; Pages on a private repository needs a paid plan (GitHub Pro, Team, or Enterprise).

1. On GitHub, create an empty repository named `zero-to-expert` (no README, no .gitignore, no license, so the first push doesn't conflict).
2. From the project folder:

   ```bash
   git init
   git add .
   git commit -m "Initial Starlight scaffold"
   git branch -M main
   git remote add origin https://github.com/<your-username>/zero-to-expert.git
   git push -u origin main
   ```

3. In the repository on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab. If the first run failed because Pages wasn't enabled yet, open that run and click **Re-run all jobs**.
5. When the run is green, the `deploy` job shows the live URL: `https://<your-username>.github.io/zero-to-expert/`.

Any repository name works. Nothing in the code hard-codes it (see "How the base path works").

## CI/CD: what happens on every push to `main`

`.github/workflows/deploy.yml` runs two jobs:

| Job | Steps | Fails when |
| --- | --- | --- |
| `build` | Check out → set up Node from `.nvmrc` → ask GitHub for the Pages URL and base path → `bash run.sh setup` → `bash run.sh build` → upload `dist/` | A page's frontmatter breaks a rule, an internal link is broken, or the build errors |
| `deploy` | Publish the uploaded artifact to Pages | Only runs if `build` passed |

A failed build means nothing is published; the live site keeps the last good version. To redeploy without a code change, use **Actions → Deploy to GitHub Pages → Run workflow**.

### How the base path works

GitHub serves project sites under `/<repo>/`, but Astro doesn't add that prefix to links written in Markdown. Instead of hard-coding the repo name:

- The workflow reads the real URL and base path from `actions/configure-pages` and passes them to the build as `SITE_URL` and `BASE_PATH`.
- `astro.config.mjs` uses them (defaulting to `/` locally).
- `src/plugins/base-links.mjs` adds the base to root links like `[AWS](/aws/)` during the build, before the links validator checks them.

Renaming the repo or adding a custom domain later needs no code change.

## Project structure

```
.github/workflows/deploy.yml  CI/CD to GitHub Pages
src/domains.mjs               the list of guides (drives the sidebar and the schema)
src/content.config.ts         frontmatter schema + fact-check rules
src/routeData.ts              "not fact-checked" banner from each page's status; Sources in "On this page"; verified-page gap check
src/plugins/base-links.mjs    base-path rewriting for Markdown links
src/site.mjs                  site identity: GitHub repo and contact URLs, owner's first name
src/styles/theme.css          design tokens and global styles ("The Manual" theme)
src/components/               UI chrome: header nav, cover, page header block with stamp and bench list, sources section, footer
src/components/home/          the home page's sections (owner's note, contents, level ruler, jobs, inspection log)
src/lib/                      build-time helpers: contents/chapter stats, level names, base-aware links
src/pages/index.astro         the home page (the manual's contents page), computed from the content
src/content/docs/             all pages; one folder per guide
public/                       favicon and og.png, the image link previews show (source: docs/og-image.html)
docs/                         SRS (requirements), ARCHITECTURE, UI-DESIGN (design system), DEPLOYMENT (ship, verify, roll back)
templates/                    overview, level, concept, walkthrough, and cheat sheet templates
CLAUDE.md                     rules for AI agents working in this repo
run.sh / run.ps1 / run.cmd    the one entry point: setup, dev, build, start, check, pages, clean
```

## Writing content

1. Copy a template from `templates/` into `src/content/docs/<guide>/`.
2. Fill in the frontmatter. New pages start as `status: draft` and show a warning banner. `tools`, `parts`, and `sources` render themselves (under the title and at the end of the page), so don't write those sections in the body.
3. Link to other pages with root links: `[Level 0](/aws/levels/0-orientation/)`.
4. Run `./run.sh check` (Windows: `run check`). Fix anything it reports.
5. After checking every claim against the listed sources and resolving every `TODO(source)` and `TODO(test)`, set `status: verified` and `lastVerified: YYYY-MM-DD`.

To add a new guide, add it to `src/domains.mjs` and create `src/content/docs/<slug>/index.md`.

### Page status

| Status | Banner | Build requires |
| --- | --- | --- |
| `planned` | "This guide is planned" | nothing |
| `draft` | "Not fact-checked yet" | nothing |
| `review` | "Sources are being checked" | a source, if `safetyCritical: true` |
| `verified` | none | `lastVerified`, at least one source, and no `TODO(source)` or `TODO(test)` left in the body |

The full content model and writing rules are in [CLAUDE.md](./CLAUDE.md).

## Tech choices

| Choice | Why | Alternatives considered |
| --- | --- | --- |
| Astro Starlight | Markdown in, docs site out, with search, sidebar, dark mode, tabs, and callouts built in. Node/TypeScript toolchain. | Material for MkDocs reaches end of life on 2026-11-05. Zensical, its successor, was announced in November 2025 and is young for a multi-year project. |
| Build-time schema (Zod) | Bad frontmatter can't reach the live site. | Runtime checks: too late, the reader already saw the page. |
| `starlight-links-validator` | Broken internal links fail the build. | Manual checking doesn't scale past a few pages. |
| Official GitHub Pages actions | Each step is visible and debuggable. | `withastro/action` is one step but hides what runs. |

## Upgrading

`@astrojs/markdown-satteri` is listed directly because `astro.config.mjs` imports it. Astro depends on an exact version of it, so upgrade the two together (`npm i astro@latest @astrojs/markdown-satteri@<version astro uses>`), then run `./run.sh check` (Windows: `run check`).

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Live site loads without styles, or every link 404s | Site built without the base path | Check that `BASE_PATH` is set in the workflow's build step. Reproduce locally with `run pages`. |
| Actions run fails at "Read GitHub Pages settings" | Pages not enabled | Settings → Pages → Source: GitHub Actions, then re-run |
| A new Levels or Walkthroughs folder doesn't show in the sidebar | The sidebar is built when the config loads | Restart the dev server (`run dev`) |
| Build error naming a frontmatter field | A fact-check rule failed | The message names the file, field, and rule |
| Build error `status is "verified" but the page still has TODO(source) ... markers` | A verified page still has a marked gap in its body | Resolve the gap, or set the page back to `review` |

## Roadmap

- **Phase 1 (now):** write guides, starting with an AWS pilot to prove the templates.
- **Phase 2:** Spring Boot + Angular app reading the same Markdown files and frontmatter, adding features a static site can't offer, such as accounts and saved progress.
