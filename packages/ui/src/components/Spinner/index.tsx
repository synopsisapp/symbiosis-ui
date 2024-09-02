import { iconSizeToTailwind } from "../Button/styles";
import { cn } from "../../utils/cn";
import type { SpinnerProps } from "./types";

const primaryColors = cn(
  "border-white/30",
  "border-t-white",
  "group-[.btn-mono-light]:border-grays-400/30",
  "group-[.btn-mono-light]:border-t-grays-600",
);

const secondaryColors = cn(
  "border-mainColors-base/30",
  "border-t-mainColors-base",
  "group-disabled:border-t-grays-600",
  "group-disabled:border-grays-400",
);

const inheritColors = cn("border-grays-600/40", "border-t-current");

export const Spinner = ({ isLoading, size = "base", variant = "secondary" }: SpinnerProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-2 rounded-full animate-spin",
        iconSizeToTailwind[size],
        variant === "primary" && primaryColors,
        variant === "secondary" && secondaryColors,
        variant === "currentColor" && inheritColors,
      )}
    />
  );
};
