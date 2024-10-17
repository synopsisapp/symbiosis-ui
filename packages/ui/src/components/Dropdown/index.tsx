import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Icon } from "../Icon";

import { StopPropagation } from "../StopPropagation";
import { Text } from "../Text";
import { cn } from "../../utils/cn";
import type {
  DropdownRootProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownGroupProps,
  DropdownMenuLabelProps,
  DropdownSimpleItemProps,
  DropdownSeparatorProps,
} from "./types";

import {
  sharedDropdownContentStyles,
  sharedDropdownTriggerStyles,
  sharedDropdownItemStyles,
  sharedDropdownGroupStyles,
} from "./styles";

const DropdownRoot = ({ children }: DropdownRootProps) => <DropdownMenu.Root>{children}</DropdownMenu.Root>;

DropdownRoot.displayName = "DropdownRoot";

const DropdownTrigger = ({ children, isDisabled, className, asChild }: DropdownTriggerProps) => (
  <DropdownMenu.Trigger disabled={isDisabled} className={cn(sharedDropdownTriggerStyles, className)} asChild={asChild}>
    {children}
  </DropdownMenu.Trigger>
);

DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = ({ children, side, className }: DropdownContentProps) => {
  const contentClasses = cn(sharedDropdownContentStyles, className);

  const shadowsOffset = 5;

  return (
    <DropdownMenu.Content className={contentClasses} side={side} sideOffset={shadowsOffset} avoidCollisions>
      {children}
    </DropdownMenu.Content>
  );
};

DropdownContent.displayName = "DropdownContent";

const DropdownItem = ({ children, onSelect, isDisabled, className }: DropdownItemProps) => (
  <StopPropagation>
    <DropdownMenu.Item onSelect={onSelect} className={cn(sharedDropdownItemStyles, className)} disabled={isDisabled}>
      {children}
    </DropdownMenu.Item>
  </StopPropagation>
);

DropdownItem.displayName = "DropdownItem";

const DropdownGroup = ({ children, label, className }: DropdownGroupProps) => {
  return (
    <DropdownMenu.Group className={cn(sharedDropdownGroupStyles, className)}>
      {label && (
        <DropdownMenu.Label className={cn("flex items-center m-0 p-0.5 cursor-default text-inherit", className)}>
          <Text variant="body-small-100" noTranslations weight="bold-100" className="text-inherit">
            {label}
          </Text>
        </DropdownMenu.Label>
      )}
      {children}
    </DropdownMenu.Group>
  );
};

DropdownGroup.displayName = "DropdownGroup";

export const DropdownSeparator = ({ className }: DropdownSeparatorProps) => (
  <DropdownMenu.Separator className={cn("-mx-1 my-1 h-px bg-slate-100", className)} />
);

DropdownSeparator.displayName = "DropdownSeparator";

export const DropdownMenuLabel = ({ label, className }: DropdownMenuLabelProps) => {
  return (
    <>
      <DropdownMenu.Label className={cn("flex items-center m-0 p-1 cursor-default text-slate-600", className)}>
        <Text variant="body-small-200" noTranslations weight="bold-100" className="m-0 text-inherit">
          {label}
        </Text>
      </DropdownMenu.Label>
      <DropdownSeparator />
    </>
  );
};

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownSimpleItem = ({ text, icon, onSelect, isDisabled, className }: DropdownSimpleItemProps) => {
  return (
    <DropdownItem
      onSelect={onSelect}
      isDisabled={isDisabled}
      className={cn("text-slate-600", { "gap-2 px-2": !!icon }, className)}
    >
      {icon && (
        <div className="flex items-center text-inherit">
          <Icon name={icon} size={"small-200"} />
        </div>
      )}
      <Text variant="body-small-200" noTranslations className="!my-0.5 !mx-0 text-inherit">
        {text}
      </Text>
    </DropdownItem>
  );
};

DropdownSimpleItem.displayName = "DropdownSimpleItem";

export const Dropdown = {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Root: DropdownRoot,
  Group: DropdownGroup,
  Separator: DropdownSeparator,
  MenuLabel: DropdownMenuLabel,
  SimpleItem: DropdownSimpleItem,
  Portal: DropdownMenu.Portal,
};
