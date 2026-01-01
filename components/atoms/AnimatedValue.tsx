import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedValueProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  className,
  prefix = "",
  suffix = "",
}) => {
  const [prevValue, setPrevValue] = useState(value);
  const [animationClass, setAnimationClass] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value !== prevValue) {
      // Determine direction
      // Try to parse as float for comparison
      const currentNum = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
      const prevNum = typeof prevValue === 'number' ? prevValue : parseFloat(String(prevValue).replace(/[^0-9.-]+/g, ""));

      let newClass = "price-update";
      
      if (!isNaN(currentNum) && !isNaN(prevNum)) {
        if (currentNum > prevNum) {
          newClass += " price-increase";
        } else if (currentNum < prevNum) {
          newClass += " price-decrease";
        }
      } else {
          // If strictly string change (like age 2s -> 3s), just flash
          newClass += " text-primary-blue"; // Or some neutral flash color
      }

      setAnimationClass(newClass);
      setPrevValue(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setAnimationClass("");
      }, 600);
    }
  }, [value, prevValue]);

  return (
    <span className={cn(animationClass, className)}>
      {prefix}{value}{suffix}
    </span>
  );
};

