"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface TokenLogoProps {
  logoUrl: string;
  badgeUrl?: string;
  size?: number;
  className?: string;
  statusIndicator?: "active" | "inactive";
}

function TokenLogoComponent({
  logoUrl,
  badgeUrl,
  size = 64,
  className,
  statusIndicator,
}: TokenLogoProps) {
  return (
    <div className={cn("relative flex-shrink-0", className)}>
      <div className={cn("relative rounded-lg overflow-hidden border border-stroke-primary", {
        "w-12 h-12": size <= 48,
        "w-16 h-16": size > 48 && size <= 64,
        "w-20 h-20": size > 64,
      })}>
        <Image
          src={logoUrl}
          alt="Token logo"
          width={size}
          height={size}
          className="object-cover"
          unoptimized
        />
        {badgeUrl && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background overflow-hidden">
            <Image
              src={badgeUrl}
              alt="Badge"
              width={24}
              height={24}
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        {statusIndicator === "active" && (
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary-green border-2 border-background" />
        )}
      </div>
    </div>
  );
}

export const TokenLogo = memo(TokenLogoComponent);

