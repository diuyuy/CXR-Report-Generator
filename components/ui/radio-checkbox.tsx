"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as React from "react";

import { cn } from "@/lib/utils";

function RadioCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-textbox data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-textbox data-[state=checked]:border-radio focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-full border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <div className="h-2.5 w-2.5 bg-radio rounded-full" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { RadioCheckbox };
