import { cva, type VariantProps } from "class-variance-authority";
import { sharedTableRowBottomBorderStyles } from "../Table/styles";
import { cn } from "../../utils/cn";

export const tableCellStyles = cva("sticky z-10 transition-colors pl-[22px]", {
  variants: {
    pinedPosition: {
      left: cn(
        sharedTableRowBottomBorderStyles,
        "left-0 bg-white group-data-[state=selected]:bg-gray-50 group-hover:bg-gray-50",
      ),
      right: cn(
        sharedTableRowBottomBorderStyles,
        "right-0 bg-white group-data-[state=selected]:bg-gray-50 group-hover:bg-gray-50",
      ),
      false: "z-0",
    },
    isSelectable: {
      true: "",
      false: "",
    },
    isSecondColumn: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      pinedPosition: "left",
      isSelectable: true,
      isSecondColumn: true,
      className: "left-10",
    },
  ],
  defaultVariants: {
    pinedPosition: false,
    isSelectable: false,
    isSecondColumn: false,
  },
});
