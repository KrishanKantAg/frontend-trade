import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedValueProps {
  value: string | number;
  className?: string;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}

export const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  className,
  prefix = "",
  suffix = "",
  style,
}) => {
  return (
    <span className={cn(className)} style={style}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};
