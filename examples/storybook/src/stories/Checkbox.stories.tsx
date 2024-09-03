import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, type CheckboxProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      table: {
        type: {
          summary: "small-200 | small-100 | base | large-100",
        },
        defaultValue: { summary: "base" },
      },
      options: ["small-200", "small-100", "base", "large-100"],
      description: "Size of the checkbox",
    },
    name: {
      control: {
        type: "text",
      },
      description: "The name of the checkbox. Submitted with its owning form as part of a name/value pair.",
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
      description: "The identifier for the checkbox. If undefined the name prop will be used.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: false,
      description:
        "The value of the checkbox that should be checked when initially rendered. Use when you do not need to control the state of the checkbox.",
      table: {
        type: {
          summary: "boolean | 'indeterminate'",
        },
      },
    },
    value: {
      control: false,
      description: "The value given as data when submitted with a name.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onChange: {
      control: false,
      description: "Event handler called when the value of the checkbox changes",
      table: {
        type: {
          summary: "(checked: boolean | 'indeterminate') => void",
        },
      },
    },
    indeterminate: {
      control: false,
      description: "When true, the checkbox will be in an indeterminate state.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    disabled: {
      control: false,
      description: "When true, prevents the user from interacting with the checkbox.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    required: {
      control: false,
      description:
        "When true, indicates that the user must check the checkbox before the owning form can be submitted.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    id: "checkbox",
    name: "checkbox",
  },
};

export const Disabled: Story = {
  args: {
    id: "checkbox",
    name: "checkbox",
    disabled: true,
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} size="small-200" />
      <Checkbox {...args} size="small-100" />
      <Checkbox {...args} size="base" />
      <Checkbox {...args} size="large-100" />
    </div>
  ),
  args: {
    id: "checkbox",
    name: "checkbox",
  },
};

export const DefaultValue: Story = {
  args: {
    id: "checkbox",
    name: "checkbox",
    defaultValue: true,
  },
};

export const CustomUI: Story = {
  render: (args) => <Checkbox {...args} className="before:border-red-400 border-red-400 text-red-400" />,

  args: {
    id: "checkbox",
    name: "checkbox",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return <Checkbox {...args} value={checked} onChange={(checked) => setChecked(checked)} />;
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox id="checkbox" name="checkbox" value={checked} onChange={(checked) => setChecked(checked)} />;
};
        `,
        language: "tsx",
        type: "code",
      },
    },
  },
  args: {
    id: "checkbox",
    name: "checkbox",
  },
};

export const WithIndeterminateState: Story = {
  render: (args) => {
    const states = ["unchecked", "checked", "indeterminate"] as const;
    const [stateIndex, setStateIndex] = React.useState(0);

    const handleCheckboxChange = () => {
      setStateIndex((prevIndex) => (prevIndex + 1) % states.length);
    };

    const currentState = states[stateIndex];

    return (
      <Checkbox
        {...args}
        value={currentState === "checked"}
        indeterminate={currentState === "indeterminate"}
        onChange={handleCheckboxChange}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const IndeterminateCheckbox = () => {
  const [stateIndex, setStateIndex] = React.useState(0);
  const states = ['unchecked', 'indeterminate', 'checked'] as const;
  const currentState = states[stateIndex];

  const handleCheckboxChange = () => {
    setStateIndex((prevIndex) => (prevIndex + 1) % states.length);
  };

  return (
    <Checkbox
      value={currentState === 'checked'}
      indeterminate={currentState === 'indeterminate'}
      onChange={handleCheckboxChange}
    />
  );
};
        `,
        language: "tsx",
        type: "code",
      },
    },
  },
  args: {
    id: "checkbox",
    name: "checkbox",
  },
};
