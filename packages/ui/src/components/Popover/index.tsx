import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "../../utils/cn";
import { IconButton } from "../IconButton";
import { sharedPopoverStyles } from "./styles";

import type {
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverRootProps,
  PopoverTriggerProps,
} from "./types";

const PopoverRoot = ({
  children,
  defaultOpen,
  onOpenChange,
  open,
  modal = true,
}: PopoverRootProps) => {
  return (
    <PopoverPrimitive.Root
      modal={modal}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </PopoverPrimitive.Root>
  );
};

PopoverRoot.displayName = "Popover.Root";

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild }, ref) => (
    <PopoverPrimitive.Trigger ref={ref} asChild={asChild}>
      {children}
    </PopoverPrimitive.Trigger>
  ),
);

PopoverTrigger.displayName = "Popover.Trigger";

const PopoverContent = ({
  children,
  asChild,
  side = "top",
  sideOffset = 5,
  align = "start",
  alignOffset = 0,
  className,
  onOpenAutoFocus,
  onFocusOutside,
  onCloseAutoFocus,
  skipComposition = false,
}: PopoverContentProps) => {
  const ContentWrapper = skipComposition
    ? React.Fragment
    : PopoverPrimitive.Portal;

  return (
    <ContentWrapper>
      <PopoverPrimitive.Content
        avoidCollisions
        asChild={asChild}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(sharedPopoverStyles, className)}
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onFocusOutside={onFocusOutside}
      >
        {children}
      </PopoverPrimitive.Content>
    </ContentWrapper>
  );
};

PopoverContent.displayName = "Popover.Content";

const PopoverArrow = ({ className }: PopoverArrowProps) => (
  <PopoverPrimitive.Arrow className={cn("fill-white", className)} />
);

PopoverArrow.displayName = "Popover.Arrow";

const PopoverClose = ({
  icon = "symbiosis-x",
  tone = "monochrome-dark",
  className,
}: PopoverCloseProps) => (
  <PopoverPrimitive.Close
    className={cn(
      "absolute top-2 right-2 focus-visible:outline-hidden",
      className,
    )}
    aria-label="Close"
  >
    <IconButton
      icon={icon}
      tone={tone}
      variant="ghost"
      size="base"
      className="h-4 min-h-4 w-4 min-w-4"
    />
  </PopoverPrimitive.Close>
);

PopoverClose.displayName = "Popover.Close";

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Close: PopoverClose,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Portal: PopoverPrimitive.Portal,
};
