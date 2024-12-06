import { Toaster as ToasterPrimitive } from "sonner";
import type { ToasterProps } from "./types";

export const Toaster = (props: ToasterProps) => {
  const { classNames, position = "bottom-right", ...rest } = props;
  return <ToasterPrimitive {...rest} toastOptions={{ classNames }} className="z-50" position={position} />;
};
