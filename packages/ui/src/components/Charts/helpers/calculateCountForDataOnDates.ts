import { isSameDay } from "date-fns/isSameDay";
import { z } from "zod";

type DataItems<T extends Record<string, string[]>> = T;

type DateAndModel<K extends string> = { date: string } & Record<K, number>;

const Mode = z.enum(["cumulative", "daily"]);
type Mode = z.infer<typeof Mode>;

type CalculateCountForDataOnDatesInput<T extends Record<string, string[]>> = {
  data: DataItems<T>;
  startDate: string;
  endDate: string;
  mode?: Mode;
};

type StringKeys<T> = Extract<keyof T, string>;

export function calculateCountForDataOnDates<T extends Record<string, string[]>>({
  data,
  startDate,
  endDate,
  mode = "cumulative",
}: CalculateCountForDataOnDatesInput<T>): DateAndModel<StringKeys<T>>[] {
  // Initialize the indices for each data item
  const indices = {} as Record<StringKeys<T>, number>;
  for (const name in data) {
    indices[name] = 0;
  }

  // Start from the startDate
  const currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Initialize the results array
  const results: DateAndModel<StringKeys<T>>[] = [];

  // Iterate over each date until currentDate is later than endDate
  while (currentDate <= endDateObj) {
    const currentResult: DateAndModel<StringKeys<T>> = {
      date: currentDate.toISOString(),
    } as DateAndModel<StringKeys<T>>;

    // For each data item, calculate the count for the current date
    for (const name in data) {
      let count = 0;
      if (mode === Mode.Enum.cumulative) {
        // For cumulative mode, count all dates up to and including the current date
        count = data[name].filter((date) => new Date(date) <= currentDate).length;
      } else {
        // For daily mode, count only the dates that match the current date
        count = data[name].filter((date) => isSameDay(new Date(date), currentDate)).length;
      }
      currentResult[name] = count as DateAndModel<StringKeys<T>>[StringKeys<T>];
    }

    results.push(currentResult);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return results;
}
