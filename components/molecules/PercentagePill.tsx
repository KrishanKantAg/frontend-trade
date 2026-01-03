"use client";

import React, { memo } from "react";
import { cn, getPercentageColorClass, getPillClasses } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface PercentagePillProps {
  value: number;
  icon: LucideIcon;
  tooltip: string;
  /** Optional time label (e.g., "1h", "6h") */
  timeLabel?: string;
}

/**
 * Reusable percentage pill component with icon and tooltip
 */
function PercentagePillComponent({
  value,
  icon: Icon,
  tooltip,
  timeLabel,
}: PercentagePillProps) {
  const colorClass = getPercentageColorClass(value);
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={getPillClasses()}>
          <Icon className={cn("w-3 h-3", colorClass)} />
          <span className={colorClass}>
            {Math.round(Math.abs(value))}%
          </span>
          {timeLabel && (
            <span className="text-text-tertiary ml-1">{timeLabel}</span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export const PercentagePill = memo(PercentagePillComponent);

