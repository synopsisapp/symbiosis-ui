import type { ButtonVariant, BaseProps } from "../Button/types";
import type { IconProps } from "../Icon/types";

export type SplitButtonItemProps = {
  text: string;
  content?: React.ReactNode;
  icon?: IconProps["name"];
  onSelect?: () => void;
  wrapperClassName?: string;
  isSeparated?: boolean;
  isSectionTitle?: boolean;
};

export type SplitButtonProps = Omit<BaseProps, "renderAs" | "variant"> & {
  items: SplitButtonItemProps[];
  variant: Exclude<ButtonVariant, "link">;
};
