import * as ModalPrimitive from "@radix-ui/react-dialog";
import type { ModalContentProps, ModalProps } from "./types";

import { cn } from "../../utils/cn";
import { IconButton } from "../IconButton";
import { Text } from "../Text";

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
    <ModalPrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
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
      "fixed bottom-0 left-0 z-999 max-h-[80vh] w-full animate-slideUpModal overflow-hidden rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none bg-white px-0 pt-2 pb-0 lg:inset-0 lg:bottom-auto lg:m-auto lg:h-fit lg:w-fit lg:rounded-lg lg:pt-2",
      className,
    )}
  >
    {hasHeader && (
      <>
        <div className="flex items-center">
          <ModalPrimitive.Title className="m-0 mb-2 flex-1 px-4">
            <Text
              variant="body-small-200"
              weight="bold-100"
              noTranslations
              className="flex-1"
            >
              {title ?? "Modal title missing"}
            </Text>
          </ModalPrimitive.Title>
          {hasCloseButton && (
            <div className="mr-2 mb-2">
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
    <div className="max-h-[calc(80vh-120px)] w-full overflow-y-auto border-b-0 pb-[70px] lg:w-auto lg:min-w-[250px] lg:border-bl-0 lg:border-br-0 lg:pb-0 ">
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
    className="pointer-events-none opacity-0 data-[state=open]:fixed data-[state=open]:inset-0 data-[state=open]:z-998 data-[state=open]:h-screen data-[state=open]:w-screen data-[state=open]:bg-black data-[state=open]:opacity-70 data-[state=open]:transition-all "
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
