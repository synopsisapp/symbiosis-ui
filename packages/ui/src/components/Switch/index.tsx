import * as SwitchPrimitives from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "../../utils/cn";
import { Text } from "../Text";
import { sharedSwitchStyles, switchSizes, thumbStyles } from "./styles";
import type { SwitchProps } from "./types";

const Switch = ({
  size = "base",
  defaultChecked = false,
  onCheckedChange,
  label,
  value,
  name,
  id,
  disabled,
  contentAlignment = "label-first",
  className,
}: SwitchProps) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  React.useEffect(() => {
    if (value !== undefined) {
      setChecked(value);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-3">
      {Boolean(label) && (
        <label
          htmlFor={label}
          className={cn(
            contentAlignment === "switch-first" ? "order-1" : undefined,
          )}
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
          >
            {label}
          </Text>
        </label>
      )}
      <SwitchPrimitives.Root
        className={cn(sharedSwitchStyles, switchSizes({ size }), className)}
        defaultChecked={defaultChecked}
        checked={value}
        onCheckedChange={(checked) => {
          setChecked(checked);
          onCheckedChange?.(checked);
        }}
        disabled={disabled}
        name={name ?? label}
        id={id ?? label}
      >
        <SwitchPrimitives.Thumb asChild>
          <motion.div
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
              restSpeed: 0.01,
              restDelta: 0.01,
            }}
            initial={{
              left: "0%",
              x: "0%",
            }}
            animate={{
              left: checked ? "100%" : "0%",
              x: checked ? "-100%" : "0%",
            }}
            className={cn(
              "pointer-events-none block rounded-full",
              "bg-white shadow-lg ring-0",
              "absolute",
              thumbStyles({ size }),
            )}
          />
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    </div>
  );
};

Switch.displayName = "Switch";

export { Switch };
