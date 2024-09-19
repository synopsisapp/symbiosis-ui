import type { Sizes } from "../../designSystemTokens";

export type SwitchProps = {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: Sizes;
  value?: boolean;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};
