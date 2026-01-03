"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";
import { ANIMATION_DURATION } from "@/lib/constants";

interface AnimatedValueProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  /** Animation duration in ms */
  duration?: number;
  /** Show flash effect on value change */
  flashOnChange?: boolean;
}

/**
 * AnimatedValue component that shows smooth transitions when values change
 * - Flash effect for value changes (green for increase, red for decrease)
 * - Smooth number interpolation for numeric values
 */
function AnimatedValueComponent({
  value,
  className,
  prefix = "",
  suffix = "",
  style,
  duration = ANIMATION_DURATION.slow,
  flashOnChange = true,
}: AnimatedValueProps) {
  const prevValueRef = useRef<string | number>(value);
  const [flashColor, setFlashColor] = useState<"increase" | "decrease" | null>(
    null
  );
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const prevValue = prevValueRef.current;

    // Skip animation on initial render
    if (prevValue === value) return;

    // Determine direction for flash effect
    if (flashOnChange) {
      const prevNum =
        typeof prevValue === "number"
          ? prevValue
          : parseFloat(String(prevValue));
      const currNum =
        typeof value === "number" ? value : parseFloat(String(value));

      if (!isNaN(prevNum) && !isNaN(currNum)) {
        if (currNum > prevNum) {
          setFlashColor("increase");
        } else if (currNum < prevNum) {
          setFlashColor("decrease");
        }
      }
    }

    // For numeric values, animate the interpolation
    if (typeof value === "number" && typeof prevValue === "number") {
      const startValue = prevValue;
      const endValue = value;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;

        setDisplayValue(currentValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // For string values, just update immediately
      setDisplayValue(value);
    }

    prevValueRef.current = value;

    // Clear flash after animation
    const flashTimeout = setTimeout(() => {
      setFlashColor(null);
    }, duration);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(flashTimeout);
    };
  }, [value, duration, flashOnChange]);

  // Format display value
  const formattedValue =
    typeof displayValue === "number"
      ? Number.isInteger(value)
        ? Math.round(displayValue)
        : displayValue.toFixed(2)
      : displayValue;

  return (
    <span
      className={cn(
        "transition-colors duration-300",
        flashColor === "increase" && "text-increase",
        flashColor === "decrease" && "text-decrease",
        className
      )}
      style={style}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

export const AnimatedValue = memo(AnimatedValueComponent);
