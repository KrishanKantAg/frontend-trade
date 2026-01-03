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

/**
 * Market cap color thresholds
 * Colors based on market cap ranges
 */
export const MARKET_CAP_THRESHOLDS = {
  low: { max: 500_000, color: "rgb(82, 197, 255)" },
  mid: { max: 5_000_000, color: "rgb(220, 193, 60)" },
  high: { max: 50_000_000, color: "rgb(82, 111, 255)" },
  veryHigh: { max: Infinity, color: "rgb(47, 227, 172)" },
} as const;

/**
 * Semantic colors
 */
export const COLORS = {
  increase: "rgb(47, 227, 172)",
  decrease: "rgb(236, 57, 122)",
  neutral: "rgb(252, 252, 252)",
} as const;

/**
 * WebSocket simulation intervals (ms)
 */
export const WS_INTERVALS = {
  priceUpdate: 600,
  newToken: 3000,
  ageIncrement: 1000,
} as const;

/**
 * Token generation config
 */
export const TOKEN_GENERATION = {
  updateProbability: 0.7, // 70% chance to update each token
  priceChangeRange: 0.15, // ±7.5% change
  volumeIncrementMax: 5000,
  transactionIncrementMax: 15,
  feeIncrementMax: 0.5,
  viewIncrementMax: 10,
} as const;

/**
 * Market cap buckets for token generation
 */
export const MARKET_CAP_BUCKETS = [
  { min: 120_000, max: 480_000 },
  { min: 650_000, max: 4_800_000 },
  { min: 6_500_000, max: 48_000_000 },
  { min: 60_000_000, max: 180_000_000 },
] as const;

/**
 * Virtualization config
 */
export const VIRTUALIZATION = {
  tokenCardHeight: 108, // Height of each TokenCard in pixels
  overscanCount: 5, // Number of items to render outside visible area
} as const;

/**
 * API config
 */
export const API_CONFIG = {
  mockDelay: 100, // Simulated API delay in ms
  staleTime: 30000, // React Query stale time
  cacheTime: 5 * 60 * 1000, // React Query cache time
  initialTokenCount: 60,
  tokensPerCategory: 20,
} as const;
