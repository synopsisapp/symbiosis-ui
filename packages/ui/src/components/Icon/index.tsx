import * as React from "react";
import { cva } from "class-variance-authority";
import type { IconProps } from "./types";
import { IconContext } from "./IconContext";
import { cn } from "../../utils/cn";

const iconClasses = cva(["flex items-center"], {
  variants: {
    size: {
      font: ["w-[1em] h-[1em]", "gap-1.5"],
      "small-200": ["w-3 h-3", "gap-1.5"],
      "small-100": ["w-4 h-4", "gap-1.5"],
      base: ["w-5 h-5", "gap-2"],
      "large-100": ["w-6 h-6", "gap-2"],
      "large-200": ["w-7 h-7", "gap-3"],
    },
  },
});

/**
 * Renders an SVG icon. The icon defaults to the size of the font.
 *
 * size: 'font' uses the size of the font of the parent element.
 */
const Icon = ({ name, size = "font", className }: IconProps) => {
  const { publicDir } = React.useContext(IconContext);

  return (
    <svg className={cn(iconClasses({ size }), className)}>
      <title>{name}</title>
      <use href={`${publicDir}#${name}`} />
    </svg>
  );
};

Icon.displayName = "Icon";

export { Icon };
