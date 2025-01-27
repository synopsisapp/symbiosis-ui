import { sharedButtonStyles } from "./Button/styles";

import { cn } from "../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { Sizes } from "../designSystemTokens";

export const buttonHeightSizing = ({ size }: ButtonHeightSizingVariants) => buttonHeightSizingCva({ size });
export interface ButtonHeightSizingVariants extends VariantProps<typeof buttonHeightSizingCva> {}
export const buttonHeightSizingCva = cva([], {
  variants: {
    size: {
      "small-200": ["h-6", "min-h-[1.5rem]"],
      "small-100": ["h-7", "min-h-[1.75rem]"],
      base: ["h-8", "min-h-[2rem]"],
      "large-100": ["h-9", "min-h-[2.25rem]"],
    },
  },
});

export const button = (variants: ButtonVariants) =>
  cn(buttonCva(variants), buttonHeightSizing({ size: variants.size }));
export interface ButtonVariants extends VariantProps<typeof buttonCva> {}
const buttonCva = cva([sharedButtonStyles], {
  variants: {
    variant: {
      primary: [
        "bg-[var(--symbiosis-btn-primary-bg)]",
        "text-[var(--symbiosis-btn-primary-text)]",
        "border-[var(--symbiosis-btn-primary-bg)]",
        "border border-solid",
        "hover:bg-[var(--symbiosis-btn-primary-hover)]",
        "hover:border-[var(--symbiosis-btn-primary-hover)]",
        "active:bg-[var(--symbiosis-btn-primary-active)]",
        "active:border-[var(--symbiosis-btn-primary-active)]",
        "disabled:bg-[var(--symbiosis-btn-primary-disabled)]",
        "disabled:border-[var(--symbiosis-btn-primary-disabled)]",
      ],
      outline: [
        "bg-[var(--symbiosis-btn-outline-bg)]",
        "text-[var(--symbiosis-btn-outline-text)]",
        "border-[var(--symbiosis-btn-outline-text)]",
        "border-[1px]",
        "border-solid",
        "hover:bg-[var(--symbiosis-btn-outline-hover)]",
        "active:bg-[var(--symbiosis-btn-outline-active)]",
        "disabled:border-[var(--symbiosis-btn-outline-disabled)]",
        "disabled:text-[var(--symbiosis-btn-outline-disabled)]",
        "hover:disabled:bg-[unset]",
        "active:disabled:bg-[unset]",
      ],
      ghost: [
        "bg-[var(--symbiosis-btn-ghost-bg)]",
        "text-[var(--symbiosis-btn-ghost-text)]",
        "hover:bg-[var(--symbiosis-btn-ghost-hover)]",
        "active:bg-[var(--symbiosis-btn-ghost-active)]",
        "disabled:text-[var(--symbiosis-btn-ghost-disabled)]",
        "hover:disabled:bg-[unset]",
        "active:disabled:bg-[unset]",
        // ghost variant has no border so `before` needs to be 1px smaller on each side
        "before:w-[calc(100%+calc((var(--symbiosis-btn-focus-ring-size)-2px)*2))]",
        "before:h-[calc(100%+calc((var(--symbiosis-btn-focus-ring-size)-2px)*2))]",
        "before:top-[calc(-1*(var(--symbiosis-btn-focus-ring-size)-2px))]",
        "before:left-[calc(-1*(var(--symbiosis-btn-focus-ring-size)-2px))]",
      ],
      link: [
        "bg-[var(--symbiosis-btn-link-bg)]",
        "text-[var(--symbiosis-btn-link-text)]",
        "underline",
        "active:bg-[var(--symbiosis-btn-link-active)]",
        "disabled:text-[var(--symbiosis-btn-link-disabled)]",
        "active:disabled:bg-[unset]",
        // ghost variant has no border so `before` needs to be 1px smaller on each side
        "before:w-[calc(100%+calc((var(--symbiosis-btn-focus-ring-size)-2px)*2))]",
        "before:h-[calc(100%+calc((var(--symbiosis-btn-focus-ring-size)-2px)*2))]",
        "before:top-[calc(-1*(var(--symbiosis-btn-focus-ring-size)-2px))]",
        "before:left-[calc(-1*(var(--symbiosis-btn-focus-ring-size)-2px))]",
      ],
    },
    layout: {
      normal: [],
      fullwidth: ["w-full", "justify-center"],
      inline: [
        "whitespace-nowrap",
        "overflow-hidden",
        "inline-flex",
        "gap-1",
        "line-height-[1]",
        "vertical-align-middle",
        "min-h-auto",
        "h-auto",
        "my-0 mx-1",
        "py-0.5 px-1!",
      ],
    },
    size: {
      "small-200": ["py-0 px-1.5", "gap-1"],
      "small-100": ["py-0 px-1.5", "gap-1.5"],
      base: ["py-0 px-2", "gap-2"],
      "large-100": ["py-0 px-3", "gap-3"],
    },
    tone: {
      default: [],
      destructive: [],
      "monochrome-light": [
        "group btn-mono btn-mono-light",
        "before:border-[var(--symbiosis-btn-monochrome-light-primary-text)]",
      ],
      "monochrome-dark": [
        "group btn-mono btn-mono-dark",
        "before:border-[var(--symbiosis-btn-monochrome-dark--primary-bg)]",
        "focus:before:border-[var(--symbiosis-btn-monochrome-dark-primary-bg)]",
        "focus-within:before:border-[var(--symbiosis-btn-monochrome-dark-primary-bg)]",
      ],
    },
    isDisabled: {
      true: ["cursor-not-allowed	"],
      false: [],
    },
    isLoading: {
      true: ["cursor-wait"],
      false: [],
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      tone: "destructive",
      className: [
        "bg-[var(--symbiosis-btn-destructive-primary-bg)]",
        "text-[var(--symbiosis-btn-destructive-primary-text)]",
        "border-[var(--symbiosis-btn-destructive-primary-bg)]",
        "before:border-[var(--symbiosis-btn-destructive-primary-bg)]",
        "active:bg-[var(--symbiosis-btn-destructive-primary-active)]",
        "active:border-[var(--symbiosis-btn-destructive-primary-active)]",
        "hover:border-[var(--symbiosis-btn-destructive-primary-hover)]",
        "hover:bg-[var(--symbiosis-btn-destructive-primary-hover)]",
        "disabled:bg-[var(--symbiosis-btn-primary-disabled)]",
        "disabled:border-[var(--symbiosis-btn-primary-disabled)]",
      ],
    },
    {
      variant: "outline",
      tone: "destructive",
      className: [
        "bg-[var(--symbiosis-btn-destructive-outline-bg)]",
        "text-[var(--symbiosis-btn-destructive-outline-text)]",
        "border-[var(--symbiosis-btn-destructive-outline-text)]",
        "before:border-[var(--symbiosis-btn-destructive-outline-text)]",
        "hover:bg-[var(--symbiosis-btn-destructive-outline-hover)]",
        "active:bg-[var(--symbiosis-btn-destructive-outline-active)]",
        "disabled:border-[var(--symbiosis-btn-outline-disabled)]",
        "disabled:text-[var(--symbiosis-btn-outline-disabled)]",
      ],
    },
    {
      variant: "ghost",
      tone: "destructive",
      className: [
        "bg-[var(--symbiosis-btn-destructive-ghost-bg)]",
        "text-[var(--symbiosis-btn-destructive-ghost-text)]",
        "before:border-[var(--symbiosis-btn-destructive-ghost-text)]",
        "hover:bg-[var(--symbiosis-btn-destructive-ghost-hover)]",
        "active:bg-[var(--symbiosis-btn-destructive-ghost-active)]",
        "disabled:text-[var(--symbiosis-btn-ghost-disabled)]",
      ],
    },
    {
      variant: "link",
      tone: "destructive",
      className: [
        "text-[var(--symbiosis-btn-destructive-text-dark)]",
        "active:bg-[var(--color-red-light-400)]",
        "focus:before:border-[var(--symbiosis-btn-destructive-focus)]",
        "focus-within:before:border-[var(--symbiosis-btn-destructive-focus)]",
        "disabled:text-[var(--symbiosis-btn-link-disabled)]",
      ],
    },
    {
      variant: "primary",
      tone: "monochrome-light",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-light-primary-bg)]",
        "text-[var(--symbiosis-btn-monochrome-light-primary-text)]",
        "border-[var(--symbiosis-btn-monochrome-light-primary-bg)]",
        "before:border-[var(--symbiosis-btn-monochrome-light-primary-bg)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-light-primary-hover)]",
        "hover:border-[var(--symbiosis-btn-monochrome-light-primary-hover)]",
        "active:bg-[var(--symbiosis-btn-monochrome-light-primary-active)]",
        "active:border-[var(--symbiosis-btn-monochrome-light-primary-active)]",
        "disabled:bg-[var(--symbiosis-btn-primary-disabled)]",
        "disabled:border-[var(--symbiosis-btn-primary-disabled)]",
      ],
    },
    {
      variant: "primary",
      tone: "monochrome-dark",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-dark-primary-bg)]",
        "text-[var(--symbiosis-btn-monochrome-dark-primary-text)]",
        "border-[var(--symbiosis-btn-monochrome-dark-primary-bg)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-dark-primary-hover)]",
        "hover:border-[var(--symbiosis-btn-monochrome-dark-primary-hover)]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-primary-active)]",
        "active:border-[var(--symbiosis-btn-monochrome-dark-primary-active)]",
        "disabled:bg-[var(--symbiosis-btn-primary-disabled)]",
        "disabled:border-[var(--symbiosis-btn-primary-disabled)]",
      ],
    },
    {
      variant: "outline",
      tone: "monochrome-light",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-light-outline-bg)]",
        "border-[var(--symbiosis-btn-monochrome-light-outline-border)]",
        "before:border-[var(--symbiosis-btn-monochrome-light-outline-border)]",
        "text-[var(--symbiosis-btn-monochrome-light-outline-border)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-light-outline-hover)]",
        "hover:text-[var(--symbiosis-btn-monochrome-light-outline-text)]",
        "active:bg-[var(--symbiosis-btn-monochrome-light-outline-active)]",
        "disabled:border-[var(--symbiosis-btn-outline-disabled)]",
        "disabled:text-[var(--symbiosis-btn-outline-disabled)]",
        "data-[loading=true]:text-[var(--symbiosis-btn-monochrome-light-outline-text)]",
      ],
    },
    {
      variant: "outline",
      tone: "monochrome-dark",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-dark-outline-bg)]",
        "border-[var(--symbiosis-btn-monochrome-dark-outline-text)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-dark-outline-hover)]",
        "text-[var(--symbiosis-btn-monochrome-dark-outline-text)]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-outline-active)]",
        "disabled:border-[var(--symbiosis-btn-outline-disabled)]",
        "disabled:text-[var(--symbiosis-btn-outline-disabled)]",
      ],
    },
    {
      variant: "ghost",
      tone: "monochrome-light",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-light-ghost-bg)]",
        "before:border-[var(--symbiosis-btn-monochrome-light-ghost-border)]",
        "text-[var(--symbiosis-btn-monochrome-light-ghost-text)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-light-ghost-hover)]",
        "hover:text-[var(--symbiosis-btn-monochrome-light-ghost-hover-text)]",
        "active:bg-[var(--symbiosis-btn-monochrome-light-ghost-active)]",
        "disabled:border-[var(--symbiosis-btn-outline-disabled)]",
        "disabled:text-[var(--symbiosis-btn-outline-disabled)]",
        "data-[loading=true]:text-[var(--symbiosis-btn-monochrome-light-outline-text)]",
      ],
    },
    {
      variant: "ghost",
      tone: "monochrome-dark",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-dark-ghost-bg)]",
        "text-[var(--symbiosis-btn-monochrome-dark-ghost-text)]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-ghost-active)]",
        "disabled:text-[var(--symbiosis-btn-ghost-disabled)]",
        "hover:bg-[var(--symbiosis-btn-monochrome-dark-ghost-hover)]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-ghost-active)]",
      ],
    },
    {
      variant: "link",
      tone: "monochrome-light",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-light-link-bg)]",
        "text-[var(--symbiosis-btn-monochrome-light-link-text)]",
        "border-[var(--symbiosis-btn-monochrome-light-link-border)]",
        "before:border-[var(--symbiosis-btn-monochrome-light-link-border)]",
        "active:bg-[var(--symbiosis-btn-monochrome-light-link-active)]",
        "active:text-[var(--symbiosis-btn-monochrome-light-ghost-active-text)]",
        "disabled:text-[var(--symbiosis-btn-link-disabled)]",
        "hover:disabled:bg-[unset]",
        "data-[loading=true]:text-[var(--symbiosis-btn-monochrome-light-link-active-text)]",
      ],
    },
    {
      variant: "link",
      tone: "monochrome-dark",
      className: [
        "bg-[var(--symbiosis-btn-monochrome-dark-link-bg)]",
        "text-[var(--symbiosis-btn-monochrome-dark-link-text)]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-link-active)]",
        "disabled:text-[var(--symbiosis-btn-link-disabled)]",
        "hover:disabled:bg-[unset]",
        "active:bg-[var(--symbiosis-btn-monochrome-dark-link-active)]",
      ],
    },
    {
      layout: "inline",
      tone: ["monochrome-dark", "monochrome-light"],
      className: ["text-inherit"],
    },
  ],
});

