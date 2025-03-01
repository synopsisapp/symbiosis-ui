import type { Command as CommandPrimitive } from "cmdk";

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ComboboxProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  options: Option[];
  onValuesChange: (selectedOptions: Option[]) => void;
  className?: string;
  noResultsLabel?: string;
  placeholder?: string;
  allowCustomValues?: boolean;
  addNewOptionLabel?: string;
  skipComposition?: boolean;
  singleSelect?: boolean;
};
