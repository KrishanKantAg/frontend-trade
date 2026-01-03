"use client";

import React, { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedValue } from "@/components/atoms/AnimatedValue";
import { formatCompactNumber, formatSOL, getMarketCapColor, getTransactionGradient } from "@/lib/utils";
import { COLORS } from "@/lib/constants";

interface TokenFinancialSummaryProps {
  marketCap: number;
  volume: number;
  fees: number;
  transactions: number;
  percentChange: number;
}

/**
 * Financial summary section showing MC, Volume, Fees, TX
 */
function TokenFinancialSummaryComponent({
  marketCap,
  volume,
  fees,
  transactions,
  percentChange,
}: TokenFinancialSummaryProps) {
  const txGradient = getTransactionGradient(percentChange);

  return (
    <div className="w-[120px] flex-shrink-0 flex flex-col items-start gap-1 border-stroke-primary pl-2 py-0.5">
      {/* Market Cap */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-start">
            <div className="text-xs">
              <span className="text-text-tertiary text-[12px] mr-1">MC</span>
              <AnimatedValue
                value={formatCompactNumber(marketCap)}
                className="font-medium text-[16px]"
                style={{ color: getMarketCapColor(marketCap) }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Market cap: {marketCap.toLocaleString()} SOL</p>
        </TooltipContent>
      </Tooltip>

      {/* Volume */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-start">
            <div className="text-xs">
              <span className="text-text-tertiary text-[12px] mr-1">V</span>
              <AnimatedValue
                value={formatCompactNumber(volume)}
                className="font-medium text-[16px]"
                style={{ color: COLORS.neutral }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>24h volume: {volume.toLocaleString()} SOL</p>
        </TooltipContent>
      </Tooltip>

      {/* Fees / TX / Progress bar */}
      <div className="flex flex-col items-start">
        <div className="flex justify-start items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-0.5">
                <span className="text-text-tertiary text-[11px] font-medium mr-1">F</span>
                <AnimatedValue
                  value={formatSOL(fees)}
                  className="text-[12px] font-medium"
                  style={{ color: COLORS.neutral }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fees collected (SOL)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-0.5">
                <span className="text-text-tertiary text-[11px] font-medium mr-1">TX</span>
                <AnimatedValue
                  value={transactions}
                  className="text-[12px] font-medium"
                  style={{ color: COLORS.neutral }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total transactions</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-[3px] bg-stroke-primary rounded-full overflow-hidden flex-shrink-0"
                style={{ width: "24px" }}
              >
                <div
                  className="h-full"
                  style={{ width: "100%", background: txGradient }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tx momentum (1h)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export const TokenFinancialSummary = memo(TokenFinancialSummaryComponent);

