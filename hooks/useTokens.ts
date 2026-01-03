"use client";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setTokens, setLoading, setError } from "@/store/slices/tokenSlice";
import { useEffect } from "react";
import { fetchTokens } from "@/lib/api";
import { API_CONFIG } from "@/lib/constants";

/**
 * Custom hook for fetching and managing tokens
 * Uses React Query for data fetching with Redux for state management
 */
export function useTokens() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    staleTime: API_CONFIG.staleTime,
    gcTime: API_CONFIG.cacheTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Sync data to Redux store
  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  // Sync loading/error state to Redux
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
