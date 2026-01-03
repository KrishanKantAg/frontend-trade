"use client";

import React, { memo } from "react";
import { Users, ChefHat, Target, Ghost, Box } from "lucide-react";
import { PercentagePill } from "./PercentagePill";
import { PercentageIndicators } from "@/types/token";

interface PercentagePillsRowProps {
  percentages: PercentageIndicators;
}

/**
 * Row of percentage pills showing time-based changes
 */
function PercentagePillsRowComponent({ percentages }: PercentagePillsRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-start text-[10px] gap-1">
      <PercentagePill
        value={percentages.oneHour}
        icon={Users}
        tooltip="1h change"
      />
      <PercentagePill
        value={percentages.sixHour}
        icon={ChefHat}
        tooltip="6h change"
        timeLabel="1h"
      />
      <PercentagePill
        value={percentages.oneDay}
        icon={Target}
        tooltip="24h change"
      />
      <PercentagePill
        value={percentages.oneWeek}
        icon={Ghost}
        tooltip="7d change"
      />
      <PercentagePill
        value={percentages.oneMonth}
        icon={Box}
        tooltip="30d change"
      />
    </div>
  );
}

export const PercentagePillsRow = memo(PercentagePillsRowComponent);

