"use client";

import { SortButton } from "./SortButton";
import { memo } from "react";

function TokenTableHeaderComponent() {
  return (
    <div className="hidden sm:flex items-center gap-6 px-4 sm:px-4 lg:px-6 py-2 border-b border-stroke-primary bg-background-secondary/50">
      <div className="flex-1">
        <span className="text-xs text-text-secondary">Token</span>
      </div>
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2">
          <SortButton field="marketCap" label="MC" />
          <SortButton field="volume" label="V" />
          <SortButton field="price" label="Price" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <span className="text-xs text-text-secondary">Change</span>
        </div>
      </div>
    </div>
  );
}

export const TokenTableHeader = memo(TokenTableHeaderComponent);

