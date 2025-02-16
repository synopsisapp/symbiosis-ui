import type { TextFieldProps } from "../TextField/types";
import type { Locale } from "date-fns";
export type Value = {
  from?: Date;
  to?: Date;
};

type BaseDateRangeFieldProps = Omit<TextFieldProps, "value" | "onChange" | "defaultValue" | "icon" | "label"> & {
  value?: Value;
  defaultValue?: Required<Value>;
  onChange?: (range: Value) => void;
  withDatePicker?: boolean;
  locale?: Locale;
  labelFrom?: string;
  labelTo?: string;
};

type WithoutDatePicker = BaseDateRangeFieldProps & {
  withDatePicker?: false;
};

type WithDatePicker = BaseDateRangeFieldProps & {
  withDatePicker: true;
  disabledBefore?: Date;
  disabledAfter?: Date;
  disabledDays?: Date[];
  booked?: Date[];
  onMonthChange?: (date: Date) => void;
};

export type DateRangeFieldProps = WithoutDatePicker | WithDatePicker;
