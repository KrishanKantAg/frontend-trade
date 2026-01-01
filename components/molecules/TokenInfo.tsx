"use client";

import { Token } from "@/types/token";
import { truncateAddress } from "@/lib/utils";
import { ExternalLink, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TokenInfoProps {
  token: Token;
  showFullName?: boolean;
}

function TokenInfoComponent({ token, showFullName = false }: TokenInfoProps) {
  return (
    <div className="flex flex-col gap-1 min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="font-semibold text-text-primary truncate hover:text-primary-blue transition-colors text-left">
              {token.symbol}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">{token.name}</h4>
              <p className="text-sm text-text-secondary">{token.description || "No description available"}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {token.tags?.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-stroke-primary rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {showFullName && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-text-tertiary hover:text-text-primary transition-colors">
                  <span className="text-xs">ⓘ</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{token.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span>{token.age}</span>
        <div className="flex items-center gap-1">
          {token.socialLinks.pump && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={token.socialLinks.pump}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-blue transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on Pump.fun</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {token.socialLinks.twitter && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={token.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-blue transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Twitter className="w-3 h-3" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {token.socialLinks.youtube && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={token.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-blue transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Youtube className="w-3 h-3" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on YouTube</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-text-tertiary hover:text-text-primary transition-colors">
                {truncateAddress(token.contractAddress)}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{token.contractAddress}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export const TokenInfo = memo(TokenInfoComponent);
