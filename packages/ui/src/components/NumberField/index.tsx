import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Text } from "../Text";
import { inputLabel } from "../sharedStyles";
import { input, inputWrapper } from "./styles";
import type { NumberFieldProps } from "./types";

export const NumberField = ({
  error,
  required,
  value,
  hint,
  placeholder,
  disabled,
  onChange,
  min,
  max,
  step = 1,
  icon,
  defaultValue,
  label,
  name,
  id,
  size = "base",
  labelWeight,
  onBlur,
  className,
}: NumberFieldProps) => {
  const formId = id ?? label ?? "";
  const ref = React.useRef<HTMLInputElement>(null);

  const increment = () => {
    if (disabled) {
      return;
    }

    if (ref.current) {
      const newValue = Number(ref.current.value) + step;

      if (max !== undefined && newValue > max) {
        return;
      }

      onChange?.(newValue);
      ref.current.value = String(newValue);
    }
  };

  const decrement = () => {
    if (disabled) {
      return;
    }

    if (ref.current) {
      const newValue = Number(ref.current.value) - step;
      if (min !== undefined && newValue < min) {
        return;
      }

      onChange?.(newValue);
      ref.current.value = String(newValue);
    }
  };

  const hasError = Boolean(error);

  return (
    <div
      className={cn("flex w-full flex-col gap-1", className)}
      onBlur={() => {
        const value = ref.current?.value
          ? Number(ref.current?.value)
          : undefined;

        if (onBlur && value !== undefined) {
          onBlur(value);
        }
      }}
    >
      {label && (
        <label
          data-symbiosis-numberfield="label"
          htmlFor={formId}
          className={cn(inputLabel({ size, weight: labelWeight }), "m-0")}
        >
          {label}
        </label>
      )}
      <div className="relative flex w-full items-center gap-1">
        <div
          data-symbiosis-numberfield="wrapper"
          className={cn(
            inputWrapper({
              size: "base",
              variant: hasError ? "error" : "default",
            }),
            "group w-full",
          )}
        >
          <div
            data-symbiosis-numberfield="number-field"
            className={cn(
              input({
                size: "base",
                variant: hasError ? "error" : "default",
              }),
              "text-center",
              "bg-white",
              "px-0.5 py-0",
            )}
          >
            <IconButton
              data-symbiosis-numberfield="decrement-button"
              icon="symbiosis-minus"
              onPress={() => decrement()}
              variant="ghost"
              tone="monochrome-dark"
              size="small-100"
              isDisabled={disabled}
              className={cn(
                "focus:before:border-none",
                icon ? "left-6" : "left-0",
              )}
            />
            {icon && (
              <Icon
                data-symbiosis-numberfield="icon"
                name={icon}
                className="-translate-y-1/2 absolute top-1/2 left-2 z-10 text-gray-base"
                size="small-200"
              />
            )}
            <input
              id={formId}
              data-symbiosis-numberfield="input"
              name={name}
              className="hide-internal-input-elements h-full w-full text-center outline-hidden [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              ref={ref}
              defaultValue={defaultValue}
              placeholder={placeholder}
              value={value}
              aria-label={id}
              disabled={disabled}
              required={required}
              min={min}
              max={max}
              inputMode="numeric"
              pattern="\d*"
              onChange={(e) => {
                const number = Number(e.target.value);

                if (Number.isNaN(number)) {
                  return;
                }

                if (min !== undefined && number < min) {
                  onChange?.(min);
                  e.target.value = String(min);
                  return;
                }

                if (max !== undefined && number > max) {
                  onChange?.(max);
                  e.target.value = String(max);
                  return;
                }

                onChange?.(number);
              }}
            />
            <IconButton
              data-symbiosis-numberfield="increment-button"
              icon="symbiosis-plus"
              onPress={() => increment()}
              variant="ghost"
              tone="monochrome-dark"
              size="small-100"
              isDisabled={disabled}
              className="focus:before:border-none"
            />
          </div>
        </div>
      </div>
      {hasError && (
        <div
          className="flex items-center gap-1"
          data-symbiosis-numberfield="error"
        >
          <Icon
            name="symbiosis-exclamation-circle"
            size="small-200"
            className="text-red-600"
          />
          <Text
            noTranslations
            variant="body-small-200"
            className="m-0 text-red-600"
          >
            {error}
          </Text>
        </div>
      )}
      {!hasError && hint && (
        <div
          className="flex items-center gap-1 text-slate-400"
          data-symbiosis-numberfield="hint"
        >
          <Icon
            name="symbiosis-exclamation-circle"
            size="small-200"
            className="text-inherit"
          />
          <Text
            noTranslations
            variant="body-small-200"
            className="m-0 text-inherit"
          >
            {hint}
          </Text>
        </div>
      )}
    </div>
  );
};
