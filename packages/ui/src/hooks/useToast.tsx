import { toast as toastPrimitive } from "sonner";
import { z } from "zod";
import type { IconProps } from "../components/Icon/types";
import { Icon } from "../components/Icon";
import { cn } from "../utils/cn";
import { Text } from "../components/Text";

export const ToastVariant = z.enum(["success", "destructive", "info", "loading", "default", "warning"]);
export type ToastVariant = z.infer<typeof ToastVariant>;

export type ToastConfig = {
  variant?: ToastVariant;
  icon?: IconProps["name"];
  title: string;
  description?: string;
  duration?: number;
  className?: string;
};

type ToastUpdateConfig = Omit<ToastConfig, "title"> & {
  title?: string;
};

const variantToIcon = {
  default: null,
  warning: "symbiosis-toast-warning",
  destructive: "symbiosis-toast-destructive",
  success: "symbiosis-toast-success",
  info: "symbiosis-toast-info",
  loading: "symbiosis-loader",
} as const;


// Saddly if we want to use our Text component we need to pass the whole component as a prop.
// primitiveToast acepts a message prop for the title, but if it is  a component it ignores description or icon props expecting the whole component as the message prop.
const ToastContent = ({ title, variant = "default", description, className, icon }: ToastUpdateConfig) => {
  const iconName = icon ?? variantToIcon[variant];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {iconName && (
        <Icon
          name={iconName}
          size="small-100"
          className={cn({
            "animate-spin": variant === "loading",
          })}
        />
      )}
      <div className="flex flex-col gap-1">
        <Text variant="body-small-100" className="my-0" weight={description ? "bold-100" : "base"}>
          {title}
        </Text>
        {description && (
          <Text variant="body-small-100" className={cn("text-slate-500 my-0")}>
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};

function toast(config: ToastConfig) {
  const { variant = "default", duration } = config;
  switch (variant) {
    case "destructive":
      return toastPrimitive.error(<ToastContent {...config} />, { duration }) as string;
    case "success":
    case "info":
    case "warning":
      return toastPrimitive[variant](<ToastContent {...config} />, { duration }) as string;
    case "loading":
      return toastPrimitive(<ToastContent {...config} />, { duration }) as string;
    default:
      return toastPrimitive(<ToastContent {...config} />, { duration }) as string;
  }
}

toast.update = (id: string, config: ToastUpdateConfig) => {
  switch (config.variant) {
    case "destructive":
      return toastPrimitive.error(<ToastContent {...config} />, { id }) as string;
    case "success":
    case "info":
    case "warning":
      return toastPrimitive[config.variant](<ToastContent {...config} />, { id }) as string;
    case "loading":
      return toastPrimitive(<ToastContent {...config} />, { id }) as string;
    default:
      return toastPrimitive(<ToastContent {...config} />, { id }) as string;
  }
};

toast.dismiss = (id: string) => {
  toastPrimitive.dismiss(id) as string;
};

export const useToast = () => ({ toast });
