import type { IconProps } from "../Icon/types";
import type { Sizes } from "../../designSystemTokens";

export type NumberFieldProps = {
  label?: string;
  error?: string;
  required?: boolean;
  value?: number;
  hint?: string;
  placeholder?: string;
  icon?: IconProps["name"];
  disabled?: boolean;
  onChange?: (value?: number) => void;
  onBlur?: (value?: number) => void;
  name?: string;
  defaultValue?: number;
  size?: Sizes;
  id?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};
