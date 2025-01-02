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

function normalizeToUTCMidnight(dateString: string): Date {
  const date = new Date(dateString);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function calculateCountForDataOnDates<T extends Record<string, string[]>>({
  data,
  startDate,
  endDate,
  mode = "cumulative",
}: CalculateCountForDataOnDatesInput<T>): DateAndModel<StringKeys<T>>[] {
  // Start from the startDate
  const currentDate = normalizeToUTCMidnight(startDate);
  const endDateObj = normalizeToUTCMidnight(endDate);

  // Initialize the results array
  const results: DateAndModel<StringKeys<T>>[] = [];

  // Iterate over each date until currentDate is later than endDate
  while (currentDate <= endDateObj) {
    const currentResult: DateAndModel<StringKeys<T>> = {
      date: currentDate.toISOString(),
    } as DateAndModel<StringKeys<T>>;

    // For each data item, calculate the count for the current date
    for (const name in data) {
      const normalizedDates = data[name].map((date) => normalizeToUTCMidnight(date).getTime());
      const currentTime = currentDate.getTime();

      let count = 0;
      if (mode === Mode.Enum.cumulative) {
        // For cumulative mode, count all dates up to and including the current date
        count = normalizedDates.filter((time) => time <= currentTime).length;
      } else {
        // For daily mode, count only the dates that match the current date
        count = normalizedDates.filter((time) => time === currentTime).length;
      }
      currentResult[name] = count as DateAndModel<StringKeys<T>>[StringKeys<T>];
    }

    results.push(currentResult);

    // Move to the next day
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return results;
}
