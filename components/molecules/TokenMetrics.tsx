"use client";

import { TokenMetrics as TokenMetricsType } from "@/types/token";
import { Users, Home, Trophy, Crown, Eye } from "lucide-react";
import { memo } from "react";

interface TokenMetricsProps {
  metrics: TokenMetricsType;
  className?: string;
}

function TokenMetricsComponent({ metrics, className }: TokenMetricsProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1 text-text-secondary">
          <Users className="w-3 h-3" />
          <span>{metrics.holders}</span>
        </div>
        <div className="flex items-center gap-1 text-text-secondary">
          <Home className="w-3 h-3" />
          <span>{metrics.proTraders}</span>
        </div>
        <div className="flex items-center gap-1 text-text-secondary">
          <Trophy className="w-3 h-3" />
          <span>{metrics.trophies}</span>
        </div>
        <div className="flex items-center gap-1 text-text-secondary">
          <Crown className="w-3 h-3" />
          <span>{metrics.crown}</span>
        </div>
        {metrics.views > 0 && (
          <div className="flex items-center gap-1 text-text-secondary">
            <Eye className="w-3 h-3" />
            <span>{metrics.views}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export const TokenMetrics = memo(TokenMetricsComponent);

