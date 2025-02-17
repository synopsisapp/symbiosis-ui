import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { buttonHeightSizing, text } from "../sharedStyles";

export interface InputWrapperVariants
  extends VariantProps<typeof inputWrapperCva> {}
export const inputWrapper = ({
  variant = "default",
  ...rest
}: InputWrapperVariants) => cn(inputWrapperCva({ variant, ...rest }));
const inputWrapperCva = cva(
  [
    "relative m-0 outline-hidden transition-all",
    "focus-within:ring-2 focus-within:ring-offset-1 rounded-lg",
  ],
  {
    variants: {
      size: {
        "small-200": [
          buttonHeightSizing({ size: "small-200" }),
          text({ variant: "body-small-200" }),
          "my-0",
        ],
        "small-100": [
          buttonHeightSizing({ size: "small-100" }),
          text({ variant: "body-small-100" }),
          "my-0",
        ],
        base: [
          buttonHeightSizing({ size: "base" }),
          text({ variant: "body-base" }),
          "my-0",
        ],
        "large-100": [
          buttonHeightSizing({ size: "large-100" }),
          text({ variant: "body-large-100" }),
          "my-0",
        ],
      },
      variant: {
        default: ["focus-within:ring-main-base"],
        error: ["focus-within:ring-red-500", "text-red-500"],
      },
    },
  },
);

export const input = ({ variant = "default", ...rest }: InputVariants) =>
  cn(inputCva({ variant, ...rest }));
export interface InputVariants extends VariantProps<typeof inputCva> {}
const inputCva = cva(
  [
    "justify-center p-3 rounded-lg items-center border-1 bg-inherit",
    "relative",
    "m-0! flex items-center outline-hidden",
    "border border-solid",
  ],
  {
    variants: {
      variant: {
        default: ["border-gray-400", "group-focus-within:border-main-base"],
        error: ["border-red-500", "text-red-500"],
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
