import type { TextFieldProps } from "../TextField/types";
import type { Locale } from "date-fns";

type BaseDateFieldProps = Omit<TextFieldProps, "value" | "onChange" | "defaultValue" | "icon"> & {
  value?: Date;
  onChange?: (date: Date) => void;
  withDatePicker?: boolean;
  locale?: Locale;
};

type WithoutDatePicker = BaseDateFieldProps & {
  withDatePicker?: false;
};

type WithDatePicker = BaseDateFieldProps & {
  withDatePicker: true;
  disabledBefore?: Date;
  disabledAfter?: Date;
  disabledDays?: Date[];
  booked?: Date[];
  onMonthChange?: (date: Date) => void;
};

export type DateFieldProps = WithoutDatePicker | WithDatePicker;
