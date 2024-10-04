import type { IconProps } from "../Icon/types";
import type { Sizes } from "../../designSystemTokens";

export type TextFieldProps = {
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
  size?: Sizes;
  id?: string;
  className?: string;
};
