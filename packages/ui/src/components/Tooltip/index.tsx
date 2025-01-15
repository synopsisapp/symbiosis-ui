import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Text } from "../Text";
import { cn } from "../../utils/cn";
import type { TooltipRootProps, TooltipContentProps, TooltipTriggerProps } from "./types";
import { sharedTooltipStyles } from "./styles";

export const TooltipRoot = ({ children, defaultOpen, open, onOpenChange }: TooltipRootProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
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
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
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
          <Text variant="body-small-200" noTranslations className="m-0 p-0 text-inherit">
            {label}
          </Text>
        ) : (
          children
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
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
};
