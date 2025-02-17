import { cva } from "class-variance-authority";

import { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";

export const sharedCheckboxStyles = cn(
  "before:border-slate-700",
  "flex rounded before:rounded-md",
  "border border-slate-700 text-slate-700 ring-offset-background",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "items-center justify-center",
);

export const checkboxSizes = cva([], {
  variants: {
    size: {
      [Sizes.Enum["small-200"]]: ["h-2.5", "min-h-2.5", "w-2.5", "min-w-2.5"],
      [Sizes.Enum["small-100"]]: ["h-3", "min-h-3", "w-3", "min-w-3"],
      [Sizes.Enum.base]: ["h-3.5", "min-h-3.5", "w-3.5", "min-w-3.5"],
      [Sizes.Enum["large-100"]]: [
        "h-[18px]",
        "min-h-[18px]",
        "w-[18px]",
        "min-w-[18px]",
      ],
    },
  },
});

export const checkboxIndicatorSizes = cva([], {
  variants: {
    size: {
      [Sizes.Enum["small-200"]]: [cn("text-[0.625em]")],
      [Sizes.Enum["small-100"]]: [cn("text-[0.75em]")],
      [Sizes.Enum.base]: [cn("text-[0.875em]")],
      [Sizes.Enum["large-100"]]: [cn("text-[1em]")],
    },
  },
});
