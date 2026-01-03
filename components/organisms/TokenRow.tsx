"use client";

import { Token } from "@/types/token";
import { TokenLogo } from "@/components/molecules/TokenLogo";
import { TokenInfo } from "@/components/molecules/TokenInfo";
import { TokenMetrics } from "@/components/molecules/TokenMetrics";
import { FinancialData } from "@/components/molecules/FinancialData";
import { PercentageIndicators } from "@/components/molecules/PercentageIndicators";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { cn, getValueColorClass } from "@/lib/utils";
import { memo, useCallback } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { useState, useEffect, useMemo } from "react";

interface TokenRowProps {
  token: Token;
  onClick?: (token: Token) => void;
}

function TokenRowComponent({ token, onClick }: TokenRowProps) {
  const tokens = useAppSelector((state) => state.tokens.tokens);
  
  const [priceAnimation, setPriceAnimation] = useState<"up" | "down" | null>(null);
  const currentToken = useMemo(
    () => tokens.find((t) => t.id === token.id) || token,
    [tokens, token]
  );

  useEffect(() => {
    if (currentToken.price !== token.previousPrice) {
      setPriceAnimation(currentToken.price > token.previousPrice ? "up" : "down");
      const timer = setTimeout(() => setPriceAnimation(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentToken.price, token.previousPrice]);

  const handleClick = useCallback(() => {
    onClick?.(currentToken);
  }, [onClick, currentToken]);

  const handleBuyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle buy action
  }, []);

  return (
    <div
      className={cn(
        "flex flex-row w-full",
        "h-[52px] sm:h-[64px] min-h-[48px] sm:min-h-[64px]",
        "px-2 sm:px-4 lg:px-6",
        "gap-2 sm:gap-4 lg:gap-6",
        "justify-between sm:justify-start items-center",
        "border-b border-stroke-primary",
        "cursor-pointer hover:bg-background-secondary/50 transition-colors duration-125",
        "overflow-hidden"
      )}
      onClick={handleClick}
    >
      {/* Left side - Token info */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <TokenLogo
          logoUrl={token.logoUrl}
          badgeUrl={token.badgeUrl}
          statusIndicator={token.statusIndicator}
          size={48}
          className="flex-shrink-0"
        />
        <TokenInfo token={token} />
      </div>

      {/* Center - Metrics and Financial Data */}
      <div className="hidden sm:flex items-center gap-4 lg:gap-6 flex-1">
        <TokenMetrics metrics={token.metrics} className="hidden md:block" />
        <FinancialData
          marketCap={currentToken.marketCap}
          volume={currentToken.volume}
          fees={currentToken.fees}
          transactions={currentToken.transactions}
        />
      </div>

      {/* Right side - Percentages and Buy button */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <div className="hidden lg:block">
          <PercentageIndicators percentages={currentToken.percentages} />
        </div>
        <Button
          variant="default"
          size="default"
          className="flex items-center gap-1 h-8 px-2 sm:px-3 text-xs sm:text-sm"
          onClick={handleBuyClick}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">0 SOL</span>
        </Button>
      </div>
    </div>
  );
}

export const TokenRow = memo(TokenRowComponent);
