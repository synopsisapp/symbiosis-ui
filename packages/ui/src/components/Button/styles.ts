import type { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";

export const sharedButtonStyles = cn(
  "m-0 flex items-center relative",
  'cursor-pointer outline-hidden transition-all rounded-[8px] before:content-[""] before:absolute',
  "before:top-[-4px] before:left-[-4px] before:w-[calc(100%+8px)] before:h-[calc(100%+8px)]",
  "before:border-2 before:border-solid before:border-mainColors-dark-100 before:rounded-[11px]",
  "before:opacity-0 before:scale-[0.9] before:transition-all before:duration-150 outline-hidden",
  "focus:before:opacity-100 focus:before:scale-100 focus-within:before:opacity-1",
  "focus-within:before:scale-100 user-select-none group",
);


export const iconSizeToPx: Record<Sizes, number> = {
  "small-200": 12,
  "small-100": 14,
  base: 16,
  "large-100": 18,
};

