import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IconButton } from "../IconButton";
import { cn } from "../../utils/cn";
import { sharedPopoverStyles } from "./styles";

import type { PopoverRootProps, PopoverContentProps, PopoverTriggerProps, PopoverArrowProps } from "./types";

const PopoverRoot = ({ children, defaultOpen, onOpenChange, open }: PopoverRootProps) => {
  return (
    <PopoverPrimitive.Root modal defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      {children}
    </PopoverPrimitive.Root>
  );
};

PopoverRoot.displayName = "Popover.Root";

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(({ children, asChild }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} asChild={asChild}>
    {children}
  </PopoverPrimitive.Trigger>
));


PopoverTrigger.displayName = "Popover.Trigger";

const PopoverContent = ({
  children,
  side = "top",
  align = "start",
  className,
  closeIcon,
  tone = "monochrome-dark",
  onOpenAutoFocus,
}: PopoverContentProps) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        avoidCollisions
        side={side}
        align={align}
        className={cn(sharedPopoverStyles, className)}
        onOpenAutoFocus={onOpenAutoFocus}
      >
        {closeIcon && (
          <PopoverPrimitive.Close className="absolute top-1 right-1 focus-visible:outline-none" aria-label="Close">
            <IconButton icon={closeIcon} tone={tone} variant="ghost" size="base" className="w-4 min-w-4 h-4 min-h-4" />
          </PopoverPrimitive.Close>
        )}

        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

PopoverContent.displayName = "Popover.Content";

const PopoverArrow = ({ className }: PopoverArrowProps) => (
  <PopoverPrimitive.Arrow className={cn("fill-white", className)} />
);

PopoverArrow.displayName = "Popover.Arrow";

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
};
