import z from 'zod';
import * as React from 'react';
import type { IconProps } from '../Icon/types';
import { Sizes } from '../../designSystemTokens';

export const ButtonVariant = z.enum(['primary', 'outline', 'ghost', 'link']);
export type ButtonVariant = z.infer<typeof ButtonVariant>;

export const ButtonTone = z.enum(['default', 'destructive', 'monochrome-light', 'monochrome-dark']);
export type ButtonTone = z.infer<typeof ButtonTone>;

export const ButtonLayout = z.enum(['normal', 'fullwidth', 'inline']);
export type ButtonLayout = z.infer<typeof ButtonLayout>;

export const ButtonRenderAs = z.enum(['button', 'a', 'div']);
export type ButtonRenderAs = z.infer<typeof ButtonRenderAs>;

export type BaseProps = {
  label: string;
  onPress?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  layout?: ButtonLayout;
  size?: Sizes;
  isDisabled?: boolean;
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
  isLoading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  renderAs?: ButtonRenderAs;
  className?: string;
  form?: string;
};

type AsLinkProps = {
  renderAs: 'a';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

type AsDivProps = {
  renderAs: 'div';
};

type AsButtonProps = {
  renderAs?: 'button';
};

export type ButtonProps = BaseProps & (AsLinkProps | AsDivProps | AsButtonProps);
