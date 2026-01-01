import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        {
          "bg-stroke-primary text-text-secondary": variant === "default",
          "bg-primary-green/20 text-primary-green": variant === "success",
          "bg-primary-orange/20 text-primary-orange": variant === "warning",
          "bg-primary-red/20 text-primary-red": variant === "error",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

