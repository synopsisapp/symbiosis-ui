import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, type RadioProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<RadioProps["Root"]> = {
	title: "Components/Radio",
	component: Radio.Root,
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: {
				type: "text",
			},
			description: "Name of the radio group",
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
			description:
				"The identifier for the radio group. If undefined the name prop will be used.",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		required: {
			control: false,
			description:
				"When true, indicates that the user must check a radio item before the owning form can be submitted.",
			table: {
				type: {
					summary: "boolean",
				},
			},
		},
		onChange: {
			control: false,
			description:
				"Event handler called when the value of the radio group changes",
			table: {
				type: {
					summary: "(value: string) => void",
				},
			},
		},
		defaultValue: {
			control: false,
			description:
				"The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		orientation: {
			options: ["horizontal", "vertical"],
			control: { type: "select" },
			description: "The orientation of the radio items",
			table: {
				defaultValue: { summary: "vertical" },
				type: {
					summary: "horizontal | vertical",
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<RadioProps["Root"]>;

export const Default: Story = {
	render: (args) => (
		<Radio.Root {...args}>
			{/* Math.random as the value cause storybook renders this story twice and then the first story would detect actions of the second story */}
			<Radio.Item value={`${Math.random()}`} label="Option 1" />
			<Radio.Item value={`${Math.random()}`} label="Option 2" />
			<Radio.Item value={`${Math.random()}`} label="Option 3" />
		</Radio.Root>
	),
	args: {
		name: "default-radio-group",
		id: "default-radio-group-id",
	},
};

export const DifferentSizes: Story = {
	render: (args) => (
		<Radio.Root {...args}>
			<Radio.Item value="small200" label="Small 200" size="small-200" />
			<Radio.Item value="small100" label="Small 100" size="small-100" />
			<Radio.Item value="base" label="Base" size="base" />
			<Radio.Item value="large100" label="Large 100" size="large-100" />
		</Radio.Root>
	),
	args: {
		name: "size-radio-group",
	},
};

export const CustomisedUI: Story = {
	render: (args) => (
		<Radio.Root {...args}>
			<Radio.Item
				value="option-ui-1"
				label="Option 1"
				className="text-blue-500 border-blue-500 hover:bg-blue-50 before:border-blue-500"
			/>
			<Radio.Item
				value="option-ui-2"
				label="Option 2"
				className="text-green-500 border-green-500 hover:bg-green-50 before:border-green-500"
			/>
			<Radio.Item
				value="option-ui-3"
				label="Option 3"
				className="text-red-500 border-red-500 hover:bg-red-50 before:border-red-500"
			/>
		</Radio.Root>
	),
	args: {
		name: "customised-radio-group",
	},
};

export const WithDefaultValue: Story = {
	render: (args) => (
		<Radio.Root {...args}>
			<Radio.Item value="option-with-def-1" label="Option 1" />
			<Radio.Item value="option-with-def-2" label="Option 2" />
			<Radio.Item value="option-with-def-3" label="Option 3" />
		</Radio.Root>
	),
	args: {
		name: "default-value-radio-group",
		defaultValue: "option2",
	},
};

export const WithoutLabels: Story = {
	render: (args) => (
		<Radio.Root {...args}>
			<Radio.Item value="option-no-label-1" />
			<Radio.Item value="option-no-label-2" />
			<Radio.Item value="option-no-label-3" />
		</Radio.Root>
	),
	args: {
		name: "no-label-radio-group",
	},
};

export const Controlled: Story = {
	render: (args) => {
		const [value, setValue] = React.useState("option1");
		return (
			<Radio.Root {...args} onChange={setValue} defaultValue={value}>
				<Radio.Item value="option1" label="Option 1" />
				<Radio.Item value="option2" label="Option 2" />
				<Radio.Item value="option3" label="Option 3" />
			</Radio.Root>
		);
	},
	args: {
		name: "controlled-radio-group",
	},
	parameters: {
		docs: {
			source: {
				code: `
const ControlledRadioGroup = () => {
  const [value, setValue] = React.useState("option1");
    return (
      <Radio.Root name={controlled-radio-group} onChange={setValue} defaultValue={value}>
        <Radio.Item value="option1" label="Option 1" />
        <Radio.Item value="option2" label="Option 2" />
        <Radio.Item value="option3" label="Option 3" />
      </Radio.Root>
    );
}
    `,
				language: "tsx",
				type: "code",
			},
		},
	},
};
