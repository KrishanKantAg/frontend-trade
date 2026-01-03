"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface ContainerSize {
  width: number;
  height: number;
}

/**
 * Custom hook to measure container dimensions
 * Uses ResizeObserver for efficient dimension tracking
 */
export function useContainerSize(): [
  React.RefCallback<HTMLDivElement>,
  ContainerSize
] {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Ref callback to attach/detach observer
  const refCallback = useCallback((node: HTMLDivElement | null) => {
    // Disconnect previous observer if exists
    if (observerRef.current && elementRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    // Store new element reference
    elementRef.current = node;

    if (node) {
      // Create observer if not exists
      if (!observerRef.current) {
        observerRef.current = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (entry) {
            const { width, height } = entry.contentRect;
            setSize((prev) => {
              // Only update if size actually changed
              if (prev.width !== width || prev.height !== height) {
                return { width, height };
              }
              return prev;
            });
          }
        });
      }

      // Observe the new element
      observerRef.current.observe(node);

      // Set initial size
      const rect = node.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return [refCallback, size];
}

