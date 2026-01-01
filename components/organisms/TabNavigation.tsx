"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setActiveTab, filterTokens } from "@/store/slices/tokenSlice";
import { memo } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "new-pairs" as const, label: "New Pairs" },
  { id: "final-stretch" as const, label: "Final Stretch" },
  { id: "migrated" as const, label: "Migrated" },
];

function TabNavigationComponent() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tokens.activeTab);

  const handleTabChange = (tabId: typeof tabs[number]["id"]) => {
    dispatch(setActiveTab(tabId));
    dispatch(filterTokens());
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          className={cn(
            "h-10 px-2 sm:px-3 rounded-md transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0",
            activeTab === tab.id
              ? "bg-primary-blue text-white hover:bg-primary-hover"
              : "text-text-primary hover:bg-stroke-primary/40"
          )}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

export const TabNavigation = memo(TabNavigationComponent);

