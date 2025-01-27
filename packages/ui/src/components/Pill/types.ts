import z from "zod";
import { Sizes } from "../../designSystemTokens";
import { ButtonTone, ButtonVariant } from "../Button/types";

export const PillVariant = z.enum([ButtonVariant.enum.primary, ButtonVariant.enum.outline]);
export const PillTone = z.enum([ButtonTone.enum.default, ButtonTone.enum.destructive]);
export const PillSizes = z.enum([
  Sizes.enum["small-200"],
  Sizes.enum["small-100"],
  Sizes.enum.base,
  Sizes.enum["large-100"],
]);

export const PillProps = z.object({
  onClose: z.function().optional(),
  variant: PillVariant.optional(),
  tone: PillTone.optional(),
  size: PillSizes,
  label: z.string(),
  // We can't get zod type for icons because we build them at runtime
  leftIcon: z.string().optional(),
  isRounded: z.boolean().optional(),
  className: z.string().optional(),
});

export type PillProps = z.infer<typeof PillProps> & {
  leftIcon?: SymbiosisUI.IconName;
};
