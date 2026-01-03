"use client";

import { Token } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { memo, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

interface ResponsiveKanbanBoardProps {
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
}

const columns = [
  { id: "new-pairs" as const, label: "New Pairs" },
  { id: "final-stretch" as const, label: "Final Stretch" },
  { id: "migrated" as const, label: "Migrated" },
];

function ResponsiveKanbanBoardComponent({
  tokens,
  isLoading,
  onTokenClick,
}: ResponsiveKanbanBoardProps) {
  const [activeTab, setActiveTab] = useState("new-pairs");

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

  // Skeleton that mirrors the TokenCard layout so loading feels consistent
  const TokenCardSkeleton = () => (
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
  );

  // Render a single column (for mobile)
  const renderColumn = (columnId: string, columnLabel: string) => {
    const columnTokens = tokensByCategory[columnId] || [];

    return (
      <div className="flex flex-col h-full">
        {/* Column Content */}
        <SimpleBar className="flex-1 min-h-0">
          <div className="flex flex-col gap-0">
            {columnTokens.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-text-secondary text-sm">
                No tokens
              </div>
            ) : (
              columnTokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onClick={onTokenClick}
                />
              ))
            )}
          </div>
        </SimpleBar>
      </div>
    );
  };

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
                <div className="flex items-center justify-between min-h-[48px] border-b border-stroke-primary">
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
        <div className="px-4 pt-4 pb-2 border-b border-stroke-primary">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start">
              {columns.map((column) => (
                <TabsTrigger key={column.id} value={column.id}>
                  {column.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {columns.map((column) => (
              <TabsContent
                key={column.id}
                value={column.id}
                className="h-full mt-0"
              >
                {renderColumn(column.id, column.label)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Desktop View: Three Columns Side by Side */}
      <div className="hidden kanban:flex h-full overflow-x-auto">
        <div className="flex min-w-full h-full border border-stroke-primary divide-x divide-stroke-primary rounded-lg overflow-hidden">
          {columns.map((column) => {
            const columnTokens = tokensByCategory[column.id] || [];
            return (
              <div
                key={column.id}
                className="flex-1 min-w-[320px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-4 border-b border-stroke-primary bg-background-secondary/50">
                  <div className="flex items-center gap-2">
                    <h3 className="text-textPrimary text-[16px] font-medium flex-1">
                      {column.label}
                    </h3>
                  </div>
                </div>

                {/* Column Content */}
                <SimpleBar className="flex-1 min-h-0">
                  <div className="flex flex-col gap-0">
                    {columnTokens.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                        No tokens
                      </div>
                    ) : (
                      columnTokens.map((token) => (
                        <TokenCard
                          key={token.id}
                          token={token}
                          onClick={onTokenClick}
                        />
                      ))
                    )}
                  </div>
                </SimpleBar>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const ResponsiveKanbanBoard = memo(ResponsiveKanbanBoardComponent);
