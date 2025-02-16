import * as React from "react";
import { format, isValid, parse } from "date-fns";

import { TextField } from "../TextField";
import { Popover } from "../Popover";
import { DatePicker } from "../Datepicker";
import type { DateFieldProps } from "./types";
import { getDateFormat } from "../../helpers/getDateFormat";

const DateField = React.forwardRef(
  (
    {
      error,
      required,
      hint,
      placeholder,
      disabled,
      name,
      size = "base",
      id,
      label,
      labelWeight,
      className,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      locale,
      ...datePickerProps
    }: DateFieldProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      defaultValue && isValid(defaultValue) ? defaultValue : value && isValid(value) ? value : undefined,
    );

    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (value && isValid(value)) {
        setInputValue(format(value, getDateFormat(locale)));
        setSelectedDate(value);
      }

      if (defaultValue && !value && isValid(defaultValue)) {
        setInputValue(format(defaultValue, getDateFormat(locale)));
        setSelectedDate(defaultValue);
      }
    }, [value, locale, defaultValue]);

    const handleInputChange = (value: string) => {
      setInputValue(value);
      const parsedDate = parse(value, getDateFormat(locale), new Date());
      if (!isValid(parsedDate)) {
        setSelectedDate(undefined);
        return;
      }

      setSelectedDate(parsedDate);
      onChange?.(parsedDate);
    };

    const handleSingleSelect = ({ date }: { date?: Date }) => {
      setSelectedDate(date ?? new Date());
      setInputValue(format(date ?? new Date(), getDateFormat(locale)));
      onChange?.(date ?? new Date());
      setIsOpen(false);
    };

    const handleFocusOutside = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (!datePickerProps.withDatePicker) {
      return (
        <TextField
          ref={ref}
          error={error}
          required={required}
          hint={hint}
          placeholder={placeholder}
          icon={"symbiosis-calendar"}
          disabled={disabled}
          name={name}
          size={size}
          id={id}
          label={label}
          labelWeight={labelWeight}
          className={className}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => {
            onBlur?.(inputValue);
          }}
        />
      );
    }

    return (
      <div ref={containerRef} className="contents">
        <Popover.Root
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <Popover.Trigger asChild>
            <TextField
              ref={ref}
              error={error}
              required={required}
              hint={hint}
              placeholder={placeholder}
              icon="symbiosis-calendar"
              disabled={disabled}
              name={name}
              size={size}
              id={id}
              label={label}
              labelWeight={labelWeight}
              className={className}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => {
                setIsOpen(true);
              }}
              onBlur={(value) => {
                onBlur?.(value);
              }}
              data-symbiosis-datefield="trigger"
            />
          </Popover.Trigger>

          <Popover.Content
            data-symbiosis-datefield="content"
            align="start"
            side="bottom"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onFocusOutside={handleFocusOutside}
            className="w-[max(var(--radix-popover-trigger-width),100%)] p-0 my-2"
          >
            <DatePicker
              mode="single"
              selectedDate={selectedDate ?? new Date()}
              onSelect={handleSingleSelect}
              disabledBefore={datePickerProps.disabledBefore}
              disabledAfter={datePickerProps.disabledAfter}
              disabledDays={datePickerProps.disabledDays}
              booked={datePickerProps.booked}
              onMonthChange={datePickerProps.onMonthChange}
              locale={locale}
              month={selectedDate}
              className="p-2"
            />
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
);

DateField.displayName = "DateField";

export { DateField };
