// @ts-check

/**
 * @file Single source of truth for every guide ("domain") on the site.
 *
 * Two places read this list:
 *   1. `astro.config.mjs` builds the sidebar from it (one collapsible group per domain).
 *   2. `src/content.config.ts` turns the slugs into an enum, so a page whose
 *      `domain:` frontmatter isn't listed here fails the build.
 *
 * Analogy: this is a shared enum in a common module that both your Spring Boot
 * DTOs and your Angular models import, so the two sides can never disagree.
 *
 * To add a guide: add an entry here, then create `src/content/docs/<slug>/index.md`.
 * The folder name MUST equal the slug, because the sidebar autogenerates from that folder.
 */

/**
 * @typedef {object} Domain
 * @property {string} slug  URL segment and content folder name, e.g. "aws" -> /aws/.
 * @property {string} label Text shown in the sidebar and on the home page.
 * @property {'Tech' | 'Hands-on'} group Top-level sidebar section the guide sits under.
 */

/** @type {Domain[]} Every guide on the site, in sidebar order. */
export const DOMAINS = [
  { slug: 'ai-agents', label: 'AI agents & coding with agents', group: 'Tech' },
  { slug: 'windows-macos', label: 'Windows & macOS', group: 'Tech' },
  { slug: 'aws', label: 'AWS infrastructure', group: 'Tech' },
  { slug: 'infrastructure', label: 'Infrastructure', group: 'Tech' },
  { slug: 'computers', label: 'Computers', group: 'Tech' },
  { slug: 'tech-gaming', label: 'Technology & gaming', group: 'Tech' },
  { slug: 'roblox-studio', label: 'Roblox Studio', group: 'Tech' },
  { slug: 'cars', label: 'Car mechanics', group: 'Hands-on' },
  { slug: 'carpentry', label: 'Carpentry', group: 'Hands-on' },
  { slug: 'tools', label: 'Tools', group: 'Hands-on' },
  { slug: 'electronics', label: 'Electronics', group: 'Hands-on' },
  { slug: 'tvs', label: 'TVs', group: 'Hands-on' },
  { slug: 'home-repair', label: 'Home repair', group: 'Hands-on' },
  { slug: 'survival', label: 'Survival', group: 'Hands-on' },
];

/**
 * Pseudo-domain for pages about the site itself (home page, "how these guides work").
 * Meta pages are exempt from the sourcing rules because they make no factual claims.
 */
export const META_DOMAIN = 'meta';

/** @type {string[]} Every valid value for the `domain:` frontmatter field. */
export const DOMAIN_SLUGS = [META_DOMAIN, ...DOMAINS.map((d) => d.slug)];

/** @type {Array<Domain['group']>} Sidebar sections, in display order. */
export const GROUPS = ['Tech', 'Hands-on'];
