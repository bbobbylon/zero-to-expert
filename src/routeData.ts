/**
 * @file Starlight route middleware: warns readers when a page isn't fact-checked yet, lists
 * the Sources section in "On this page", and refuses to build a verified page that still
 * has marked gaps.
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
 *
 * The table of contents is built from the Markdown headings only, so a section that a
 * component adds (Sources, from `Sources.astro`) would be missing from it. The same rule
 * that decides whether the section renders (`src/lib/sources.ts`) decides whether it is
 * listed, so the two can't disagree.
 *
 * The gap check extends the frontmatter schema's promise (a verified page has a date and
 * sources) to the body: `CLAUDE.md` asks authors to leave `TODO(source)` and `TODO(test)`
 * where a fact or a command is unconfirmed, and a page carrying one of those is not
 * verified whatever its frontmatter says. The schema can't see the body, so the check
 * lives here, where the body is at hand, and it throws so the build fails (FR-10 in
 * docs/SRS.md) instead of quietly publishing a stamp the page hasn't earned.
 */
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { sourcesSection, SOURCES_HEADING_ID } from './lib/sources';

/** Banner text per status. `verified` has none: no banner means "checked". */
const STATUS_BANNERS: Record<string, string> = {
  planned: 'This guide is planned. Nothing here is written yet.',
  draft: 'Draft: not fact-checked yet. Don’t rely on specs, commands, or procedures on this page.',
  review: 'In review: sources are being checked. Treat specs and commands as unconfirmed.',
};

/** The markers `CLAUDE.md` prescribes for an unsourced fact and an unrun command. */
const GAP_MARKERS = ['TODO(source)', 'TODO(test)'];

/**
 * Runs once per page. Mutates `starlightRoute.entry.data.banner`, which Starlight's
 * built-in Banner component then renders at the top of the page, and appends the Sources
 * entry to `starlightRoute.toc` when the page will render that section.
 *
 * @param context Astro's request context; `locals.starlightRoute` holds the page's route data.
 * @throws When a `verified` page still contains a gap marker; the message names the file.
 */
export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;
  const data = starlightRoute.entry.data;

  if (data.status === 'verified') {
    const body = starlightRoute.entry.body ?? '';
    const gaps = GAP_MARKERS.filter((marker) => body.includes(marker));
    if (gaps.length > 0) {
      throw new Error(
        `${starlightRoute.entry.filePath}: status is "verified" but the page still has ${gaps.join(' and ')} ` +
          'markers. Resolve them, or set status to "review" until they are.',
      );
    }
  }

  // Sources is always the last section and always a top-level one, so it goes at the end of
  // the top level. `toc` is undefined when a page sets `tableOfContents: false`.
  if (starlightRoute.toc && sourcesSection(data).show) {
    starlightRoute.toc.items.push({ depth: 2, slug: SOURCES_HEADING_ID, text: 'Sources', children: [] });
  }

  // Pages about the site itself make no factual claims, and a hand-written banner wins.
  if (data.domain === 'meta' || data.banner) return;

  const message = STATUS_BANNERS[data.status];
  if (message) data.banner = { content: message };
});
