import type { Sizes } from "../../designSystemTokens";

export type CheckboxProps = {
  size?: Sizes;
  onChange?: (checked: boolean) => void;
  defaultValue?: boolean;
  value?: boolean;
  indeterminate?: boolean;
  id?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};
 