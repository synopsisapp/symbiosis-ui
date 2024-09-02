import z from "zod";

export const SpinnerSize = z.enum(["small-100", "base", "large-100"]);

export type SpinnerSize = z.infer<typeof SpinnerSize>;

export const SpinnerVariant = z.enum(["primary", "secondary", "currentColor"]);

export type SpinnerVariant = z.infer<typeof SpinnerVariant>;

export type SpinnerProps = {
  isLoading?: boolean;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
};
