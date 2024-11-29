import { Toaster as ToasterPrimitive } from "sonner";
import type { ToasterProps } from "./types";

export const Toaster = (props: ToasterProps) => {
  return <ToasterPrimitive {...props} className="z-50" position="bottom-right" />;
};
