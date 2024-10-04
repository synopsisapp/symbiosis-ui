import { cva } from "class-variance-authority";

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
