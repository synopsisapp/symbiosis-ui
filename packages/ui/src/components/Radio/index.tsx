import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { motion } from "framer-motion";

import { Text } from "../Text";
import { sharedButtonStyles } from "../Button/styles";
import type { RadioDotProps, RadioRootProps, RadioItemProps } from "./types";
import { cn } from "../../utils/cn";
import { radioItemCva, sharedRadioItemStyles } from "./styles";

const RadioRoot = ({
  name,
  id,
  required,
  children,
  onChange,
  defaultValue,
  className,
  orientation = "vertical",
}: RadioRootProps) => {
  return (
    <RadioGroupPrimitive.Root
      name={name}
      required={required}
      onValueChange={onChange}
      defaultValue={defaultValue}
      id={id ?? name}
      orientation={orientation}
      className={cn(
        "flex flex-col gap-3 items-start",
        {
          "flex-row": orientation === "horizontal",
        },
        className,
      )}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
};

RadioRoot.displayName = "RadioRoot";

const RadioItemStyledPrimitive = ({ value, size, required, className, disabled = false }: RadioDotProps) => {
  return (
    <RadioGroupPrimitive.Item
      value={value}
      disabled={disabled}
      id={value}
      className={cn(sharedButtonStyles, sharedRadioItemStyles, radioItemCva({ size }), className)}
      required={required}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <motion.div
          className={cn("aspect-square rounded-full bg-current", radioItemCva({ size }))}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.6, opacity: 1 }}
          transition={{
            duration: 0.15,
          }}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

const RadioItem = ({ value, size = "base", label, className, disabled, required }: RadioItemProps) => {
  return (
    <div className="flex items-center gap-1">
      <RadioItemStyledPrimitive
        value={value}
        size={size}
        className={className}
        disabled={disabled}
        required={required}
      />
      {!!label && (
        <label
          htmlFor={value}
          className="flex gap-3 items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          <Text
            noTranslations
            variant={(() => {
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
            })()}
            className="m-0"
          >
            {label}
          </Text>
        </label>
      )}
    </div>
  );
};

RadioItem.displayName = "RadioItem";

export const Radio = {
  Root: RadioRoot,
  Item: RadioItem,
};
