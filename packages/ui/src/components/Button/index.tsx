import * as React from "react";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import type { ButtonProps } from "./types";
import { button, iconSizeToTailwind } from "./styles";
import { Text } from "../Text";
import { cn } from "../../utils/cn";

export const Button = React.forwardRef(
  (
    {
      onPress,
      label,
      isDisabled = false,
      variant = "primary",
      size = "base",
      leftIcon,
      rightIcon,
      isLoading = false,
      type = "button",
      renderAs = "button",
      layout = "normal",
      className,
      iconClassName,
      form,
      tone = "default",
      ...restProps
    }: ButtonProps,
    ref,
  ) => {
    const [buttonWidth, setButtonWidth] = React.useState<number | null>(null);
    const buttonRef = React.useRef<HTMLElement>(null);

    // biome-ignore lint: this dependency array uses more dependencies than necessary as we need to force it to rerun
    React.useEffect(() => {
      if (buttonRef.current && !isLoading) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    }, [isLoading, label, leftIcon, rightIcon, size]);

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

    const textVariant = (() => {
      switch (size) {
        case "small-200":
          return "body-small-200";
        case "small-100":
          return "body-small-100";
        case "base":
          return "body-base";
        case "large-100":
          return "body-large-100";
        default:
          return "body-base";
      }
    })();

    return (
      <ButtonComponent
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          if (isDisabled || isLoading) {
            return;
          }
          onPress?.(e);
        }}
        disabled={isDisabled}
        type={type}
        ref={(el: HTMLElement | null) => {
          // @ts-ignore
          buttonRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        tabIndex={0}
        form={form}
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
          className,
        )}
        style={isLoading && buttonWidth ? { width: `${buttonWidth}px` } : undefined}
        {...restProps}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
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
              variant={variant === "primary" ? "primary" : tone === "default" ? "secondary" : "currentColor"}
            />
          </div>
        ) : (
          <>
            {leftIcon && (
              <div className={cn(iconSizeToTailwind[size], iconClassName)}>
                <Icon name={leftIcon} size="font" />
              </div>
            )}
            <Text noTranslations variant={textVariant} className={cn("whitespace-nowrap", "text-inherit")}>
              {label}
            </Text>
            {rightIcon && (
              <div className={cn(iconSizeToTailwind[size], iconClassName)}>
                <Icon name={rightIcon} size="font" />
              </div>
            )}
          </>
        )}
      </ButtonComponent>
    );
  },
);
