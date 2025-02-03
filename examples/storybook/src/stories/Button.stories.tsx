import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonLayout, ButtonTone, ButtonVariant, Sizes } from "@synopsisapp/symbiosis-ui";
import iconNames from "../../public/symbiosis-assets/iconNames.json";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ButtonVariant.options,
      control: { type: "select" },
    },
    tone: {
      options: ButtonTone.options,
      control: { type: "select" },
    },
    size: {
      options: Sizes.options,
      control: { type: "select" },
    },
    leftIcon: {
      options: [undefined, ...iconNames] as SymbiosisUI.IconName[],
      control: { type: "select" },
    },
    rightIcon: {
      options: [undefined, ...iconNames] as SymbiosisUI.IconName[],
      control: { type: "select" },
    },
    layout: {
      options: ButtonLayout.options,
      control: { type: "select" },
    },
  },
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
      <Button {...args} size="small-200" leftIcon="edit" />
      <Button {...args} size="small-100" leftIcon="edit" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};
