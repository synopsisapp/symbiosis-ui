import type { Meta, StoryObj } from "@storybook/react";
import {
  Breadcrumb,
} from "@synopsisapp/symbiosis-ui";

const meta: Meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb.Root,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb.Root {...args}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#library">Library</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Data</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
  args: {},
};
export const DefaultWithoutLinks: Story = {
  render: (args) => (
    <Breadcrumb.Root {...args}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <span>Library</span>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Data</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#home">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <span> / </span>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#library">Library</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <span> / </span>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Data</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  ),
};
