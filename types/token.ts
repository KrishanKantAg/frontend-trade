/**
 * Token category types
 */
export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

/**
 * Token platform types
 */
export type TokenPlatform = "pump" | "bonk" | "bags" | "daos";

/**
 * Token metrics interface
 */
export interface TokenMetrics {
  holders: number;
  proTraders: number;
  trophies: number;
  crown: string; // Format: "current/total"
  views: number;
}

/**
 * Percentage indicators
 */
export interface PercentageIndicators {
  oneHour: number;
  sixHour: number;
  oneDay: number;
  oneWeek: number;
  oneMonth: number;
}

/**
 * Social links
 */
export interface SocialLinks {
  twitter?: string;
  pump?: string;
  bonk?: string;
  bags?: string;
  youtube?: string;
  tiktok?: string;
}

/**
 * Main Token interface
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  contractAddress: string;
  category: TokenCategory;
  platform: TokenPlatform;
  
  // Financial data
  marketCap: number;
  volume: number;
  fees: number; // in SOL
  transactions: number;
  price: number;
  previousPrice: number; // for price change calculation
  
  // Visual
  logoUrl: string;
  badgeUrl?: string;
  statusIndicator?: "active" | "inactive";
  
  // Metrics
  metrics: TokenMetrics;
  percentages: PercentageIndicators;
  
  // Social
  socialLinks: SocialLinks;
  
  // Timestamp
  createdAt: number; // Unix timestamp
  age: string; // Human readable: "0s", "2s", "3mo", etc.
  
  // Additional data
  description?: string;
  tags?: string[];
}

