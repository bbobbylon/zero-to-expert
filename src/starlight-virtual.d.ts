/**
 * @file Type declarations for the Starlight virtual modules our component overrides import.
 *
 * Starlight resolves `virtual:starlight/...` imports at build time through a Vite plugin,
 * but (as of 0.42) ships no `.d.ts` for them, so the editor reports "Cannot find module"
 * even though the build is fine. These declarations close that gap. They add no runtime code.
 *
 * Why the overrides use the virtual path at all, instead of importing
 * `@astrojs/starlight/components/Pagination.astro` directly: the virtual path returns
 * whatever is currently registered for that slot. If `Pagination` is overridden later in
 * `astro.config.mjs`, `src/components/Footer.astro` picks the override up automatically.
 *
 * Analogy: injecting a Spring bean by interface rather than `new`-ing a concrete class —
 * the caller gets whichever implementation is wired in.
 */

declare module 'virtual:starlight/components/*' {
  /** An Astro component. Starlight's slot components take no props; they read `Astro.locals`. */
  const Component: (props: Record<string, unknown>) => unknown;
  export default Component;
}

declare module 'virtual:starlight/user-config' {
  /** The resolved `starlight({...})` options from `astro.config.mjs`. */
  const config: import('@astrojs/starlight/types').StarlightConfig;
  export default config;
}
