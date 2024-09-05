import type { Meta, StoryObj } from "@storybook/react";

import { Chart, type ChartConfig } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof Chart.Container> = {
  title: "Components/Custom chart",
  component: Chart.Container,
  tags: ["autodocs"],
} satisfies Meta<typeof Chart.Container>;

export default meta;

type Story = StoryObj<typeof Chart.Container>;

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "bg-yellow-500" },
  mobile: { label: "Mobile", color: "#890089" },
} satisfies ChartConfig;

type ChartDataPoint = Record<string, number | string>;

const generateDefs = <T extends ChartDataPoint>(chartData: T[], chartConfig: ChartConfig) => {
  if (chartData.length === 0) return null;

  const dataKeys = Object.keys(chartData[0]).filter((key) => key !== "date" && typeof chartData[0][key] === "number");

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
                <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
              </linearGradient>
            );
          }
          return null;
        })
        .filter(Boolean)}
    </defs>
  );
};

const generateAreas = <T extends ChartDataPoint>(chartData: T[], chartConfig: ChartConfig) => {
  if (chartData.length === 0) return [];

  const dataKeys = Object.keys(chartData[0]).filter((key) => key !== "date" && typeof chartData[0][key] === "number");

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
};

export const Default: Story = {
  render: (args) => {
    return (
      <Chart.Container {...args} config={chartConfig} className="aspect-auto h-[250px] w-full">
        <Chart.AreaChart data={chartData}>
          {generateDefs(chartData, chartConfig)}

          <Chart.CartesianGrid vertical={false} />
          <Chart.XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <Chart.Tooltip
            cursor={false}
            content={
              <Chart.TooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          {generateAreas(chartData, chartConfig)}
          <Chart.Legend content={<Chart.LegendContent />} />
        </Chart.AreaChart>
      </Chart.Container>
    );
  },
};


