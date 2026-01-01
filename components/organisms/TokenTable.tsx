"use client";

import { Token } from "@/types/token";
import { TokenRow } from "./TokenRow";
import { TokenTableHeader } from "./TokenTableHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface TokenTableProps {
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
}

function TokenTableComponent({ tokens, isLoading, onTokenClick }: TokenTableProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-row w-full h-[52px] sm:h-[64px] min-h-[48px] sm:min-h-[64px] px-4 sm:px-4 lg:px-6 gap-4 sm:gap-4 lg:gap-6 items-center border-b border-stroke-primary"
          >
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="hidden sm:flex items-center gap-6 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-20 ml-auto flex-shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-text-secondary">
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <TokenTableHeader />
      {tokens.map((token) => (
        <TokenRow key={token.id} token={token} onClick={onTokenClick} />
      ))}
    </div>
  );
}

export const TokenTable = memo(TokenTableComponent);

