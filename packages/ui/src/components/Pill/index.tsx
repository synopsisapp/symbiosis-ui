import { cn } from "../../utils/cn";
import type { PillProps } from "./types";
import { pillVariants } from "./styles";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { StopPropagation } from "../StopPropagation";

export const Pill = ({
  className,
  variant = "primary",
  tone = "default",
  size = "base",
  label,
  leftIcon,
  onClose,
  isRounded = true,
}: PillProps) => {
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

  const iconSize = (() => {
    switch (size) {
      case "small-200":
        return "small-100";
      case "small-100":
        return "small-100";
      default:
        return "base";
    }
  })();

  return (
    <div
      className={cn(
        pillVariants({ variant, tone, size }),
        {
          "rounded-lg": !isRounded,
        },
        className,
      )}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      <Text variant={textVariant} className="text-inherit my-0">
        {label}
      </Text>
      {onClose && (
        <StopPropagation>
          <IconButton
            icon="symbiosis-x"
            className="w-auto h-auto min-w-0 min-h-0"
            isCircle
            tone={tone}
            size={size}
            onPress={onClose}
          />
        </StopPropagation>
      )}
    </div>
  );
};
