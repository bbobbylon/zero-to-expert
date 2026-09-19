/**
 * @file Starlight route middleware: warns readers when a page isn't fact-checked yet.
 *
 * Starlight builds a "route data" object for each page (title, sidebar, frontmatter...)
 * and then renders it. Route middleware runs in between, so we can change what gets
 * rendered without touching any page file.
 *
 * Analogy: a Spring `HandlerInterceptor.preHandle` that looks at each request and adds
 * a header — except it runs once per page at build time, not per visitor.
 *
 * Why automatic instead of writing banners by hand: a manual banner is one more thing
 * to forget. Here the banner is derived from `status`, so a page can't claim to be
 * trustworthy on screen while its frontmatter says otherwise.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/** Banner text per status. `verified` has none: no banner means "checked". */
const STATUS_BANNERS: Record<string, string> = {
  planned: 'This guide is planned. Nothing here is written yet.',
  draft: 'Draft: not fact-checked yet. Don’t rely on specs, commands, or procedures on this page.',
  review: 'In review: sources are being checked. Treat specs and commands as unconfirmed.',
};

/**
 * Runs once per page. Mutates `starlightRoute.entry.data.banner`, which Starlight's
 * built-in Banner component then renders at the top of the page.
 *
 * @param context Astro's request context; `locals.starlightRoute` holds the page's route data.
 */
export const onRequest = defineRouteMiddleware((context) => {
  const data = context.locals.starlightRoute.entry.data;

  // Pages about the site itself make no factual claims, and a hand-written banner wins.
  if (data.domain === 'meta' || data.banner) return;

  const message = STATUS_BANNERS[data.status];
  if (message) data.banner = { content: message };
});
