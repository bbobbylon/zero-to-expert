# Deployment

| | |
| --- | --- |
| **Version** | 1.1 |
| **Written** | 2026-09-20 |
| **Changed in 1.1** | 2026-09-23: verification checklist updated for "The Manual" design (contents page, cover mark, new 404 and link-preview card) |
| **Target** | GitHub Pages, deployed by GitHub Actions (`.github/workflows/deploy.yml`) |
| **Related** | [README](../README.md) (first-time GitHub setup, troubleshooting table), [ARCHITECTURE](./ARCHITECTURE.md) (what gets built), [SRS](./SRS.md) (FR-12, FR-19, FR-20) |

The README covers creating the repository and enabling Pages. This document covers what happens on a deploy, how to check it, and how to undo it.

## Known issue: branch name

**As of 2026-09-20, pushes do not deploy.** The workflow triggers on pushes to `main`:

```yaml
on:
  push:
    branches: [main]
```

but this repository's only branch, locally and on GitHub, is `master`. The README's setup steps include `git branch -M main`, which was not run for this repo.

Pick one fix (the owner runs git and GitHub steps):

| Option | How | Trade-off |
| --- | --- | --- |
| Rename the branch to `main` (recommended) | On GitHub: **Settings → General → Default branch → rename**. GitHub then shows the local commands to run. | Matches the README, the workflow, and GitHub's default. One-time local update. |
| Trigger on `master` too | Change the workflow line to `branches: [main, master]` | No rename, but the README and workflow comments keep saying `main`. |

Either way, the first push afterwards publishes the site publicly. Until then, a deploy can still be started by hand: **Actions → Deploy to GitHub Pages → Run workflow**.

## 1. Environments

| Environment | URL | How it is built |
| --- | --- | --- |
| Local dev | `http://localhost:4321/` | `./run.sh dev` (live reload; search is unavailable because the index only exists in a production build) |
| Local production | `http://localhost:4321/` | `./run.sh build`, then `./run.sh start` |
| Local, as Pages serves it | `http://localhost:4321/<repo>/` | `./run.sh pages` (sets the base path from the folder name; override with `BASE_PATH`) |
| Production | `https://<user>.github.io/<repo>/` | GitHub Actions on push to the deploy branch |

On Windows use `run dev`, `run build`, and so on. There is no staging environment; `run pages` is the rehearsal.

### Configuration

All configuration is non-secret environment variables. Nothing needs to be added under the repository's Secrets.

| Variable | Set by | Used for | If unset |
| --- | --- | --- | --- |
| `SITE_URL` | workflow, from `actions/configure-pages` (`origin`) | Canonical URLs, sitemap, absolute `og:image` URL | No sitemap and no link-preview image tags (normal locally) |
| `BASE_PATH` | workflow, from `actions/configure-pages` (`base_path`) | Path prefix on every link and asset | `/` |
| `GITHUB_REPOSITORY` | GitHub Actions (automatic) | "Source on GitHub" and "Contact Us" links (`src/site.mjs`) | Falls back to the URL hard-coded in `src/site.mjs` |
| `REPO_URL` | optional override | Same links, if the repo ever moves off GitHub | Uses the above |

### Prerequisites

- Node.js 22.12+ locally (`.nvmrc` pins major 22; CI reads the same file).
- The repository must be **public** for GitHub Pages on a free plan.
- **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## 2. CI/CD pipeline

One workflow, two jobs. `deploy` runs only if `build` passes.

```
push to deploy branch  ─or─  "Run workflow" button
        │
        ▼
┌─ build ────────────────────────────────────────────────┐
│ checkout ─▶ Node from .nvmrc (npm cache)               │
│ configure-pages        ─▶ origin + base_path           │
│ bash run.sh setup      ─▶ version check, npm ci        │
│ bash run.sh build      ─▶ schema + link validation     │──✗─▶ stop. Live site unchanged.
│ upload-pages-artifact  ─▶ dist/                        │
└────────────────────────────────────────────────────────┘
        │ ✓
        ▼
┌─ deploy ───────────────────────────────────────────────┐
│ deploy-pages ─▶ publishes the artifact; run page shows │
│                 the live URL                           │
└────────────────────────────────────────────────────────┘
```

