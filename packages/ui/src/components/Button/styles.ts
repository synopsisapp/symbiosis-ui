import type { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";

export const sharedButtonStyles = cn(
  "m-0 flex items-center relative",
  "cursor-pointer outline-hidden transition-all",
  "rounded-[var(--symbiosis-btn-border-radius)]",
  'before:content-[""] before:absolute',
  "before:top-[calc(-1*var(--symbiosis-btn-focus-ring-size))] before:left-[calc(-1*var(--symbiosis-btn-focus-ring-size))]",
  "before:w-[calc(100%+calc(var(--symbiosis-btn-focus-ring-size)*2))] before:h-[calc(100%+calc(var(--symbiosis-btn-focus-ring-size)*2))]",
  "before:border-2 before:border-solid before:border-[var(--symbiosis-btn-focus-ring)]",
  "before:rounded-[var(--symbiosis-btn-focus-ring-radius)]",
  "before:opacity-0 before:scale-[0.9] before:transition-all before:duration-150",
  "focus:before:opacity-100 focus:before:scale-100",
  "focus-within:before:opacity-100 focus-within:before:scale-100",
  "user-select-none group",
);

export const iconSizeToPx: Record<Sizes, number> = {
  "small-200": 12,
  "small-100": 14,
  base: 16,
  "large-100": 18,
};
