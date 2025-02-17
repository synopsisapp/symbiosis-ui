import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { input, inputLabel } from "../sharedStyles";
import type { TextFieldProps } from "./types";

const TextField = React.forwardRef(
  (
    {
      error,
      required,
      value,
      hint,
      placeholder,
      icon,
      disabled,
      onChange,
      onBlur,
      defaultValue,
      name,
      size = "base",
      labelWeight,
      id,
      label,
      className,
      onFocus,
    }: TextFieldProps,
    ref,
  ) => {
    const formId = id ?? label ?? "";
    const innerRef = React.useRef<HTMLInputElement>(null);

    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-1 flex-col gap-1", className)}>
        {label && (
          <label
            htmlFor={formId}
            data-symbiosis-textfield="label"
            className={cn(
              inputLabel({
                size,
                weight: labelWeight,
              }),
              "m-0",
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500 text-sm">*</span>}
          </label>
        )}
        <div className="relative flex flex-1 items-center gap-1">
          <div className={cn("flex-1", "flex")}>
            {icon && (
              <Icon
                data-symbiosis-textfield="icon"
                name={icon}
                className={cn(
                  "-translate-y-1/2 absolute top-1/2 left-2 text-slate-500",
                )}
                size="small-200"
              />
            )}
            <input
              data-symbiosis-textfield="field"
              id={formId}
              name={name}
              className={cn(
                input({
                  size,
                  variant: hasError ? "error" : "default",
                }),
                "flex-1",
                icon && "pl-6",
                className,
              )}
              ref={(ref as React.RefObject<HTMLInputElement>) ?? innerRef}
              defaultValue={defaultValue}
              placeholder={placeholder}
              value={value}
              aria-label={id}
              disabled={disabled}
              required={required}
              onFocus={onFocus}
              onChange={(e) => {
                onChange?.(e.target.value);
              }}
              onBlur={(e) => {
                onBlur?.(e.target.value);
              }}
            />
          </div>
        </div>
        {hasError && (
          <div
            className="flex items-center gap-1"
            data-symbiosis-textfield="error"
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
            data-symbiosis-textfield="hint"
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
  },
);

TextField.displayName = "TextField";

export { TextField };
