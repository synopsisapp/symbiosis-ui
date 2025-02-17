import type { Locale } from "date-fns/locale";
import type { Sizes } from "../../designSystemTokens";

export type DateRange = {
  from: Date;
  to?: Date;
};

export type SingleProps = {
  mode: "single";
  selectedDate: Date;
  onSelect?: ({
    date,
    selectedDate,
  }: {
    date?: Date;
    selectedDate: Date;
  }) => void;
  defaultDate?: Date;
};

export type MultipleProps = {
  mode: "multiple";
  selectedDates: Date[];
  onSelect?: ({
    dates,
    selectedDate,
  }: {
    dates?: Date[];
    selectedDate: Date;
  }) => void;
  minSelectedCount?: number;
  maxSelectedCount?: number;
  defaultSelectedDates?: Date[];
};

export type RangeProps = {
  mode: "range";
  selectedDates?: DateRange;
  onSelect?: ({
    date,
    selectedDate,
  }: {
    date: DateRange;
    selectedDate: Date;
  }) => void;
  minSelectedCount?: number;
  maxSelectedCount?: number;
  defaultSelectedDates?: Required<DateRange>;
};

export type CommonProps = {
  size?: Sizes;
  booked?: Date[];
  disabledBefore?: Date;
  disabledAfter?: Date;
  disabledDays?: Date[];
  onMonthChange?: (date: Date) => void;
  locale?: Locale;
  className?: string;
  month?: Date;
  numberOfMonths?: number;
};

export type DatePickerProps = CommonProps &
  (SingleProps | MultipleProps | RangeProps);
