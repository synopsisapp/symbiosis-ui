import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Button } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Modal.Root> = {
  title: "Components/Modal",
  component: Modal.Root,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "The open state of the modal when it is initially rendered. Use when you do not need to control its open state.",
      required: false,
    },
    open: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
      },
      type: "boolean",
      description: "The controlled open state of modal. Must be used in conjunction with onOpenChange.",
      required: false,
    },
    onOpenChange: {
      table: {
        type: { summary: "(open: boolean) => void" },
      },
      description: "Event handler called when the open state of the modal changes.",
      control: false,
      required: false,
    },
    skipOverlay: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
      description: "When true, the modal overlay will not be rendered.",
      required: false,
    },
    onOverlayPress: {
      table: {
        type: { summary: "() => void" },
      },
      description: "Event handler called when the overlay is clicked.",
      control: false,
      required: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

export const Default: Story = {
  render: (args) => (
    <Modal.Root {...args}>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content title="Default Modal">
          <div className="p-4">
            <p>This is the modal content.</p>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  ),
};

export const WithSkipOverlay: Story = {
  render: (args) => (
    <Modal.Root {...args} skipOverlay>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content title="Modal without overlay">
          <div className="p-4">
            <p>This modal has no overlay.</p>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Modal.Root {...args} open={open} onOpenChange={setOpen}>
        <Modal.Trigger>
          <Button label="Open Controlled Modal" />
        </Modal.Trigger>
        <Modal.Portal>
          <Modal.Content title="Controlled Modal">
            <div className="p-4">
              <p>This is a controlled modal.</p>
              <div className="mt-4">
                <Button label="Close Modal" onPress={() => setOpen(false)} />
              </div>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledModal = () => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger>
        <Button>Open Controlled Modal</Button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content title="Controlled Modal">
          <div className="p-4">
            <p>This is a controlled modal.</p>
            <div className="mt-4">
              <Button onPress={() => setOpen(false)}>Close Modal</Button>
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  render: (args) => (
    <Modal.Root {...args}>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content title="Modal without close button" hasCloseButton={false}>
          <div className="p-4">
            <p>This modal doesn't have a close button.</p>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  ),
};

export const CustomContent: Story = {
  render: (args) => (
    <Modal.Root {...args}>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content title="Custom Modal" className="bg-violet-100">
          <div className="p-4 bg-violet-50">
            <p>This modal has custom styling.</p>
            <div className="mt-4 flex gap-2">
              <Button label="Action 1" />
              <Button label="Action 2" variant="outline" />
            </div>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  ),
};

export const WithCustomClose: Story = {
  render: (args) => (
    <Modal.Root {...args}>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content
          title="Modal with Custom Close"
          onClose={() => {
            console.log("Custom close handler");
          }}
        >
          <div className="p-4">
            <p>This modal has a custom close handler.</p>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  ),
};
