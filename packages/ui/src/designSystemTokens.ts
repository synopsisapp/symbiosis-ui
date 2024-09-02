import z from "zod";

export const Sizes = z.enum(["small-200", "small-100", "base", "large-100"]);
export type Sizes = z.infer<typeof Sizes>;
