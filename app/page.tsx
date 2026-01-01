"use client";

import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TabNavigation } from "@/components/organisms/TabNavigation";
import { TokenModal } from "@/components/organisms/TokenModal";
import { useTokens } from "@/hooks/useTokens";
import { useAppSelector } from "@/hooks/useRedux";
import { ErrorBoundary } from "@/components/error-boundary";
import { Settings, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Token } from "@/types/token";

export default function HomePage() {
  const { isLoading, error } = useTokens();
  const allTokens = useAppSelector((state) => state.tokens.tokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen-safe overflow-hidden">
        {/* Header */}
        <div className="border-b border-stroke-primary px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className="text-lg sm:text-xl font-semibold">Pulse</h1>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
          <TabNavigation />
        </div>

        {/* Main content - Kanban Board */}
        <div className="flex-1 overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-64 text-text-secondary">
              <p>Error loading tokens: {error}</p>
            </div>
          ) : (
            <KanbanBoard tokens={allTokens} isLoading={isLoading} onTokenClick={handleTokenClick} />
          )}
        </div>

        {/* Token Modal */}
        <TokenModal
          token={selectedToken}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </ErrorBoundary>
  );
}

