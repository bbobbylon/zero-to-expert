---
title: "CI/CD and GitHub Actions"
description: "What continuous integration and delivery mean, and how a GitHub Actions workflow is built from events, jobs, steps, runners, secrets, caches, and environments."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "Understanding GitHub Actions"
    url: "https://docs.github.com/en/actions/get-started/understand-github-actions"
    publisher: "GitHub Docs"
  - title: "Quickstart for GitHub Actions"
    url: "https://docs.github.com/en/actions/get-started/quickstart"
    publisher: "GitHub Docs"
  - title: "Continuous integration"
    url: "https://docs.github.com/en/actions/get-started/continuous-integration"
    publisher: "GitHub Docs"
  - title: "Continuous deployment"
    url: "https://docs.github.com/en/actions/get-started/continuous-deployment"
    publisher: "GitHub Docs"
  - title: "Workflow syntax for GitHub Actions"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
    publisher: "GitHub Docs"
  - title: "Events that trigger workflows"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows"
    publisher: "GitHub Docs"
  - title: "Dependency caching reference"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching"
    publisher: "GitHub Docs"
  - title: "Workflow artifacts"
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts"
    publisher: "GitHub Docs"
  - title: "Deployments and environments"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments"
    publisher: "GitHub Docs"
  - title: "Using secrets in GitHub Actions"
    url: "https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions"
    publisher: "GitHub Docs"
  - title: "Use GITHUB_TOKEN for authentication in workflows"
    url: "https://docs.github.com/en/actions/tutorials/authenticate-with-github_token"
    publisher: "GitHub Docs"
  - title: "GitHub-hosted runners"
    url: "https://docs.github.com/en/actions/concepts/runners/github-hosted-runners"
    publisher: "GitHub Docs"
  - title: "Enabling debug logging"
    url: "https://docs.github.com/en/actions/how-tos/monitor-workflows/enable-debug-logging"
    publisher: "GitHub Docs"
  - title: "Using custom workflows with GitHub Pages"
    url: "https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages"
    publisher: "GitHub Docs"
  - title: "actions/runner-images: available images and their labels"
    url: "https://github.com/actions/runner-images"
    publisher: "GitHub (actions/runner-images repository)"
  - title: "actions/checkout"
    url: "https://github.com/actions/checkout"
    publisher: "GitHub (actions/checkout repository)"
  - title: "Continuous Integration (supporting context, not a primary source)"
    url: "https://martinfowler.com/articles/continuousIntegration.html"
    publisher: "Martin Fowler"
  - title: "Continuous Delivery (supporting context, not a primary source)"
    url: "https://martinfowler.com/bliki/ContinuousDelivery.html"
    publisher: "Martin Fowler"
tags: [ci-cd, github-actions, pipelines, workflows, secrets, caching, environments]
sidebar:
  order: 54
---

Code that only works on the machine that built it is not finished. **CI/CD** is the habit of having a robot build, test, and ship your code on a clean machine every time you push. This page explains the ideas and reads a real workflow, the one that publishes this site (`.github/workflows/deploy.yml`), line by line. It uses GitHub Actions, and the ideas transfer to any CI system. Facts about GitHub were read against GitHub's documentation on 2026-09-26; action versions and runner images change often, so check the pages listed in the frontmatter for the current state.

## The idea: a robot colleague who runs your build

Analogy for a Spring Boot and Angular developer: think of the Maven or npm build you run before you commit. CI is a colleague who runs that same build on a fresh, identical machine on every push, in the open, and tells the whole team the result. Because the machine is fresh, "works on my machine" stops being an excuse: whatever the pipeline did not install, it did not have.

## CI, continuous delivery, and continuous deployment

The three terms are often mixed up.

