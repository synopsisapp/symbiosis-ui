import z from "zod";
import { Sizes } from "../../designSystemTokens";
import {
  ButtonVariant,
  ButtonTone,
  ButtonRenderAs,
  ButtonLayout,
} from "../Button/types";
import { IconProps } from "../Icon/types";

export const IconButtonVariant = ButtonVariant.exclude(["link"]);
export type IconButtonVariant = z.infer<typeof IconButtonVariant>;

type BaseProps = {
  onPress?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  variant?: IconButtonVariant;
  tone?: ButtonTone;
  size?: Sizes;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  isCircle?: boolean;
  renderAs?: ButtonRenderAs;
  icon?: IconProps["name"];
  value?: React.ReactNode;
  layout?: ButtonLayout;
  classname?: string;
};

type LinkProps = {
  renderAs: "a";
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

type DivProps = {
  renderAs: "div";
};

type ButtonProps = {
  renderAs?: "button";
};

export type IconButtonProps = BaseProps & (LinkProps | DivProps | ButtonProps);
