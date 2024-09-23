import { cn } from "../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { buttonHeightSizing } from "../Button/styles";
import { text } from "../Text/styles";

export const inputSharedStyles = [
  "justify-center p-3 rounded-md items-center border border-slate-400 bg-inherit",
  "relative",
  "!m-0 flex items-center outline-none",
  "disabled:border-gray-400 disabled:text-gray-400",
  "focus-within:ring-2 focus-within:ring-offset-1",
  "placeholder-slate-400",
];

export const input = cva([inputSharedStyles], {
  variants: {
    variant: {
      default: ["focus-within:border-mainColors-base focus-within:ring-mainColors-base"],
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
});

export const inputLabel = cva([], {
  variants: {
    size: {
      "small-200": [text({ variant: "body-small-200", weight: "thin-100" })],
      "small-100": [text({ variant: "body-small-100", weight: "thin-100" })],
      base: [text({ variant: "body-small-100" })],
      "large-100": [text({ variant: "body-base", weight: "bold-100" })],
    },
  },
});
