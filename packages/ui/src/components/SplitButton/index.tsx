import { Fragment } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Dropdown, DropdownMenuLabel, DropdownSimpleItem } from "../Dropdown";
import { IconButton } from "../IconButton";
import { iconButtonLeftBorderIconVariant } from "./styles";
import type { SplitButtonProps } from "./types";

export const SplitButton = ({
  label,
  variant = "primary",
  size = "base",
  leftIcon,
  rightIcon,
  layout = "normal",
  type = "button",
  className,
  tone = "default",
  items,
  ...restProps
}: SplitButtonProps) => {
  return (
    <div className="flex">
      <Button
        variant={variant}
        layout={layout}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        type={type}
        className={cn("rounded-tr-none rounded-br-none", className)}
        tone={tone}
        label={label}
        {...restProps}
      />
      <Dropdown.Root>
        <Dropdown.Trigger>
          <IconButton
            icon="symbiosis-chevron-down"
            variant={variant}
            size={size}
            isDisabled={restProps.isDisabled}
            tone={tone}
            renderAs="div"
            className={cn(
              "rounded-tl-none rounded-bl-none border-l",
              iconButtonLeftBorderIconVariant({
                variant,
                tone,
              }),
            )}
          />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content>
            {items.map((item) => {
              return (
                <Fragment key={`item-${item.text}`}>
                  {item.isSeparated && <Dropdown.Separator />}
                  {item.isSectionTitle ? (
                    <DropdownMenuLabel
                      key={`label-${item.text}`}
                      label={item.text}
                    />
                  ) : (
                    <DropdownSimpleItem
                      text={item.text}
                      onSelect={() => {
                        item.onSelect?.();
                      }}
                      icon={item.icon}
                    />
                  )}
                </Fragment>
              );
            })}
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    </div>
  );
};
