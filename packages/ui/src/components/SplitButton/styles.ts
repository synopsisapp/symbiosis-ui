import { cva } from "class-variance-authority";

export const iconButtonLeftBorderIconVariant = cva([], {
  variants: {
    variant: {
      primary: [],
      outline: ["border-l-transparent"],
      ghost: ["border-l-transparent"],
    },
    tone: {
      default: [],
      destructive: [],
      "monochrome-light": [],
      "monochrome-dark": [],
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      tone: "default",
      className: ["border-l-main-light-400"],
    },
    {
      variant: "primary",
      tone: "destructive",
      className: ["border-l-white"],
    },
    {
      variant: "primary",
      tone: "monochrome-light",
      className: ["border-l-slate-dark-100"],
    },
    {
      variant: "primary",
      tone: "monochrome-dark",
      className: ["border-l-white"],
    },
  ],
});
