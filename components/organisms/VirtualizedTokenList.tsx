"use client";

import React, { memo, useCallback, CSSProperties } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Token } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { VIRTUALIZATION } from "@/lib/constants";

interface VirtualizedTokenListProps {
  tokens: Token[];
  height: number;
  width: number;
  onTokenClick?: (token: Token) => void;
  variant?: "default" | "mobile-row";
}

interface RowData {
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
  variant: "default" | "mobile-row";
}

/**
 * Virtualized row component for react-window
 * Renders a single TokenCard with proper styling
 */
const Row = memo(
  ({ index, style, data }: ListChildComponentProps<RowData>) => {
    const { tokens, onTokenClick, variant } = data;
    const token = tokens[index];

    if (!token) return null;

    return (
      <div style={style}>
        <TokenCard
          token={token}
          onClick={onTokenClick}
          variant={variant}
        />
      </div>
    );
  }
);

Row.displayName = "VirtualizedRow";

/**
 * Virtualized token list component
 * Uses react-window for efficient rendering of large lists
 */
function VirtualizedTokenListComponent({
  tokens,
  height,
  width,
  onTokenClick,
  variant = "default",
}: VirtualizedTokenListProps) {
  // Create item data object for react-window
  const itemData: RowData = {
    tokens,
    onTokenClick,
    variant,
  };

  // Custom item key function for better reconciliation
  const itemKey = useCallback(
    (index: number, data: RowData) => data.tokens[index]?.id || index,
    []
  );

  if (tokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-text-secondary text-sm">
        No tokens
      </div>
    );
  }

  return (
    <List
      height={height}
      itemCount={tokens.length}
      itemSize={VIRTUALIZATION.tokenCardHeight}
      width={width}
      itemData={itemData}
      itemKey={itemKey}
      overscanCount={VIRTUALIZATION.overscanCount}
      className="scrollbar-thin scrollbar-thumb-stroke-primary scrollbar-track-transparent"
    >
      {Row}
    </List>
  );
}

export const VirtualizedTokenList = memo(VirtualizedTokenListComponent);

