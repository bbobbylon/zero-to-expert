/**
 * @file Decides whether a page gets a Sources section, and what its one-line summary says.
 *
 * Two places need the same answer: `Sources.astro` renders the section, and `routeData.ts`
 * adds it to the "On this page" list so a reader can jump to it. If the two decided
 * separately they would drift, and a page could list "Sources" in its contents while
 * showing none (or the reverse). One function, called by both, keeps them honest.
 *
 * Analogy: the same `isEligible()` service method behind both a REST endpoint and a
 * scheduled job, instead of two copies of the rule.
 */
import type { CollectionEntry } from 'astro:content';
import { META_DOMAIN } from '../domains.mjs';

type DocsData = CollectionEntry<'docs'>['data'];

/** `id` of the section's heading; the "On this page" link points at `#` + this. */
export const SOURCES_HEADING_ID = 'page-sources';

export interface SourcesSection {
  /** Whether the page gets a Sources section at all. */
  show: boolean;
  /** The frontmatter list, possibly empty. */
  sources: DocsData['sources'];
  /** What the list means for this page, in the same terms the inspection stamp uses. */
  summary: string;
}

/**
 * Works out the Sources section for one page from its frontmatter.
 *
 * Pages about the site itself (`domain: meta`) make no factual claims, and placeholder
 * pages (`status: planned`) have nothing to back up yet, so neither gets a section.
 * Chapter overviews are navigation, not claims: one with sources shows them, one without
 * stays silent. Every other guide page gets the section even when its list is empty,
 * because "none listed yet" is something a reader should be told, not left to infer.
 */
export function sourcesSection(data: DocsData): SourcesSection {
  const sources = data.sources ?? [];
  const isGuidePage = Boolean(data.domain) && data.domain !== META_DOMAIN;
  const expectsSources = data.pageType !== 'overview' && data.status !== 'planned';
  const show = isGuidePage && (sources.length > 0 || expectsSources);

  const verifiedOn =
    data.status === 'verified' && data.lastVerified
      ? data.lastVerified.toISOString().slice(0, 10)
      : undefined;
  const summary =
    sources.length === 0
      ? 'None listed yet'
      : verifiedOn
        ? `Checked against these on ${verifiedOn}`
        : data.status === 'review'
          ? 'Being checked against these now'
          : 'Not yet checked against these';

  return { show, sources, summary };
}
