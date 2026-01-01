"use client";

import { formatCompactNumber, formatSOL } from "@/lib/utils";
import { memo } from "react";

interface FinancialDataProps {
  marketCap: number;
  volume: number;
  fees: number;
  transactions: number;
  className?: string;
}

function FinancialDataComponent({
  marketCap,
  volume,
  fees,
  transactions,
  className,
}: FinancialDataProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">MC</span>
          <span className="text-text-primary font-medium">{formatCompactNumber(marketCap)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">V</span>
          <span className="text-text-primary font-medium">{formatCompactNumber(volume)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">F</span>
          <div className="flex items-center gap-1">
            <span className="text-text-primary font-medium">SOL</span>
            <span className="text-text-primary font-medium">{formatSOL(fees)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">TX</span>
          <span className="text-text-primary font-medium">{transactions}</span>
        </div>
      </div>
    </div>
  );
}

export const FinancialData = memo(FinancialDataComponent);

