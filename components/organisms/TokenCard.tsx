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
  EyeOff,
  CloudOff,
  Camera,
  Globe,
  Search,
  BarChart2,
  ChefHat,
  Target,
  Ghost,
  Box,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AnimatedValue } from "@/components/atoms/AnimatedValue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={150}>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group">
                  <TokenLogo
                    logoUrl={currentToken.logoUrl}
                    badgeUrl={currentToken.badgeUrl}
                    statusIndicator={currentToken.statusIndicator}
                    size={68}
                    className="flex-shrink-0 p-[2px] border-[1px]"
                    borderColor={borderColor}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <div className="bg-background-secondary/85 rounded-md p-1.5 border border-stroke-primary shadow-md">
                      <Camera className="w-4 h-4 text-text-primary" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute left-[-6px] top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <div className="bg-background-secondary/90 rounded-md p-1 border border-stroke-primary shadow-md">
                      <EyeOff className="w-3 h-3 text-text-primary" />
                    </div>
                    <div className="bg-background-secondary/90 rounded-md p-1 border border-stroke-primary shadow-md">
                      <CloudOff className="w-3 h-3 text-text-primary" />
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="end"
                sideOffset={8}
                className="p-0 border-0 bg-transparent shadow-none"
              >
                <div className="rounded-lg overflow-hidden border border-stroke-primary bg-background-secondary">
                  <Image
                    src={currentToken.logoUrl}
                    alt={`${currentToken.symbol} preview`}
                    width={260}
                    height={260}
                    className="object-cover w-[260px] h-[260px]"
                    unoptimized
                  />
                </div>
              </TooltipContent>
            </Tooltip>
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <CopyToClipboard
                    text={currentToken.symbol}
                    onCopy={handleCopy}
                  >
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy token symbol</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Row 2: Wrappable Icons */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-primary-green">
                    <AnimatedValue value={currentToken.age} />
                    <Leaf className="w-3 h-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Age since launch</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Globe className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Project website availability</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Search className="w-3 h-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discovery / explorer lookup</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{currentToken.metrics.holders}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Holder count</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pro traders: {currentToken.metrics.proTraders}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{currentToken.metrics.trophies}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Leaderboard trophies</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>{currentToken.metrics.crown}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Crown score</p>
                </TooltipContent>
              </Tooltip>

              {currentToken.metrics.views > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <AnimatedValue value={currentToken.metrics.views} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View count</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Row 3: Justified Icons (Percentages) */}
            <div className="flex items-center justify-between text-[10px] gap-1">
              {/* User - 1h */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={getPillStyle(currentToken.percentages.oneHour)}
                  >
                    <Users
                      className={cn(
                        "w-3 h-3",
                        getPercentageColor(currentToken.percentages.oneHour)
                      )}
                    />
                    <span
                      className={getPercentageColor(
                        currentToken.percentages.oneHour
                      )}
                    >
                      {Math.round(Math.abs(currentToken.percentages.oneHour))}%
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>1h change</p>
                </TooltipContent>
              </Tooltip>

              {/* Chef - 6h */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={getPillStyle(currentToken.percentages.sixHour)}
                  >
                    <ChefHat
                      className={cn(
                        "w-3 h-3",
                        getPercentageColor(currentToken.percentages.sixHour)
                      )}
                    />
                    <span
                      className={getPercentageColor(
                        currentToken.percentages.sixHour
                      )}
                    >
                      {Math.round(Math.abs(currentToken.percentages.sixHour))}%
                    </span>
                    <span className="text-text-tertiary ml-1">1h</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>6h change</p>
                </TooltipContent>
              </Tooltip>

              {/* Target - 1d */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={getPillStyle(currentToken.percentages.oneDay)}
                  >
                    <Target
                      className={cn(
                        "w-3 h-3",
                        getPercentageColor(currentToken.percentages.oneDay)
                      )}
                    />
                    <span
                      className={getPercentageColor(
                        currentToken.percentages.oneDay
                      )}
                    >
                      {Math.round(Math.abs(currentToken.percentages.oneDay))}%
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>24h change</p>
                </TooltipContent>
              </Tooltip>

              {/* Ghost - 1w */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={getPillStyle(currentToken.percentages.oneWeek)}
                  >
                    <Ghost
                      className={cn(
                        "w-3 h-3",
                        getPercentageColor(currentToken.percentages.oneWeek)
                      )}
                    />
                    <span
                      className={getPercentageColor(
                        currentToken.percentages.oneWeek
                      )}
                    >
                      {Math.round(Math.abs(currentToken.percentages.oneWeek))}%
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>7d change</p>
                </TooltipContent>
              </Tooltip>

              {/* Box - 1m */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={getPillStyle(currentToken.percentages.oneMonth)}
                  >
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>30d change</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* RIGHT SEGMENT (Fixed Width) */}
        <div className="w-[120px] flex-shrink-0 flex flex-col items-start gap-1 border-stroke-primary pl-2 py-0.5">
          {/* MC */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-start">
                <div className="text-xs">
                  <span className="text-text-tertiary text-[12px] mr-1">
                    MC
                  </span>
                  <AnimatedValue
                    value={formatCompactNumber(currentToken.marketCap)}
                    className="font-medium text-[16px]"
                    style={{ color: getMarketCapColor(currentToken.marketCap) }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Market cap: {currentToken.marketCap.toLocaleString()} SOL</p>
            </TooltipContent>
          </Tooltip>

          {/* Volume */}
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>24h volume: {currentToken.volume.toLocaleString()} SOL</p>
            </TooltipContent>
          </Tooltip>

          {/* Floor / TX */}
          <div className="flex flex-col items-start">
            <div className="flex justify-start items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fees collected (SOL)</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
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
      </div>
    </TooltipProvider>
  );
}

export const TokenCard = memo(TokenCardComponent);
