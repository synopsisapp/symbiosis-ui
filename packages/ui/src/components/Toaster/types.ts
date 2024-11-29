import type { ToasterProps as ToasterPrimitiveProps } from "sonner";

export type ToasterProps = {
  position?: ToasterPrimitiveProps["position"];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
};
