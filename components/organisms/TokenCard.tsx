"use client";

import { Token } from "@/types/token";
import { TokenLogo } from "@/components/molecules/TokenLogo";
import { formatCompactNumber, formatSOL, truncateAddress } from "@/lib/utils";
import {
  Users,
  Home,
  Trophy,
  Crown,
  Eye,
  ExternalLink,
  Twitter,
} from "lucide-react";
import { memo } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector } from "@/hooks/useRedux";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  token: Token;
  onClick?: (token: Token) => void;
}

function TokenCardComponent({ token, onClick }: TokenCardProps) {
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const tokenIds = useMemo(
    () => tokens.map((t) => ({ id: t.id, price: t.price })),
    [tokens]
  );
  useWebSocket(tokenIds);

  const currentToken = useMemo(
    () => tokens.find((t) => t.id === token.id) || token,
    [tokens, token]
  );

  // Calculate progress percentage (using oneHour as main indicator)
  const progressPercentage = Math.min(
    Math.max(currentToken.percentages.oneHour, 0),
    100
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-3",
        "bg-background-secondary rounded-lg",
        "border border-stroke-primary",
        "cursor-pointer hover:border-primary-blue/50 transition-all duration-200",
        "hover:bg-background-tertiary"
      )}
      onClick={() => onClick?.(currentToken)}
    >
      {/* Header: Logo, Name, Time */}
      <div className="flex items-start gap-2">
        <TokenLogo
          logoUrl={currentToken.logoUrl}
          badgeUrl={currentToken.badgeUrl}
          statusIndicator={currentToken.statusIndicator}
          size={40}
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-text-primary text-sm truncate">
              {currentToken.symbol}
            </span>
            <span className="text-xs text-text-secondary whitespace-nowrap">
              {currentToken.age}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {currentToken.socialLinks.pump && (
              <Link
                href={currentToken.socialLinks.pump}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-tertiary hover:text-primary-blue transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
            {currentToken.socialLinks.twitter && (
              <Link
                href={currentToken.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-tertiary hover:text-primary-blue transition-colors"
              >
                <Twitter className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Icons Row */}
      <div className="flex items-center gap-3 text-xs text-text-secondary">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{currentToken.metrics.holders}</span>
        </div>
        <div className="flex items-center gap-1">
          <Home className="w-3 h-3" />
          <span>{currentToken.metrics.proTraders}</span>
        </div>
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

      {/* Financial Data */}
      <div className="flex items-center gap-4 text-xs">
        <div>
          <span className="text-text-secondary">MC</span>
          <span className="text-text-primary ml-1">
            {formatCompactNumber(currentToken.marketCap)}
          </span>
        </div>
        <div>
          <span className="text-text-secondary">V</span>
          <span className="text-text-primary ml-1">
            {formatCompactNumber(currentToken.volume)}
          </span>
        </div>
        <div>
          <span className="text-text-secondary">F</span>
          <span className="text-text-primary ml-1">
            {formatSOL(currentToken.fees)}
          </span>
        </div>
        <div>
          <span className="text-text-secondary">TX</span>
          <span className="text-text-primary ml-1">
            {currentToken.transactions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-stroke-primary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-blue transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Percentages Row */}
      <div className="flex items-center gap-2 text-xs flex-wrap">
        <span
          className={cn(
            "text-text-primary font-medium",
            currentToken.percentages.oneHour > 0 && "text-increase",
            currentToken.percentages.oneHour < 0 && "text-decrease"
          )}
        >
          {Math.abs(currentToken.percentages.oneHour)}%
        </span>
        {currentToken.percentages.sixHour !==
          currentToken.percentages.oneHour && (
          <span className="text-text-secondary">
            {Math.abs(currentToken.percentages.sixHour)}% {currentToken.age}
          </span>
        )}
        {currentToken.percentages.oneDay !== currentToken.percentages.sixHour &&
          currentToken.percentages.oneDay !==
            currentToken.percentages.oneHour && (
            <span className="text-text-secondary">
              {Math.abs(currentToken.percentages.oneDay)}%
            </span>
          )}
        {currentToken.percentages.oneWeek !== currentToken.percentages.oneDay &&
          currentToken.percentages.oneWeek !==
            currentToken.percentages.oneHour && (
            <span className="text-text-secondary">
              {Math.abs(currentToken.percentages.oneWeek)}%
            </span>
          )}
        {currentToken.percentages.oneMonth !==
          currentToken.percentages.oneWeek &&
          currentToken.percentages.oneMonth !==
            currentToken.percentages.oneDay && (
            <span className="text-text-secondary">
              {Math.abs(currentToken.percentages.oneMonth)}%
            </span>
          )}
      </div>

      {/* Address */}
      <div className="text-xs text-text-tertiary font-mono">
        {truncateAddress(currentToken.contractAddress)}
      </div>
    </div>
  );
}

export const TokenCard = memo(TokenCardComponent);
