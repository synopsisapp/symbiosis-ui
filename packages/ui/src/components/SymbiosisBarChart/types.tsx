import { ChartConfig, ChartDataPoint } from "../Charts/types";

export type SymbiosisBarChartProps = {
  data: ChartDataPoint[];
  config: ChartConfig;
  xAxisFormatter?: (value: string) => string;
  tooltipLabelFormatter?: (value: string) => string;
  className?: string;
  legendClassName?: string;
  tooltipClassName?: string;
}
