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
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

  // Subscribe to WebSocket updates for this token
  const tokenIds = useMemo(
    () => [{ id: currentToken.id, price: currentToken.price }],
    [currentToken.id, currentToken.price]
  );
  useWebSocket(tokenIds);

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

  const borderColor =
    currentToken.percentages.oneHour >= 0
      ? "border-primary-green"
      : "border-primary-red";

  return (
    <div
      className={cn(
        "flex flex-row p-2 gap-3",
        "bg-background-secondary rounded-lg",
        "border border-stroke-primary",
        "cursor-pointer hover:border-primary-blue/50 transition-all duration-200",
        "hover:bg-background-tertiary"
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
            <span className="text-xs text-text-secondary truncate flex-1">
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
              <span>{currentToken.age}</span>
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
                <span>{currentToken.metrics.views}</span>
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
                {Math.abs(currentToken.percentages.oneHour)}%
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
                {Math.abs(currentToken.percentages.sixHour)}%
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
                {Math.abs(currentToken.percentages.oneDay)}%
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
                {Math.abs(currentToken.percentages.oneWeek)}%
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
                {Math.abs(currentToken.percentages.oneMonth)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SEGMENT (Fixed Width) */}
      <div className="w-[120px] flex-shrink-0 flex flex-col justify-between items-end border-l border-stroke-primary pl-2 py-0.5">
        {/* MC */}
        <div className="flex flex-col items-end">
          <div className="text-xs">
            <span className="text-text-secondary mr-1">MC</span>
            <span className="text-primary-green font-bold">
              ${formatCompactNumber(currentToken.marketCap)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex flex-col items-end">
          <div className="text-xs">
            <span className="text-text-secondary mr-1">V</span>
            <span className="text-text-primary font-bold">
              ${formatCompactNumber(currentToken.volume)}
            </span>
          </div>
        </div>

        {/* Floor / TX */}
        <div className="flex flex-col items-end w-full">
          <div className="flex justify-end gap-2 text-[10px] w-full">
            <div className="flex items-center gap-0.5">
              <span className="text-text-secondary">F</span>
              <span className="text-text-primary">
                {formatSOL(currentToken.fees)}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-text-secondary">TX</span>
              <span className="text-text-primary">
                {currentToken.transactions}
              </span>
            </div>
          </div>
          {/* Progress bar line from screenshot? */}
          <div className="w-full h-1 bg-stroke-primary rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-primary-green"
              style={{ width: "50%" }} // Placeholder or derived from something
            />
          </div>
        </div>

        {/* Action Buttons (from screenshot bottom right) */}
        <div className="flex gap-1 mt-1 justify-end w-full">
          <div className="w-4 h-4 rounded-full bg-background-tertiary border border-stroke-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary-red"></div>
          </div>
          <div className="w-4 h-4 rounded-full bg-background-tertiary border border-stroke-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary-yellow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
