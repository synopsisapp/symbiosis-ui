import type { Sizes } from "../../designSystemTokens";
import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

export const sharedButtonStyles = cn(
  "m-0 flex items-center relative",
  'cursor-pointer outline-none transition-all rounded-[8px] before:content-[""] before:absolute',
  "before:top-[-4px] before:left-[-4px] before:w-[calc(100%+8px)] before:h-[calc(100%+8px)]",
  "before:border-2 before:border-solid before:border-mainColors-dark-100 before:rounded-[11px]",
  "before:opacity-0 before:scale-[0.9] before:transition-all before:duration-150 outline-none",
  "focus:before:opacity-100 focus:before:scale-100 focus-within:before:opacity-1",
  "focus-within:before:scale-100 user-select-none group",
);

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

export const button = (variants: ButtonVariants) =>
  cn(buttonCva(variants), buttonHeightSizing({ size: variants.size }));
export interface ButtonVariants extends VariantProps<typeof buttonCva> {}
const buttonCva = cva([sharedButtonStyles], {
  variants: {
    variant: {
      primary: [
        "bg-mainColors-base",
        "text-white",
        "border-mainColors-base",
        "border-[1px]",
        "border-solid",
        "dark-scheme:hover:bg-mainColors-dark-100 light-scheme:hover:bg-mainColors-light-100",
        "dark-scheme:hover:border-mainColors-dark-100 light-scheme:hover:border-mainColors-light-100",
        "active:bg-mainColors-dark-20",
        "active:border-mainColors-dark-20",
        "disabled:bg-gray-400",
        "disabled:border-gray-400",
      ],
      outline: [
        "bg-transparent",
        "text-mainColors-dark-100",
        "border-mainColors-dark-100",
        "border-[1px]",
        "border-solid",
        "hover:bg-mainColors-light-400",
        "active:bg-mainColors-light-300",
        "disabled:border-gray-400",
        "disabled:text-grays-400",
      ],
      ghost: [
        "bg-transparent",
        "text-mainColors-dark-100",
        "hover:bg-mainColors-light-400",
        "active:bg-mainColors-light-300",
        "disabled:text-grays-400",
      ],
      link: [
        "bg-transparent",
        "text-mainColors-dark-100",
        "underline",
        "active:bg-mainColors-light-400",
        "disabled:text-grays-400",
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
        "py-0.5 !px-1",
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
      "monochrome-light": ["group btn-mono btn-mono-light"],
      "monochrome-dark": ["group btn-mono btn-mono-dark"],
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
        "bg-red-600",
        "border-red-600",
        "dark-scheme:hover:bg-red-700 light-scheme:hover:bg-red-500",
        "dark-scheme:hover:border-red-700 light-scheme:hover:border-red-500",
        "active:bg-red-800",
        "active:border-red-800",
        "focus:before:border-red-800",
        "focus-within:before:border-red-800",
        "disabled:bg-gray-400",
        "disabled:border-gray-400",
      ],
    },
    {
      variant: "outline",
      tone: "destructive",
      className: [
        "text-red-600",
        "border-red-600",
        "dark-scheme:hover:bg-red-500 light-scheme:hover:bg-red-500",
        "active:bg-red-100",
        "focus:before:border-red-700",
        "focus-within:before:border-red-700",
        "disabled:border-gray-400",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "ghost",
      tone: "destructive",
      className: [
        "text-red-600",
        "dark-scheme:hover:bg-red-100 light-scheme:hover:bg-red-100",
        "active:bg-red-200",
        "focus:before:border-red-700",
        "focus-within:before:border-red-700",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "link",
      tone: "destructive",
      className: [
        "text-red-600",
        "active:bg-red-200",
        "focus:before:border-red-700",
        "focus-within:before:border-red-700",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "primary",
      tone: "monochrome-light",
      className: [
        "bg-white",
        "border-white",
        "text-slate-600",
        "dark-scheme:hover:bg-gray-200 light-scheme:hover:bg-gray-200",
        "dark-scheme:hover:border-gray-200 light-scheme:hover:border-gray-200",
        "active:bg-gray-300",
        "active:border-gray-300",
        "focus:before:border-slate-600",
        "focus-within:before:border-slate-600",
        "disabled:bg-gray-400",
        "disabled:border-gray-400",
      ],
    },
    {
      variant: "primary",
      tone: "monochrome-dark",
      className: [
        "bg-slate-700",
        "border-slate-700",
        "text-white",
        "dark-scheme:hover:bg-slate-800 light-scheme:hover:bg-slate-600",
        "dark-scheme:hover:border-slate-800 light-scheme:hover:border-slate-600",
        "active:bg-slate-900",
        "active:border-slate-900",
        "focus:before:border-slate-900",
        "focus-within:before:border-slate-900",
        "disabled:bg-gray-400",
        "disabled:border-gray-400",
      ],
    },
    {
      variant: "outline",
      tone: "monochrome-light",
      className: [
        "bg-white/5",
        "border-white",
        "text-white",
        "dark-scheme:hover:bg-gray-200/10 light-scheme:hover:bg-gray-200/10",
        "active:bg-gray-300/30",
        "focus:before:border-slate-600",
        "focus-within:before:border-slate-600",
        "disabled:border-gray-400",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "outline",
      tone: "monochrome-dark",
      className: [
        "bg-slate-700/0",
        "border-slate-700",
        "text-slate-700",
        "dark-scheme:hover:bg-slate-700/10 light-scheme:hover:bg-slate-700/10",
        "active:bg-slate-800/20",
        "focus:before:border-slate-900",
        "focus-within:before:border-slate-900",
        "disabled:border-gray-400",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "ghost",
      tone: "monochrome-light",
      className: [
        "bg-white/0",
        "text-white",
        "dark-scheme:hover:bg-gray-100/10 light-scheme:hover:bg-gray-100/10",
        "active:bg-gray-200/30",
        "focus:before:border-slate-600",
        "focus-within:before:border-slate-600",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "ghost",
      tone: "monochrome-dark",
      className: [
        "bg-slate-700/0",
        "text-slate-700",
        "dark-scheme:hover:bg-slate-700/10 light-scheme:hover:bg-slate-700/10",
        "active:bg-slate-800/20",
        "focus:before:border-slate-900",
        "focus-within:before:border-slate-900",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "link",
      tone: "monochrome-light",
      className: [
        "bg-white/0",
        "text-white",
        "dark-scheme:hover:bg-gray-100/10 light-scheme:hover:bg-gray-100/10",
        "active:bg-gray-200/30",
        "focus:before:border-slate-600",
        "focus-within:before:border-slate-600",
        "disabled:text-grays-400",
      ],
    },
    {
      variant: "link",
      tone: "monochrome-dark",
      className: [
        "bg-slate-700/0",
        "text-slate-700",
        "dark-scheme:hover:bg-slate-700/10 light-scheme:hover:bg-slate-700/10",
        "active:bg-slate-800/20",
        "focus:before:border-slate-900",
        "focus-within:before:border-slate-900",
        "disabled:text-grays-400",
      ],
    },
    {
      layout: "inline",
      tone: ["monochrome-dark", "monochrome-light"],
      className: ["text-inherit"],
    },
  ],
});

export const iconSizeToPx: Record<Sizes, number> = {
  "small-200": 12,
  "small-100": 14,
  base: 16,
  "large-100": 18,
};

export const iconSizeToTailwind: Record<Sizes, string> = {
  "small-200": cn("w-[12px]", "h-[12px]", "min-w-[12px]", "min-h-[12px]", "text-[12px]"),
  "small-100": cn("w-[14px]", "h-[14px]", "min-w-[14px]", "min-h-[14px]", "text-[14px]"),
  base: cn("w-[16px]", "h-[16px]", "min-w-[16px]", "min-h-[16px]", "text-[16px]"),
  "large-100": cn("w-[18px]", "h-[18px]", "min-w-[18px]", "min-h-[18px]", "text-[18px]"),
};
