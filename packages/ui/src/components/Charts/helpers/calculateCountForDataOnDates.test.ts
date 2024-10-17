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

  it("handles single day range correctly", () => {
    const result = calculateCountForDataOnDates({
      data: sortedData,
      startDate: "2023-01-03",
      endDate: "2023-01-03",
      mode: "daily",
    });

    expect(result).toEqual([{ date: "2023-01-03T00:00:00.000Z", model1: 2, model2: 1, model3: 0 }]);
  });

  it("handles date range outside of data range", () => {
    const result = calculateCountForDataOnDates({
      data: sortedData,
      startDate: "2022-12-30",
      endDate: "2023-01-08",
      mode: "cumulative",
    });

    expect(result).toEqual([
      { date: "2022-12-30T00:00:00.000Z", model1: 0, model2: 0, model3: 0 },
      { date: "2022-12-31T00:00:00.000Z", model1: 0, model2: 0, model3: 0 },
      { date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1, model3: 0 },
      { date: "2023-01-02T00:00:00.000Z", model1: 3, model2: 1, model3: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 5, model2: 2, model3: 1 },
      { date: "2023-01-04T00:00:00.000Z", model1: 5, model2: 4, model3: 2 },
      { date: "2023-01-05T00:00:00.000Z", model1: 6, model2: 4, model3: 5 },
      { date: "2023-01-06T00:00:00.000Z", model1: 6, model2: 5, model3: 5 },
      { date: "2023-01-07T00:00:00.000Z", model1: 6, model2: 5, model3: 5 },
      { date: "2023-01-08T00:00:00.000Z", model1: 6, model2: 5, model3: 5 },
    ]);
  });

  it("handles date range well inside of data range", () => {
    const result = calculateCountForDataOnDates({
      data: sortedData,
      startDate: "2023-01-03",
      endDate: "2023-01-05",
      mode: "cumulative",
    });

    expect(result).toEqual([
      { date: "2023-01-03T00:00:00.000Z", model1: 5, model2: 2, model3: 1 },
      { date: "2023-01-04T00:00:00.000Z", model1: 5, model2: 4, model3: 2 },
      { date: "2023-01-05T00:00:00.000Z", model1: 6, model2: 4, model3: 5 },
    ]);
  });

  it("correctly handles year and month boundaries", () => {
    const dataAcrossYears = {
      model1: ["2022-12-31", "2023-01-01", "2023-01-31", "2023-02-01"],
      model2: ["2022-12-31", "2023-01-15", "2023-02-01", "2023-02-28"],
    };

    const result = calculateCountForDataOnDates({
      data: dataAcrossYears,
      startDate: "2022-12-30",
      endDate: "2023-03-01",
      mode: "cumulative",
    });

    // 62 days from 2022-12-30 to 2023-03-01
    expect(result).toHaveLength(62);
    expect(result[0]).toEqual({ date: "2022-12-30T00:00:00.000Z", model1: 0, model2: 0 });
    expect(result[1]).toEqual({ date: "2022-12-31T00:00:00.000Z", model1: 1, model2: 1 });
    expect(result[2]).toEqual({ date: "2023-01-01T00:00:00.000Z", model1: 2, model2: 1 });
    expect(result[16]).toEqual({ date: "2023-01-15T00:00:00.000Z", model1: 2, model2: 2 });
    expect(result[32]).toEqual({ date: "2023-01-31T00:00:00.000Z", model1: 3, model2: 2 });
    expect(result[33]).toEqual({ date: "2023-02-01T00:00:00.000Z", model1: 4, model2: 3 });
    expect(result[60]).toEqual({ date: "2023-02-28T00:00:00.000Z", model1: 4, model2: 4 });
    expect(result[61]).toEqual({ date: "2023-03-01T00:00:00.000Z", model1: 4, model2: 4 });
  });

  it("handles(?) dates with timezone information", () => {
    const dataWithTimezones = {
      model1: ["2023-01-01T12:00:00+02:00", "2023-01-02T00:00:00Z", "2023-01-03T15:30:00-05:00"],
      model2: ["2023-01-01T23:59:59+01:00", "2023-01-02T01:00:00-08:00", "2023-01-03T00:00:00Z"],
    };

    const result = calculateCountForDataOnDates({
      data: dataWithTimezones,
      startDate: "2023-01-01",
      endDate: "2023-01-03",
      mode: "daily",
    });

    expect(result).toEqual([
      { date: "2023-01-01T00:00:00.000Z", model1: 1, model2: 1 },
      { date: "2023-01-02T00:00:00.000Z", model1: 1, model2: 1 },
      { date: "2023-01-03T00:00:00.000Z", model1: 1, model2: 1 },
    ]);
  });
});
