/**
 * Motion tokens. Every animation in the app pulls from here so the whole
 * site moves with one personality: soft, slightly springy, never bouncy.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1],      // most entrances
  inOut: [0.65, 0, 0.35, 1],    // things that move across the screen
  snap: [0.34, 1.56, 0.64, 1],  // tiny overshoot, use rarely
}

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
  crawl: 1.1,
}

export const spring = {
  soft: { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 },
  snappy: { type: 'spring', stiffness: 400, damping: 34 },
  layout: { type: 'spring', stiffness: 260, damping: 30 },
  pointer: { stiffness: 120, damping: 20, mass: 0.6 },
}

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
}

export const transitions = {
  base: { duration: duration.base, ease: ease.out },
}
