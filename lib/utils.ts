import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MARKET_CAP_THRESHOLDS, COLORS } from "./constants";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with K/M/B suffixes
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

/**
 * Format SOL amount
 */
export function formatSOL(amount: number): string {
  if (amount >= 1) {
    return amount.toFixed(3);
  }
  if (amount >= 0.01) {
    return amount.toFixed(4);
  }
  // Scientific notation for very small numbers
  const exp = Math.floor(Math.log10(amount));
  const mantissa = amount / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}e${exp}`;
}

/**
 * Truncate address
 */
export function truncateAddress(address: string, start = 4, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(0)}%`;
}

/**
 * Get Tailwind color class based on value (positive/negative)
 */
export function getValueColorClass(value: number): string {
  if (value > 0) return "text-increase";
  if (value < 0) return "text-decrease";
  return "text-text-secondary";
}

/**
 * Get percentage color class for display
 * @param value - The percentage value
 * @returns Tailwind color class
 */
export function getPercentageColorClass(value: number): string {
  if (value > 0) return "text-increase";
  if (value < 0) return "text-decrease";
  return "text-text-tertiary";
}

/**
 * Get market cap color based on value thresholds
 * @param marketCap - The market cap value
 * @returns RGB color string
 */
export function getMarketCapColor(marketCap: number): string {
  if (marketCap < MARKET_CAP_THRESHOLDS.low.max) {
    return MARKET_CAP_THRESHOLDS.low.color;
  }
  if (marketCap < MARKET_CAP_THRESHOLDS.mid.max) {
    return MARKET_CAP_THRESHOLDS.mid.color;
  }
  if (marketCap < MARKET_CAP_THRESHOLDS.high.max) {
    return MARKET_CAP_THRESHOLDS.high.color;
  }
  return MARKET_CAP_THRESHOLDS.veryHigh.color;
}

/**
 * Generate transaction gradient based on percentage change
 * @param percentChange - The percentage change value (-100 to 100)
 * @returns CSS linear-gradient string
 */
export function getTransactionGradient(percentChange: number): string {
  const ratio = Math.min(1, Math.max(0, (percentChange + 100) / 200));
  return `linear-gradient(to right, ${COLORS.increase} 0%, ${COLORS.increase} ${ratio * 100}%, ${COLORS.decrease} ${ratio * 100}%, ${COLORS.decrease} 100%)`;
}

/**
 * Get pill style classes (consistent styling for percentage pills)
 */
export function getPillClasses(): string {
  return "flex items-center gap-1 bg-background-tertiary px-1.5 py-0.5 rounded";
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function for rate limiting
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
