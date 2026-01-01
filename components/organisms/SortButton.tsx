"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSort, filterTokens } from "@/store/slices/tokenSlice";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface SortButtonProps {
  field: string;
  label: string;
  className?: string;
}

function SortButtonComponent({ field, label, className }: SortButtonProps) {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.tokens.sortBy);
  const sortDirection = useAppSelector((state) => state.tokens.sortDirection);

  const isActive = sortBy === field;
  const isAsc = isActive && sortDirection === "asc";

  const handleClick = () => {
    const newDirection = isActive && sortDirection === "desc" ? "asc" : "desc";
    dispatch(setSort({ field, direction: newDirection }));
    dispatch(filterTokens());
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "h-8 px-2 gap-1 text-xs text-text-secondary hover:text-text-primary",
        isActive && "text-primary-blue",
        className
      )}
    >
      <span>{label}</span>
      {isActive ? (
        isAsc ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      )}
    </Button>
  );
}

export const SortButton = memo(SortButtonComponent);

