import React from "react";
import { cn } from "@/lib/utils";

export function TooltipProvider({
  children,
}: {
  delayDuration?: number;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <div className="group/tooltip relative inline-flex">{children}</div>;
}

export function TooltipTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement;
}) {
  if (asChild && React.isValidElement(children)) {
    return children;
  }
  return <span>{children}</span>;
}

export function TooltipContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover/tooltip:opacity-100",
        className,
      )}
    >
      {children}
    </span>
  );
}
