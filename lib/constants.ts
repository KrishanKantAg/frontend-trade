/**
 * Application constants
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 125,
  normal: 150,
  slow: 300,
} as const;

export const TOKEN_CATEGORIES = {
  "new-pairs": "New Pairs",
  "final-stretch": "Final Stretch",
  migrated: "Migrated",
} as const;

export const SORT_FIELDS = {
  marketCap: "Market Cap",
  volume: "Volume",
  price: "Price",
  transactions: "Transactions",
} as const;

