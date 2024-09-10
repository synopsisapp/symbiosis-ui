import type { ChartConfig, ChartDataPoint } from "../Charts/types";

export type SymbiosisAreaChartProps = {
  data: ChartDataPoint[];
  config: ChartConfig;
  xAxisFormatter?: (value: string) => string;
  tooltipLabelFormatter?: (value: string) => string;
  className?: string;
  legendClassName?: string;
};
