import { cn } from "../../utils/cn";

export const sharedTooltipStyles = cn(
  "py-2 px-3 rounded-md bg-gray-700 text-white max-w-[200px]",
  "will-change-[transform,opacity]",
  "data-[state=delayed-open]:data-[side=top]:animate-slide-up-and-fade",
  "data-[state=delayed-open]:data-[side=right]:animate-slide-right-and-fade",
  "data-[state=delayed-open]:data-[side=left]:animate-slide-left-and-fade",
  "data-[state=delayed-open]:data-[side=bottom]:animate-slide-down-and-fade",
);
