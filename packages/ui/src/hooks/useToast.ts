import { toast as toastPrimitive } from "sonner";
import type * as React from "react";
import { z } from "zod";

export const ToastVariant = z.enum(["success", "error", "info", "loading", "default"]);
export type ToastVariant = z.infer<typeof ToastVariant>;

export type ToastConfig = {
  variant?: ToastVariant;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  duration?: number;
  closeButton?: boolean;
};

type ToastUpdateConfig = Omit<ToastConfig, "title"> & {
  title?: React.ReactNode | (() => React.ReactNode);
};

function toast(config: ToastConfig) {
  const { title, variant = "default", ...rest } = config;

  if (variant !== "default") {
    return toastPrimitive[variant](title, rest) as string;
  }
  return toastPrimitive(title, rest) as string;
}

toast.update = (id: string, config: ToastUpdateConfig) => {
  const { title, variant = "default", ...rest } = config;

  if (variant !== "default") {
    return toastPrimitive[variant](title, { id, ...rest }) as string;
  }

  return toastPrimitive(title, { id, ...rest }) as string;
};

toast.dismiss = (id: string) => {
  toastPrimitive.dismiss(id) as string;
};

export const useToast = () => {
  return {
    toast,
  };
};
