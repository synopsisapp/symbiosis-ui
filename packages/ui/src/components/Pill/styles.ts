import { cva } from "class-variance-authority";
import { Sizes } from "../../designSystemTokens";

export const pillVariants = cva(
  "flex gap-1 items-center rounded-full border transition-colors max-w-fit h-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "",
        outline: "bg-transparent",
      },
      size: {
        [Sizes.Enum["small-200"]]: ["px-1.5"],
        [Sizes.Enum["small-100"]]: ["px-2", "py-0.5"],
        [Sizes.Enum.base]: ["px-2.5 py-0.5"],
        [Sizes.Enum["large-100"]]: ["px-3 py-1"],
      },
      tone: {
        default: "",
        destructive: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        tone: "default",
        className: "bg-main-base text-white border-main-base",
      },
      {
        variant: "outline",
        tone: "default",
        className: "text-main-dark-100 border-main-dark-100",
      },
      {
        variant: "primary",
        tone: "destructive",
        className: "bg-red-dark-100 text-white border-red-dark-100",
      },
      {
        variant: "outline",
        tone: "destructive",
        className: "text-red-dark-100 border-red-dark-100",
      },
    ],
  },
);
