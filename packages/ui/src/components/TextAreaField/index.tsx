import * as React from "react";
import { Icon } from "../Icon";
import { cn } from "../../utils/cn";
import { Text } from "../Text";

import type { TextAreaFieldProps } from "./types";
import { input, inputLabel } from "../sharedStyles";

export const TextAreaField = ({
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
}: TextAreaFieldProps) => {
  const formId = id ?? label ?? "";
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col w-full gap-1", className)}>
      {label && (
        <label
          htmlFor={formId}
          data-symbiosis-textAreaField="label"
          className={cn(inputLabel({ size, weight: labelWeight }), "m-0")}
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-1 relative flex-1">
        <div className="h-auto flex-1 flex">
          {icon && (
            <Icon
              data-symbiosis-textAreaField="icon"
              name={icon}
              className="absolute left-2 top-3 translate-y-[5px] z-10 text-grays-500"
              size="small-200"
            />
          )}
          <textarea
            data-symbiosis-textAreaField="input"
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
        <div className="flex gap-1 items-center" data-symbiosis-textAreaField="error">
          <Icon name="symbiosis-exclamation-circle" size="small-200" className="text-red-600" />
          <Text noTranslations variant="body-small-200" className="m-0 text-red-600">
            {error}
          </Text>
        </div>
      )}
      {!hasError && hint && (
        <div className="flex gap-1 items-center text-slate-400" data-symbiosis-textAreaField="hint">
          <Icon name="symbiosis-exclamation-circle" size="small-200" className="text-inherit" />
          <Text noTranslations variant="body-small-200" className="m-0 text-inherit">
            {hint}
          </Text>
        </div>
      )}
    </div>
  );
};
