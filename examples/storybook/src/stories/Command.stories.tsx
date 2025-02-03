import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Command } from "@synopsisapp/symbiosis-ui";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

const meta: Meta<typeof Command.Root> = {
  title: "Components/Command",
  component: Command.Root,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the command menu",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command.Root>;

export const Default: Story = {
  render: (args) => (
    <Command.Root {...args} className="rounded-lg border shadow-md">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>
            <Calendar className="mr-2" />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <Smile className="mr-2" />
            <span>Search Emoji</span>
          </Command.Item>
          <Command.Item>
            <Calculator className="mr-2" />
            <span>Calculator</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>
            <User className="mr-2" />
            <span>Profile</span>
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <CreditCard className="mr-2" />
            <span>Billing</span>
            <Command.Shortcut>⌘B</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <Settings className="mr-2" />
            <span>Settings</span>
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  ),
};

export const WithDialog: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <div>
        <p className="text-sm">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
        <Command.Dialog {...args} open={open} onOpenChange={setOpen}>
          <Command.Input placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Suggestions">
              <Command.Item>
                <Calendar className="mr-2" />
                <span>Calendar</span>
              </Command.Item>
              <Command.Item>
                <Smile className="mr-2" />
                <span>Search Emoji</span>
              </Command.Item>
              <Command.Item>
                <Calculator className="mr-2" />
                <span>Calculator</span>
              </Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Settings">
              <Command.Item>
                <User className="mr-2" />
                <span>Profile</span>
                <Command.Shortcut>⌘P</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <CreditCard className="mr-2" />
                <span>Billing</span>
                <Command.Shortcut>⌘B</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <Settings className="mr-2" />
                <span>Settings</span>
                <Command.Shortcut>⌘S</Command.Shortcut>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: (args) => {
    const [search, setSearch] = React.useState("");

    const items = [
      { icon: Calendar, label: "Calendar", keywords: ["schedule", "time", "date"] },
      { icon: Settings, label: "Settings", keywords: ["preferences", "config"] },
      { icon: User, label: "Profile", keywords: ["account", "user"] },
      { icon: CreditCard, label: "Billing", keywords: ["payment", "invoice"] },
    ];

    const filteredItems = items.filter((item) => {
      const searchTerms = [...item.keywords, item.label.toLowerCase()];
      return searchTerms.some((term) => term.includes(search.toLowerCase()));
    });

    return (
      <Command.Root {...args} className="rounded-lg border shadow-md">
        <Command.Input placeholder="Type to search..." value={search} onValueChange={setSearch} />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Results">
            {filteredItems.map((item) => (
              <Command.Item key={item.label}>
                <item.icon className="mr-2" />
                <span>{item.label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const SearchableCommand = () => {
  const [search, setSearch] = React.useState("");

  const items = [
    { icon: Calendar, label: "Calendar", keywords: ["schedule", "time", "date"] },
    { icon: Settings, label: "Settings", keywords: ["preferences", "config"] },
    { icon: User, label: "Profile", keywords: ["account", "user"] },
    { icon: CreditCard, label: "Billing", keywords: ["payment", "invoice"] },
  ];

  const filteredItems = items.filter((item) => {
    const searchTerms = [...item.keywords, item.label.toLowerCase()];
    return searchTerms.some((term) => term.includes(search.toLowerCase()));
  });

  return (
    <Command.Root className="rounded-lg border shadow-md">
      <Command.Input
        placeholder="Type to search..."
        value={search}
        onValueChange={setSearch}
      />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Results">
          {filteredItems.map((item) => (
            <Command.Item key={item.label}>
              <item.icon className="mr-2" />
              <span>{item.label}</span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const WithCustomStyles: Story = {
  render: (args) => (
    <Command.Root {...args} className="rounded-lg border shadow-md bg-slate-900 text-white">
      <Command.Input placeholder="Type a command..." className="text-white placeholder:text-slate-400" />
      <Command.List>
        <Command.Empty className="text-slate-400">No results found.</Command.Empty>
        <Command.Group heading="Actions" className="text-slate-300">
          <Command.Item className="hover:bg-slate-800">
            <Calendar className="mr-2" />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item className="hover:bg-slate-800">
            <Settings className="mr-2" />
            <span>Settings</span>
            <Command.Shortcut className="text-slate-500">⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  ),
};

export const WithSeparators: Story = {
  render: (args) => (
    <Command.Root {...args} className="rounded-lg border shadow-md">
      <Command.Input placeholder="Type a command..." />
      <Command.List>
        <Command.Group heading="Group 1">
          <Command.Item>
            <Calendar className="mr-2" />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <User className="mr-2" />
            <span>Profile</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Group 2">
          <Command.Item>
            <Settings className="mr-2" />
            <span>Settings</span>
          </Command.Item>
          <Command.Item>
            <CreditCard className="mr-2" />
            <span>Billing</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  ),
};

export const Interactive: Story = {
  render: (args) => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    return (
      <Command.Root {...args} className="rounded-lg border shadow-md">
        <Command.Input placeholder="Select an option..." />
        <Command.List>
          <Command.Group heading="Options">
            {["Calendar", "Settings", "Profile", "Billing"].map((item) => (
              <Command.Item
                key={item}
                onSelect={() => setSelectedItem(item)}
                className={selectedItem === item ? "bg-slate-100" : ""}
              >
                <span>{item}</span>
                {selectedItem === item && <span className="ml-auto text-green-500">✓</span>}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        {selectedItem && <div className="p-4 border-t">Selected: {selectedItem}</div>}
      </Command.Root>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const InteractiveCommand = () => {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  return (
    <Command.Root className="rounded-lg border shadow-md">
      <Command.Input placeholder="Select an option..." />
      <Command.List>
        <Command.Group heading="Options">
          {["Calendar", "Settings", "Profile", "Billing"].map((item) => (
            <Command.Item
              key={item}
              onSelect={() => setSelectedItem(item)}
              className={selectedItem === item ? "bg-slate-100" : ""}
            >
              <span>{item}</span>
              {selectedItem === item && (
                <span className="ml-auto text-green-500">✓</span>
              )}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      {selectedItem && (
        <div className="p-4 border-t">
          Selected: {selectedItem}
        </div>
      )}
    </Command.Root>
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};
