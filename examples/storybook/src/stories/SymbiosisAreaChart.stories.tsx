import type { Meta, StoryObj } from "@storybook/react";

import { SymbiosisAreaChart, type ChartConfig } from "@synopsisapp/symbiosis-ui";

const meta: Meta<typeof SymbiosisAreaChart> = {
  title: "Components/SymbiosisAreaChart",
  component: SymbiosisAreaChart,
  tags: ["autodocs"],
  argTypes: {
    data: {
      required: true,
      control: {
        type: "object",
      },
      description: "Data to be displayed in the chart",
      table: {
        type: {
          summary: "array",
        },
      },
    },
    config: {
      required: true,
      control: {
        type: "object",
      },
      description: "Config to map data keys to labels and colors",
      table: {
        type: {
          summary: "object",
        },
      },
    },

    xAxisFormatter: {
      control: false,
      description: "Function to override the default formatting of the x-axis labels",
      table: {
        type: {
          summary: "(value: string) => string",
        },
      },
    },
    tooltipLabelFormatter: {
      control: false,
      description: "Function to override the default formatting of the tooltip labels",
      table: {
        type: {
          summary: "(value: string) => string",
        },
      },
    },
  },
} satisfies Meta<typeof SymbiosisAreaChart>;

export default meta;

type Story = StoryObj<typeof SymbiosisAreaChart>;

const chartData = [
  { date: "2024-04-01", bananas: 5, apples: 10, mobile: 150, desktop: 222 },
  { date: "2024-04-02", bananas: 10, apples: 15, mobile: 180, desktop: 97 },
  { date: "2024-04-03", bananas: 15, apples: 20, mobile: 167, desktop: 120 },
  { date: "2024-04-04", bananas: 20, apples: 25, mobile: 242, desktop: 260 },
  { date: "2024-04-05", bananas: 25, apples: 30, mobile: 373, desktop: 290 },
  { date: "2024-04-06", bananas: 70, apples: 35, mobile: 301, desktop: 340 },
  { date: "2024-04-07", bananas: 30, apples: 40, mobile: 245, desktop: 180 },
  { date: "2024-04-08", bananas: 35, apples: 45, mobile: 409, desktop: 320 },
  { date: "2024-04-09", bananas: 60, apples: 50, mobile: 59, desktop: 110 },
  { date: "2024-04-10", bananas: 45, apples: 55, mobile: 261, desktop: 190 },
  { date: "2024-04-11", bananas: 50, apples: 60, mobile: 327, desktop: 350 },
  { date: "2024-04-12", bananas: 55, apples: 65, mobile: 292, desktop: 210 },
];

const chartConfig = {
  apples: { label: "Apples", color: "bg-red-600" },
  bananas: { label: "Bananas", color: "bg-yellow-500" },
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#890089" },
} satisfies ChartConfig;

export const Basic: Story = {
  render: (args) => {
    return <SymbiosisAreaChart {...args} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomXAxisFormatter: Story = {
  render: (args) => {
    const xAxisFormatter = (value: string) => {
      return value.split("-")[2];
    };

    return <SymbiosisAreaChart {...args} xAxisFormatter={xAxisFormatter} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomTooltipLabelFormatter: Story = {
  render: (args) => {
    const tooltipLabelFormatter = (value: string) => {
      return `${value.split("-")[2]} ${value.split("-")[1]} ${value.split("-")[0]}`;
    };
    return <SymbiosisAreaChart {...args} tooltipLabelFormatter={tooltipLabelFormatter} />;
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};

export const CustomUI: Story = {
  render: (args) => {
    return (
      <SymbiosisAreaChart
        {...args}
        className="bg-slate-400 [&_.recharts-cartesian-axis-tick_text]:fill-white [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-white"
        legendClassName="text-white"
      />
    );
  },
  args: {
    data: chartData,
    config: chartConfig,
  },
};
