import { cva } from "class-variance-authority";

import { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";

export const sharedSwitchStyles = cn(
  "peer inline-flex shrink-0 cursor-pointer",
  "items-center rounded-full border-2 border-slate-300",
  "transition-colors focus-visible:outline-hidden focus-visible:ring-2",
  "focus-visible:ring-ring focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "data-[state=checked]:bg-slate-700/95 data-[state=checked]:border-slate-700",
  "data-[state=unchecked]:border-slate-300 bg-slate-300 relative",
);

export const switchSizes = cva([], {
  variants: {
    size: {
      [Sizes.Enum["small-200"]]: ["h-2.5 w-5"],
      [Sizes.Enum["small-100"]]: ["h-3.5 w-7"],
      [Sizes.Enum.base]: ["h-[18px] w-9"],
      [Sizes.Enum["large-100"]]: ["h-6 w-12"],
    },
  },
});

export const thumbStyles = cva([], {
  variants: {
    size: {
      [Sizes.Enum["small-200"]]: ["w-1.5 h-1.5"],
      [Sizes.Enum["small-100"]]: ["w-2.5 h-2.5"],
      [Sizes.Enum.base]: ["w-3.5 h-3.5"],
      [Sizes.Enum["large-100"]]: ["w-5 h-5"],
    },
  },
});
