
import type { IconProps } from "../Icon/types";
import type { Sizes } from "../../designSystemTokens";

export type PillProps = {
  onClose?: () => void;
  variant?: "primary" | "outline";
  tone?: "destructive" | "default";
  size: Sizes;
  label: string;
  leftIcon?: IconProps["name"];
  isRounded?: boolean;
  className?: string;
};
