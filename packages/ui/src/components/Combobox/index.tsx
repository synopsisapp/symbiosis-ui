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
import { Button } from "../Button";
import { IconButton } from "../IconButton";

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
      skipComposition,
      singleSelect = false,
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
        
        let newSelectedOptions: Option[];
        
        if (singleSelect) {
          newSelectedOptions = isSelected ? [] : [option];
        } else {
          newSelectedOptions = isSelected
            ? selectedOptions.filter((item) => item.value !== option.value)
            : [...selectedOptions, option];
        }

        setSelectedOptions(newSelectedOptions);
        onValuesChange(newSelectedOptions);
        
        if (singleSelect && !isSelected) {
          setOpen(false);
        }
      },
      [selectedOptions, onValuesChange, singleSelect],
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
            {
              singleSelect ? (
                <div>
                  <style>
                    {`
                        .adhoc-btn {
                        ${
                          selectedOptions.length === 0
                            ? `
                            --symbiosis-btn-monochrome-dark-outline-text: var(--color-slate-base);`
                            : `
                            `
                        }
                      }
                    `}
                  </style>
                  <Button
                    label={selectedOptions[0]?.label || placeholder || "Select an option"}
                    variant="outline"
                    rightIcon={open ? "symbiosis-chevron-up" : "symbiosis-chevron-down"}
                    onPress={() => setOpen((prev) => !prev)}
                    className="adhoc-btn"
                    tone="monochrome-dark"
                  />
                </div>
              ) : (
                <div
                  data-symbiosis-combobox="trigger"
                  ref={ref}
                  className={cn(
                    "flex items-center rounded-lg border border-slate-400 bg-white",
                    "flex-wrap gap-1 p-[3px]",
                    "focus-within:border-main-base focus-within:ring-2 focus-within:ring-main-base focus-within:ring-offset-1",
                  )}
                >
                      {selectedOptions.map((option) => (
                        <Pill
                          key={option.value}
                          className="flex items-center gap-1"
                          isRounded
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
                        placeholder={selectedOptions.length === 0 ? placeholder : ""}
                        className={cn(
                          "ml-2 flex-1 bg-transparent outline-hidden placeholder:text-slate-400",
                          activeIndex !== -1 && "caret-transparent",
                        )}
                      />
                </div>
              )
            }
          </Popover.Trigger>
          <Popover.Content
            data-symbiosis-combobox="content"
            align="start"
            side="bottom"
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="my-2 w-[var(--radix-popover-trigger-width)] p-0"
            skipComposition={skipComposition}
          >
            <Command.List
              className={cn(
                "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-lg z-10 flex w-full flex-col gap-2 rounded-lg border border-slate-base bg-white p-2 shadow-xs transition-colors",
              )}
            >
              {singleSelect && (
                <div className="mb-2 flex items-center">
                  <CommandPrimitive.Input
                    ref={inputRef}
                    autoFocus
                    value={inputValue}
                    onValueChange={setInputValue}
                    onClick={() => setActiveIndex(-1)}
                    placeholder="Search..."
                    className={cn(
                      "w-full border-b border-slate-200 bg-transparent outline-none placeholder:text-slate-400 text-sm py-2",
                      activeIndex !== -1 && "caret-transparent",
                    )}
                  />
                  {inputValue && (
                    <IconButton
                      icon="symbiosis-x"
                      tone="monochrome-dark"
                      variant="ghost"
                      size="small-200"
                      onPress={() => setInputValue("")}
                    />
                  )}
                </div>
              )}

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
                        "bg-slate-100": isIncluded && singleSelect,
                        "cursor-default opacity-50": isIncluded && !singleSelect,
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
