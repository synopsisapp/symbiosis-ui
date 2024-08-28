import type {
  PopoverArrowProps as RadixPopoverArrowProps,
  PopoverContentProps as RadixPopoverContentProps,
} from "@radix-ui/react-popover";
import type { IconProps } from "../Icon/types";
import { ButtonTone } from "../Button/types";

export type PopoverRootProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type PopoverContentProps = {
  children?: React.ReactNode;
  side?: RadixPopoverContentProps["side"];
  className?: string;
  closeIcon?: IconProps["name"];
  tone?: ButtonTone;
};

export type PopoverArrowProps = RadixPopoverArrowProps & {
  className?: string;
};

export type PopoverTriggerProps = {
  children: React.ReactNode;
};

export type PopoverProps = {
  Root: PopoverRootProps;
  Content: PopoverContentProps;
  Trigger: PopoverTriggerProps;
  Arrow: PopoverArrowProps;
};
