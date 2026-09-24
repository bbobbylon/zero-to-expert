/**
 * @file The manual's table of contents as data, computed from the content collection at build time.
 *
 * Nothing on the home page (the contents page) or in a chapter's own contents list is typed in
 * by hand. Guides come from `src/domains.mjs`, and every count and status comes from the
 * frontmatter that `src/content.config.ts` already validates. Add a page and the contents
 * update on the next build; they cannot drift from the content.
 *
 * Vocabulary: a guide is a "chapter" of the manual. Its chapter number is its 1-based
 * position in `DOMAINS`, so reordering that list renumbers the manual everywhere at once.
 *
 * Analogy: a read-only Spring `@Service` that aggregates repository rows into a DTO for
 * a summary endpoint — except the "database" is the Markdown folder and it runs once
 * per build instead of once per request.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { DOMAINS, META_DOMAIN } from '../domains.mjs';

type DocsEntry = CollectionEntry<'docs'>;

/** Fact-check lifecycle values, in the order the inspection log displays them. */
export const STATUSES = ['verified', 'review', 'draft', 'planned'] as const;
export type Status = (typeof STATUSES)[number];

/** Reader-facing label for each status. Matches the wording in "How these guides work". */
export const STATUS_LABELS: Record<Status, string> = {
  verified: 'Verified',
  review: 'In review',
  draft: 'Draft',
  planned: 'Planned',
};

/**
 * Just enough of a page to link to it honestly: wherever a page is listed, its fact-check
 * status is shown beside it (see docs/UI-DESIGN.md, "The theme never outranks the truth").
 */
export interface PageRef {
  /** Content entry id, e.g. "aws/levels/0-orientation". Pass to `entryHref()`. */
  id: string;
  status: Status;
}

export interface GuideStats {
  slug: string;
  label: string;
  group: 'Tech' | 'Hands-on';
  /** 1-based position in `DOMAINS`: the guide's chapter number. Format it with `chapterLabel()`. */
  position: number;
  /** From the guide's overview page. */
  description: string;
  /** Fact-check status of the guide's overview page, shown wherever the guide itself is listed. */
  overviewStatus: Status;
  /** True once the guide has any page beyond its overview, i.e. there is something to read. */
  showing: boolean;
  /** Pages with something written on them (every status except `planned`). */
  writtenPages: number;
  /** Pages the owner has fact-checked (`verified`). */
  verifiedPages: number;
  walkthroughs: number;
  /** Concept ("explanation") pages. */
  concepts: number;
  hasCheatSheet: boolean;
  /** Level numbers (0-5) that have a written level page. */
  levelsWritten: number[];
  /** The written level pages, keyed by level number, so the guide hub can link to them. */
  levelPages: Partial<Record<number, PageRef>>;
  /** The guide's cheat sheet, once written. */
  cheatSheet?: PageRef;
  /** True if any page in the guide is flagged `safetyCritical`. */
  safetyCritical: boolean;
}

export interface SiteStats {
  guides: GuideStats[];
  /** Every walkthrough on the site, in guide order then sidebar order. */
  walkthroughs: DocsEntry[];
  /** Page count per status, across all guides. Pages about the site itself are excluded. */
  statusCounts: Record<Status, number>;
  totalPages: number;
  writtenPages: number;
  showingGuides: number;
}

/**
 * @param position A guide's 1-based chapter number.
 * @returns Two digits, the way a printed contents page sets them: 4 -> "04".
 */
export function chapterLabel(position: number): string {
  return String(position).padStart(2, '0');
}

/**
 * @param slug A guide slug from `src/domains.mjs`.
 * @returns The guide's 1-based chapter number, or 0 if the slug is not a guide (e.g. "meta").
 */
export function chapterNumber(slug: string): number {
  return DOMAINS.findIndex((domain) => domain.slug === slug) + 1;
}

/**
 * Build the whole contents model in one pass over the collection.
 *
 * @returns Per-guide stats in `DOMAINS` order, plus site-wide totals.
 */
export async function getSiteStats(): Promise<SiteStats> {
  const pages = (await getCollection('docs')).filter((entry) => entry.data.domain !== META_DOMAIN);

  const statusCounts: Record<Status, number> = { verified: 0, review: 0, draft: 0, planned: 0 };
  for (const page of pages) statusCounts[page.data.status as Status] += 1;

  const guides = DOMAINS.map((domain, index): GuideStats => {
    const own = pages.filter((entry) => entry.data.domain === domain.slug);
    const written = own.filter((entry) => entry.data.status !== 'planned');
    const overview = own.find((entry) => entry.data.pageType === 'overview');
    const toRef = (entry: DocsEntry): PageRef => ({ id: entry.id, status: entry.data.status as Status });
    const levelPages: Partial<Record<number, PageRef>> = {};
    for (const entry of written) {
      if (entry.data.pageType === 'level' && entry.data.level !== undefined) levelPages[entry.data.level] = toRef(entry);
    }
    const levelsWritten = Object.keys(levelPages)
      .map(Number)
      .sort((a, b) => a - b);
    const cheatSheet = written.find((entry) => entry.data.pageType === 'cheatsheet');

    return {
      slug: domain.slug,
      label: domain.label,
      group: domain.group,
      position: index + 1,
      description: overview?.data.description ?? '',
      overviewStatus: (overview?.data.status as Status | undefined) ?? 'planned',
      showing: own.some((entry) => entry.data.pageType !== 'overview'),
      writtenPages: written.length,
      verifiedPages: own.filter((entry) => entry.data.status === 'verified').length,
      walkthroughs: own.filter((entry) => entry.data.pageType === 'walkthrough').length,
      concepts: own.filter((entry) => entry.data.pageType === 'explanation').length,
      hasCheatSheet: own.some((entry) => entry.data.pageType === 'cheatsheet'),
      levelsWritten,
      levelPages,
      cheatSheet: cheatSheet && toRef(cheatSheet),
      safetyCritical: own.some((entry) => entry.data.safetyCritical),
    };
  });

  const guideOrder = new Map(DOMAINS.map((domain, index) => [domain.slug, index]));
  const walkthroughs = pages
    .filter((entry) => entry.data.pageType === 'walkthrough')
    .sort(
      (a, b) =>
        (guideOrder.get(a.data.domain) ?? 0) - (guideOrder.get(b.data.domain) ?? 0) ||
        (a.data.sidebar?.order ?? 0) - (b.data.sidebar?.order ?? 0),
    );

  return {
    guides,
    walkthroughs,
    statusCounts,
    totalPages: pages.length,
    writtenPages: pages.length - statusCounts.planned,
    showingGuides: guides.filter((guide) => guide.showing).length,
  };
}

/**
 * @param slug A guide slug from `src/domains.mjs`.
 * @returns The guide's sidebar label, or the slug itself if the guide is unknown.
 */
export function guideLabel(slug: string): string {
  return DOMAINS.find((domain) => domain.slug === slug)?.label ?? slug;
}
