import * as React from "react";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { cn } from "../../utils/cn";
import { Text } from "../Text";
import { input, inputWrapper, inputLabel } from "./styles";
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
      className={cn("flex flex-col gap-1 w-full", className)}
      onBlur={() => {
        const value = ref.current?.value ? Number(ref.current?.value) : undefined;

        if (onBlur && value !== undefined) {
          onBlur(value);
        }
      }}
    >
      {label && (
        <label data-symbiosis-numberField="label" htmlFor={formId} className={inputLabel({ size: "small-100" })}>
          {label}
        </label>
      )}
      <div className="flex items-center gap-1 relative w-full">
        <div
          data-symbiosis-numberField="wrapper"
          className={cn(
            inputWrapper({
              size: "base",
              variant: hasError ? "error" : "default",
            }),
            "w-full group",
          )}
        >
          <div
            data-symbiosis-numberField="number-field"
            className={cn(
              input({
                size: "base",
                variant: hasError ? "error" : "default",
              }),
              "text-center",
              "bg-white",
              "py-0 px-0.5",
            )}
          >
            <IconButton
              data-symbiosis-numberField="decrement-button"
              icon="symbiosis-minus"
              onPress={() => decrement()}
              variant="ghost"
              tone="monochrome-dark"
              size="small-100"
              isDisabled={disabled}
              className="focus:before:border-none"
            />
            {icon && (
              <Icon
                data-symbiosis-numberField="icon"
                name={icon}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-grays-500"
                size="small-200"
              />
            )}
            <input
              id={formId}
              data-symbiosis-numberField="input"
              name={name}
              className="outline-none w-full h-full text-center hide-internal-input-elements"
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
              data-symbiosis-numberField="increment-button"
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
        <div className="flex gap-1 items-center" data-symbiosis-numberField="error">
          <Icon name="symbiosis-exclamation-circle" size="small-200" className="text-red-600" />
          <Text noTranslations variant="body-small-200" className="m-0 text-red-600">
            {error}
          </Text>
        </div>
      )}
      {!hasError && hint && (
        <div className="flex gap-1 items-center text-slate-400" data-symbiosis-numberField="hint">
          <Icon name="symbiosis-exclamation-circle" size="small-200" className="text-inherit" />
          <Text noTranslations variant="body-small-200" className="m-0 text-inherit">
            {hint}
          </Text>
        </div>
      )}
    </div>
  );
};
