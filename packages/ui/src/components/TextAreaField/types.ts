import type { IconProps } from "../Icon/types";

export type TextAreaFieldProps = {
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  hint?: string;
  placeholder?: string;
  icon?: IconProps["name"];
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  name?: string;
  defaultValue?: string;
  rows?: number;
  id?: string;
  className?: string;
};
