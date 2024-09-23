import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: { type: "number" },
      description: "The total number of pages",
      table: {
        type: { summary: "number" },
      },
    },
    initialPage: {
      control: { type: "number" },
      description: "The initial active page when the component is first rendered",
      table: {
        type: { summary: "number" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small-200", "small-100", "base", "large-100"],
      description: "The size of the pagination component",
      table: {
        defaultValue: { summary: "base" },
        type: { summary: "small-200 | small-100 | base | large-100" },
      },
    },
    hasEdges: {
      control: { type: "boolean" },
      description: "Whether to show the first and last page buttons",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    onPageChange: {
      control: false,
      description: "Event handler called when the active page changes",
      table: {
        type: { summary: "(page: number) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 10,
    initialPage: 1,
    size: "base",
    hasEdges: true,
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <>
      <Pagination {...args} total={10} initialPage={1} size="small-200" hasEdges={true} />
      <Pagination {...args} total={10} initialPage={1} size="small-100" hasEdges={true} />
      <Pagination {...args} total={10} initialPage={1} size="base" hasEdges={true} />
      <Pagination {...args} total={10} initialPage={1} size="large-100" hasEdges={true} />
    </>
  ),
  args: {
    ...Default.args,
  },
};

export const WithoutEdges: Story = {
  args: {
    ...Default.args,
    hasEdges: false,
  },
};

export const ManyPages: Story = {
  args: {
    ...Default.args,
    total: 50,
    initialPage: 25,
  },
};

export const WithPageChangeHandler: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => <Pagination {...args} onPageChange={(page) => console.log(`Page changed to ${page}`)} />,
};
