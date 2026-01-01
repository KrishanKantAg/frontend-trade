"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Token } from "@/types/token";
import { TokenLogo } from "@/components/molecules/TokenLogo";
import { TokenInfo } from "@/components/molecules/TokenInfo";
import { FinancialData } from "@/components/molecules/FinancialData";
import { TokenMetrics } from "@/components/molecules/TokenMetrics";
import { PercentageIndicators } from "@/components/molecules/PercentageIndicators";
import { formatCompactNumber } from "@/lib/utils";

interface TokenModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenModal({ token, open, onOpenChange }: TokenModalProps) {
  if (!token) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Token Details</DialogTitle>
          <DialogDescription>Detailed information about {token.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex items-center gap-4">
            <TokenLogo
              logoUrl={token.logoUrl}
              badgeUrl={token.badgeUrl}
              statusIndicator={token.statusIndicator}
              size={80}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{token.name}</h2>
              <p className="text-text-secondary">{token.symbol}</p>
              <p className="text-sm text-text-tertiary mt-2">{token.contractAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Financial Data</h3>
              <FinancialData
                marketCap={token.marketCap}
                volume={token.volume}
                fees={token.fees}
                transactions={token.transactions}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Metrics</h3>
              <TokenMetrics metrics={token.metrics} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Price Changes</h3>
            <PercentageIndicators percentages={token.percentages} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

