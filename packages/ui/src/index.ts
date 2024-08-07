import "./tailwind.css";

export { cn } from "./utils/cn";

export { Button } from "./components/Button";
export { IconButton } from "./components/IconButton";
export { Icon } from "./components/Icon";
export { Spinner } from "./components/Spinner";
export { Text } from "./components/Text";

export type { ButtonProps } from "./components/Button/types";
export type { IconButtonProps } from "./components/IconButton/types";
export type { IconProps } from "./components/Icon/types";
export { IconProvider } from "./components/Icon/IconContext";

export type { SpinnerProps } from "./components/Spinner/types";
export type { TextProps } from "./components/Text/types";

export * from "./designSystemTokens";

export { shadcnPreset } from "./tailwind/shadcn-preset";
export { shadcnPlugin } from "./tailwind/shadcn-plugin";