- CI calls the same entry script you use locally, so the two cannot drift apart.
- `concurrency: pages` with `cancel-in-progress: false`: a newer push waits for the running deploy instead of cutting it off halfway.
- Permissions are least-privilege: `contents: read`, `pages: write`, `id-token: write`.
- When a `backend/` is added, the scripts switch to Maven on their own; add `actions/setup-java` before the build step at the same time.

## 3. Deployment steps

1. **Validate locally.** `./run.sh check` must exit 0. This is the same gate CI applies.
2. **Rehearse the base path** when you changed a component, a link helper, or `astro.config.mjs`: `./run.sh pages`, then click through the contents page, a chapter overview, and the footer. Components bypass the links validator, so this is the only check that their links carry the base path.
3. **Commit and push** to the deploy branch (owner).
4. **Watch the run** in the **Actions** tab. A red `build` job names the file, field, and rule that failed.
5. **Verify production** (next section).

### Verify a deploy

| Check | Expect |
| --- | --- |
| Open the URL shown on the `deploy` job | Contents page loads with styles and fonts (condensed title, yellow cover mark) |
| Click a contents line, then a sidebar link | No 404s; URLs keep the `/<repo>/` prefix |
| Search for a word (for example "billing") | Results appear; search only works on a production build |
| Switch theme, reload | Choice persists |
| Open a missing URL | Styled 404 ("Error 404 / Page not found") with a button back to the contents |
| View source on any page | `og:image` points at `https://<user>.github.io/<repo>/og.png`, and that URL loads |
| Paste the site URL into a chat app | Link preview shows the dark cover card with the yellow mark (apps cache previews, so an old one may linger) |

> TODO(test): the production checks above have not been run yet, because no deploy has happened from this repo (see the known issue). The base-path build has been checked locally: every internal `href` and `src` in the output carried the prefix, and the `og:image` tags resolved to an absolute URL.

## 4. Rollback

A failed build needs no rollback: nothing was published.

To undo a deploy that built fine but is wrong:

1. **Revert and push** (the reliable path). `git revert <bad commit>` and push to the deploy branch; the pipeline rebuilds and republishes the previous content. History stays intact.
2. **Redeploy a known-good tag.** If good releases are tagged, use **Actions → Deploy to GitHub Pages → Run workflow** and choose the tag under "Use workflow from".

Do not rely on re-running an old workflow run: the Pages artifact it uploaded is short-lived (`actions/upload-pages-artifact` has a `retention-days` input; check its README for the current default), so the old `deploy` job usually has nothing left to publish.

To take the site offline entirely: **Settings → Pages → Unpublish site**.

> TODO(test): neither rollback path has been rehearsed on this repository.

## 5. Custom domain (later)

Add the domain under **Settings → Pages**. `actions/configure-pages` then reports an empty base path and the new origin, and the build picks both up. No code change is needed, because nothing hard-codes the repo name (see "How the base path works" in the README).

## 6. Troubleshooting

The README has the symptom table (unstyled site, failing "Read GitHub Pages settings" step, missing sidebar folders, frontmatter errors). Two additions:

| Symptom | Cause | Fix |
| --- | --- | --- |
| Push succeeds but no workflow run appears | Branch is not the one the workflow listens to | See "Known issue: branch name" |
| Build warns `Could not render "" from route "/[...slug]" as it conflicts with higher priority route "/"` | `src/content/docs/index.md` (the old home page) still exists beside `src/pages/index.astro` (the contents page) | Harmless; the contents page wins. Remove the old file with `git rm src/content/docs/index.md` |
