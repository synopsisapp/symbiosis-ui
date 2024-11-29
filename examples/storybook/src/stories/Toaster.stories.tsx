import type { Meta, StoryObj } from "@storybook/react";
import { Button, useToast, type ToastConfig, Toaster, type ToasterProps } from "@synopsisapp/symbiosis-ui";

const ToasterDemo = (props: ToastConfig & ToasterProps) => {
  const { toast } = useToast();
  const { variant, title, description, duration, icon, ...rest } = props;

  return (
    <>
      <Toaster {...rest} />
      <Button
        label="Show toast"
        onPress={() => {
          toast({
            variant,
            title,
            description,
            duration,
            icon,
          });
        }}
      />
    </>
  );
};

const meta: Meta<typeof ToasterDemo> = {
  title: "Components/Toaster",
  component: ToasterDemo,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: {
        type: "select",
      },
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      description: "The position of the appearing toasts, controlled through the Toaster component",
      required: false,
      table: {
        type: { summary: "string" },
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
      description:
        "Whether to expand the toasts to the full width of the container, controlled through the Toaster component",
      required: false,
      table: {
        type: { summary: "boolean" },
      },
    },
    visibleToasts: {
      control: {
        type: "number",
      },
      description: "The maximum number of toasts to show at once, controlled through the Toaster component",
      required: false,
      table: {
        type: { summary: "number" },
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["success", "destructive", "info", "loading", "default"],
      description: "The variant of the toast, passed in the config of the toast function",
      required: false,
      table: {
        type: {
          summary: "success | destructive | info | loading | default",
        },
      },
    },
    title: {
      control: {
        type: "text",
      },

      description: "The title of the toast, passed in the config of the toast function",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    description: {
      required: false,
      control: {
        type: "text",
      },
      description: "The description of the toast, passed in the config of the toast function",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    duration: {
      control: {
        type: "number",
      },
      description: "Duration in milliseconds before the toast disappears, passed in the config of the toast function",
      table: {
        type: {
          summary: "number",
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToasterDemo>;

export const Default: Story = {
  args: {
    title: "Default Toast",
    description: "This is a default toast message",
  },
};

export const SuccessToast: Story = {
  args: {
    variant: "success",
    title: "Success Toast",
  },
};

export const DestructiveToast: Story = {
  args: {
    variant: "destructive",
    title: "Destructive Toast",
  },
};

export const InfoToast: Story = {
  args: {
    variant: "info",
    title: "Info Toast",
  },
};

export const LoadingToast: Story = {
  args: {
    variant: "loading",
    title: "Loading Toast",
  },
};

export const WarningToast: Story = {
  args: {
    variant: "warning",
    title: "Warning Toast",
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "default",
    title: "Default Toast with Custom Icon",
    icon: "symbiosis-plus",
  },
};

export const UpdateExample: Story = {
  render: () => {
    const { toast } = useToast();

    const showUpdatingToast = () => {
      const toastId = toast({
        variant: "loading",
        title: "Uploading...",
        description: "Starting upload",
      });

      // Simulate progress
      setTimeout(() => {
        toast.update(toastId, {
          variant: "success",
          title: "Upload Complete",
          description: "File has been uploaded successfully!",
        });
      }, 2000);
    };

    return (
      <>
        <Toaster />
        <Button label="Show Updating Toast" onPress={showUpdatingToast} />
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const UpdateExample = () => {
  const { toast } = useToast();
  
  const showUpdatingToast = () => {
    const toastId = toast({
      variant: "loading",
      title: "Uploading...",
      description: "Starting upload",
    });

    setTimeout(() => {
      toast.update(toastId, {
        variant: "success",
        title: "Upload Complete",
        description: "File has been uploaded successfully!",
      });
    }, 2000);
  };

  return <Button onClick={showUpdatingToast}>Show Updating Toast</Button>;
};
`,
        language: "tsx",
        type: "code",
      },
    },
  },
};
