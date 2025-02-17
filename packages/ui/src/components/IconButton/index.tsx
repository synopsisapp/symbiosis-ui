import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import { button, iconButton, iconSizeToTailwind } from "../sharedStyles";
import type { IconButtonProps } from "./types";

export const IconButton = React.forwardRef(
  (
    {
      onPress,
      variant = "primary",
      size = "base",
      isDisabled = false,
      isLoading = false,
      type = "button",
      isCircle = false,
      renderAs = "button",
      icon,
      value,
      layout = "normal",
      className,
      tone = "default",
      ...restProps
    }: IconButtonProps,
    ref,
  ) => {
    const [buttonWidth, setButtonWidth] = React.useState<number | null>(null);
    const buttonRef = React.useRef<HTMLElement>(null);

    // biome-ignore lint: this dependency array uses more dependencies than necessary as we need to force it to rerun
    React.useEffect(() => {
      if (buttonRef.current && !isLoading) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    }, [isLoading, icon, value, size]);

    const ButtonComponent = (() => {
      switch (renderAs) {
        case "a":
          return "a";
        case "div":
          return "div";
        default:
          return "button";
      }
    })();

    return (
      <ButtonComponent
        disabled={isDisabled}
        type={type}
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (isDisabled || isLoading) {
            return;
          }
          onPress?.(e);
        }}
        ref={(el: HTMLElement | null) => {
          // @ts-ignore
          buttonRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        className={cn(
          cn(
            button({
              variant,
              layout,
              size,
              tone,
              isDisabled: isDisabled,
              isLoading: isLoading,
            }),
          ),
          iconButton({
            size,
            shape: isCircle ? "circle" : "square",
          }),
          className,
        )}
        style={
          isLoading && buttonWidth
            ? { width: `${buttonWidth}px`, height: `${buttonWidth}px` }
            : undefined
        }
        {...restProps}
      >
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner
              isLoading
              size={(() => {
                switch (size) {
                  case "small-200":
                    return "small-100";
                  case "small-100":
                    return "small-100";
                  case "base":
                    return "base";
                  case "large-100":
                    return "large-100";
                  default:
                    return "base";
                }
              })()}
              variant={
                variant === "primary"
                  ? "primary"
                  : tone === "default"
                    ? "secondary"
                    : "currentColor"
              }
            />
          </div>
        ) : (
          <>
            {icon && (
              <div className={cn(iconSizeToTailwind[size])}>
                <Icon name={icon} size="font" />
              </div>
            )}
            {value && (
              <Text
                noTranslations
                variant="body-small-100"
                className={cn("text-inherit")}
              >
                {value}
              </Text>
            )}
          </>
        )}
      </ButtonComponent>
    );
  },
);
