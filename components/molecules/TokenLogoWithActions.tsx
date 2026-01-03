"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Camera, EyeOff, CloudOff } from "lucide-react";
import { TokenLogo } from "./TokenLogo";
import { truncateAddress } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenLogoWithActionsProps {
  logoUrl: string;
  badgeUrl?: string;
  statusIndicator?: "active" | "inactive";
  contractAddress: string;
  symbol: string;
  borderColor: string;
}

/**
 * Token logo with hover actions (preview, hide, block)
 */
function TokenLogoWithActionsComponent({
  logoUrl,
  badgeUrl,
  statusIndicator,
  contractAddress,
  symbol,
  borderColor,
}: TokenLogoWithActionsProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group">
            <TokenLogo
              logoUrl={logoUrl}
              badgeUrl={badgeUrl}
              statusIndicator={statusIndicator}
              size={68}
              className="flex-shrink-0 p-[2px] border-[1px]"
              borderColor={borderColor}
            />
            {/* Hover overlay - camera icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <div className="bg-background-secondary/85 rounded-md p-1.5 border border-stroke-primary shadow-md">
                <Camera className="w-4 h-4 text-text-primary" />
              </div>
            </div>
            {/* Hover side actions */}
            <div className="pointer-events-none absolute left-[-6px] top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <div className="bg-background-secondary/90 rounded-md p-1 border border-stroke-primary shadow-md">
                <EyeOff className="w-3 h-3 text-text-primary" />
              </div>
              <div className="bg-background-secondary/90 rounded-md p-1 border border-stroke-primary shadow-md">
                <CloudOff className="w-3 h-3 text-text-primary" />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="end"
          sideOffset={8}
          className="p-0 border-0 bg-transparent shadow-none"
        >
          <div className="rounded-lg overflow-hidden border border-stroke-primary bg-background-secondary">
            <Image
              src={logoUrl}
              alt={`${symbol} preview`}
              width={260}
              height={260}
              className="object-cover w-[260px] h-[260px]"
              unoptimized
            />
          </div>
        </TooltipContent>
      </Tooltip>
      <span className="text-[10px] text-text-tertiary font-mono">
        {truncateAddress(contractAddress)}
      </span>
    </div>
  );
}

export const TokenLogoWithActions = memo(TokenLogoWithActionsComponent);

