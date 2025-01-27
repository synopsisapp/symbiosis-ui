import z from "zod";
import { Sizes } from "../../designSystemTokens";

export const SwitchSizes = z.enum([
  Sizes.Enum["small-200"],
  Sizes.Enum["small-100"],
  Sizes.Enum.base,
  Sizes.Enum["large-100"],
]);

export const SwitchContentAlignment = z.enum(["label-first", "switch-first"]);

export const SwitchProps = z.object({
  defaultChecked: z.boolean().optional(),
  onCheckedChange: z.function().args(z.boolean()).returns(z.void()).optional(),
  label: z.string().optional(),
  size: SwitchSizes.optional(),
  value: z.boolean().optional(),
  name: z.string().optional(),
  id: z.string().optional(),
  disabled: z.boolean().optional(),
  className: z.string().optional(),
  contentAlignment: SwitchContentAlignment.optional(),
});

export type SwitchProps = z.infer<typeof SwitchProps>;
