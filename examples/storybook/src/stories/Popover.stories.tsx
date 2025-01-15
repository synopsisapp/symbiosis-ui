import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, type PopoverProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<PopoverProps["Root"] & PopoverProps["Content"]> = {
  title: "Components/Popover",
  component: Popover.Root,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "The open state of the popover when it is initially rendered. Use when you do not need to control its open state.",
      required: false,
    },
    open: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
      },
      type: "boolean",
      description: "The controlled open state of popover. Must be used in conjunction with onOpenChange.",
      required: false,
    },
    onOpenChange: {
      table: {
        type: { summary: "(open: boolean) => void" },
      },
      description: "Event handler called when the open state of the popover changes.",
      control: false,
      required: false,
    },
    side: {
      control: {
        type: "select",
      },
      options: ["top", "right", "bottom", "left"],
      description: "**Content:** Side of the popover",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "top" },
      },
    },
    align: {
      control: {
        type: "select",
      },
      options: ["left", "center", "right"],
      description: "**Content:** Alignment of the popover",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "center" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<PopoverProps["Root"] & PopoverProps["Content"]>;

export const Default: Story = {
  render: (args) => {
    return (
      <Popover.Root {...args}>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content>
          Popover content
          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content>
          Popover content
          <Popover.Close />
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledPopover = () => {
  const [open, setOpen] = React.useState(false);

  <Popover.Root open={open} onOpenChange={setOpen}>
    <Popover.Trigger>
      <span>Open Popover</span>
    </Popover.Trigger>
    <Popover.Content side="top" closeIcon="close" tone="monochrome-dark">
      Popover content
      <Popover.Close />
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Root>
}
        `,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomContentAndSide: Story = {
  render: () => {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content className="bg-lime-200" side="left" align="center">
          <div>Popover content</div>
          <Popover.Close icon="heart-filled" />
          <Popover.Arrow className="fill-lime-200" />
        </Popover.Content>
      </Popover.Root>
    );
  },
};
