import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextAreaField, type TextAreaFieldProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<TextAreaFieldProps> = {
  title: "Components/TextAreaField",
  component: TextAreaField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Label for the TextAreaField",
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
      description: "Default value for the textarea field",
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
      description: "Error message for the textarea field",
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
      description: "Whether the textarea field is required",
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
      description: "Value of the TextAreaField",
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
      description: "Hint text for the TextAreaField",
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
      description: "Placeholder text for the TextAreaField",
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
      description: "Icon name for the textarea field",
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
      description: "Whether the TextAreaField is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    rows: {
      control: {
        type: "number",
      },
      description: "Number of visible text lines",
      table: {
        type: {
          summary: "number",
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
    name: {
      control: {
        type: "text",
      },
      description: "Name of the textarea field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    id: {
      control: {
        type: "text",
      },
      description: "ID of the textarea field",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TextAreaFieldProps>;

export const Default: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: {
    label: "Default TextAreaField",
    placeholder: "Enter text here...",
    rows: 4,
  },
};

export const WithError: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: {
    label: "TextAreaField with Error",
    error: "This field is required",
    required: true,
    rows: 4,
  },
};

export const WithHint: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: {
    label: "TextAreaField with Hint",
    hint: "This is a helpful hint message",
    rows: 4,
  },
};

export const WithIcon: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: {
    label: "TextAreaField with Icon",
    icon: "symbiosis-minus",
    placeholder: "Type your message...",
    rows: 4,
  },
};

export const Disabled: Story = {
  render: (args) => <TextAreaField {...args} />,
  args: {
    label: "Disabled TextAreaField",
    disabled: true,
    placeholder: "This field is disabled",
    rows: 4,
  },
};

export const DifferentRows: Story = {
  render: (args) => (
    <>
      <TextAreaField {...args} rows={2} label="2 Rows" />
      <TextAreaField {...args} rows={4} label="4 Rows" />
      <TextAreaField {...args} rows={6} label="6 Rows" />
    </>
  ),
  args: {
    placeholder: "Enter text here...",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("");

    return <TextAreaField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Controlled TextAreaField",
    placeholder: "Type something...",
    rows: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledTextAreaField = () => {
  const [value, setValue] = React.useState("");

  return <TextAreaField label="Controlled TextAreaField" placeholder="Type something..." rows={4} value={value} onChange={setValue} />;
}
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomStyled: Story = {
  render: (args) => <TextAreaField {...args} className="[&>div[data-symbiosis-textAreaField='hint']]:text-red-300" />,
  args: {
    label: "Custom Styled TextAreaField",
    placeholder: "Enter text here...",
    hint: "This is a custom styled hint",
    rows: 4,
  },
};
