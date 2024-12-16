import type { Meta, StoryObj } from "@storybook/react";
import { Pill, type PillProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<PillProps> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Text content of the pill",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["primary", "outline"],
      },
      description: "Visual style variant of the pill",
      table: {
        defaultValue: { summary: "primary" },
        type: {
          summary: "primary | outline",
        },
      },
    },
    tone: {
      control: {
        type: "select",
        options: ["default", "destructive"],
      },
      description: "Color tone of the pill",
      table: {
        defaultValue: { summary: "default" },
        type: {
          summary: "default | destructive",
        },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small-200", "small-100", "base", "large-100"],
      },
      description: "Size of the pill",
      table: {
        defaultValue: { summary: "base" },
        type: {
          summary: "small-200 | small-100 | base | large-100",
        },
      },
    },
    leftIcon: {
      control: {
        type: "text",
      },
      description: "Icon displayed on the left side of the pill",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    isRounded: {
      control: {
        type: "boolean",
      },
      description: "Whether the pill has fully rounded corners",
      table: {
        defaultValue: { summary: "true" },
        type: {
          summary: "boolean",
        },
      },
    },
    onClose: {
      control: false,
      description: "Callback function when the close button is clicked",
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<PillProps>;

export const Default: Story = {
  render: (args) => <Pill {...args} />,
  args: {
    label: "Default Pill",
    variant: "primary",
    tone: "default",
  },
};

export const WithIcon: Story = {
  render: (args) => <Pill {...args} />,
  args: {
    label: "Pill with Icon",
    variant: "primary",
    tone: "default",
    leftIcon: "symbiosis-minus",
  },
};

export const Closeable: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Pill {...args} size="small-200" />
      <Pill {...args} size="small-100" />
      <Pill {...args} size="base" />
      <Pill {...args} size="large-100" />
    </div>
  ),
  args: {
    label: "Closeable Pill",
    variant: "primary",
    tone: "default",

    onClose: () => alert("Pill closed!"),
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Pill {...args} size="small-200" label="Small 200" />
      <Pill {...args} size="small-100" label="Small 100" />
      <Pill {...args} size="base" label="Base" />
      <Pill {...args} size="large-100" label="Large 100" />
    </div>
  ),
  args: {
    variant: "primary",
    tone: "default",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Pill {...args} variant="primary" label="Primary" />
      <Pill {...args} variant="outline" label="Outline" />
      <Pill {...args} variant="primary" tone="destructive" label="Primary Destructive" />
      <Pill {...args} variant="outline" tone="destructive" label="Outline Destructive" />
    </div>
  ),
  args: {
    tone: "default",
  },
};

export const NonRounded: Story = {
  render: (args) => <Pill {...args} />,
  args: {
    label: "Non-rounded Pill",
    variant: "primary",
    tone: "default",

    isRounded: false,
  },
};
