import type { Meta, StoryObj } from "@storybook/react";
import { Button, useToast, type ToastConfig, Toaster } from "@synopsisapp/symbiosis-ui";

const ToasterDemo = (props: ToastConfig) => {
  const { toast } = useToast();

  return (
    <>
      <Toaster />
      <Button
        label="Show toast"
        onPress={() => {
          toast({
            variant: props.variant,
            title: props.title,
            description: props.description,
            duration: props.duration,
            closeButton: props.closeButton,
            icon: props.icon,
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
    variant: {
      control: {
        type: "select",
      },
      options: ["success", "error", "info", "loading", "default"],
      description: "The variant of the toast",
      table: {
        type: {
          summary: "success | error | info | loading | default",
        },
      },
    },
    title: {
      control: {
        type: "text",
      },
      description: "The title of the toast",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    description: {
      control: {
        type: "text",
      },
      description: "The description of the toast",
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
      description: "Duration in milliseconds before the toast disappears",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    closeButton: {
      control: {
        type: "boolean",
      },
      description: "Whether to show a close button",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-80">
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
    description: "Operation completed successfully!",
  },
};

export const ErrorToast: Story = {
  args: {
    variant: "error",
    title: "Error Toast",
    description: "Something went wrong!",
  },
};

export const InfoToast: Story = {
  args: {
    variant: "info",
    title: "Info Toast",
    description: "Here's some information for you",
  },
};

export const LoadingToast: Story = {
  args: {
    variant: "loading",
    title: "Loading Toast",
    description: "Please wait...",
    duration: 5000,
  },
};

export const CustomDurationToast: Story = {
  args: {
    title: "Quick Toast",
    description: "I'll disappear in 2 seconds",
    duration: 2000,
  },
};

export const WithCloseButton: Story = {
  args: {
    title: "Dismissible Toast",
    description: "Click the X to dismiss",
    closeButton: true,
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

    return <Button label="Show Updating Toast" onPress={showUpdatingToast} />;
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
