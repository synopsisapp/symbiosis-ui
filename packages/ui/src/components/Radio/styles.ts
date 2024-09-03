import { cva } from "class-variance-authority";

import { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";

export const radioItemCva = cva([], {
  variants: {
    size: {
      [Sizes.Enum["small-200"]]: ["h-[10px]", "min-h-[10px]", "w-[10px]", "min-w-[10px]"],
      [Sizes.Enum["small-100"]]: ["h-3", "min-h-3", "w-3", "min-w-3"],
      [Sizes.Enum.base]: ["h-[14px]", "min-h-[14px]", "w-[14px]", "min-w-[14px]"],
      [Sizes.Enum["large-100"]]: ["h-[18px]", "min-h-[18px]", "w-[18px]", "min-w-[18px]"],
    },
  },
});

export const sharedRadioItemStyles = cn(
  "before:border-slate-800 peer",
  "flex rounded-full",
  "border border-slate-800 text-slate-700 ring-offset-background",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "items-center justify-center",
);
