import * as React from "react";

import { Chart } from "../Charts";
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

  const dataKeys = React.useMemo(
    () => Object.keys(data[0]).filter((key) => key !== "date" && typeof data[0][key] === "number"),
    [data],
  );

  const zeroValues = React.useMemo(
    () => data.map((entry) => dataKeys.map((key) => entry[key] === 0)),
    [data, dataKeys],
  );

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
        <Chart.Legend content={<Chart.LegendContent className={legendClassName} />} />
        {dataKeys.map(
          (key, index) =>
            config[key] && (
              <Chart.Bar key={key} dataKey={key} stackId="a" fill={`var(--color-${key})`}>
                {data.map((_, entryIndex) => {
                  const isTopStack = zeroValues[entryIndex].slice(index + 1).every(Boolean);
                  const isBottomStack = zeroValues[entryIndex].slice(0, index).every(Boolean);
                  return (
                    <Chart.Cell
                      key={`cell-${key}`}
                      radius={isTopStack ? [2, 2, 0, 0] : isBottomStack ? [0, 0, 2, 2] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </Chart.Bar>
            ),
        )}
      </Chart.BarChart>
    </Chart.Container>
  );
};

SymbiosisBarChart.displayName = "SymbiosisBarChart";

export { SymbiosisBarChart };
