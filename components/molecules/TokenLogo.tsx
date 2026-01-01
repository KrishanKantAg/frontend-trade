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
  borderColor?: string;
}

function TokenLogoComponent({
  logoUrl,
  badgeUrl,
  size = 64,
  className,
  statusIndicator,
  borderColor,
}: TokenLogoProps) {
  return (
    <div className={cn("relative flex-shrink-0")}>
      <div 
        className={cn(
          "relative rounded-lg overflow-hidden border-2",
          borderColor || "border-stroke-primary",
          className
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt="Token logo"
          width={size}
          height={size}
          className="object-cover w-full h-full"
          unoptimized
        />
        {badgeUrl && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background overflow-hidden z-10">
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
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary-green border-2 border-background z-10" />
        )}
      </div>
    </div>
  );
}

export const TokenLogo = memo(TokenLogoComponent);
