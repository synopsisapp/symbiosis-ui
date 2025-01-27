import type * as SelectPrimitive from "@radix-ui/react-select";

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  skipComposition?: boolean;
};
