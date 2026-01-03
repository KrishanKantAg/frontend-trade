/**
 * API layer for token data fetching
 * Separates data fetching concerns from hooks
 */

import { Token, TokenPlatform } from "@/types/token";
import { API_CONFIG, MARKET_CAP_BUCKETS } from "./constants";

/**
 * Choose a market cap value from predefined buckets to ensure variety
 */
function chooseMarketCap(index: number): number {
  const bucket = MARKET_CAP_BUCKETS[index % MARKET_CAP_BUCKETS.length];
  const span = bucket.max - bucket.min;
  return bucket.min + Math.random() * span;
}

/**
 * Generate mock token data
 * In production, this would be replaced with actual API calls
 */
function generateMockToken(index: number, category: Token["category"]): Token {
  const platforms: TokenPlatform[] = ["pump", "bonk", "bags", "daos"];
  const symbol = `TKN${index + 1}`;
  
  return {
    id: `token-${index}`,
    name: `Token ${index + 1}`,
    symbol,
    contractAddress: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    category,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    marketCap: chooseMarketCap(index),
    volume: Math.random() * 5_000_000,
    fees: Math.random() * 0.5,
    transactions: Math.floor(Math.random() * 1000),
    price: Math.random() * 5,
    previousPrice: Math.random() * 5,
    logoUrl: `https://picsum.photos/64/64?random=${index}`,
    badgeUrl: `https://picsum.photos/32/32?random=${index + 100}`,
    statusIndicator: "active",
    metrics: {
      holders: Math.floor(Math.random() * 100),
      proTraders: Math.floor(Math.random() * 50),
      trophies: Math.floor(Math.random() * 10),
      crown: `${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 1000)}`,
      views: Math.floor(Math.random() * 1000),
    },
    percentages: {
      oneHour: (Math.random() - 0.5) * 100,
      sixHour: (Math.random() - 0.5) * 100,
      oneDay: (Math.random() - 0.5) * 100,
      oneWeek: (Math.random() - 0.5) * 100,
      oneMonth: (Math.random() - 0.5) * 100,
    },
    socialLinks: {
      twitter: `https://x.com/token${index}`,
      pump: `https://pump.fun/coin/token${index}`,
    },
    createdAt: Date.now() - Math.random() * 86400000,
    age: `${Math.floor(Math.random() * 60)}s`,
  };
}

/**
 * Fetch all tokens from API
 * In production, this would call the actual API endpoint
 */
export async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, API_CONFIG.mockDelay));

  const categories: Token["category"][] = ["new-pairs", "final-stretch", "migrated"];
  
  // Generate mock tokens distributed across categories
  const mockTokens: Token[] = Array.from(
    { length: API_CONFIG.initialTokenCount },
    (_, i) => {
      const categoryIndex = Math.floor(i / API_CONFIG.tokensPerCategory);
      const category = categories[categoryIndex] || "new-pairs";
      return generateMockToken(i, category);
    }
  );

  return mockTokens;
}

/**
 * Fetch tokens by category
 */
export async function fetchTokensByCategory(
  category: Token["category"]
): Promise<Token[]> {
  const allTokens = await fetchTokens();
  return allTokens.filter((token) => token.category === category);
}

/**
 * Generate a new random token (for WebSocket simulation)
 */
export function generateRandomToken(): Token {
  const names = ["Pepe", "Doge", "Shiba", "Floki", "Bonk", "Wif", "Myro", "Wen", "Popcat", "Mew"];
  const suffixes = ["AI", "2.0", "Moon", "Safe", "Elon", "Inu", "Cat", "Swap", "Fi", "Verse"];
  const categories: Token["category"][] = ["new-pairs", "final-stretch", "migrated"];
  const platforms: TokenPlatform[] = ["pump", "bonk", "bags", "daos"];

  const name = `${names[Math.floor(Math.random() * names.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  const symbol = name.split(" ").map((s) => s.toUpperCase()).join("");
  
  const bucket = MARKET_CAP_BUCKETS[Math.floor(Math.random() * MARKET_CAP_BUCKETS.length)];
  const marketCap = bucket.min + Math.random() * (bucket.max - bucket.min);

  return {
    id: Math.random().toString(36).substring(7),
    name,
    symbol,
    contractAddress: Math.random().toString(36).substring(2, 42),
    category: categories[Math.floor(Math.random() * categories.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    marketCap,
    volume: Math.random() * 5_000_000,
    fees: Math.random() * 2,
    transactions: Math.floor(Math.random() * 1500),
    price: Math.random() * 5,
    previousPrice: Math.random() * 5,
    logoUrl: `https://placehold.co/64x64/22242d/white?text=${symbol.substring(0, 3)}`,
    metrics: {
      holders: Math.floor(Math.random() * 1000),
      proTraders: Math.floor(Math.random() * 50),
      trophies: Math.floor(Math.random() * 5),
      crown: "1/1",
      views: Math.floor(Math.random() * 500),
    },
    percentages: {
      oneHour: (Math.random() - 0.5) * 20,
      sixHour: (Math.random() - 0.5) * 40,
      oneDay: (Math.random() - 0.5) * 60,
      oneWeek: (Math.random() - 0.5) * 80,
      oneMonth: (Math.random() - 0.5) * 100,
    },
    socialLinks: {},
    createdAt: Date.now(),
    age: "0s",
  };
}

