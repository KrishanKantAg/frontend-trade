"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { updatePrice } from "@/store/slices/tokenSlice";

/**
 * Mock WebSocket hook for real-time price updates
 * In production, this would connect to a real WebSocket server
 */
export function useWebSocket(tokens: Array<{ id: string; price: number }>) {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection with interval updates
    intervalRef.current = setInterval(() => {
      // Randomly update prices for some tokens
      tokens.forEach((token) => {
        if (Math.random() > 0.7) {
          // 30% chance to update each token
          const changePercent = (Math.random() - 0.5) * 0.1; // ±5% change
          const newPrice = token.price * (1 + changePercent);
          const previousPrice = token.price;

          dispatch(
            updatePrice({
              id: token.id,
              price: newPrice,
              previousPrice,
            })
          );
        }
      });
    }, 2000); // Update every 2 seconds

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

