import { cn } from "../../utils/cn";
import { iconSizeToTailwind } from "../sharedStyles";
import type { SpinnerProps } from "./types";

const primaryColors = cn(
  "border-white/30",
  "border-t-white",
  "group-[.btn-mono-light]:border-[var(--color-gray-light-200)]",
  "group-[.btn-mono-light]:border-t-[var(--color-gray-dark-100)]",
);

const secondaryColors = cn(
  "border-main-base/30",
  "border-t-[var(--symbiosis-btn-outline-text)]",
  "group-disabled:border-t-[var(--color-gray-dark-100)]",
  "group-disabled:border-[var(--color-gray-light-400)]/30",
);

const inheritColors = cn(
  "border-[var(--color-gray-light-200)]",
  "border-t-current",
);

export const Spinner = ({
  isLoading,
  size = "base",
  variant = "secondary",
}: SpinnerProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2",
        iconSizeToTailwind[size],
        variant === "primary" && primaryColors,
        variant === "secondary" && secondaryColors,
        variant === "currentColor" && inheritColors,
      )}
    />
  );
};
