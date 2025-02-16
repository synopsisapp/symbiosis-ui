import * as React from "react";
import { format, isValid, parse } from "date-fns";

import { TextField } from "../TextField";
import { Popover } from "../Popover";
import { DatePicker } from "../Datepicker";
import type { DateRangeFieldProps, Value } from "./types";
import { getDateFormat } from "../../helpers/getDateFormat";

const DateRangeField = React.forwardRef(
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
      labelFrom,
      labelTo,
      labelWeight,
      className,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      locale,
      ...datePickerProps
    }: DateRangeFieldProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [fromInputValue, setFromInputValue] = React.useState("");
    const [toInputValue, setToInputValue] = React.useState("");
    const [selectedRange, setSelectedRange] = React.useState<Value>({
      from: defaultValue ? defaultValue.from : value?.from,
      to: defaultValue ? defaultValue.to : value?.to,
    });
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (value?.from && isValid(value.from)) {
        setFromInputValue(format(value.from, getDateFormat(locale)));
      }
      if (value?.to && isValid(value.to)) {
        setToInputValue(format(value.to, getDateFormat(locale)));
      }

      if (defaultValue?.from && !value?.from && isValid(defaultValue.from)) {
        setFromInputValue(format(defaultValue.from, getDateFormat(locale)));
      }
      if (defaultValue?.to && !value?.to && isValid(defaultValue.to)) {
        setToInputValue(format(defaultValue.to, getDateFormat(locale)));
      }
    }, [value, locale, defaultValue?.from, defaultValue?.to]);

    const handleFromInputChange = (value: string) => {
      setFromInputValue(value);
      const parsedDate = parse(value, getDateFormat(locale), new Date());
      if (!isValid(parsedDate)) {
        setSelectedRange((prev) => ({ ...prev, from: undefined }));
        return;
      }

      const newRange = { ...selectedRange, from: parsedDate };
      setSelectedRange(newRange);
      if (newRange.from && newRange.to) {
        onChange?.(newRange);
      }
    };

    const handleToInputChange = (value: string) => {
      setToInputValue(value);
      const parsedDate = parse(value, getDateFormat(locale), new Date());
      if (!isValid(parsedDate)) {
        setSelectedRange((prev) => ({ ...prev, to: undefined }));
        return;
      }

      const newRange = { ...selectedRange, to: parsedDate };
      setSelectedRange(newRange);
      if (newRange.from && newRange.to) {
        onChange?.(newRange);
      }
    };

    const handleRangeSelect = ({
      date,
    }: {
      date?: { from?: Date; to?: Date };
      selectedDate: Date;
    }) => {
      if (date?.from) {
        setFromInputValue(format(date.from, getDateFormat(locale)));
      }
      if (date?.to) {
        setToInputValue(format(date.to, getDateFormat(locale)));
      }

      if (date?.from && date?.to) {
        onChange?.(date);
        setSelectedRange(date);
        if (date.from !== date.to) {
          setIsOpen(false);
        }
      }
    };

    const handleFocusOutside = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const selectedDates = selectedRange.from ? { from: selectedRange.from, to: selectedRange.to } : undefined;

    if (!datePickerProps.withDatePicker) {
      return (
        <div className="flex gap-2">
          <TextField
            ref={ref}
            error={error}
            required={required}
            hint={hint}
            placeholder={placeholder}
            icon="symbiosis-calendar"
            disabled={disabled}
            name={`${name}-from`}
            size={size}
            id={`${id}-from`}
            label={labelFrom}
            labelWeight={labelWeight}
            className={className}
            value={fromInputValue}
            onChange={handleFromInputChange}
            onBlur={() => onBlur?.(fromInputValue)}
          />
          <TextField
            error={error}
            required={required}
            hint={hint}
            placeholder={placeholder}
            icon="symbiosis-calendar"
            disabled={disabled}
            name={`${name}-to`}
            size={size}
            id={`${id}-to`}
            label={labelTo}
            labelWeight={labelWeight}
            className={className}
            value={toInputValue}
            onChange={handleToInputChange}
            onBlur={() => onBlur?.(toInputValue)}
          />
        </div>
      );
    }

    return (
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <div ref={containerRef} className="flex gap-2">
            <TextField
              ref={ref}
              error={error}
              required={required}
              hint={hint}
              placeholder={placeholder}
              icon="symbiosis-calendar"
              disabled={disabled}
              name={`${name}-from`}
              size={size}
              id={`${id}-from`}
              label={labelFrom}
              labelWeight={labelWeight}
              className={className}
              value={fromInputValue}
              onChange={handleFromInputChange}
              onFocus={() => setIsOpen(true)}
              onBlur={() => onBlur?.(fromInputValue)}
            />
            <TextField
              error={error}
              required={required}
              hint={hint}
              placeholder={placeholder}
              icon="symbiosis-calendar"
              disabled={disabled}
              name={`${name}-to`}
              size={size}
              id={`${id}-to`}
              label={labelTo}
              labelWeight={labelWeight}
              className={className}
              value={toInputValue}
              onChange={handleToInputChange}
              onFocus={() => setIsOpen(true)}
              onBlur={() => onBlur?.(toInputValue)}
            />
          </div>
        </Popover.Trigger>

        <Popover.Content
          data-symbiosis-daterangefield="content"
          align="start"
          side="bottom"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onFocusOutside={handleFocusOutside}
          className="w-[max(var(--radix-popover-trigger-width),100%)] p-0 my-2"
        >
          <DatePicker
            mode="range"
            selectedDates={selectedDates}
            onSelect={handleRangeSelect}
            disabledBefore={datePickerProps.disabledBefore}
            disabledAfter={datePickerProps.disabledAfter}
            disabledDays={datePickerProps.disabledDays}
            booked={datePickerProps.booked}
            onMonthChange={datePickerProps.onMonthChange}
            locale={locale}
            className="p-2"
            month={selectedRange.from ?? new Date()}
            numberOfMonths={2}
          />
        </Popover.Content>
      </Popover.Root>
    );
  },
);

DateRangeField.displayName = "DateRangeField";

export { DateRangeField };
