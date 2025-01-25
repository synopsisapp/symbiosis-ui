import React from "react";
import { DayPicker } from "react-day-picker";
import type { OnSelectHandler, Matcher, PropsBase, DateRange } from "react-day-picker";
import { compareAsc } from "date-fns/compareAsc";

import { IconButton } from "../IconButton";
import { cn } from "../../utils/cn";
import { button, iconButton, text } from "../sharedStyles";
import type { DatePickerProps } from "./types";

const classNames = {
  month: "space-y-4 flex-1",
  months: "relative flex gap-10 flex-wrap",
  month_caption: "flex justify-center relative items-center mx-10",
  caption_label: text({ variant: "body-small-100", weight: "bold-100" }),
  nav: "flex items-center justify-between absolute inset-x-0",
  month_grid: "w-full border-collapse space-y-1",
  weekdays: "flex justify-between",
  weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  week: "flex w-full mt-2 gap-1 justify-between",
  day: "p-0 size-8 rounded-lg",
  today: cn(
    button({
      variant: "outline",
      tone: "monochrome-dark",
    }),
    iconButton({ shape: "square" }),
    "bg-transparent!",
    "text-slate-700!",
  ),
  selected: cn(
    button({
      variant: "primary",
      tone: "monochrome-dark",
    }),
    iconButton({ shape: "square" }),
    "[&[data-selected='true']:not([data-today='true'])>button]:text-white!",
  ),
  day_button: cn(
    button({
      variant: "ghost",
      tone: "monochrome-dark",
    }),
    iconButton({ shape: "square", size: "base" }),
    "tabular-nums",
  ),
  outside: "opacity-70",
  disabled: "opacity-50",
  hidden: "invisible",
  button_previous: cn(button({ variant: "outline", tone: "monochrome-dark" }), iconButton({ shape: "square" }), "z-10"),
  button_next: cn(button({ variant: "outline", tone: "monochrome-dark" }), iconButton({ shape: "square" }), "z-10"),
};

export const DatePicker = ({
  size,
  booked = [],
  disabledBefore,
  disabledAfter,
  disabledDays = [],
  onMonthChange,
  locale,
  className,
  month,
  numberOfMonths,
  ...props
}: DatePickerProps) => {
  const [internalMonth, setInternalMonth] = React.useState(month ?? new Date());

  React.useEffect(() => {
    if (!month) return;
    setInternalMonth(month);
  }, [month]);

  const singleHandler: OnSelectHandler<Date | undefined> = (date, triggerDate) => {
    if (props.mode === "single") {
      props.onSelect?.({
        date: date,
        selectedDate: triggerDate,
      });
    }
  };

  const multipleHandler: OnSelectHandler<Date[] | undefined> = (dates, triggerDate) => {
    if (props.mode === "multiple") {
      props.onSelect?.({
        dates: dates,
        selectedDate: triggerDate,
      });
    }
  };

  const rangeHandler: OnSelectHandler<DateRange | undefined> = (range, triggerDate) => {
    if (props.mode === "range") {
      props.onSelect?.({
        date: range,
        selectedDate: triggerDate,
      });
    }
  };

  const onMonthChangeHandler = (month: Date) => {
    setInternalMonth(month);
    onMonthChange?.(month);
  };

  const disabled: Matcher[] = [...disabledDays.slice().sort(compareAsc)];

  if (disabledBefore) {
    disabled.push({ before: disabledBefore });
  }

  if (disabledAfter) {
    disabled.push({ after: disabledAfter });
  }

  const commonProps: Pick<
    PropsBase,
    | "locale"
    | "weekStartsOn"
    | "modifiers"
    | "modifiersStyles"
    | "disabled"
    | "onMonthChange"
    | "classNames"
    | "components"
    | "showOutsideDays"
    | "components"
    | "month"
    | "numberOfMonths"
  > = {
    locale,
    weekStartsOn: 1,

    numberOfMonths,
    modifiers: {
      booked: booked.slice().sort(compareAsc),
    },
    modifiersStyles: {
      booked: {
        color: "bg-mainColors-light-100",
        fontWeight: "bold",
      },
    },
    showOutsideDays: true,
    disabled,
    onMonthChange: onMonthChangeHandler,
    components: {
      Chevron: ({ orientation }) => {
        return (
          <IconButton
            icon={orientation === "left" ? "symbiosis-chevron-left" : "symbiosis-chevron-right"}
            variant="ghost"
            isCircle={false}
            tone="monochrome-dark"
          />
        );
      },
    },
    classNames,
  };

  return (
    <div className={cn(className)}>
      {(() => {
        switch (props.mode) {
          case "single": {
            const { selectedDate } = props;
            return (
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={singleHandler}
                {...commonProps}
                month={internalMonth}
              />
            );
          }
          case "multiple": {
            const { selectedDates, minSelectedCount, maxSelectedCount } = props;
            return (
              <DayPicker
                mode="multiple"
                min={minSelectedCount}
                max={maxSelectedCount}
                selected={selectedDates}
                onSelect={multipleHandler}
                {...commonProps}
                month={internalMonth}
              />
            );
          }
          case "range": {
            const { selectedDates, minSelectedCount, maxSelectedCount } = props;
            return (
              <DayPicker
                mode="range"
                min={minSelectedCount}
                max={maxSelectedCount}
                selected={selectedDates}
                onSelect={rangeHandler}
                {...commonProps}
                month={internalMonth}
              />
            );
          }
          default:
            throw new Error("DatePicker: Unknown mode");
        }
      })()}
    </div>
  );
};
