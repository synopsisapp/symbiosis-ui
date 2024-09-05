import { isSameDay } from "date-fns/isSameDay";
import { compareAsc } from "date-fns/compareAsc";
import { subDays } from "date-fns/subDays";
import { isBefore } from "date-fns/isBefore";

type DataItems<T extends Record<string, string[]>> = T;

type DateAndModel<K extends string> = { date: string } & Record<K, number>;

type CalculateCountForDataOnDatesInput<T extends Record<string, string[]>> = {
  data: DataItems<T>;
  startDate: string;
  endDate: string;
};

type StringKeys<T> = Extract<keyof T, string>;

export function calculateCountForDataOnDates<T extends Record<string, string[]>>({
  data,
  startDate,
  endDate,
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
      while (
        indices[name] < data[name].length &&
        (isSameDay(new Date(data[name][indices[name]]), currentDate) ||
          isBefore(new Date(data[name][indices[name]]), currentDate))
      ) {
        results[currentDate.toISOString()][name as StringKeys<T>]++;
        indices[name]++;
      }
    }

    // Increment currentDate by one day and initialize the counts for the new day based on the previous day
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate <= new Date(endDate)) {
      results[currentDate.toISOString()] = { ...results[new Date(subDays(currentDate, 1)).toISOString()] };
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
