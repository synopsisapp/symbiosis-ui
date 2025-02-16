import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, DateField, type DateFieldProps } from "@synopsisapp/symbiosis-ui";
import { de } from "date-fns/locale";

const meta: Meta<DateFieldProps> = {
  title: "Components/DateField",
  component: DateField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "Label for the DateField",
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
      description: "Error message for the date field",
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
      description: "Whether the date field is required",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    value: {
      control: {
        type: "date",
      },
      description: "Selected date value",
      table: {
        type: {
          summary: "Date",
        },
      },
    },
    hint: {
      control: {
        type: "text",
      },
      description: "Hint text for the DateField",
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
      description: "Placeholder text for the DateField",
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
      description: "Whether the DateField is disabled",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    withDatePicker: {
      control: {
        type: "boolean",
      },
      description: "Whether to show the date picker",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    disabledBefore: {
      control: {
        type: "date",
      },
      description: "Disable dates before this date",
      table: {
        type: {
          summary: "Date",
        },
      },
    },
    disabledAfter: {
      control: {
        type: "date",
      },
      description: "Disable dates after this date",
      table: {
        type: {
          summary: "Date",
        },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small-100", "small-200", "base", "large-100"],
      },
      description: "Size of the DateField",
      table: {
        defaultValue: { summary: "base" },
        type: {
          summary: "small-100 | small-200 | base | large-100",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DateFieldProps>;

export const Default: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "Default DateField",
    withDatePicker: true,
  },
};

export const InForm: Story = {
  render: (args: DateFieldProps) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      alert(`Submitted date: ${formData.get("birthday")}`);
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-sm">
        <DateField {...args} name="birthday" />
        <Button type="submit" label="Submit" />
      </form>
    );
  },
  args: {
    label: "Birthday",
    placeholder: "DD/MM/YYYY",
    hint: "Enter your birth date",
    required: true,
    withDatePicker: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
const BirthdayForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(\`Submitted date: \${formData.get('birthday')}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateField 
        name="birthday"
        label="Birthday"
        placeholder="DD/MM/YYYY"
        hint="Enter your birth date"
        required
        withDatePicker={false}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const WithLocale: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField with Locale",
    locale: de,
    withDatePicker: true,
  },
};

export const WithError: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField with Error",
    error: "Please select a valid date",
    required: true,
    withDatePicker: true,
  },
};

export const WithHint: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField with Hint",
    hint: "Select your preferred date",
    withDatePicker: true,
  },
};

export const Disabled: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "Disabled DateField",
    disabled: true,
    placeholder: "MM/DD/YYYY",
    withDatePicker: true,
  },
};

export const WithDateRestrictions: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField with Restrictions",
    withDatePicker: true,
    disabledBefore: new Date(),
    disabledAfter: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    hint: "Select a date within the next 30 days",
  },
};

export const WithDefaultDate: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField with Default Date (2025-01-15)",
    withDatePicker: true,
    placeholder: "MM/DD/YYYY",
    defaultValue: new Date("2025-01-15"),
  },
};

export const WithoutDatePicker: Story = {
  render: (args: DateFieldProps) => <DateField {...args} />,
  args: {
    label: "DateField without Picker",
    withDatePicker: false,
    placeholder: "MM/DD/YYYY",
    hint: "Type the date manually",
  },
};

export const Controlled: Story = {
  render: (args: DateFieldProps) => {
    const [value, setValue] = React.useState<Date>(new Date());

    return <DateField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Controlled DateField",
    withDatePicker: true,
    placeholder: "MM/DD/YYYY",
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledDateField = () => {
  const [value, setValue] = React.useState<Date>(new Date());

  return (
    <DateField
      label="Controlled DateField"
      withDatePicker={true}
      placeholder="MM/DD/YYYY"
      value={value}
      onChange={setValue}
    />
  );
}
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomStyled: Story = {
  render: (args: DateFieldProps) => (
    <DateField {...args} className="[&>div[data-symbiosis-textfield='hint']]:text-red-300" />
  ),
  args: {
    label: "Custom Styled DateField",
    withDatePicker: true,
    hint: "This is a custom styled hint",
    placeholder: "MM/DD/YYYY",
  },
};
