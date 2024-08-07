import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click me",
    variant: "primary",
    tone: "default",
    size: "base",
    isDisabled: false,
    isLoading: false,
    leftIcon: "edit",
    rightIcon: undefined,
    layout: "normal"
  }
}

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <Button {...args} size="small-200" leftIcon="" />
      <Button {...args} size="small-100" leftIcon="" />
    </div>
  ),
  args: {
    ...Default.args,
  }
}
