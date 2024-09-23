import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Table.Root> = {
  title: "Components/Table",
  component: Table.Root,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Table.Root>;

const rows = [
  {
    id: "1",
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    id: "2",
    invoice: "INV002",
    status: "Pending",
    method: "Paypal",
    amount: "$150.00",
  },
  {
    id: "3",
    invoice: "INV003",
    status: "Failed",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    id: "4",
    invoice: "INV004",
    status: "Refunded",
    method: "Debit Card",
    amount: "$100.00",
  },
];

export const Default: Story = {
  render: (args) => (
    <Table.Root {...args}>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[100px]">Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Method</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell className="font-medium">{row.invoice}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.method}</Table.Cell>
            <Table.Cell className="text-right">{row.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell className="text-right font-medium">$850.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
    </Table.Root>
  ),
  args: {},
};
