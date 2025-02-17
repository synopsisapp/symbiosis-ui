import type {
  ToastClassnames,
  ToasterProps as ToasterPrimitiveProps,
} from "sonner";

export type ToasterProps = {
  position?: ToasterPrimitiveProps["position"];
  expand?: boolean;
  duration?: number;
  visibleToasts?: number;
  classNames?: ToastClassnames;
};
