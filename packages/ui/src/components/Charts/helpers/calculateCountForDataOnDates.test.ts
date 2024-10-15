import { describe, it, expect } from "vitest";
import { calculateCountForDataOnDates } from "./calculateCountForDataOnDates";

describe("calculateCountForDataOnDates", () => {
  const sortedData = {
    model1: ["2023-01-01", "2023-01-01", "2023-01-02", "2023-01-03", "2023-01-03", "2023-01-05"],
    model2: ["2023-01-01", "2023-01-03", "2023-01-04", "2023-01-04", "2023-01-06"],
    model3: ["2023-01-02", "2023-01-04", "2023-01-05", "2023-01-05", "2023-01-05"],
  };

  const unsortedData = {
    model1: ["2023-01-03", "2023-01-01", "2023-01-05", "2023-01-02", "2023-01-01", "2023-01-03"],
    model2: ["2023-01-04", "2023-01-01", "2023-01-06", "2023-01-03", "2023-01-04"],
    model3: ["2023-01-05", "2023-01-02", "2023-01-04", "2023-01-05", "2023-01-05"],
  };

  it("correctly calculates cumulative mode with sorted data", () => {
    const result = calculateCountForDataOnDates({
      data: sortedData,
      startDate: "2023-01-01",
      endDate: "2023-01-06",
      mode: "cumulative",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 3, model2: 1, model3: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 5, model2: 2, model3: 1 },
      { date: "2023-01-04T00:00:00.000Z", model1: 5, model2: 4, model3: 2 },
      { date: "2023-01-05T00:00:00.000Z", model1: 6, model2: 4, model3: 5 },
      { date: "2023-01-06T00:00:00.000Z", model1: 6, model2: 5, model3: 5 },
    ]);
  });

  it("correctly calculates daily mode with sorted data", () => {
    const result = calculateCountForDataOnDates({
      data: sortedData,
      startDate: "2023-01-01",
      endDate: "2023-01-06",
      mode: "daily",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 1, model2: 0, model3: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-04T00:00:00.000Z", model1: 0, model2: 2, model3: 1 },
      { date: "2023-01-05T00:00:00.000Z", model1: 1, model2: 0, model3: 3 },
      { date: "2023-01-06T00:00:00.000Z", model1: 0, model2: 1, model3: 0 },
    ]);
  });

  it("correctly calculates cumulative mode with unsorted data", () => {
    const result = calculateCountForDataOnDates({
      data: unsortedData,
      startDate: "2023-01-01",
      endDate: "2023-01-06",
      mode: "cumulative",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 3, model2: 1, model3: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 5, model2: 2, model3: 1 },
      { date: "2023-01-04T00:00:00.000Z", model1: 5, model2: 4, model3: 2 },
      { date: "2023-01-05T00:00:00.000Z", model1: 6, model2: 4, model3: 5 },
      { date: "2023-01-06T00:00:00.000Z", model1: 6, model2: 5, model3: 5 },
    ]);
  });

  it("correctly calculates daily mode with unsorted data", () => {
    const result = calculateCountForDataOnDates({
      data: unsortedData,
      startDate: "2023-01-01",
      endDate: "2023-01-06",
      mode: "daily",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 1, model2: 0, model3: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-04T00:00:00.000Z", model1: 0, model2: 2, model3: 1 },
      { date: "2023-01-05T00:00:00.000Z", model1: 1, model2: 0, model3: 3 },
      { date: "2023-01-06T00:00:00.000Z", model1: 0, model2: 1, model3: 0 },
    ]);
  });

  it("handles empty data", () => {
    const result = calculateCountForDataOnDates({
      data: { model1: [], model2: [], model3: [] },
      startDate: "2023-01-01",
      endDate: "2023-01-02",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 0, model2: 0, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 0, model2: 0, model3: 0 },
    ]);
  });
});
