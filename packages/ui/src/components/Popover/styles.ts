import { cn } from "../../utils/cn";

export const sharedPopoverStyles = cn(
  "p-5 rounded-md bg-white relative shadow-lg",
  "will-change-[transform,opacity]",
  "data-[state=delayed-open]:data-[side=top]:animate-slide-up-and-fade",
  "data-[state=delayed-open]:data-[side=right]:animate-slide-right-and-fade",
  "data-[state=delayed-open]:data-[side=left]:animate-slide-left-and-fade",
  "data-[state=delayed-open]:data-[side=bottom]:animate-slide-down-and-fade"
);
