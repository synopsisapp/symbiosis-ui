import z from "zod";

export const IconSize = z.enum([
  "small-200",
  "small-100",
  "base",
  "large-100",
  "large-200",
  "font",
]);

export type IconSize = z.infer<typeof IconSize>;

export type IconProps = {
  name: SymbiosisUI.IconName;
  size?: IconSize;
  className?: string;
};
