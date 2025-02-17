import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import type { IconProps } from "../Icon/types";

export type DropdownRootProps = {
  children: React.ReactNode;
};

export type DropdownTriggerProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  asChild?: boolean;
};

export type DropdownContentProps = {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  className?: string;
  skipComposition?: boolean;
};

export type DropdownItemProps = {
  children: React.ReactNode;
  onSelect?: (event: Event) => void;
  isDisabled?: boolean;
  className?: string;
};

export type DropdownGroupProps = {
  children: React.ReactNode;
  label?: string;
  className?: string;
};

export type DropdownMenuLabelProps = {
  label: string;
  className?: string;
};

export type DropdownSeparatorProps = { className?: string };

export type DropdownSimpleItemProps = {
  text: string;
  icon?: IconProps["name"];
  onSelect?: (event: Event) => void;
  isDisabled?: boolean;
  className?: string;
};

export type DropdownProps = {
  Root: DropdownRootProps;
  Trigger: DropdownTriggerProps;
  Content: DropdownContentProps;
  Item: DropdownItemProps;
  Group: DropdownGroupProps;
  MenuLabel: DropdownMenuLabelProps;
  SimpleItem: DropdownSimpleItemProps;
  Separator: DropdownSeparatorProps;
};
