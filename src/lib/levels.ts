/**
 * @file The six levels every guide follows, as data for the UI.
 *
 * The wording matches the table in `src/content/docs/about/how-guides-work.md`, which stays
 * the reader-facing source of truth. Keep the two in sync when either changes.
 *
 * The level number is drawn as a gauge: five marks, filled up to the level, so Level 0
 * (Orientation) is an empty gauge and Level 5 (Mastery) a full one. See
 * `src/components/LevelGauge.astro`.
 */

export interface LevelInfo {
  /** 0 = Orientation ... 5 = Mastery. Also the number of filled marks on the gauge. */
  level: number;
  name: string;
  /** Completes the sentence "You can...". */
  youCan: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 0, name: 'Orientation', youCan: 'Name the parts, tools, and vocabulary, and know the safety basics.' },
  { level: 1, name: 'Beginner', youCan: 'Complete common jobs by following a walkthrough.' },
  { level: 2, name: 'Intermediate', youCan: 'Do routine work on your own and spot mistakes.' },
  { level: 3, name: 'Advanced', youCan: 'Take on multi-part jobs and diagnose problems from symptoms.' },
  { level: 4, name: 'Expert', youCan: 'Do professional-grade work.' },
  { level: 5, name: 'Mastery', youCan: 'Handle rare and complex work, and explain why things work the way they do.' },
];

/** Highest level number; also the number of marks on a full gauge. */
export const MAX_LEVEL = 5;
