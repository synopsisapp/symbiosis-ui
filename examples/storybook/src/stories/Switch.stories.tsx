
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch, type SwitchProps } from "@synopsisapp/symbiosis-ui";

const meta: Meta<SwitchProps> = {
	title: "Components/Switch",
	component: Switch,
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: {
				type: "text",
			},
			description:
				"The name of the switch. Submitted with its owning form as part of a name/value pair.",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		size: {
			control: "select",
			options: ["base", "small-100", "small-200", "large-100"],
			description: "The size of the switch",
			table: {
				defaultValue: { summary: "base" },
				type: {
					summary: "base | small-100 | small-200 | large-100",
				},
			},
		},
		defaultChecked: {
			control: false,
			description:
				"The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		onCheckedChange: {
			control: false,
			description:
				"Event handler called when the value of the radio group changes",
			table: {
				type: {
					summary: "(checked: string) => void | undefined",
				},
			},
		},
		label: {
			control: "text",
			description: "The label for the switch",
			table: {
				type: {
					summary: "string",
				},
			},
		},
		value: {
			control: "boolean",
			description: "The value given as data when submitted with a name.",
			table: {
				type: {
					summary: "boolean",
				},
			},
		},
		disabled: {
			control: "boolean",
			description:
				"When true, prevents the user from interacting with the switch.",
			table: {
				type: {
					summary: "boolean",
				},
			},
		},
	},
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Default: Story = {
	args: {
		size: "base",
		defaultChecked: false,
		label: "Switch Label",
	},
};

export const Checked: Story = {
	args: {
		...Default.args,
		defaultChecked: true,
	},
};

export const WithoutLabel: Story = {
	render: (args) => <Switch {...args} />,
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const DifferentSizes: Story = {
	decorators: [
		(Story) => (
			<div className="flex flex-col gap-4 items-start">
				<Story />
			</div>
		),
	],

	render: (args) => (
		<>
			<Switch {...args} size="small-200" />
			<Switch {...args} size="small-100" />
			<Switch {...args} size="base" />
			<Switch {...args} size="large-100" />
		</>
	),
	args: {
		...Default.args,
	},
};

export const Controlled: Story = {
	render: (args) => {
		const [checked, setChecked] = React.useState(false);

		return <Switch {...args} value={checked} onCheckedChange={setChecked} />;
	},
	parameters: {
		docs: {
			source: {
				code: `
const ControlledSwitch = () => {
  const [checked, setChecked] = React.useState(false);

  return <Switch value={checked} onCheckedChange={setChecked} />;
}
`,
			},
		},
	},
};
