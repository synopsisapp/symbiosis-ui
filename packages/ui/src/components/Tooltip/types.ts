export type TooltipRootProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type TooltipContentProps = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
};

export type TooltipTriggerProps = {
  children: React.ReactNode;
};

export type TooltipProps = {
  Root: TooltipRootProps;
  Content: TooltipContentProps;
  Trigger: TooltipTriggerProps;
};
