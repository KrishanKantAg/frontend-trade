"use client";

import { ResponsiveKanbanBoard } from "@/components/organisms/ResponsiveKanbanBoard";
import { TokenModal } from "@/components/organisms/TokenModal";
import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector } from "@/hooks/useRedux";
import { ErrorBoundary } from "@/components/error-boundary";
import { useState } from "react";
import { Token } from "@/types/token";

export default function HomePage() {
  const { isLoading, error } = useTokens();
  const tokens = useAppSelector((state) => state.tokens.tokens); // Get from Redux

  // Activate real-time updates and token generation
  useWebSocket(tokens);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen-safe overflow-hidden px-[16px] py-[24px] gap-y-[16px]">
        {/* Main content - Kanban Board */}
        <div className="flex-1 overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center h-64 text-text-secondary">
              <p>
                Error loading tokens:{" "}
                {error instanceof Error ? error.message : String(error)}
              </p>
            </div>
          ) : (
            <ResponsiveKanbanBoard
              tokens={tokens}
              isLoading={isLoading}
              onTokenClick={handleTokenClick}
            />
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

