import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxProps, Button } from "@synopsisapp/symbiosis-ui";

const meta: Meta<ComboboxProps> = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Array of options to display in the combobox",
      table: {
        type: {
          summary: "Array<{ value: string; label: string; }>",
        },
      },
    },
    onValuesChange: {
      control: false,
      description: "Callback function called when selected values change",
      table: {
        type: {
          summary: "(selectedOptions: Option[]) => void",
        },
      },
    },
    noResultsLabel: {
      control: "text",
      description: "Text to display when no results are found",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    allowCustomValues: {
      control: "boolean",
      description: "Whether to allow adding custom values",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ComboboxProps>;

const defaultOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

export const Default: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    options: defaultOptions,
    placeholder: "Select fruits...",
    noResultsLabel: "No fruits found",
  },
};

export const WithAddCustomValuesFunctionality: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    options: defaultOptions,
    placeholder: "Add your favorite fruits...",
    noResultsLabel: "No fruits found",
    allowCustomValues: true,
    addNewOptionLabel: "Add",
  },
};

export const WithSingleSelect: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
    noResultsLabel: "No fruits found",
    singleSelect: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = React.useState<Array<{ value: string; label: string }>>([]);

    return (
      <div>
        <Combobox
          {...args}
          onValuesChange={setSelectedOptions}
          selectedOptions={selectedOptions}
        />
        <div className="my-4">Selected values: {selectedOptions.map((option) => option.label).join(", ")}</div>

        <div className="flex gap-4">
          <Button
            onPress={() => {
              setSelectedOptions(args.options)
            }}
            label="Select all"
            size="small-100"
          />
          <Button
            onPress={() => {
              setSelectedOptions([]);
            }}
            variant="outline"
            size="small-100"
            label="Clear selection"
          />
        </div>
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Select fruits...",
    noResultsLabel: "No fruits found",
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledCombobox = () => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  return (
    <div>
      <Combobox
        options={options}
        placeholder="Select fruits..."
        noResultsLabel="No fruits found"
        onValuesChange={setSelectedOptions}
      />
      <div>
        Selected values: {selectedOptions.map((option) => option.label).join(", ")}
      </div>
    </div>
  );
};
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const CustomStyled: Story = {
  render: (args) => <Combobox {...args} className="**:data-[symbiosis-combobox=trigger]:bg-red-300" />,
  args: {
    options: defaultOptions,
    placeholder: "Custom styled combobox...",
    noResultsLabel: "No fruits found",
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape", disabled: true },
      { value: "mango", label: "Mango" },
      { value: "pear", label: "Pear", disabled: true },
    ],
    placeholder: "Select fruits (some options disabled)...",
    noResultsLabel: "No fruits found",
  },
};
