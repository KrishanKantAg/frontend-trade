"use client";

import React, { memo, useCallback, useState } from "react";
import { Copy, Check } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenHeaderProps {
  symbol: string;
  name: string;
}

/**
 * Token header with name, symbol, and copy functionality
 */
function TokenHeaderComponent({ symbol, name }: TokenHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="font-bold text-text-primary text-sm truncate">
        {symbol}
      </span>
      <span className="text-xs text-text-secondary truncate">{name}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <CopyToClipboard text={symbol} onCopy={handleCopy}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer text-text-tertiary hover:text-text-primary"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </div>
          </CopyToClipboard>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy token symbol</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export const TokenHeader = memo(TokenHeaderComponent);

