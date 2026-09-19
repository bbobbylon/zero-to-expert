// @ts-check

/**
 * @file Markdown plugin: adds the site's base path to root-relative links.
 *
 * The problem: GitHub Pages serves a project repo at
 *   https://<user>.github.io/<repo>/
 * so every page lives under the base path "/<repo>". Astro does NOT add that base
 * to links written inside Markdown. A link written as `[AWS](/aws/)` would point to
 * https://<user>.github.io/aws/ and 404.
 *
 * Options considered:
 *   - Hard-code the repo name in every link (`/zero-to-expert/aws/`): breaks the moment
 *     you rename the repo or move to a custom domain, and bakes hosting details into
 *     content the future app will also read.
 *   - Relative links (`../aws/`): fragile when pages move, and the links validator
 *     rejects them by default for that reason.
 *   - This plugin: authors write clean root links (`/aws/`), and the base is added
 *     only at build time. Content stays portable; hosting stays a config concern.
 *
 * Analogy: an Angular HTTP interceptor that prepends the API base URL to every request,
 * so components never hard-code environment-specific hosts.
 *
 * How it plugs in: Astro 7's default Markdown processor is Sätteri. Sätteri plugins are
 * plain objects with one visitor function per node type. This plugin runs on the Markdown
 * syntax tree (mdast), which is converted to HTML (hast) afterwards. The links validator
 * runs on the HTML tree, so it checks the final, base-prefixed URLs readers will click.
 */

/**
 * Prefix `base` onto a URL if and only if it is a site-root link that doesn't already have it.
 *
 * @param {string} url  The link target as authored, e.g. "/aws/levels/0-orientation/".
 * @param {string} base Normalized base with no trailing slash, e.g. "/zero-to-expert". Empty for root sites.
 * @returns {string} The URL readers should get.
 */
export function withBase(url, base) {
  const isRootLink = url.startsWith('/') && !url.startsWith('//'); // "//host" is protocol-relative: leave it
  const alreadyPrefixed = url === base || url.startsWith(`${base}/`);
  return base !== '' && isRootLink && !alreadyPrefixed ? `${base}${url}` : url;
}

/**
 * Build the Sätteri mdast plugin for a given base path.
 *
 * @param {string} rawBase Astro's `base` option: "/" for root sites, "/repo" for project sites.
 * @returns {import('satteri').MdastPluginDefinition} Plugin with visitors for inline links
 *   (`[text](/path/)`) and reference definitions (`[ref]: /path/`).
 */
export function baseLinksPlugin(rawBase) {
  const base = rawBase.replace(/\/+$/, ''); // "/" -> "", "/repo/" -> "/repo"

  /**
   * Shared visitor: Sätteri nodes are read-only views, so changes go through `ctx.setProperty`.
   *
   * @param {{ url: string }} node Link or definition node.
   * @param {import('satteri').MdastVisitorContext} ctx Visitor context for mutations.
   */
  const rewrite = (node, ctx) => {
    const next = withBase(node.url, base);
    if (next !== node.url) ctx.setProperty(/** @type {any} */ (node), 'url', next);
  };

  return { name: 'base-links', link: rewrite, definition: rewrite };
}
