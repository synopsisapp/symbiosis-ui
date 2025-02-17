import * as React from "react";
import { cn } from "../../utils/cn";
import { text } from "../sharedStyles";
import type { TextProps } from "./types";

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
