import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "../../utils/cn";
import { Text } from "../Text";
import { sharedTooltipStyles } from "./styles";
import type {
  TooltipContentProps,
  TooltipRootProps,
  TooltipTriggerProps,
} from "./types";

export const TooltipRoot = ({
  children,
  defaultOpen,
  open,
  onOpenChange,
}: TooltipRootProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={100}
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        {children}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

TooltipRoot.displayName = "Tooltip.Root";

export const TooltipContent = ({
  children,
  label,
  side = "top",
  sideOffset = 5,
  align = "center",
  alignOffset = 0,
  className,
  skipComposition = false,
}: TooltipContentProps) => {
  const ContentWrapper = skipComposition
    ? React.Fragment
    : TooltipPrimitive.Portal;

  return (
    <ContentWrapper>
      <TooltipPrimitive.Content
        avoidCollisions
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        forceMount
        className={cn(sharedTooltipStyles, className)}
      >
        {label ? (
          <Text
            variant="body-small-200"
            noTranslations
            className="m-0 p-0 text-inherit"
          >
            {label}
          </Text>
        ) : (
          children
        )}
      </TooltipPrimitive.Content>
    </ContentWrapper>
  );
};

TooltipContent.displayName = "Tooltip.Content";

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  return (
    <TooltipPrimitive.Trigger asChild>
      <div>{children}</div>
    </TooltipPrimitive.Trigger>
  );
};

TooltipTrigger.displayName = "Tooltip.Trigger";

export const Tooltip = {
  Root: TooltipRoot,
  Content: TooltipContent,
  Trigger: TooltipTrigger,
  Portal: TooltipPrimitive.Portal,
};
