export type ModalProps = {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  skipOverlay?: boolean;
  onOverlayPress?: () => void;
};

export type ModalContentProps = {
  hasCloseButton?: boolean;
  hasHeader?: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
};