export const iconButton = (variants: IconButtonVariants & ButtonHeightSizingVariants) =>
  cn(iconButtonCva({ shape: variants.shape, size: variants.size }), buttonHeightSizing({ size: variants.size }));
export interface IconButtonVariants extends VariantProps<typeof iconButtonCva> {}
const iconButtonCva = cva(["justify-center p-0 items-center"], {
  variants: {
    shape: {
      circle: ["rounded-full focus:before:rounded-full focus-within:before:rounded-full"],
      square: [],
    },
    size: {
      "small-200": ["w-[1.5rem]", "min-w-[1.5rem]"],
      "small-100": ["w-[1.75rem]", "min-w-[1.75rem]"],
      base: ["w-[2rem]", "min-w-[2rem]"],
      "large-100": ["w-[2.25rem]", "min-w-[2.25rem]"],
    },
  },
});

export const iconSizeToTailwind: Record<Sizes, string> = {
  "small-200": cn("w-[12px]", "h-[12px]", "min-w-[12px]", "min-h-[12px]", "text-[12px]"),
  "small-100": cn("w-[14px]", "h-[14px]", "min-w-[14px]", "min-h-[14px]", "text-[14px]"),
  base: cn("w-[16px]", "h-[16px]", "min-w-[16px]", "min-h-[16px]", "text-[16px]"),
  "large-100": cn("w-[18px]", "h-[18px]", "min-w-[18px]", "min-h-[18px]", "text-[18px]"),
};

