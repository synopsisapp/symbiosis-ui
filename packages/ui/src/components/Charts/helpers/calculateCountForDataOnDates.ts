import { isSameDay } from "date-fns/isSameDay";
import { compareAsc } from "date-fns/compareAsc";
import { subDays } from "date-fns/subDays";
import { isBefore } from "date-fns/isBefore";
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
    indices[name as StringKeys<T>] = 0;
  }

  // Find the earliest date
  const currentDate = [...Object.values(data).flat(), startDate].map((date) => new Date(date)).sort(compareAsc)[0];

  // Initialize the results object
  const results: Record<string, Record<StringKeys<T>, number>> = {};
  results[currentDate.toISOString()] = {} as Record<StringKeys<T>, number>;
  for (const name in data) {
    results[currentDate.toISOString()][name as StringKeys<T>] = 0;
  }

  // Iterate over each date until currentDate is later than endDate
  while (currentDate <= new Date(endDate)) {
    // For each data item, increment the count if the date is the same day or before currentDate
    for (const name in data) {
      let dailyCount = mode === Mode.Enum.cumulative ? results[currentDate.toISOString()][name as StringKeys<T>] : 0;
      while (
        indices[name] < data[name].length &&
        (isSameDay(new Date(data[name][indices[name]]), currentDate) ||
          (mode === Mode.Enum.cumulative && isBefore(new Date(data[name][indices[name]]), currentDate)))
      ) {
        dailyCount++;
        indices[name]++;
      }
      results[currentDate.toISOString()][name as StringKeys<T>] = dailyCount;
    }

    // Increment currentDate by one day and initialize the counts for the new day
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate <= new Date(endDate)) {
      if (mode === Mode.Enum.cumulative) {
        results[currentDate.toISOString()] = { ...results[new Date(subDays(currentDate, 1)).toISOString()] };
      } else {
        results[currentDate.toISOString()] = {} as Record<StringKeys<T>, number>;
        for (const name in data) {
          results[currentDate.toISOString()][name as StringKeys<T>] = 0;
        }
      }
    }
  }

  // Filter the results to only include dates that are on or after startDate
  const datesBetweenStartAndEnd = Object.keys(results).filter((date) => new Date(date) >= new Date(startDate));

  // Format the results
  const slicedResults = datesBetweenStartAndEnd.map((date) => ({
    date,
    ...results[date],
  }));

  return slicedResults as DateAndModel<StringKeys<T>>[];
}
