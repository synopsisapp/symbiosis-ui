import type { IconProps } from "../Icon/types";
import type { Sizes } from "../../designSystemTokens";
import type { TextWeight } from "../Text/types";

export type TextFieldProps = {
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  hint?: string;
  placeholder?: string;
  icon?: IconProps["name"];
  disabled?: boolean;
  labelWeight?: TextWeight;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: () => void;
  name?: string;
  defaultValue?: string;
  size?: Sizes;
  id?: string;
  className?: string;
};
