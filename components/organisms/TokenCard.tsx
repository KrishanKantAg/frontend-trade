"use client";

import { Token } from "@/types/token";
import { memo, useMemo, useCallback } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// Sub-components
import { TokenLogoWithActions } from "@/components/molecules/TokenLogoWithActions";
import { TokenHeader } from "@/components/molecules/TokenHeader";
import { TokenMetricIcons } from "@/components/molecules/TokenMetricIcons";
import { PercentagePillsRow } from "@/components/molecules/PercentagePillsRow";
import { TokenFinancialSummary } from "@/components/molecules/TokenFinancialSummary";

export interface TokenCardProps {
  token: Token;
  onClick?: (token: Token) => void;
  variant?: "default" | "mobile-row";
}

/**
 * TokenCard component - displays a single token with all its data
 * Uses memoized sub-components for optimal performance
 */
function TokenCardComponent({
  token,
  onClick,
  variant = "default",
}: TokenCardProps) {
  const tokens = useAppSelector((state) => state.tokens.tokens);

  // Get current token from Redux store (for real-time updates)
  const currentToken = useMemo(
    () => tokens.find((t) => t.id === token.id) || token,
    [tokens, token]
  );

  // Memoized click handler
  const handleClick = useCallback(() => {
    onClick?.(currentToken);
  }, [onClick, currentToken]);

  // Compute border color based on 1h change
  const borderColor = useMemo(
    () =>
      currentToken.percentages.oneHour >= 0
        ? "border-primary-green"
        : "border-primary-red",
    [currentToken.percentages.oneHour]
  );

  // Container classes based on variant
  const containerClasses = useMemo(
    () =>
      variant === "mobile-row"
        ? cn(
            "flex flex-row gap-3",
            "bg-transparent border-b border-stroke-primary",
            "cursor-pointer transition-colors duration-200",
            "hover:bg-[#1c1e24]/50",
            "px-4 py-3"
          )
        : cn(
            "flex flex-row gap-3",
            "bg-background-secondary",
            "outline outline-1 outline-stroke-primary",
            "cursor-pointer transition-all duration-200",
            "hover:bg-[#1c1e24]",
            "hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
            "px-[12px] pt-[12px]"
          ),
    [variant]
  );

  return (
    <TooltipProvider delayDuration={150}>
      <div className={containerClasses} onClick={handleClick}>
        {/* LEFT SEGMENT - Token Logo & Info */}
        <div className="flex flex-1 min-w-0 gap-3">
          {/* Logo Column */}
          <TokenLogoWithActions
            logoUrl={currentToken.logoUrl}
            badgeUrl={currentToken.badgeUrl}
            statusIndicator={currentToken.statusIndicator}
            contractAddress={currentToken.contractAddress}
            symbol={currentToken.symbol}
            borderColor={borderColor}
          />

          {/* Content Column (3 Vertical Rows) */}
          <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
            {/* Row 1: Name, Symbol, Copy */}
            <TokenHeader
              symbol={currentToken.symbol}
              name={currentToken.name}
            />

            {/* Row 2: Metric Icons */}
            <TokenMetricIcons
              age={currentToken.age}
              metrics={currentToken.metrics}
            />

            {/* Row 3: Percentage Pills */}
            <PercentagePillsRow percentages={currentToken.percentages} />
          </div>
        </div>

        {/* RIGHT SEGMENT - Financial Summary */}
        <TokenFinancialSummary
          marketCap={currentToken.marketCap}
          volume={currentToken.volume}
          fees={currentToken.fees}
          transactions={currentToken.transactions}
          percentChange={currentToken.percentages.oneHour}
        />
      </div>
    </TooltipProvider>
  );
}

export const TokenCard = memo(TokenCardComponent);
