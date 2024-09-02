import * as React from "react";
import type { TextProps } from "./types";
import { cn } from "../../utils/cn";

import { text } from "./styles";

export function TextTw({
  variant = "body-base",
  renderAs = "p",
  weight = "base",
  className,
  children,
  style,
}: TextProps) {
  const Component = renderAs;
  return (
    <Component
      className={cn(
        text({
          variant,
          weight,
        }),
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export const Text = React.memo(TextTw);
