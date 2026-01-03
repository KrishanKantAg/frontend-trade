"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { batchUpdateTokens, addToken } from "@/store/slices/tokenSlice";
import { Token } from "@/types/token";
import { generateRandomToken } from "@/lib/api";
import { WS_INTERVALS, TOKEN_GENERATION } from "@/lib/constants";

interface TokenUpdate {
  id: string;
  data: Partial<Token>;
}

/**
 * Mock WebSocket hook for real-time price updates
 * Optimized with batched updates to reduce re-renders
 * In production, this would connect to a real WebSocket server
 */
export function useWebSocket(tokens: Token[]) {
  const dispatch = useDispatch<AppDispatch>();
  const tokensRef = useRef(tokens);

  // Keep ref updated without causing effect re-runs
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  /**
   * Generate batch updates for all tokens
   * More efficient than dispatching per-token
   */
  const generateBatchUpdates = useCallback((): TokenUpdate[] => {
    const updates: TokenUpdate[] = [];

    tokensRef.current.forEach((token) => {
      if (Math.random() > 1 - TOKEN_GENERATION.updateProbability) {
        const changePercent =
          (Math.random() - 0.5) * TOKEN_GENERATION.priceChangeRange;

        updates.push({
          id: token.id,
          data: {
            price: token.price * (1 + changePercent),
            previousPrice: token.price,
            marketCap: token.marketCap * (1 + changePercent),
            volume:
              token.volume +
              Math.random() * TOKEN_GENERATION.volumeIncrementMax,
            transactions:
              token.transactions +
              Math.floor(
                Math.random() * TOKEN_GENERATION.transactionIncrementMax
              ),
            fees: token.fees + Math.random() * TOKEN_GENERATION.feeIncrementMax,
            metrics: {
              ...token.metrics,
              views:
                token.metrics.views +
                Math.floor(Math.random() * TOKEN_GENERATION.viewIncrementMax),
            },
          },
        });
      }
    });

    return updates;
  }, []);

  /**
   * Generate age updates for all tokens
   */
  const generateAgeUpdates = useCallback((): TokenUpdate[] => {
    return tokensRef.current.map((token) => {
      const currentAgeStr = token.age || "0s";
      const currentSeconds = parseInt(currentAgeStr.replace(/s$/, "")) || 0;
      return {
        id: token.id,
        data: { age: `${currentSeconds + 1}s` },
      };
    });
  }, []);

  useEffect(() => {
    // Price updates interval - batched for performance
    const priceInterval = setInterval(() => {
      const updates = generateBatchUpdates();
      if (updates.length > 0) {
        dispatch(batchUpdateTokens(updates));
      }
    }, WS_INTERVALS.priceUpdate);

    // New token interval
    const newTokenInterval = setInterval(() => {
      const newToken = generateRandomToken();
      dispatch(addToken(newToken));
    }, WS_INTERVALS.newToken);

    // Age increment interval - batched
    const ageInterval = setInterval(() => {
      const updates = generateAgeUpdates();
      if (updates.length > 0) {
        dispatch(batchUpdateTokens(updates));
      }
    }, WS_INTERVALS.ageIncrement);

    return () => {
      clearInterval(priceInterval);
      clearInterval(newTokenInterval);
      clearInterval(ageInterval);
    };
  }, [dispatch, generateBatchUpdates, generateAgeUpdates]);
}