export const text = cva(["mx-0 my-2", "text-slate-600"], {
  variants: {
    variant: {
      "body-small-200": ["text-xs", "leading-tight"],
      "body-small-100": ["text-sm", "leading-tight"],
      "body-base": ["text-base", "leading-normal"],
      "body-large-100": ["text-lg", "leading-normal"],
      "body-large-200": ["text-xl", "leading-normal"],
      "title-small-100": ["text-2xl", "leading-relaxed"],
      "title-base": ["text-3xl", "leading-relaxed"],
      "title-large-100": ["text-4xl", "leading-relaxed"],
    },
    weight: {
      "thin-200": ["font-thin"],
      "thin-100": ["font-light"],
      base: ["font-normal"],
      "bold-100": ["font-semibold"],
      "bold-200": ["font-bold"],
    },
  },
  compoundVariants: [
    {
      variant: ["title-small-100", "title-base", "title-large-100"],
      weight: ["thin-200", "thin-100", "base", "bold-100", "bold-200"],
      className: ["font-semibold"],
    },
  ],
});

export const input = ({ variant = "default", ...rest }: InputVariants) => cn(inputCva({ variant, ...rest }));
export interface InputVariants extends VariantProps<typeof inputCva> {}
const inputCva = cva(
  [
    "justify-center p-3 rounded-md items-center border border-slate-400 bg-inherit",
    "relative",
    "m-0! flex items-center outline-hidden",
    "disabled:border-gray-400 disabled:text-gray-400",
    "focus-within:ring-2 focus-within:ring-offset-1",
    "placeholder-slate-400",
  ],
  {
    variants: {
      variant: {
        default: ["focus-within:border-main-base focus-within:ring-main-base"],
        error: ["text-red-500 border-red-500 focus-within:ring-red-500"],
      },
      size: {
        "small-200": [buttonHeightSizing({ size: "small-200" }), "p-2"],
        "small-100": [buttonHeightSizing({ size: "small-100" })],
        base: [buttonHeightSizing({ size: "base" })],
        "large-100": [buttonHeightSizing({ size: "large-100" })],
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: ["small-200"],
        className: [text({ variant: "body-small-200" })],
      },
      {
        variant: "default",
        size: ["small-100", "base"],
        className: [text({ variant: "body-small-100" })],
      },
      {
        variant: "default",
        size: ["large-100"],
        className: [text({ variant: "body-base" })],
      },
    ],
  },
);

export const inputLabel = cva([], {
  variants: {
    size: {
      "small-200": [text({ variant: "body-small-200", weight: "thin-100" })],
      "small-100": [text({ variant: "body-small-100", weight: "thin-100" })],
      base: [text({ variant: "body-small-100" })],
      "large-100": [text({ variant: "body-base", weight: "bold-100" })],
    },
    weight: {
      "thin-200": [text({ weight: "thin-200" })],
      "thin-100": [text({ weight: "thin-100" })],
      base: [text({ weight: "base" })],
      "bold-100": [text({ weight: "bold-100" })],
      "bold-200": [text({ weight: "bold-200" })],
    },
  },
});

