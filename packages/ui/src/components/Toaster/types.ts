import type { ToasterProps as ToasterPrimitiveProps, ToastClassnames } from "sonner";

export type ToasterProps = {
  position?: ToasterPrimitiveProps["position"];
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
  classNames?: ToastClassnames;
};
