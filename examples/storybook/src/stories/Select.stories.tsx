import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Select.Root> = {
  title: "Components/Select",
  component: Select.Root,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};

export const WithGroups: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
          <Select.Item value="tomato">Tomato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Enabled Option</Select.Item>
        <Select.Item value="option2" disabled>
          Disabled Option
        </Select.Item>
        <Select.Separator />
        <Select.Item value="option3">Another Enabled Option</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};

export const CustomTrigger: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger className="bg-violet-100 border-violet-300 hover:bg-violet-200">
        <Select.Value placeholder="Custom styled trigger" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};

export const CustomContent: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select with custom content" />
      </Select.Trigger>
      <Select.Content className="bg-violet-50">
        <Select.Item value="option1" className="hover:bg-violet-100 focus:bg-violet-100">
          Custom Option 1
        </Select.Item>
        <Select.Item value="option2" className="hover:bg-violet-100 focus:bg-violet-100">
          Custom Option 2
        </Select.Item>
        <Select.Separator className="bg-violet-200" />
        <Select.Item value="option3" className="hover:bg-violet-100 focus:bg-violet-100">
          Custom Option 3
        </Select.Item>
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};

export const WithScrollButtons: Story = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select a month" />
      </Select.Trigger>
      <Select.Content>
        {Array.from({ length: 24 }, (_, i) => {
          const date = new Date();
          date.setMonth(i);
          return (
            <Select.Item
              key={`month-${
                // biome-ignore lint/suspicious/noArrayIndexKey: it's a mock example
                i
              }`}
              value={`month-${i}`}
            >
              {date.toLocaleString("default", { month: "long" })} {Math.floor(i / 12) + 1}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  ),
  args: {},
};
