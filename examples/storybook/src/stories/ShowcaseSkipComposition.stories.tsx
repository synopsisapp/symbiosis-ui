import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Popover, Dropdown, Button, Text, cn } from "@synopsisapp/symbiosis-ui";

const meta: Meta = {
  title: "Examples/SkipComposition",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const NestedComponents = ({
  skipCompositionForPopover = false,
  skipCompositionForDropdown = false,
  withZIndexes = false,
}) => {
  const PopoverContentWrapper = !skipCompositionForPopover ? Popover.Portal : React.Fragment;
  const DropdownContentWrapper = !skipCompositionForDropdown ? Dropdown.Portal : React.Fragment;

  const zIndexes = withZIndexes
    ? {
        popover: "z-[1000]",
        dropdown: "z-[1001]",
      }
    : undefined;

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button label="Open Modal" />
      </Modal.Trigger>
      <Modal.Content title="Modal with nested components">
        <div className="p-4">
          <Text>This modal contains a Popover with a nested Dropdown</Text>

          <div className="mt-4">
            <Popover.Root>
              <Popover.Trigger>
                <Button label="Open Popover" />
              </Popover.Trigger>
              <PopoverContentWrapper>
                <Popover.Content skipComposition={skipCompositionForPopover} className={cn(zIndexes?.popover)}>
                  <div className="p-4">
                    <Text>This is a Popover with a Dropdown</Text>

                    <div className="mt-4">
                      <Dropdown.Root>
                        <Dropdown.Trigger>
                          <Button label="Open Dropdown" />
                        </Dropdown.Trigger>
                        <DropdownContentWrapper>
                          <Dropdown.Content
                            skipComposition={skipCompositionForDropdown}
                            className={cn(zIndexes?.dropdown)}
                          >
                            <Dropdown.SimpleItem text="Option 1" />
                            <Dropdown.SimpleItem text="Option 2" />
                            <Dropdown.SimpleItem text="Option 3" />
                          </Dropdown.Content>
                        </DropdownContentWrapper>
                      </Dropdown.Root>
                    </div>
                  </div>
                </Popover.Content>
              </PopoverContentWrapper>
            </Popover.Root>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export const WithPortalsWithoutCorrectZIndexes: Story = {
  render: () => <NestedComponents skipCompositionForPopover={false} skipCompositionForDropdown={false} />,
  name: "With Portals (Default) - it shouldnt work correctly since we dont have the correct zIndexes",
};

export const WithPortalsWithCorrectZIndexes: Story = {
  render: () => <NestedComponents skipCompositionForPopover={false} skipCompositionForDropdown={false} withZIndexes />,
  name: "With Portals (Default) - it should work correctly since we have the correct zIndexes",
};

export const WithoutPortals: Story = {
  render: () => <NestedComponents skipCompositionForPopover={true} skipCompositionForDropdown={true} />,
  name: "Without Portals - it should work correctly",
};
