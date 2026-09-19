/**
 * @file Content model for every guide page — the "contract" for the site now and the app later.
 *
 * Every Markdown/MDX file in `src/content/docs/` has YAML frontmatter at the top.
 * Astro validates that frontmatter against the Zod schema below when it builds.
 * Invalid frontmatter = failed build = nothing deploys.
 *
 * Analogy: this is a DTO with Bean Validation annotations (`@NotNull`, `@Pattern`)
 * plus a custom class-level validator. The difference is *when* it runs: Spring
 * validates on each request; this validates every page once, at build time, so a
 * broken page can never reach the live site.
 *
 * Why this matters for the future Spring Boot/Angular app: the app will read the
 * same Markdown files. If it parses frontmatter using the fields defined here,
 * the site and the app agree on the content model with no duplicated data.
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { DOMAIN_SLUGS, META_DOMAIN } from './domains.mjs';

/**
 * One citation. `url` must be a real absolute URL (Zod rejects anything else).
 * `publisher` is optional but recommended so readers can judge authority at a glance
 * (e.g. "AWS documentation", "Toyota factory service manual").
 */
const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  publisher: z.string().optional(),
});

/**
 * Fields we add on top of Starlight's built-in frontmatter (title, description, sidebar, draft...).
 * Starlight deep-merges these into its own schema via `docsSchema({ extend })`.
 */
const guideFields = z.object({
  /** Which guide this page belongs to. Must be listed in `src/domains.mjs`. */
  domain: z.enum(DOMAIN_SLUGS as [string, ...string[]]),

  /**
   * What kind of page this is. These map onto the Diátaxis documentation framework:
   *   overview    = guide landing page and level roadmap
   *   level       = a teaching page for one level (Diátaxis "tutorial")
   *   walkthrough = a step-by-step job (Diátaxis "how-to")
   *   cheatsheet  = commands/procedures by tier (Diátaxis "reference")
   *   explanation = background and "why" (Diátaxis "explanation")
   *   reference   = specs, glossaries, source lists (Diátaxis "reference")
   */
  pageType: z.enum(['overview', 'level', 'walkthrough', 'cheatsheet', 'explanation', 'reference']),

  /** 0 = orientation ... 5 = mastery. Required on `level` pages. */
  level: z.number().int().min(0).max(5).optional(),

  /** Required on `walkthrough` pages: brake pads = easy, transmission rebuild = expert. */
  difficulty: z.enum(['easy', 'moderate', 'hard', 'expert']).optional(),

  /**
   * Fact-check lifecycle. Drives the warning banner (see `src/routeData.ts`).
   *   planned  = placeholder, nothing written yet
   *   draft    = written, NOT fact-checked
   *   review   = sources being checked against the text
   *   verified = every claim checked against the listed sources on `lastVerified`
   */
  status: z.enum(['planned', 'draft', 'review', 'verified']).default('draft'),

  /** Date the content was last checked against its sources (YYYY-MM-DD). */
  lastVerified: z.coerce.date().optional(),

  /** True if a mistake could injure someone: brakes, mains voltage, TV power supplies, medical. */
  safetyCritical: z.boolean().default(false),

  /** Where the facts on this page come from. */
  sources: z.array(sourceSchema).default([]),

  /** Free-form tags for search and, later, filtering in the app. */
  tags: z.array(z.string()).default([]),

  /** Walkthrough extras: rough time, and what you need on the bench. */
  time: z.string().optional(),
  tools: z.array(z.string()).default([]),
  parts: z.array(z.string()).default([]),
});

/** Inferred TypeScript type of a page's frontmatter after validation. */
type GuideData = z.infer<typeof guideFields>;

/**
 * Cross-field rules a single field can't express. Each failed rule becomes a build
 * error naming the file and the field, so you know exactly what to fix.
 *
 * @param data The already-parsed frontmatter of one page.
 * @param ctx  Zod's refinement context; `ctx.addIssue` reports an error.
 */
function enforceGuideRules(data: GuideData, ctx: z.RefinementCtx): void {
  const isMeta = data.domain === META_DOMAIN;

  // "Verified" is a promise to the reader, so it needs a date and evidence.
  if (data.status === 'verified' && !isMeta) {
    if (!data.lastVerified) {
      ctx.addIssue({ code: 'custom', path: ['lastVerified'], message: 'status "verified" requires lastVerified (YYYY-MM-DD).' });
    }
    if (data.sources.length === 0) {
      ctx.addIssue({ code: 'custom', path: ['sources'], message: 'status "verified" requires at least one source.' });
    }
  }

  // Safety-critical content can't leave draft without a citation.
  const pastDraft = data.status === 'review' || data.status === 'verified';
  if (data.safetyCritical && pastDraft && data.sources.length === 0) {
    ctx.addIssue({ code: 'custom', path: ['sources'], message: 'safetyCritical pages need at least one source before review.' });
  }

  if (data.pageType === 'level' && data.level === undefined) {
    ctx.addIssue({ code: 'custom', path: ['level'], message: 'level pages must set level: 0-5.' });
  }

  if (data.pageType === 'walkthrough' && data.difficulty === undefined) {
    ctx.addIssue({ code: 'custom', path: ['difficulty'], message: 'walkthrough pages must set difficulty.' });
  }
}

/**
 * The `docs` collection Starlight renders.
 *
 * `docsSchema({ extend })` returns a *function* of Astro's schema context (it needs
 * that context for image fields), so we call it with the context and then attach our
 * cross-field rules with `.superRefine`.
 */
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: (context) => docsSchema({ extend: guideFields })(context).superRefine(enforceGuideRules),
  }),
};
