"use client";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setTokens, setLoading, setError, filterTokens } from "@/store/slices/tokenSlice";
import { Token, TokenPlatform } from "@/types/token";
import { useEffect } from "react";

/**
 * Mock API function to fetch tokens for all categories
 * In production, this would call the actual API
 */
async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay (reduced for faster development)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const categories: Token["category"][] = ["new-pairs", "final-stretch", "migrated"];
  
  const marketCapBuckets = [
    { min: 120_000, max: 480_000 }, // shows rgb(82, 197, 255)
    { min: 650_000, max: 4_800_000 }, // shows rgb(220, 193, 60)
    { min: 6_500_000, max: 48_000_000 }, // shows rgb(82, 111, 255)
    { min: 60_000_000, max: 180_000_000 }, // shows rgb(47, 227, 172)
  ];

  const chooseMarketCap = (i: number) => {
    // Cycle through buckets to guarantee variety; add slight randomness inside each bucket
    const bucket = marketCapBuckets[i % marketCapBuckets.length];
    const span = bucket.max - bucket.min;
    return bucket.min + Math.random() * span;
  };

  // Mock token data - distribute across all categories
  const mockTokens: Token[] = Array.from({ length: 60 }, (_, i) => {
    // Distribute tokens across categories (20 each)
    const categoryIndex = Math.floor(i / 20);
    const category = categories[categoryIndex] || "new-pairs";
    
    return {
      id: `token-${i}`,
      name: `Token ${i + 1}`,
      symbol: `TKN${i + 1}`,
      contractAddress: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
      category: category,
      platform: ["pump", "bonk", "bags", "daos"][Math.floor(Math.random() * 4)] as TokenPlatform,
      marketCap: chooseMarketCap(i),
      volume: Math.random() * 5_000_000,
      fees: Math.random() * 0.5,
      transactions: Math.floor(Math.random() * 1000),
      price: Math.random() * 5,
      previousPrice: Math.random() * 5,
      logoUrl: `https://picsum.photos/64/64?random=${i}`,
      badgeUrl: `https://picsum.photos/32/32?random=${i + 100}`,
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
        twitter: `https://x.com/token${i}`,
        pump: `https://pump.fun/coin/token${i}`,
      },
      createdAt: Date.now() - Math.random() * 86400000,
      age: `${Math.floor(Math.random() * 60)}s`,
    };
  });

  return mockTokens;
}

export function useTokens() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetchTokens(),
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
      // Don't filter tokens - we want all tokens for the Kanban board
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    dispatch(setError(error ? (error as Error).message : null));
  }, [isLoading, error, dispatch]);

  return {
    tokens: data || [],
    isLoading,
    error,
  };
}

