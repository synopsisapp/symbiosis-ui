import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Command } from "../Command";
import { Icon } from "../Icon";
import { Pill } from "../Pill";
import { Popover } from "../Popover";
import { Text } from "../Text";
import type { ComboboxProps, Option } from "./types";

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      onValuesChange,
      className,
      options,
      noResultsLabel,
      placeholder,
      allowCustomValues = true,
      addNewOptionLabel,
      ...props
    },
    ref,
  ) => {
    const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [localOptions, setLocalOptions] = React.useState(options);

    const filteredOptions = React.useMemo(
      () =>
        localOptions.filter((opt) =>
          opt.label.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      [localOptions, inputValue],
    );

    const onValueChangeHandler = React.useCallback(
      (option: Option) => {
        const isSelected = selectedOptions.some(
          (selected) => selected.value === option.value,
        );
        const newSelectedOptions = isSelected
          ? selectedOptions.filter((item) => item.value !== option.value)
          : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        onValuesChange(newSelectedOptions);
      },
      [selectedOptions, onValuesChange],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = inputRef.current;

        if (!target) return;

        const moveCurrent = () => {
          const newIndex =
            activeIndex - 1 <= 0
              ? selectedOptions.length - 1 === 0
                ? -1
                : 0
              : activeIndex - 1;
          setActiveIndex(newIndex);
        };

        switch (e.key) {
          case "Backspace":
            if (selectedOptions.length > 0) {
              if (activeIndex !== -1 && activeIndex < selectedOptions.length) {
                onValueChangeHandler(selectedOptions[activeIndex]);
                moveCurrent();
              } else {
                if (target.selectionStart === 0 && inputValue === "") {
                  onValueChangeHandler(
                    selectedOptions[selectedOptions.length - 1],
                  );
                }
              }
            }
            break;

          case "Enter":
            setOpen(true);
            break;

          case "Escape":
            if (activeIndex !== -1) {
              setActiveIndex(-1);
            } else if (open) {
              setOpen(false);
            }
            break;
        }
      },
      [selectedOptions, inputValue, activeIndex, onValueChangeHandler, open],
    );

    const handleAddCustomValue = React.useCallback(() => {
      if (!inputValue.trim()) return;

      const newOption = {
        value: inputValue,
        label: inputValue,
      };

      setLocalOptions((prev) => [...prev, newOption]);
      onValueChangeHandler(newOption);
      setInputValue("");
    }, [inputValue, onValueChangeHandler]);

    return (
      <Command.Root
        onKeyDown={handleKeyDown}
        className={cn(
          "flex flex-col overflow-visible bg-transparent",
          className,
        )}
        {...props}
      >
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <div
              data-symbiosis-combobox="trigger"
              ref={ref}
              className={cn(
                "flex flex-wrap gap-1 rounded-lg border border-slate-400 bg-white p-1 py-2",
                "focus-within:border-main-base focus-within:ring-2 focus-within:ring-main-base focus-within:ring-offset-1",
              )}
            >
              {selectedOptions.map((option) => (
                <Pill
                  key={option.value}
                  className={cn("flex items-center gap-1 rounded-xl px-1")}
                  size="small-100"
                  label={option.label}
                  onClose={() => onValueChangeHandler(option)}
                />
              ))}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onClick={() => setActiveIndex(-1)}
                placeholder={placeholder}
                className={cn(
                  "ml-2 flex-1 bg-transparent outline-hidden placeholder:text-slate-400",
                  activeIndex !== -1 && "caret-transparent",
                )}
              />
            </div>
          </Popover.Trigger>
          <Popover.Content
            data-symbiosis-combobox="content"
            align="start"
            side="bottom"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="my-2 w-[var(--radix-popover-trigger-width)] p-0"
          >
            <Command.List
              className={cn(
                "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-lg z-10 flex w-full flex-col gap-2 rounded-lg border border-slate-base bg-white p-2 shadow-xs transition-colors",
              )}
            >
              {localOptions.map((option) => {
                const isIncluded = selectedOptions.some(
                  (selected) => selected.value === option.value,
                );
                return (
                  <Command.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => {
                      if (option.disabled) return;
                      onValueChangeHandler(option);
                      setInputValue("");
                    }}
                    className={cn(
                      "flex cursor-pointer justify-between rounded-md px-2 py-1 transition-colors",
                      {
                        "cursor-default opacity-50": isIncluded,
                        "cursor-not-allowed opacity-50": option.disabled,
                      },
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {option.label}
                    {isIncluded && (
                      <Icon name="symbiosis-check" className="h-4 w-4" />
                    )}
                  </Command.Item>
                );
              })}

              {!filteredOptions?.length && allowCustomValues && inputValue && (
                <Command.Item
                  value={inputValue}
                  onSelect={handleAddCustomValue}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {addNewOptionLabel ? (
                    <Text variant="body-small-200" className="text-slate-base">
                      {`${addNewOptionLabel} "${inputValue}"`}
                    </Text>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon
                        name="symbiosis-plus"
                        className="h-4 w-4 text-slate-base"
                      />
                      <Text
                        variant="body-small-200"
                        className="text-slate-base"
                      >
                        "{inputValue}"
                      </Text>
                    </div>
                  )}
                </Command.Item>
              )}

              {!filteredOptions?.length && (
                <Command.Empty>
                  <Text variant="body-small-200" className="text-slate-base">
                    {noResultsLabel}
                  </Text>
                </Command.Empty>
              )}
            </Command.List>
          </Popover.Content>
        </Popover.Root>
      </Command.Root>
    );
  },
);

Combobox.displayName = "Combobox";

export { Combobox };
