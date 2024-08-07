import type { Meta, StoryObj } from "@storybook/react";
import iconNames from "../../public/symbiosis-assets/iconNames.json"
import { Icon, IconProps } from "@synopsisapp/symbiosis-ui";

const iconOptions: string[] = [];

if (iconNames) {
  iconOptions.push(...iconNames);
}

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      options: iconOptions as string[],
    },
    size: {
      control: {
        type: "select",
        options: ["small-200", "small-100", "base", "large-100", "large-200", "font"],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "google-play",
    size: "base",
  },
};

export const DifferentSizes: Story = {
  render: (args: IconProps) => (
    <div className="flex flex-col gap-4 items-start">
      <Icon {...args} size="small-200" name="vite" />
      <Icon {...args} size="small-100" name="vite" />
    </div>
  ),
  args: {
    ...Default.args,
  }
}

export const AllIcons: Story = {
  render: (args: IconProps) => (
    <div className="flex gap-10 h-[foo-bar]">
      {iconOptions.map((name) => (
        <Icon {...args} key={name} name={name} />
      ))}
    </div>
  ),
  args: {
    ...Default.args,
  }
}
