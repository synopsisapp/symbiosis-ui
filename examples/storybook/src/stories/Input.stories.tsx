import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<InputProps> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Label for the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    error: {
      control: {
        type: "text",
      },
      description: "Error message for the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    required: {
      control: {
        type: "boolean",
      },
      description: "Whether the input field is required",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    value: {
      control: {
        type: "text",
      },
      description: "Value of the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    hint: {
      control: {
        type: "text",
      },
      description: "Hint text for the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
      description: "Placeholder text for the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    icon: {
      control: {
        type: "text",
      },
      description: "Icon name for the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "Whether the input field is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onChange: {
      control: false,
      description: "Event handler called when the value of the input field changes",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    onBlur: {
      control: false,
      description: "Event handler called when the input field loses focus",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    name: {
      control: {
        type: "text",
      },
      description: "Name of the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: {
        type: "text",
      },
      description: "Default value of the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small-100", "small-200", "base", "large-100"],
      },
      description: "Size of the input field",
      table: {
        defaultValue: { summary: "base" },
        type: {
          summary: "small-100 | small-200 | base | large-100",
        },
      },
    },
    id: {
      control: {
        type: "text",
      },
      description: "ID of the input field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: "Default Input",
    placeholder: "Enter text",
  },
};

export const WithError: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: "Input with Error",
    error: "This field is required",
    required: true,
  },
};

export const WithHint: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: "Input with Hint",
    hint: "This is a hint",
  },
};

export const WithIcon: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: "Input with Icon",
    icon: "symbiosis-minus",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: "Disabled Input",
    disabled: true,
    placeholder: "Disabled",
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <>
      <Input {...args} size="small-200" label="Small 200" />
      <Input {...args} size="small-100" label="Small 100" />
      <Input {...args} size="base" label="Base" />
      <Input {...args} size="large-100" label="Large 100" />
    </>
  ),
  args: {
    placeholder: "Enter text",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");

    return <Input {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Controlled Input",
    placeholder: "Enter text",
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledInput = () => {
  const [value, setValue] = React.useState("");

  return <Input label="Controlled Input" placeholder="Enter text" value={value} onChange={setValue} />;
}
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomStyled: Story = {
  render: (args) => <Input {...args} className="[&>div[data-symbiosis-input='hint']]:text-red-300 " />,
  args: {
    label: "Custom Styled Input",
    placeholder: "Enter text",
    hint: "This is a custom styled input",
  },
};
