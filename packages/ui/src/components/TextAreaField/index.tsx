import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { input, inputLabel } from "../sharedStyles";
import type { TextAreaFieldProps } from "./types";

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(({
  error,
  required,
  value,
  hint,
  placeholder,
  icon,
  disabled,
  onChange,
  defaultValue,
  name,
  rows = 3,
  id,
  label,
  onBlur,
  size = "base",
  labelWeight,
  className,
}: TextAreaFieldProps, ref) => {
  const formId = id ?? label ?? "";

  const hasError = Boolean(error);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={formId}
          data-symbiosis-textareafield="label"
          className={cn(inputLabel({ size, weight: labelWeight }), "m-0")}
        >
          {label}
        </label>
      )}
      <div className="relative flex flex-1 items-center gap-1">
        <div className="flex h-auto flex-1">
          {icon && (
            <Icon
              data-symbiosis-textareafield="icon"
              name={icon}
              className="absolute top-3 left-2 z-10 translate-y-[5px] text-gray-base"
              size="small-200"
            />
          )}
          <textarea
            data-symbiosis-textareafield="input"
            id={formId}
            name={name}
            className={cn(
              input({
                size: "base",
                variant: hasError ? "error" : "default",
              }),
              "h-auto",
              "flex-1",
              icon && "pl-6",
            )}
            ref={ref}
            defaultValue={defaultValue}
            placeholder={placeholder}
            value={value}
            aria-label={id}
            disabled={disabled}
            required={required}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
            onBlur={(e) => {
              onBlur?.(e.target.value);
            }}
            rows={rows}
          />
        </div>
      </div>
      {hasError && (
        <div
          className="flex items-center gap-1"
          data-symbiosis-textareafield="error"
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
          data-symbiosis-textareafield="hint"
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
});
