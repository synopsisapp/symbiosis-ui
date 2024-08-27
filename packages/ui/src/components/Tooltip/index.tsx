import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Text } from "../Text";
import { cn } from "../../utils/cn";
import type {
  TooltipRootProps,
  TooltipContentProps,
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

const classnames = cn(
  "py-2 px-3 rounded-md bg-gray-700 text-white max-w-[200px]",
  "will-change-[transform,opacity]",
  "data-[state=delayed-open]:data-[side=top]:animate-slide-up-and-fade",
  "data-[state=delayed-open]:data-[side=right]:animate-slide-right-and-fade",
  "data-[state=delayed-open]:data-[side=left]:animate-slide-left-and-fade",
  "data-[state=delayed-open]:data-[side=bottom]:animate-slide-down-and-fade"
);

export const TooltipContent = ({
  children,
  label,
  className,
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={5}
        forceMount
        className={cn(classnames, className)}
      >
        {label ? (
          <Text variant="body-small-200" noTranslations className="m-0 p-0">
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
