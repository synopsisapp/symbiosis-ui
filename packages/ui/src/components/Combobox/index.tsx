import { Pill } from "../Pill";
import { Command } from "../Command";
import { cn } from "../../utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import { Icon } from "../Icon";
import * as React from "react";
import { forwardRef } from "react";
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
      () => localOptions.filter((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase())),
      [localOptions, inputValue],
    );

    const onValueChangeHandler = React.useCallback(
      (option: Option) => {
        const isSelected = selectedOptions.some((selected) => selected.value === option.value);
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
          const newIndex = activeIndex - 1 <= 0 ? (selectedOptions.length - 1 === 0 ? -1 : 0) : activeIndex - 1;
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
                  onValueChangeHandler(selectedOptions[selectedOptions.length - 1]);
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
        className={cn("overflow-visible bg-transparent flex flex-col", className)}
        {...props}
      >
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <div
              data-symbiosis-combobox="trigger"
              ref={ref}
              className={cn(
                "flex flex-wrap gap-1 p-1 py-2 bg-white rounded-lg border border-slate-400",
                "focus-within:border-mainColors-base focus-within:ring-mainColors-base focus-within:ring-2 focus-within:ring-offset-1",
              )}
            >
              {selectedOptions.map((option) => (
                <Pill
                  key={option.value}
                  className={cn("px-1 rounded-xl flex items-center gap-1")}
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
                  "ml-2 bg-transparent outline-hidden placeholder:text-slate-400 flex-1",
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
            className="w-[var(--radix-popover-trigger-width)] p-0 my-2"
          >
            <Command.List
              className={cn(
                "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-rounded-lg w-full bg-white shadow-md z-10 border border-slate-500",
              )}
            >
              {localOptions.map((option) => {
                const isIncluded = selectedOptions.some((selected) => selected.value === option.value);
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
                    className={cn("rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between", {
                      "opacity-50 cursor-default": isIncluded,
                      "opacity-50 cursor-not-allowed": option.disabled,
                    })}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {option.label}
                    {isIncluded && <Icon name="symbiosis-check" className="h-4 w-4" />}
                  </Command.Item>
                );
              })}

              {!filteredOptions?.length && allowCustomValues && inputValue && (
                <Command.Item
                  value={inputValue}
                  onSelect={handleAddCustomValue}
                  className="rounded-md cursor-pointer px-2 py-1 transition-colors flex items-center gap-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {addNewOptionLabel ? (
                    <Text variant="body-small-200" className="text-slate-500">
                      {`${addNewOptionLabel} "${inputValue}"`}
                    </Text>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon name="symbiosis-plus" className="h-4 w-4 text-slate-500" />
                      <Text variant="body-small-200" className="text-slate-500">
                        "{inputValue}"
                      </Text>
                    </div>
                  )}
                </Command.Item>
              )}

              {!filteredOptions?.length && (
                <Command.Empty>
                  <Text variant="body-small-200" className="text-slate-500">
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
