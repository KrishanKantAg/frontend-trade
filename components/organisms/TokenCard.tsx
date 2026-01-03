"use client";

import { Token } from "@/types/token";
import { TokenLogo } from "@/components/molecules/TokenLogo";
import { formatCompactNumber, formatSOL, truncateAddress } from "@/lib/utils";
import {
  Users,
  Trophy,
  Crown,
  Eye,
  Copy,
  Check,
  Globe,
  Search,
  BarChart2,
  ChefHat,
  Target,
  Ghost,
  Box,
  Leaf,
} from "lucide-react";
import { memo, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AnimatedValue } from "@/components/atoms/AnimatedValue";

interface TokenCardProps {
  token: Token;
  onClick?: (token: Token) => void;
}

function TokenCardComponent({ token, onClick }: TokenCardProps) {
  const tokens = useAppSelector((state) => state.tokens.tokens);
  // Use the selector data if available, otherwise fall back to prop
  const currentToken = useMemo(
    () => tokens.find((t) => t.id === token.id) || token,
    [tokens, token]
  );

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to determine color based on percentage
  const getPercentageColor = (value: number) => {
    if (value > 0) return "text-increase";
    if (value < 0) return "text-decrease";
    return "text-text-tertiary";
  };

  // Helper for pill styles
  const getPillStyle = (value: number) => {
    return "flex items-center gap-1 bg-background-tertiary px-1.5 py-0.5 rounded";
  };

  const getMarketCapColor = (marketCap: number) => {
    if (marketCap < 500_000) return "rgb(82, 197, 255)";
    if (marketCap < 5_000_000) return "rgb(220, 193, 60)";
    if (marketCap < 50_000_000) return "rgb(82, 111, 255)";
    return "rgb(47, 227, 172)";
  };

  const txChange = currentToken.percentages.oneHour ?? 0;
  const txRatio = Math.min(1, Math.max(0, (txChange + 100) / 200)); // map -100..100 to 0..1
  const txGreen = "rgb(47, 227, 172)";
  const txRed = "rgb(236, 57, 122)";
  const txGradient = `linear-gradient(to right, ${txGreen} 0%, ${txGreen} ${
    txRatio * 100
  }%, ${txRed} ${txRatio * 100}%, ${txRed} 100%)`;

  const borderColor =
    currentToken.percentages.oneHour >= 0
      ? "border-primary-green"
      : "border-primary-red";

  return (
    <div
      className={cn(
        "flex flex-row gap-3",
        "bg-background-secondary",
        "outline outline-1 outline-stroke-primary",
        "cursor-pointer transition-all duration-200",
        "hover:bg-[#1c1e24]",
        "hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
        "px-[12px] pt-[12px]"
      )}
      onClick={() => onClick?.(currentToken)}
    >
      {/* LEFT SEGMENT (Flex Grow) */}
      <div className="flex flex-1 min-w-0 gap-3">
        {/* Image Column */}
        <div className="flex flex-col items-center gap-1">
          <TokenLogo
            logoUrl={currentToken.logoUrl}
            badgeUrl={currentToken.badgeUrl}
            statusIndicator={currentToken.statusIndicator}
            size={68}
            className="flex-shrink-0"
            borderColor={borderColor}
          />
          <span className="text-[10px] text-text-tertiary font-mono">
            {truncateAddress(currentToken.contractAddress)}
          </span>
        </div>

        {/* Content Column (3 Vertical Segments) */}
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          {/* Row 1: Name, Symbol, Copy */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-text-primary text-sm truncate">
              {currentToken.symbol}
            </span>
            <span className="text-xs text-text-secondary truncate">
              {currentToken.name}
            </span>
            <CopyToClipboard text={currentToken.symbol} onCopy={handleCopy}>
              <div
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer text-text-tertiary hover:text-text-primary"
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </div>
            </CopyToClipboard>
          </div>

          {/* Row 2: Wrappable Icons */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
            <div className="flex items-center gap-1 text-primary-green">
              <AnimatedValue value={currentToken.age} />
              <Leaf className="w-3 h-3" />
            </div>
            <Globe className="w-3 h-3" />
            <Search className="w-3 h-3" />

            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{currentToken.metrics.holders}</span>
            </div>

            <BarChart2 className="w-3 h-3" />

            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span>{currentToken.metrics.trophies}</span>
            </div>

            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>{currentToken.metrics.crown}</span>
            </div>

            {currentToken.metrics.views > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <AnimatedValue value={currentToken.metrics.views} />
              </div>
            )}
          </div>

          {/* Row 3: Justified Icons (Percentages) */}
          <div className="flex items-center justify-between text-[10px] gap-1">
            {/* User - 1h */}
            <div className={getPillStyle(currentToken.percentages.oneHour)}>
              <Users
                className={cn(
                  "w-3 h-3",
                  getPercentageColor(currentToken.percentages.oneHour)
                )}
              />
              <span
                className={getPercentageColor(currentToken.percentages.oneHour)}
              >
                {Math.round(Math.abs(currentToken.percentages.oneHour))}%
              </span>
            </div>

            {/* Chef - 6h */}
            <div className={getPillStyle(currentToken.percentages.sixHour)}>
              <ChefHat
                className={cn(
                  "w-3 h-3",
                  getPercentageColor(currentToken.percentages.sixHour)
                )}
              />
              <span
                className={getPercentageColor(currentToken.percentages.sixHour)}
              >
                {Math.round(Math.abs(currentToken.percentages.sixHour))}%
              </span>
              <span className="text-text-tertiary ml-1">1h</span>
            </div>

            {/* Target - 1d */}
            <div className={getPillStyle(currentToken.percentages.oneDay)}>
              <Target
                className={cn(
                  "w-3 h-3",
                  getPercentageColor(currentToken.percentages.oneDay)
                )}
              />
              <span
                className={getPercentageColor(currentToken.percentages.oneDay)}
              >
                {Math.round(Math.abs(currentToken.percentages.oneDay))}%
              </span>
            </div>

            {/* Ghost - 1w */}
            <div className={getPillStyle(currentToken.percentages.oneWeek)}>
              <Ghost
                className={cn(
                  "w-3 h-3",
                  getPercentageColor(currentToken.percentages.oneWeek)
                )}
              />
              <span
                className={getPercentageColor(currentToken.percentages.oneWeek)}
              >
                {Math.round(Math.abs(currentToken.percentages.oneWeek))}%
              </span>
            </div>

            {/* Box - 1m */}
            <div className={getPillStyle(currentToken.percentages.oneMonth)}>
              <Box
                className={cn(
                  "w-3 h-3",
                  getPercentageColor(currentToken.percentages.oneMonth)
                )}
              />
              <span
                className={getPercentageColor(
                  currentToken.percentages.oneMonth
                )}
              >
                {Math.round(Math.abs(currentToken.percentages.oneMonth))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SEGMENT (Fixed Width) */}
      <div className="w-[120px] flex-shrink-0 flex flex-col items-start gap-1 border-stroke-primary pl-2 py-0.5">
        {/* MC */}
        <div className="flex flex-col items-start">
          <div className="text-xs">
            <span className="text-text-tertiary text-[12px] mr-1">MC</span>
            <AnimatedValue
              value={formatCompactNumber(currentToken.marketCap)}
              className="font-medium text-[16px]"
              style={{ color: getMarketCapColor(currentToken.marketCap) }}
            />
          </div>
        </div>

        {/* Volume */}
        <div className="flex flex-col items-start">
          <div className="text-xs">
            <span className="text-text-tertiary text-[12px] mr-1">V</span>
            <AnimatedValue
              value={formatCompactNumber(currentToken.volume)}
              className="font-medium text-[16px]"
              style={{ color: "rgb(252, 252, 252)" }}
            />
          </div>
        </div>

        {/* Floor / TX */}
        <div className="flex flex-col items-start">
          <div className="flex justify-start items-center gap-1">
            <div className="flex items-center gap-0.5">
              <span className="text-text-tertiary text-[11px] font-medium mr-1">
                F
              </span>
              <AnimatedValue
                value={formatSOL(currentToken.fees)}
                className="text-[12px] font-medium"
                style={{ color: "rgb(252, 252, 252)" }}
              />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-text-tertiary text-[11px] font-medium mr-1">
                TX
              </span>
              <AnimatedValue
                value={currentToken.transactions}
                className="text-[12px] font-medium"
                style={{ color: "rgb(252, 252, 252)" }}
              />
            </div>
            <div
              className="h-[3px] bg-stroke-primary rounded-full overflow-hidden flex-shrink-0"
              style={{ width: "24px" }}
            >
              <div
                className="h-full"
                style={{ width: "100%", background: txGradient }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
