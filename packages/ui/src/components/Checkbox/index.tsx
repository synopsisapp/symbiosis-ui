import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Icon } from "../Icon/index";
import { cn } from "../../utils/cn";
import { sharedButtonStyles } from "../Button/styles";
import { motion } from "framer-motion";
import { checkboxSizes, checkboxIndicatorSizes, sharedCheckboxStyles } from "./styles";
import type { CheckboxProps } from "./types";

const Checkbox = ({
  size = "base",
  defaultValue,
  value,
  onChange,
  indeterminate,
  id,
  name,
  disabled,
  required,
  className,
}: CheckboxProps) => {
  const isChecked = indeterminate ? "indeterminate" : value;
  const isControlled = value !== undefined;

  return (
    <CheckboxPrimitive.Root
      disabled={disabled}
      required={required}
      defaultChecked={defaultValue}
      checked={isChecked}
      onCheckedChange={onChange}
      id={id ?? name}
      name={name}
      className={cn(sharedButtonStyles, sharedCheckboxStyles, checkboxSizes({ size }), className)}
    >
      <CheckboxPrimitive.Indicator>
        <motion.div
          className={cn(
            checkboxIndicatorSizes({ size }),
            checkboxSizes({ size }),
            "bg-current rounded flex items-center justify-center",
          )}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.15,
          }}
        >
          {!isControlled && !indeterminate && <Icon name="symbiosis-check" className="text-white" />}
          {isControlled && value && !indeterminate && <Icon name="symbiosis-check" className="text-white" />}
          {indeterminate && <Icon name="symbiosis-minus" className="text-white" />}
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

Checkbox.displayName = "Checkbox";

export { Checkbox };
