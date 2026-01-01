"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updateTokenData } from "@/store/slices/tokenSlice";
import { Token } from "@/types/token";

/**
 * Mock WebSocket hook for real-time price updates
 * In production, this would connect to a real WebSocket server
 */
export function useWebSocket(tokens: Array<Token>) {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection with interval updates
    intervalRef.current = setInterval(() => {
      // Randomly update prices for some tokens
      tokens.forEach((token) => {
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

          // Simple age update mock
          const currentAgeNum = parseInt(token.age.replace(/\D/g, "")) || 0;
          const ageUnit = token.age.replace(/\d/g, "") || "s";
          const newAge = `${currentAgeNum}${ageUnit}`;

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
                age: newAge,
              },
            })
          );
        }
      });
    }, 600); // Update every 600ms for faster updates

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);

  return {
    connected: true,
    error: null,
  };
}
