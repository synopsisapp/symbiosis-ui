import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton, type SplitButtonProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "outline", "ghost"],
      description: "Visual style variant of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    tone: {
      control: { type: "select" },
      options: ["default", "destructive", "monochrome-light", "monochrome-dark"],
      description: "Color tone of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small-200", "small-100", "base"],
      description: "Size of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "base" },
      },
    },
    leftIcon: {
      control: { type: "text" },
      description: "Icon to display on the left side of the button",
    },
    rightIcon: {
      control: { type: "text" },
      description: "Icon to display on the right side of the button",
    },
    isDisabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Whether the button is in a loading state",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

const defaultItems = [
  {
    text: "Option 1",
    icon: "edit",
    onSelect: () => console.log("Option 1 selected"),
  },
  {
    text: "Option 2",
    icon: "close",
    onSelect: () => console.log("Option 2 selected"),
  },
  {
    text: "Section Title",
    isSectionTitle: true,
    isSeparated: true,
  },
  {
    text: "Option 3",
    icon: "symbiosis-chevron-down",
    onSelect: () => console.log("Option 3 selected"),
  },
];

export const Default: Story = {
  args: {
    label: "Split Button",
    variant: "primary",
    tone: "default",
    size: "base",
    isDisabled: false,
    isLoading: false,
    leftIcon: "edit",
    items: defaultItems as SplitButtonProps["items"],
  },
};

export const DifferentVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <SplitButton {...args} variant="primary" />
      <SplitButton {...args} variant="outline" />
      <SplitButton {...args} variant="ghost" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const DifferentTones: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <SplitButton {...args} tone="default" />
      <SplitButton {...args} tone="destructive" />
      <div className="bg-red-200 p-2">
        (custom background container to showcase)
        <SplitButton {...args} tone="monochrome-light" />
      </div>
      <SplitButton {...args} tone="monochrome-dark" />
      <SplitButton {...args} layout="fullwidth" tone="destructive" />
      <SplitButton {...args} layout="fullwidth" tone="monochrome-light" />
      <SplitButton {...args} layout="fullwidth" tone="monochrome-dark" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <SplitButton {...args} size="small-200" />
      <SplitButton {...args} size="small-100" />
      <SplitButton {...args} size="base" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <SplitButton {...args} leftIcon="edit" />
      <SplitButton {...args} rightIcon="google-play" />
      <SplitButton {...args} leftIcon="edit" rightIcon="google-play" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-start">
      <SplitButton {...args} isDisabled={true} />
      <SplitButton {...args} isLoading={true} />
    </div>
  ),
  args: {
    ...Default.args,
  },
};
