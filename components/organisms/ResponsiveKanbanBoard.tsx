"use client";

import { Token } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { VirtualizedTokenList } from "./VirtualizedTokenList";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { memo, useMemo, useState, useCallback } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useContainerSize } from "@/hooks/useContainerSize";

interface ResponsiveKanbanBoardProps {
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
}

const columns = [
  { id: "new-pairs" as const, label: "New Pairs" },
  { id: "final-stretch" as const, label: "Final Stretch" },
  { id: "migrated" as const, label: "Migrated" },
] as const;

/**
 * Skeleton component for loading state
 */
const TokenCardSkeleton = memo(() => (
  <div className="flex flex-row gap-3 bg-background-secondary outline outline-1 outline-stroke-primary px-[12px] pt-[12px]">
    <div className="flex flex-col items-center gap-1">
      <Skeleton className="h-[68px] w-[68px] rounded-md" />
      <Skeleton className="h-3 w-20" />
    </div>
    <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-8" />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`row2-${i}`} className="h-4 w-12" />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`pill-${i}`} className="h-6 w-12" />
        ))}
      </div>
    </div>
    <div className="w-[120px] flex-shrink-0 flex flex-col items-start gap-2 pl-2 py-0.5">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-16" />
      <div className="flex flex-col items-start gap-2 w-full">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-[3px] w-24" />
      </div>
    </div>
  </div>
));

TokenCardSkeleton.displayName = "TokenCardSkeleton";

/**
 * Desktop column with virtualized list
 */
interface DesktopColumnProps {
  columnId: string;
  columnLabel: string;
  tokens: Token[];
  onTokenClick?: (token: Token) => void;
}

const DesktopColumn = memo(
  ({ columnId, columnLabel, tokens, onTokenClick }: DesktopColumnProps) => {
    const [containerRef, size] = useContainerSize();

    return (
      <div key={columnId} className="flex-1 min-w-[320px] flex flex-col">
        {/* Column Header */}
        <div className="flex items-center justify-between p-4 border-b border-stroke-primary bg-background-secondary/50">
          <div className="flex items-center gap-2">
            <h3 className="text-textPrimary text-[16px] font-medium flex-1">
              {columnLabel}
            </h3>
            <span className="text-xs text-text-secondary">
              ({tokens.length})
            </span>
          </div>
        </div>

        {/* Column Content - Virtualized */}
        <div ref={containerRef} className="flex-1 min-h-0">
          {size.height > 0 && (
            <VirtualizedTokenList
              tokens={tokens}
              height={size.height}
              width={size.width}
              onTokenClick={onTokenClick}
            />
          )}
        </div>
      </div>
    );
  }
);

DesktopColumn.displayName = "DesktopColumn";

/**
 * ResponsiveKanbanBoard component
 * Shows tabs on mobile, three-column layout on desktop
 * Uses virtualization for optimal performance with large lists
 */
function ResponsiveKanbanBoardComponent({
  tokens,
  isLoading,
  onTokenClick,
}: ResponsiveKanbanBoardProps) {
  const [activeTab, setActiveTab] = useState("new-pairs");

  // Memoize tab change handler
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  // Group tokens by category
  const tokensByCategory = useMemo(() => {
    const grouped: Record<string, Token[]> = {
      "new-pairs": [],
      "final-stretch": [],
      migrated: [],
    };

    tokens.forEach((token) => {
      if (grouped[token.category]) {
        grouped[token.category].push(token);
      }
    });

    return grouped;
  }, [tokens]);

  // Render mobile column content
  const renderMobileColumn = useCallback(
    (columnId: string) => {
      const columnTokens = tokensByCategory[columnId] || [];

      if (columnTokens.length === 0) {
        return (
          <div className="flex items-center justify-center h-32 text-text-secondary text-sm">
            No tokens
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-0">
          {columnTokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={onTokenClick}
              variant="mobile-row"
            />
          ))}
        </div>
      );
    },
    [tokensByCategory, onTokenClick]
  );

  if (isLoading) {
    return (
      <>
        {/* Mobile Loading State */}
        <div className="kanban:hidden flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-text-primary">
                Loading...
              </h3>
              <span className="text-xs text-text-secondary">0</span>
            </div>
          </div>
          <SimpleBar className="flex-1 min-h-0">
            <div className="flex flex-col gap-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <TokenCardSkeleton key={i} />
              ))}
            </div>
          </SimpleBar>
        </div>

        {/* Desktop Loading State */}
        <div className="hidden kanban:flex h-full">
          <div className="flex w-full h-full border border-stroke-primary divide-x divide-stroke-primary rounded-lg overflow-hidden">
            {columns.map((column) => (
              <div key={column.id} className="flex-1 flex flex-col">
                <div className="flex items-center justify-between min-h-[48px] border-b border-stroke-primary p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-textPrimary text-[16px] font-medium flex-1">
                      {column.label}
                    </h3>
                    <span className="text-xs text-text-secondary">0</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Filter className="w-3 h-3" />
                  </Button>
                </div>
                <SimpleBar className="flex-1 min-h-0">
                  <div className="flex flex-col gap-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TokenCardSkeleton key={i} />
                    ))}
                  </div>
                </SimpleBar>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile View: Tabs with Single Column */}
      <div className="kanban:hidden flex flex-col h-full">
        <SimpleBar className="flex-1 min-h-0">
          <div className="flex flex-col border border-stroke-primary">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="w-full justify-start sticky top-0 z-10 bg-background px-4 pt-4 pb-0 gap-4 border-b border-stroke-primary">
                {columns.map((column) => (
                  <TabsTrigger
                    key={column.id}
                    value={column.id}
                    className="group relative text-nowrap flex flex-row pb-3 gap-[4px] justify-start items-center rounded-none bg-transparent transition-none data-[state=active]:bg-transparent data-[state=active]:border-b-[2px] data-[state=active]:border-textPrimary data-[state=active]:mb-[-1px] data-[state=active]:text-textPrimary data-[state=inactive]:text-textSecondary hover:text-textPrimary"
                  >
                    <span className="text-[16px] leading-[16px] font-medium">
                      {column.label}
                    </span>
                    <span className="text-xs text-text-secondary">
                      ({tokensByCategory[column.id]?.length || 0})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {columns.map((column) => (
                <TabsContent
                  key={column.id}
                  value={column.id}
                  className="h-full mt-0"
                >
                  {renderMobileColumn(column.id)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </SimpleBar>
      </div>

      {/* Desktop View: Three Columns Side by Side with Virtualization */}
      <div className="hidden kanban:flex h-full overflow-x-auto">
        <div className="flex min-w-full h-full border border-stroke-primary divide-x divide-stroke-primary rounded-lg overflow-hidden">
          {columns.map((column) => (
            <DesktopColumn
              key={column.id}
              columnId={column.id}
              columnLabel={column.label}
              tokens={tokensByCategory[column.id] || []}
              onTokenClick={onTokenClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export const ResponsiveKanbanBoard = memo(ResponsiveKanbanBoardComponent);
