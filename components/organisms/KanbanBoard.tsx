"use client";

import { Token } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { Skeleton } from "@/components/ui/skeleton";
import { memo, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

interface KanbanBoardProps {
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
}

const columns = [
  { id: "new-pairs" as const, label: "New Pairs" },
  { id: "final-stretch" as const, label: "Final Stretch" },
  { id: "migrated" as const, label: "Migrated" },
];

function KanbanBoardComponent({
  tokens,
  isLoading,
  onTokenClick,
}: KanbanBoardProps) {
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

  if (isLoading) {
    return (
      <div className="flex gap-4 h-full p-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  {column.label}
                </h3>
                <span className="text-xs text-text-secondary">0</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Filter className="w-3 h-3" />
              </Button>
            </div>
            <SimpleBar className="flex-1 min-h-0">
              <div className="flex flex-col gap-3 p-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))}
              </div>
            </SimpleBar>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full p-4 overflow-x-auto">
      {columns.map((column) => {
        const columnTokens = tokensByCategory[column.id] || [];
        return (
          <div key={column.id} className="flex-1 min-w-[320px] flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  {column.label}
                </h3>
                <span className="text-xs text-text-secondary">
                  {columnTokens.length}
                </span>
                <span className="text-xs text-text-tertiary">P1 P2 P3</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Filter className="w-3 h-3" />
              </Button>
            </div>

            {/* Column Content */}
            <SimpleBar className="flex-1 min-h-0">
              <div className="flex flex-col gap-3 p-1">
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
      })}
    </div>
  );
}

export const KanbanBoard = memo(KanbanBoardComponent);
