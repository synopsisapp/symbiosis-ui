import * as ModalPrimitive from "@radix-ui/react-dialog";
import type { ModalProps, ModalContentProps } from "./types";

import { IconButton } from "../IconButton";
import { Text } from "../Text";
import { cn } from "../../utils/cn";

type Children = {
  children: React.ReactNode;
};
const ModalRoot: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  defaultOpen,
  open,
  onOpenChange,
  skipOverlay = false,
  onOverlayPress,
}) => {
  return (
    <ModalPrimitive.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      {!skipOverlay && (
        <ModalPrimitive.Portal>
          <ModalOverlay onPress={onOverlayPress} />
        </ModalPrimitive.Portal>
      )}
      {children}
    </ModalPrimitive.Root>
  );
};

const ModalTrigger: React.FC<Children> = ({ children }) => (
  <ModalPrimitive.Trigger asChild>{children}</ModalPrimitive.Trigger>
);

const ModalContent: React.FC<React.PropsWithChildren<ModalContentProps>> = ({
  children,
  hasCloseButton = true,
  hasHeader = true,
  title,
  onClose,
  className,
}) => (
  <ModalPrimitive.Content
    className={cn(
      "fixed animate-slideUpModal w-full overflow-hidden bg-white px-0 pt-2 pb-0 rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none lg:pt-2 lg:rounded-lg lg:w-fit z-[999] bottom-0 left-0 lg:bottom-auto lg:inset-0 lg:m-auto lg:h-fit max-h-[80vh]",
      className,
    )}
  >
    {hasHeader && (
      <>
        <div className="flex items-center">
          <ModalPrimitive.Title className="flex-1 m-0 mb-2 px-4">
            <Text variant="body-small-200" weight="bold-100" noTranslations className="flex-1">
              {title ?? "Modal title missing"}
            </Text>
          </ModalPrimitive.Title>
          {hasCloseButton && (
            <div className="mb-2 mr-2">
              <ModalPrimitive.Close asChild={onClose ? undefined : true}>
                <IconButton
                  icon="symbiosis-x"
                  isCircle
                  size="small-100"
                  variant="ghost"
                  tone="monochrome-dark"
                  onPress={() => {
                    onClose?.();
                  }}
                />
              </ModalPrimitive.Close>
            </div>
          )}
        </div>
        <hr className="text-slate-400" />
      </>
    )}
    <div
      className="
        w-full overflow-y-auto
        pb-[70px] border-b-0 lg:min-w-[250px] lg:w-auto lg:pb-0
        lg:border-bl-0 lg:border-br-0 max-h-[calc(80vh-120px)]
      "
    >
      {children}
    </div>
  </ModalPrimitive.Content>
);

const ModalOverlay = ({
  onPress,
}: {
  onPress?: () => void;
}) => (
  <ModalPrimitive.Overlay
    forceMount
    className="
    opacity-0
    pointer-events-none
    data-[state=open]:w-screen
    data-[state=open]:h-screen
    data-[state=open]:bg-black
    data-[state=open]:opacity-70
    data-[state=open]:fixed
    data-[state=open]:inset-0
    data-[state=open]:transition-all
    data-[state=open]:z-998
  "
    onClick={() => onPress?.()}
  />
);

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Overlay: ModalOverlay,
  Portal: ModalPrimitive.Portal,
  CloseTrigger: ModalPrimitive.Close,
};
