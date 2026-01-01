"use client";

import { cn, getValueColorClass } from "@/lib/utils";
import { memo } from "react";

interface PercentageIndicatorProps {
  value: number;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

function PercentageIndicatorComponent({
  value,
  label,
  showIcon = false,
  className,
}: PercentageIndicatorProps) {
  const colorClass = getValueColorClass(value);
  const formattedValue = `${value >= 0 ? "+" : ""}${value.toFixed(0)}%`;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {showIcon && (
        <div
          className={cn("h-2 w-2 rounded-full", {
            "bg-increase": value > 0,
            "bg-decrease": value < 0,
            "bg-text-tertiary": value === 0,
          })}
        />
      )}
      <span className={cn("text-xs font-medium", colorClass)}>{formattedValue}</span>
      {label && <span className="text-xs text-text-tertiary">{label}</span>}
    </div>
  );
}

export const PercentageIndicator = memo(PercentageIndicatorComponent);

