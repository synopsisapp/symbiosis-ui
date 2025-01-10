import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberField, type NumberFieldProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<NumberFieldProps> = {
  title: "Components/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Label for the NumberField",
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
        type: "number",
      },
      description: "Value of the NumberField",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    hint: {
      control: {
        type: "text",
      },
      description: "Hint text for the NumberField",
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
      description: "Placeholder text for the NumberField",
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
      description: "Whether the NumberField is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    min: {
      control: {
        type: "number",
      },
      description: "Minimum value allowed",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    max: {
      control: {
        type: "number",
      },
      description: "Maximum value allowed",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    step: {
      control: {
        type: "number",
      },
      description: "Step value for increments/decrements",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: { summary: "1" },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small-100", "small-200", "base", "large-100"],
      },
      description: "Size of the NumberField",
      table: {
        defaultValue: { summary: "base" },
        type: {
          summary: "small-100 | small-200 | base | large-100",
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
    onChange: {
      control: false,
      description: "Event handler called when the value changes",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    onBlur: {
      control: false,
      description: "Event handler called when the field loses focus",
      table: {
        type: {
          summary: "(value: string) => void",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<NumberFieldProps>;

export const Default: Story = {
  render: (args) => <NumberField {...args} />,
  args: {
    label: "Default NumberField",
    placeholder: "Enter number",
  },
};

export const WithMinMax: Story = {
  render: (args) => <NumberField {...args} />,
  args: {
    label: "NumberField with Min/Max",
    min: 0,
    max: 100,
    hint: "Value must be between 0 and 100",
  },
};

export const WithError: Story = {
  render: (args) => <NumberField {...args} />,
  args: {
    label: "NumberField with Error",
    error: "This field is required",
    required: true,
  },
};

export const CustomStep: Story = {
  render: (args) => <NumberField {...args} />,
  args: {
    label: "Custom Step NumberField",
    step: 0.5,
    hint: "Increments/decrements by 0.5",
  },
};

export const Disabled: Story = {
  render: (args) => <NumberField {...args} />,
  args: {
    label: "Disabled NumberField",
    disabled: true,
    value: 42,
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <>
      <NumberField {...args} size="small-200" label="Small 200" />
      <NumberField {...args} size="small-100" label="Small 100" />
      <NumberField {...args} size="base" label="Base" />
      <NumberField {...args} size="large-100" label="Large 100" />
    </>
  ),
  args: {
    placeholder: "Enter number",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<number>(0);

    return <NumberField {...args} value={value} onChange={(value) => setValue(value ?? 0)} />;
  },
  args: {
    label: "Controlled NumberField",
    placeholder: "Enter number",
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledNumberField = () => {
  const [value, setValue] = React.useState<number>(0);

  return <NumberField label="Controlled NumberField" placeholder="Enter number" value={value} onChange={setValue} />;
}
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomStyled: Story = {
  render: (args) => <NumberField {...args} className="[&>div[data-symbiosis-numberfield='hint']]:text-red-300" />,
  args: {
    label: "Custom Styled NumberField",
    placeholder: "Enter number",
    hint: "This is a custom styled hint",
  },
};