| Term | What it means | The gate before production |
| --- | --- | --- |
| **Continuous integration (CI)** | Team members merge their work into a shared branch frequently, and every merge is built and tested automatically. GitHub's documentation describes it as frequently committing code to a shared repository so errors show up sooner | None: it stops at "the tests pass" |
| **Continuous delivery** | Software is built so that it can be released to production at any time (Martin Fowler's description), and the business chooses when to release | A person decides when to release |
| **Continuous deployment** | Every change that passes the pipeline is released to production automatically | None: the pipeline is the gate. GitHub describes it as automating the publishing and deployment of updates |

Start with CI. Delivery and deployment are what you add once the tests are trustworthy, because automating the release of untested code only ships bugs faster. Fowler's description of CI lists the practices that make it work, including a single source repository, an automated and self-testing build, merging to the mainline often, fixing a broken build immediately, and keeping the build fast.

## The vocabulary

GitHub Actions describes its parts in these terms:

| Term | Meaning | Analogy |
| --- | --- | --- |
| **Workflow** | An automated process defined in a YAML file under `.github/workflows` that runs one or more jobs | A Jenkinsfile or a Maven lifecycle run |
| **Event** | An activity in the repository that starts a workflow: a push, a pull request, a schedule, a manual click | The trigger |
| **Job** | A set of steps that run on the same runner. Jobs run in parallel unless you order them | A build stage |
| **Step** | One unit inside a job: a shell command, or an action | A Maven goal or an npm script |
| **Action** | A reusable, pre-written step you call with `uses:` | A Maven plugin |
| **Runner** | The server that runs a job. On GitHub-hosted runners, each job gets a new virtual machine | A build agent that is thrown away after each job |

## Reading a real workflow

This is the workflow that publishes this site, trimmed to its structure (the file in the repository has more comments):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repository
        uses: actions/checkout@v7
      - name: Set up Node from .nvmrc
        uses: actions/setup-node@v7
        with:
          node-version-file: .nvmrc
          cache: npm
      - name: Read GitHub Pages settings
        id: pages
        uses: actions/configure-pages@v6
      - name: Check tools and install exact dependency versions
        run: bash run.sh setup
      - name: Build and validate
        run: bash run.sh build
        env:
          SITE_URL: ${{ steps.pages.outputs.origin }}
          BASE_PATH: ${{ steps.pages.outputs.base_path }}
      - name: Upload the built site
        uses: actions/upload-pages-artifact@v5
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Publish to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

What each part does, and why it is there:

| Key | What it does | Why it is set this way |
| --- | --- | --- |
| `on: push: branches: [main]` | Runs the workflow when a commit is pushed to `main` | Every merge to `main` republishes the site. The `branches` filter chooses which branches count |
| `on: workflow_dispatch` | Adds a manual "Run workflow" button | Lets you redeploy without a new commit |
| `permissions` | Limits what the automatic `GITHUB_TOKEN` may do. **If you specify any permission, every permission you did not list is set to none** (GitHub's workflow syntax reference) | Least privilege: read the code, write to Pages, and request an OpenID Connect token (`id-token: write`) |
| `concurrency` with `cancel-in-progress: false` | Only one run per group at a time. By default a newer pending run replaces an older pending one; `cancel-in-progress: true` would also cancel a run already in progress | For a deployment you do not want a newer push to kill a publish halfway through, so the running one is allowed to finish |
| `jobs.build` and `jobs.deploy` | Two jobs, each on its own fresh runner | Separates "produce the site" from "publish it" |
| `needs: build` | The `deploy` job waits for `build` and is skipped if it fails | A failed build never reaches production |
| `runs-on: ubuntu-latest` | Chooses the runner image by label | See the note below |
| `uses: actions/checkout@v7` | Runs a pre-built action. The part after `@` is the version | Every job starts on an empty machine, so the first step has to fetch your code |
| `run: bash run.sh build` | Runs a shell command on the runner | The same entry point you use locally, so the pipeline and your machine cannot drift apart |
| `with:` and `env:` | Inputs to an action, and environment variables for a step | Configure without editing the action |
| `id: pages` and `steps.pages.outputs.origin` | Names a step so later steps can read its outputs through the `steps` context | The build reads the site address that Pages reports |
| `environment: github-pages` | Attaches the job to a deployment environment | Records the deployment, shows its URL, and is where protection rules live |

:::note[About `ubuntu-latest` and action versions]
As of the `actions/runner-images` repository read on 2026-09-26, the `ubuntu-latest` label pointed at the Ubuntu 24.04 image. A `latest` label moves when GitHub decides, so a workflow that must be exactly repeatable should name a fixed image label from that repository's list instead. Action versions are pinned to a major tag here (`@v7`); the `actions/checkout` repository's own README showed `v7` as the current major on the same date, while GitHub's quickstart page still showed `v6`, which is why this chapter's walkthrough uses `v7`. Check the action's own README for the current major before you copy a version.
:::

> TODO(source): GitHub's security guidance on pinning third-party actions (for example to a full commit SHA) versus using a version tag.

## Expressions and contexts

`${{ ... }}` marks an **expression**: GitHub evaluates it before the step runs. Inside it you read **contexts**, named bundles of information: `github` (the event, the repository, the actor), `runner`, `job`, `steps`, `env`, `vars` (configuration variables), and `secrets`. The quickstart workflow prints several of them, for example `${{ github.event_name }}` and `${{ runner.os }}`. Reading a value from a context, as `deploy.yml` does with `steps.pages.outputs.origin`, is how one step passes information to a later one.

## Secrets and least privilege

**Secrets** are encrypted values stored in GitHub, referenced as `${{ secrets.NAME }}` in a step's `with` or `env`. Rules that prevent the usual accidents (GitHub's "Using secrets" page):

| Rule | Detail |
| --- | --- |
| A secret that is not set is an empty string, not an error | A typo in the name gives you an empty value and a confusing failure later |
| Secrets are **not** passed to workflows triggered from a forked repository, except `GITHUB_TOKEN` | A pull request from a fork cannot read your secrets. That is deliberate |
| Secrets are unavailable to Dependabot-triggered runs, and must be passed explicitly to reusable workflows | If a secret is "missing" in one of those cases, this is why |
| GitHub masks stored secret values in logs | Treat that as a safety net, not a plan. Mask other sensitive values yourself with `::add-mask::VALUE`, and avoid putting secrets on command lines |
| Secrets can be scoped to a repository, to an environment, or to an organization | An environment secret is only available to jobs that reference that environment |

`GITHUB_TOKEN` is a token GitHub creates automatically for each workflow run so the workflow can call the GitHub API. GitHub's guidance is to grant it only the minimum access an action needs, using the `permissions` key.

> TODO(source): GitHub's documentation on OpenID Connect for authenticating a workflow to a cloud provider without stored long-lived credentials. This page only shows that `id-token: write` lets a job request an OIDC token; what the token is used for beyond Pages deployment is not covered here. The [AWS guide](/aws/) is the place for one provider's side of it.

## Caches versus artifacts

They sound alike and solve different problems (GitHub's "Workflow artifacts" page).

| | Cache | Artifact |
| --- | --- | --- |
| Purpose | Reuse files that rarely change between runs, such as downloaded dependencies | Keep files that a job produced, such as a built site or a binary |
| Direction | Restores something to make this run faster | Hands the result to a later job or to a person |
| If it is missing | The run still works, just more slowly, and a new cache is saved | The later job that needs it fails |
| Key idea | A **key** identifies the cache; a hash of the lockfile in the key makes it change when dependencies do, for example `npm-${{ hashFiles('package-lock.json') }}` | Uploaded with `upload-artifact` and fetched with `download-artifact` (the Pages actions do this for you) |
| Analogy | Maven's `~/.m2` repository | The JAR that the build hands to the deploy stage |

A cache is an optimization only. Build the workflow so it succeeds with an empty cache. GitHub evicts caches that have not been accessed in over 7 days and enforces a default size limit per repository (10 GB in the documentation read on 2026-09-26). In `deploy.yml`, the line `cache: npm` on `setup-node` is this whole mechanism in one line.

## Environments: a gate before production

An **environment** is a named deployment target such as `production`. A job that names one can be held for approval. Per GitHub's documentation, protection rules include **required reviewers** (specific people must approve before the job runs), a **wait timer** (delay the job), and **deployment branch and tag restrictions**. Environment secrets and variables are only available to jobs that reference the environment. Some of these features depend on repository visibility and plan type, so check GitHub's page for what your repository gets.

## The shape of a deploy pipeline

```
 push to main
     |
     v
 [ build job ]  checkout -> install -> test -> package -> upload artifact
     |
     |  needs: build     (skipped if build failed)
     v
 [ deploy job ]  environment (approval, secrets) -> publish the uploaded artifact
```

Habits that keep it safe:

1. **Build once, deploy that exact result.** The deploy job publishes what the build job produced; it does not rebuild.
2. **Order the jobs with `needs`** so a failure stops the pipeline before production.
3. **Give each workflow the least permission it needs**, and prefer job-level `permissions` when only one job needs more.
4. **Allow only one deployment at a time** with `concurrency`, and do not cancel one that is running.
5. **Make rollback boring.** If publishing is a pipeline run, rolling back is running it on the previous good commit.

## When a workflow fails

Read the failing step's log first; the first red step usually names the cause. To see more, GitHub's documentation says to set the secret or variable `ACTIONS_STEP_DEBUG` to `true` in the repository for step debug logging, and `ACTIONS_RUNNER_DEBUG` to `true` for runner diagnostic logging. Common mistakes:

| Mistake | What you see | Fix |
| --- | --- | --- |
| Workflow file in the wrong folder | The workflow never appears in the Actions tab | Put it in `.github/workflows/` |
| The branch filter does not match | Pushing to another branch triggers nothing | Check `on.push.branches` against the branch you pushed |
| A schedule that never runs | The `schedule` event only runs if the workflow file is on the default branch | Merge the file to the default branch |
| Listing one `permissions` entry and forgetting the rest | A step fails with a permission error because everything unlisted became `none` | Add each permission the job needs |
| An empty secret | A step that needs a credential fails, or authenticates as nobody | Check the secret's name and scope; remember forks and Dependabot get no secrets |
| Cancelling deployments in progress | A deploy stops halfway | Set `cancel-in-progress: false` for deploy groups |
| Cache key never changes | Stale dependencies | Include a hash of the lockfile in the key |

The [first-workflow walkthrough](/infrastructure/walkthroughs/6-write-your-first-github-actions-workflow/) has you write one, and the [diagnose-from-symptoms page](/infrastructure/concepts/diagnose-from-symptoms/) includes a table for pipeline failures.
