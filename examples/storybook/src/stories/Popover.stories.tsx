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
      description:
        "The controlled open state of popover. Must be used in conjunction with onOpenChange.",
      required: false,
    },
    onOpenChange: {
      table: {
        type: { summary: "(open: boolean) => void" },
      },
      description:
        "Event handler called when the open state of the popover changes.",
      control: false,
      required: false,
    },
    side: {
      control: {
        type: "select",
      },
      options: ["top", "right", "bottom", "left"],
      description: "Side of the popover",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "top" },
      },
    },
    closeIcon: {
      options: ["close", "edit"],
      control: { type: "select" },
      description: "Icon to use for the close button",
      table: {
        type: { summary: "string" },
      },
    },
    tone: {
      options: ["monochrome-dark", "monochrome-light"],
      control: { type: "select" },
      description: "Tone of the popover",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "monochrome-dark" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<PopoverProps["Root"] & PopoverProps["Content"]>;

export const Default: Story = {
  render: (args) => {
    const { closeIcon, side, tone, ...rootArgs } = args;
    return (
      <Popover.Root {...rootArgs}>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content side={side} closeIcon={closeIcon} tone={tone}>
          Popover content
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const { closeIcon, side, tone } = args;
    const [open, setOpen] = React.useState(false);

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content side={side} closeIcon={closeIcon} tone={tone}>
          Popover content
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    );
  },
  args: {
    side: "top",
    closeIcon: "close",
    tone: "monochrome-dark",
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

export const CustomContent: Story = {
  render: (args) => {
    const { closeIcon, side, tone } = args;
    return (
      <Popover.Root>
        <Popover.Trigger>
          <span>Open Popover</span>
        </Popover.Trigger>
        <Popover.Content
          side={side}
          closeIcon={closeIcon}
          tone={tone}
          className="bg-lime-200"
        >
          <div>Popover content</div>
          <Popover.Arrow className="fill-lime-200" />
        </Popover.Content>
      </Popover.Root>
    );
  },
  args: {
    side: "top",
    closeIcon: "close",
    tone: "monochrome-dark",
  },
};
