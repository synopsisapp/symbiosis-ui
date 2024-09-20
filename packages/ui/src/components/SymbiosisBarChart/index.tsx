import * as React from "react";

import { Chart } from "../Charts";
import type { ChartConfig, ChartDataPoint } from "../Charts/types";
import type { SymbiosisBarChartProps } from "./types";
import { cn } from "../../utils/cn";

const SymbiosisBarChart = ({
  data,
  config,
  xAxisFormatter,
  tooltipLabelFormatter,
  className,
  legendClassName,
  tooltipClassName,
}: SymbiosisBarChartProps) => {

  const defaultTickFormatter = React.useCallback((value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, []);

  const defaultTooltipLabelFormatter = React.useCallback((value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <Chart.Container config={config} className={cn("aspect-auto h-[250px] w-full", className)}>
      <Chart.BarChart data={data}>
        <Chart.CartesianGrid vertical={false} />
        <Chart.XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={xAxisFormatter ?? defaultTickFormatter}
        />
        <Chart.Tooltip
          content={
            <Chart.TooltipContent
              labelFormatter={tooltipLabelFormatter ?? defaultTooltipLabelFormatter}
              className={tooltipClassName}
            />
          }
        />
        <Chart.Legend content={<Chart.LegendContent  className={legendClassName} />} />
        {generateBars(data, config)}
      </Chart.BarChart>
    </Chart.Container>
  );
};

function generateBars<T extends ChartDataPoint>(chartData: T[], chartConfig: ChartConfig) {
  if (chartData.length === 0) return [];

  const dataKeys = Object.keys(chartData[0])
    .filter((key) => key !== "date" && typeof chartData[0][key] === "number");

  const zeroValues = chartData.map(entry => 
    dataKeys.map(key => entry[key] === 0)
  );

  return dataKeys.map((key, index) => {
    if (!chartConfig[key]) return null;
    return (
      <Chart.Bar
          key={key}
          dataKey={key}
          stackId="a"
          fill={`var(--color-${key})`}
        >
          {chartData.map((_, entryIndex) => {
            const isTopStack = zeroValues[entryIndex].slice(index + 1).every(Boolean);
            const isBottomStack = zeroValues[entryIndex].slice(0, index).every(Boolean);
            return (
              <Chart.Cell
                key={`cell-${entryIndex}`}
                radius={isTopStack ? [2, 2, 0, 0] : isBottomStack ? [0, 0, 2, 2] : [0, 0, 0, 0]}
              />
            );
          })}
        </Chart.Bar>
    );
  });
}

SymbiosisBarChart.displayName = "SymbiosisBarChart";

export { SymbiosisBarChart };
