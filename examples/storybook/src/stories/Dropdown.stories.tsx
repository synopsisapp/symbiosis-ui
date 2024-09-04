import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown, type DropdownProps, Icon } from "@synopsisapp/symbiosis-ui";

const meta: Meta<DropdownProps["Root"]> = {
  title: "Components/Dropdown",
  component: Dropdown.Root,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<DropdownProps["Root"]>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center justify-center">
      <Dropdown.Root {...args}>
        <Dropdown.Trigger>
          <div>Open</div>
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item>Item 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    </div>
  ),
  args: {},
};

export const WithIcons: Story = {
  render: (args) => (
    <Dropdown.Root {...args}>
      <Dropdown.Trigger>
        <div>Open</div>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content>
          <Dropdown.SimpleItem text="Edit" icon="edit" onSelect={() => console.log("Edit selected")} />
          <Dropdown.SimpleItem text="Delete" icon="file-description" onSelect={() => console.log("Delete selected")} />
          <Dropdown.SimpleItem text="Share" icon="heart-filled" onSelect={() => console.log("Share selected")} />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  ),
  args: {},
};

export const WithGroups: Story = {
  render: (args) => (
    <Dropdown.Root {...args}>
      <Dropdown.Trigger>
        <div>Open</div>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content>
          <Dropdown.Group label="File">
            <Dropdown.SimpleItem text="New" onSelect={() => console.log("New selected")} />
            <Dropdown.SimpleItem text="Open" onSelect={() => console.log("Open selected")} />
            <Dropdown.SimpleItem text="Save" onSelect={() => console.log("Save selected")} />
          </Dropdown.Group>
          <Dropdown.Separator />
          <Dropdown.Group label="Edit">
            <Dropdown.SimpleItem text="Cut" onSelect={() => console.log("Cut selected")} />
            <Dropdown.SimpleItem text="Copy" onSelect={() => console.log("Copy selected")} />
            <Dropdown.SimpleItem text="Paste" onSelect={() => console.log("Paste selected")} />
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  ),
  args: {},
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Dropdown.Root {...args}>
      <Dropdown.Trigger>
        <div>Open</div>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content>
          <Dropdown.SimpleItem text="Enabled Option" onSelect={() => console.log("Enabled option selected")} />
          <Dropdown.SimpleItem
            text="Disabled Option"
            isDisabled
            onSelect={() => console.log("This should not be called")}
          />
          <Dropdown.Separator />
          <Dropdown.SimpleItem
            text="Another Enabled Option"
            onSelect={() => console.log("Another enabled option selected")}
          />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  ),
  args: {},
};

export const CustomContent: Story = {
  render: (args) => (
    <Dropdown.Root {...args}>
      <Dropdown.Trigger>
        <div>Open</div>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className="bg-violet-200">
          <Dropdown.MenuLabel label="Custom Content" />
          <Dropdown.Item onSelect={() => console.log("Custom item selected")}>
            <div className="flex items-center gap-2">
              <Icon name="google-play" size="small-200" />
              <span>Custom Item with Icon</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={() => console.log("Another custom item selected")}
            className="bg-violet-400 text-white rounded-md hover:bg-violet-600 focus:bg-violet-600"
          >
            <div className="flex items-center gap-2">Custom Item with custom style</div>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  ),
  args: {},
};
