import { cva, type VariantProps } from "class-variance-authority";
import { Sizes } from "../../designSystemTokens";

export const pillVariants = cva("flex gap-1 items-center rounded-full border transition-colors max-w-fit h-fit", {
  variants: {
    variant: {
      primary: "",
      outline: "bg-transparent",
    },
    size: {
      [Sizes.Enum["small-200"]]: ["px-1"],
      [Sizes.Enum["small-100"]]: ["px-1.5", "py-px"],
      [Sizes.Enum.base]: ["px-1.5 py-0.5"],
      [Sizes.Enum["large-100"]]: ["px-2 py-1"],
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
      className: "bg-mainColors-base text-white border-mainColors-base",
    },
    {
      variant: "outline",
      tone: "default",
      className: "text-mainColors-dark-100 border-mainColors-dark-100",
    },
    {
      variant: "primary",
      tone: "destructive",
      className: "bg-red-600 text-white border-red-600",
    },
    {
      variant: "outline",
      tone: "destructive",
      className: "text-red-600 border-red-600",
    },
  ],
});
