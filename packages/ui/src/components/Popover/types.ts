import type {
  PopoverArrowProps as RadixPopoverArrowProps,
  PopoverContentProps as RadixPopoverContentProps,
} from "@radix-ui/react-popover";
import type { IconProps } from "../Icon/types";
import type { ButtonTone } from "../Button/types";

export type PopoverRootProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export type PopoverContentProps = {
  children?: React.ReactNode;
  asChild?: boolean;
  side?: RadixPopoverContentProps["side"];
  align?: RadixPopoverContentProps["align"];
  className?: string;
  closeIcon?: IconProps["name"];
  tone?: ButtonTone;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onFocusOutside?: (event: Event) => void;
};

export type PopoverArrowProps = RadixPopoverArrowProps & {
  className?: string;
};

export type PopoverTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
};

export type PopoverProps = {
  Root: PopoverRootProps;
  Content: PopoverContentProps;
  Trigger: PopoverTriggerProps;
  Arrow: PopoverArrowProps;
};
