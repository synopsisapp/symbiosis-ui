import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, DateRangeField, type DateRangeFieldProps } from "@synopsisapp/symbiosis-ui";
import { de } from "date-fns/locale";

const meta: Meta<DateRangeFieldProps> = {
  title: "Components/DateRangeField",
  component: DateRangeField,
  tags: ["autodocs"],
  argTypes: {
    labelFrom: {
      control: {
        type: "text",
      },
      description: "Label for the DateRangeField from",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    labelTo: {
      control: {
        type: "text",
      },
      description: "Label for the DateRangeField to",
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
      description: "Error message for the date range field",
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
      description: "Whether the date range field is required",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: {
      control: {
        type: "text",
      },
      description: "Hint text for the DateRangeField",
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
      description: "Placeholder text for the DateRangeField",
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
      description: "Whether the DateRangeField is disabled",
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
      description: "Size of the DateRangeField",
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
type Story = StoryObj<DateRangeFieldProps>;

export const Default: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} className="w-20" />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
  },
};

export const InForm: Story = {
  render: (args: DateRangeFieldProps) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      alert(`Submitted date: ${formData.get("birthday-from")} - ${formData.get("birthday-to")}`);
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-sm">
        <DateRangeField {...args} name="birthday" />
        <Button type="submit" label="Submit" />
      </form>
    );
  },
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
  },
};

export const WithLocale: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    locale: de,
    withDatePicker: true,
  },
};

export const WithError: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    error: "Please select valid dates",
    required: true,
    withDatePicker: true,
  },
};

export const WithHint: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    hint: "Select your date range",
    withDatePicker: true,
  },
};

export const Disabled: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    disabled: true,
    placeholder: "Select dates",
    withDatePicker: true,
  },
};

export const WithDateRestrictions: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
    disabledBefore: new Date(),
    disabledAfter: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    hint: "Select dates within the next 30 days",
  },
};

export const WithDefaultDate: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
    defaultValue: {
      from: new Date("2025-01-15"),
      to: new Date("2025-01-22"),
    },
    hint: "Default date range is 2025-01-15 to 2025-01-22",
  },
};

export const WithoutDatePicker: Story = {
  render: (args: DateRangeFieldProps) => <DateRangeField {...args} />,
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: false,
    placeholder: "MM/DD/YYYY",
    hint: "Type the dates manually",
  },
};

export const Controlled: Story = {
  render: (args: DateRangeFieldProps) => {
    const [value, setValue] = React.useState<{ from?: Date; to?: Date }>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    return <DateRangeField {...args} value={value} onChange={setValue} />;
  },
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
    placeholder: "Select dates",
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledDateRangeField = () => {
  const [value, setValue] = React.useState<{ from?: Date; to?: Date }>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return (
    <DateRangeField
      labelFrom="From"
      labelTo="To"
      withDatePicker={true}
      placeholder="Select dates"
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
  render: (args: DateRangeFieldProps) => (
    <DateRangeField {...args} className="[&>div[data-symbiosis-textfield='hint']]:text-red-300" />
  ),
  args: {
    labelFrom: "From",
    labelTo: "To",
    withDatePicker: true,
    hint: "This is a custom styled hint",
    placeholder: "Select dates",
  },
};
