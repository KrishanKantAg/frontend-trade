"use client";

import { PercentageIndicators as PercentageIndicatorsType } from "@/types/token";
import { PercentageIndicator } from "@/components/atoms/PercentageIndicator";
import { memo } from "react";

interface PercentageIndicatorsProps {
  percentages: PercentageIndicatorsType;
  className?: string;
}

function PercentageIndicatorsComponent({ percentages, className }: PercentageIndicatorsProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1">
        <PercentageIndicator value={percentages.oneHour} showIcon />
        <PercentageIndicator value={percentages.sixHour} showIcon label="6h" />
        <PercentageIndicator value={percentages.oneDay} showIcon />
        <PercentageIndicator value={percentages.oneWeek} showIcon />
        <PercentageIndicator value={percentages.oneMonth} showIcon />
      </div>
    </div>
  );
}

export const PercentageIndicators = memo(PercentageIndicatorsComponent);

