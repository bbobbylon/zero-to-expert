/**
 * @file Base-path-aware links for `.astro` components.
 *
 * Markdown links get the GitHub Pages base path from `src/plugins/base-links.mjs` at build
 * time. Components don't pass through that plugin, so they call `href()` instead. Both go
 * through the same `withBase` function, so a component link and a Markdown link to the same
 * page can never disagree.
 *
 * Analogy: the Angular `APP_BASE_HREF` token — components ask for a path, the framework
 * decides what prefix the current deployment needs.
 */
import { withBase } from '../plugins/base-links.mjs';

/** Astro's `base` with no trailing slash: "" for root sites, "/repo" for project sites. */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * @param path Site-root path as an author would write it, e.g. "/aws/" or "/#tech".
 * @returns The path readers should get on the current deployment.
 */
export function href(path: string): string {
  return withBase(path, BASE);
}

/**
 * @param id A docs collection entry id, e.g. "aws/walkthroughs/1-create-an-account".
 * @returns The page's URL. Starlight serves every entry at `/<id>/`.
 */
export function entryHref(id: string): string {
  return href(`/${id}/`);
}
