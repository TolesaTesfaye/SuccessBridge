import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, id, ...props }, ref) => (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      role="switch"
      className={cn(
        "peer relative h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full border border-input bg-muted transition-colors checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 before:absolute before:left-0.5 before:top-0.5 before:size-4 before:rounded-full before:bg-white before:shadow before:transition-transform checked:before:translate-x-4",
        className,
      )}
      {...props}
    />
  ),
);

Switch.displayName = "Switch";
