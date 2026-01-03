"use client";

import React, { memo } from "react";
import {
  Users,
  Trophy,
  Crown,
  Eye,
  Globe,
  Search,
  BarChart2,
  Leaf,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedValue } from "@/components/atoms/AnimatedValue";
import { TokenMetrics } from "@/types/token";

interface TokenMetricIconsProps {
  age: string;
  metrics: TokenMetrics;
}

/**
 * Row of metric icons with tooltips
 */
function TokenMetricIconsComponent({ age, metrics }: TokenMetricIconsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-primary-green">
            <AnimatedValue value={age} />
            <Leaf className="w-3 h-3" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Age since launch</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Globe className="w-3 h-3" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Project website availability</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Search className="w-3 h-3" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Discovery / explorer lookup</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{metrics.holders}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Holder count</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <BarChart2 className="w-3 h-3" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Pro traders: {metrics.proTraders}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            <span>{metrics.trophies}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Leaderboard trophies</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Crown className="w-3 h-3" />
            <span>{metrics.crown}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Crown score</p>
        </TooltipContent>
      </Tooltip>

      {metrics.views > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <AnimatedValue value={metrics.views} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View count</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export const TokenMetricIcons = memo(TokenMetricIconsComponent);

