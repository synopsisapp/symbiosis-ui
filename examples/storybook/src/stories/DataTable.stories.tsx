import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableProps } from "@synopsisapp/symbiosis-ui";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: false,
      description:
        "An array of objects representing the data to be displayed in the table. Each object represents a row in the table.",
      table: {
        type: { summary: "TData[]" },
      },
    },
    columns: {
      control: false,
      description:
        "An array of the column definitions. This includes properties like header text, accessor functions, and cell rendering.",
      table: {
        type: { summary: "DataTableColumnProps<TData, TValue>[]" },
      },
    },
    maxPerPage: {
      control: { type: "number" },
      description: "The maximum number of rows to display per page.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },
    pinningState: {
      control: false,
      description: "Defines which columns should be pinned to the left or right side of the table.",
      table: {
        type: { summary: "{ left?: string[]; right?: string[]; }" },
      },
    },
    hiddenHeader: {
      control: { type: "boolean" },
      description: "Whether to hide the table header.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    stickyHeader: {
      control: { type: "boolean" },
      description: "Whether to make the header sticky.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isSelectable: {
      control: { type: "boolean" },
      description: "Whether rows can be selected.",
      table: {
        type: { summary: "boolean" },
      },
    },
    isSearchable: {
      control: { type: "boolean" },
      description: "Whether the table can be searched.",
      table: {
        type: { summary: "boolean" },
      },
    },
    headerActions: {
      control: false,
      description:
        "Action items to be displayed in the table header when rows are selected. These actions can be used for bulk operations on selected rows.",
      table: {
        type: { summary: "ActionMenu<TData[]>[]" },
      },
    },
    onRowSelectionChange: {
      action: "onRowSelectionChange",
      description: "Callback function called when row selection changes.",
      table: {
        type: { summary: "(rows: TData[]) => void" },
      },
    },
    defaultSelectedRows: {
      control: false,
      description: "The initially selected rows.",
      table: {
        type: { summary: "TData[]" },
      },
    },
    defaultSorting: {
      control: false,
      description: "The initial sorting state.",
      table: {
        type: { summary: "SortingState" },
      },
    },
    getRowId: {
      control: false,
      description: "Function to get a unique identifier for each row.",
      table: {
        type: { summary: "(data: TData) => string" },
      },
    },
    noResultsFoundText: {
      control: { type: "text" },
      description: "Text to display when no results are found.",
      table: {
        type: { summary: "string" },
      },
    },
    quickActionsText: {
      control: { type: "text" },
      description: "Text for the quick actions button.",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class for the table container.",
      table: {
        type: { summary: "string" },
      },
    },
    selectedRows: {
      control: false,
      description:
        "For controlled components, this prop allows external management of which rows are currently selected. It should be used in conjunction with onRowSelectionChange.",
      table: {
        type: { summary: "TData[]" },
      },
    },
  },
} satisfies Meta<typeof DataTable>;


export default meta;
type Story = StoryObj<typeof DataTable<User, string | number>>;

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "inactive" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "active" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "User", status: "inactive" },
];

const columns: DataTableProps<User, string | number>["columns"] = [
  {
    id: "name",
    header: "Name",
    accessorFn: (row) => row.name,
    type: "text",
    text: (item) => item.getValue(),
    isSortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessorFn: (row) => row.email,
    type: "text",
    text: (item) => item.getValue(),
  },
  {
    id: "role",
    header: "Role",
    accessorFn: (row) => row.role,
    type: "text",
    text: (item) => item.getValue(),
    isSortable: true,
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) => row.status,
    type: "cell",
    cell: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.getValue() === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.getValue()}
      </span>
    ),
  },
  {
    id: "actions",
    type: "text",
    item: (item) => [
      {
        text: "Edit",
        icon: "file-description",
        onSelect: () => console.log("Edit", item),
      },
      {
        text: "Delete",
        icon: "heart-filled",
        onSelect: () => console.log("Delete", item),
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: columns,

  },
};

export const Selectable: Story = {
  args: {
    ...Default.args,
    isSelectable: true,
  },
};

export const Searchable: Story = {
  args: {
    ...Default.args,
    isSearchable: true,
  },
};

export const WithBulkActions: Story = {
  args: {
    ...Selectable.args,
    quickActionsText: "Bulk Actions",
    headerActions: [
      {
        text: "Delete Selected",
        icon: "symbiosis-minus",
        onSelect: (rows) => console.log("Delete selected rows:", rows),
      },
      {
        text: "Export Selected",
        icon: "google-play",
        onSelect: (rows) => console.log("Export selected rows:", rows),
      },
    ],
  },
};

export const WithPinningAndStickyHeader: Story = {
  args: {
    ...Default.args,
    pinningState: {
      left: ["name"],
    },
    isSelectable: true,
    stickyHeader: true,
    className: "h-[300px]",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px", overflowX: "scroll" }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomNoResultsText: Story = {
  args: {
    ...Default.args,
    data: [],
    noResultsFoundText: "No users found",
  },
};

export const WithPagination: Story = {
  args: {
    ...Default.args,
    data: [
      ...mockUsers,
      { id: "6", name: "Eva Green", email: "eva@example.com", role: "User", status: "active" },
      { id: "7", name: "Frank White", email: "frank@example.com", role: "Manager", status: "active" },
      { id: "8", name: "Grace Lee", email: "grace@example.com", role: "User", status: "inactive" },
      { id: "9", name: "Henry Ford", email: "henry@example.com", role: "Admin", status: "active" },
      { id: "10", name: "Iris Blue", email: "iris@example.com", role: "User", status: "active" },
      { id: "11", name: "Jack Black", email: "jack@example.com", role: "User", status: "inactive" },
      { id: "12", name: "Kate Red", email: "kate@example.com", role: "Manager", status: "active" },
    ],
    maxPerPage: 5,
  },
  decorators: [
    (Story) => (
      <div className="h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Controlled: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

    return (
      <DataTable {...args} isSelectable={true} selectedRows={selectedRows} onRowSelectionChange={setSelectedRows} />
    );
  },
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      source: {
        code: `
const ControlledDataTable = () => {
  const [selectedRows, setSelectedRows] = React.useState<User[]>([]);

  return (
    <DataTable isSelectable={true} selectedRows={selectedRows} onRowSelectionChange={setSelectedRows} />
  );
}
    `,
        language: "tsx",
        type: "code",
      },
    },
  },
};
