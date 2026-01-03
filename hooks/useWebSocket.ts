"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateTokenData, addToken } from "@/store/slices/tokenSlice";
import { Token, TokenCategory } from "@/types/token";

const TOKEN_NAMES = [
  "Pepe",
  "Doge",
  "Shiba",
  "Floki",
  "Bonk",
  "Wif",
  "Myro",
  "Wen",
  "Popcat",
  "Mew",
];
const TOKEN_SUFFIXES = [
  "AI",
  "2.0",
  "Moon",
  "Safe",
  "Elon",
  "Inu",
  "Cat",
  "Swap",
  "Fi",
  "Verse",
];

function generateRandomToken(): Token {
  const name = `${
    TOKEN_NAMES[Math.floor(Math.random() * TOKEN_NAMES.length)]
  } ${TOKEN_SUFFIXES[Math.floor(Math.random() * TOKEN_SUFFIXES.length)]}`;
  const symbol = name
    .split(" ")
    .map((s) => s.toUpperCase())
    .join("");
  const categories: TokenCategory[] = [
    "new-pairs",
    "final-stretch",
    "migrated",
  ];

  const marketCapBuckets = [
    { min: 120_000, max: 480_000 }, // low
    { min: 650_000, max: 4_800_000 }, // mid
    { min: 6_500_000, max: 48_000_000 }, // high
    { min: 60_000_000, max: 180_000_000 }, // very high
  ];
  const bucket =
    marketCapBuckets[Math.floor(Math.random() * marketCapBuckets.length)];
  const marketCap = bucket.min + Math.random() * (bucket.max - bucket.min);

  return {
    id: Math.random().toString(36).substring(7),
    name,
    symbol,
    contractAddress: Math.random().toString(36).substring(2, 42),
    category: categories[Math.floor(Math.random() * categories.length)],
    platform: "pump",
    marketCap,
    volume: Math.random() * 5_000_000,
    fees: Math.random() * 2,
    transactions: Math.floor(Math.random() * 1500),
    price: Math.random() * 5,
    previousPrice: Math.random() * 5,
    logoUrl: `https://placehold.co/64x64/22242d/white?text=${symbol.substring(
      0,
      3
    )}`,
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

/**
 * Mock WebSocket hook for real-time price updates
 * In production, this would connect to a real WebSocket server
 */
export function useWebSocket(tokens: Array<Token>) {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const addTokenIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const ageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use a ref to store current tokens to avoid effect re-runs
  const tokensRef = useRef(tokens);
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    // Simulate WebSocket connection with interval updates for prices/metrics
    intervalRef.current = setInterval(() => {
      // Randomly update prices for some tokens
      tokensRef.current.forEach((token) => {
        if (Math.random() > 0.3) {
          // 70% chance to update each token
          const changePercent = (Math.random() - 0.5) * 0.15; // ±7.5% change

          // Calculate new values
          const newPrice = token.price * (1 + changePercent);
          const newMarketCap = token.marketCap * (1 + changePercent);
          const newVolume = token.volume + Math.random() * 5000;
          const newTransactions =
            token.transactions + Math.floor(Math.random() * 15);
          const newFees = token.fees + Math.random() * 0.5;
          const newViews = token.metrics.views + Math.floor(Math.random() * 10);

          dispatch(
            updateTokenData({
              id: token.id,
              data: {
                price: newPrice,
                previousPrice: token.price,
                marketCap: newMarketCap,
                volume: newVolume,
                transactions: newTransactions,
                fees: newFees,
                metrics: {
                  ...token.metrics,
                  views: newViews,
                },
              },
            })
          );
        }
      });
    }, 600); // Update every 600ms for faster updates

    // Simulate adding new tokens (rotation)
    addTokenIntervalRef.current = setInterval(() => {
      const newToken = generateRandomToken();
      // Force starting age to 0s
      newToken.age = "0s";
      dispatch(addToken(newToken));
    }, 3000); // Add a new token every 3 seconds

    // Increment age for all tokens every second
    ageIntervalRef.current = setInterval(() => {
      tokensRef.current.forEach((token) => {
        // Parse existing age or default to 0
        const currentAgeStr = token.age || "0s";
        const currentSeconds = parseInt(currentAgeStr.replace(/s$/, "")) || 0;
        const newAge = `${currentSeconds + 1}s`;

        dispatch(
          updateTokenData({
            id: token.id,
            data: { age: newAge },
          })
        );
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (addTokenIntervalRef.current) {
        clearInterval(addTokenIntervalRef.current);
      }
      if (ageIntervalRef.current) {
        clearInterval(ageIntervalRef.current);
      }
    };
  }, [dispatch]);
}
