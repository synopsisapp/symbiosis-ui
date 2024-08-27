import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tooltip, type TooltipProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Tooltip.Root> = {
  title: "Components/Tooltip",
  component: Tooltip.Root,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip.Root>;

export const Uncontrolled: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4 items-start">
        <Story />
      </div>
    ),
  ],
  render: (args: TooltipProps["Root"]) => (
    <Tooltip.Root {...args}>
      <Tooltip.Trigger>
        <span>Hover me</span>
      </Tooltip.Trigger>
      <Tooltip.Content label="Tooltip label" />
    </Tooltip.Root>
  ),
  argTypes: {
    defaultOpen: {
      control: false,
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      description:
        "The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state.",
      required: false,
    },
    open: {
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: "false" },
      },
      type: "boolean",
      description:
        "The controlled open state of the tooltip. Must be used in conjunction with onOpenChange.",
      defaultValue: false,
      required: false,
    },
    onOpenChange: {
      table: {
        type: { summary: "(open: boolean) => void" },
      },
      description:
        "Event handler called when the open state of the tooltip changes.",
      control: false,
      required: false,
    },
  },
};

export const Controlled: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4 items-start">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Tooltip.Root {...args} open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger>
          <span>Hover me</span>
        </Tooltip.Trigger>
        <Tooltip.Content label="Controlled Tooltip" />
      </Tooltip.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
        const ControlledTooltip = () => {
          const [open, setOpen] = React.useState(false);

          return (
              <Tooltip.Root  open={open} onOpenChange={setOpen}>
                <Tooltip.Trigger>
                  <span>Hover me</span>
                </Tooltip.Trigger>
                <Tooltip.Content label="Controlled Tooltip" />
              </Tooltip.Root>
          );
        };
        `,
        language: "jsx",
        type: "code",
      },
    },
  },
};

export const CustomContent: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4 items-start">
        <Story />
      </div>
    ),
  ],
  render: (args: TooltipProps["Root"]) => (
    <Tooltip.Root {...args}>
      <Tooltip.Trigger>
        <span>Hover me</span>
      </Tooltip.Trigger>
      <Tooltip.Content className="bg-mainColors-light-200 rounded-none">
        <div>Popover content</div>
      </Tooltip.Content>
    </Tooltip.Root>
  ),
};
