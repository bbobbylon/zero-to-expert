// @ts-check

/**
 * @file Site identity values shared by `astro.config.mjs` and the UI components.
 *
 * Analogy: the `info:` block of a Spring `application.yml` — one place for "who is this
 * app", read by anything that needs to print it.
 *
 * Internal links never need the repo name (see `src/plugins/base-links.mjs`), but two
 * things do have to point at GitHub itself: the header's GitHub icon and the footer's
 * "Contact Us" link. Resolution order keeps CI zero-config:
 *   1. `REPO_URL`           explicit override (e.g. after moving to another host).
 *   2. `GITHUB_REPOSITORY`  set automatically by GitHub Actions ("owner/repo"), so a
 *                           renamed repo is picked up on the next deploy with no code change.
 *   3. The fallback below   for local dev, where neither variable is set.
 */

const env = process.env;

/** @type {string} Absolute URL of the project's GitHub repository, no trailing slash. */
export const REPO_URL =
  env.REPO_URL ||
  (env.GITHUB_REPOSITORY ? `${env.GITHUB_SERVER_URL || 'https://github.com'}/${env.GITHUB_REPOSITORY}` : 'https://github.com/bbobbylon/zero-to-expert');

/** @type {string} Where "Contact Us" sends people: a new GitHub issue on the repo. */
export const CONTACT_URL = `${REPO_URL}/issues/new`;

/**
 * @type {string} The person who writes and fact-checks the guides, as the site names him.
 *
 * The site speaks in the first person ("I wrote these for..."), and a verified page's
 * inspection stamp says who checked it. First name only, on purpose: the stamp is a
 * signature, not a byline, and the full name already appears in the repository.
 */
export const OWNER_NAME = 'Bobby';
