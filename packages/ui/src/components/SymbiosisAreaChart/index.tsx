import * as React from "react";

import { cn } from "../../utils/cn";
import { Chart } from "../Charts";
import type { ChartConfig, ChartDataPoint } from "../Charts/types";
import type { SymbiosisAreaChartProps } from "./types";

const SymbiosisAreaChart = ({
  data,
  config,
  xAxisFormatter,
  tooltipLabelFormatter,
  className,
  legendClassName,
  tooltipClassName,
}: SymbiosisAreaChartProps) => {
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
    <Chart.Container
      config={config}
      className={cn("aspect-auto h-[250px] w-full", className)}
    >
      <Chart.AreaChart data={data}>
        {generateGradients(data, config)}
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
          cursor={false}
          content={
            <Chart.TooltipContent
              labelFormatter={
                tooltipLabelFormatter ?? defaultTooltipLabelFormatter
              }
              indicator="dot"
              className={tooltipClassName}
            />
          }
        />
        {generateAreas(data, config)}
        <Chart.Legend
          content={<Chart.LegendContent className={legendClassName} />}
        />
      </Chart.AreaChart>
    </Chart.Container>
  );
};

function generateGradients<T extends ChartDataPoint>(
  chartData: T[],
  chartConfig: ChartConfig,
) {
  if (chartData.length === 0) return null;

  const dataKeys = Object.keys(chartData[0]).filter(
    (key) => key !== "date" && typeof chartData[0][key] === "number",
  );

  return (
    <defs>
      {dataKeys
        .map((key) => {
          if (chartConfig[key]) {
            return (
              <linearGradient
                key={key}
                id={`fill${key.charAt(0).toUpperCase() + key.slice(1)}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            );
          }
          return null;
        })
        .filter(Boolean)}
    </defs>
  );
}

function generateAreas<T extends ChartDataPoint>(
  chartData: T[],
  chartConfig: ChartConfig,
) {
  if (chartData.length === 0) return [];

  const dataKeys = Object.keys(chartData[0]).filter(
    (key) => key !== "date" && typeof chartData[0][key] === "number",
  );

  return dataKeys
    .map((key) => {
      if (chartConfig[key]) {
        return (
          <Chart.Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`url(#fill${key.charAt(0).toUpperCase() + key.slice(1)})`}
            stroke={`var(--color-${key})`}
            stackId="a"
          />
        );
      }
      return null;
    })
    .filter(Boolean);
}

SymbiosisAreaChart.displayName = "SymbiosisAreaChart";

export { SymbiosisAreaChart };
