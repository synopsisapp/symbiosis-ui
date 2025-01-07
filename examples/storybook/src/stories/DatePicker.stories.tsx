import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@synopsisapp/symbiosis-ui";
import { addDays } from "date-fns";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: {
        type: "select",
      },
      options: ["single", "multiple", "range"],
      description: "The selection mode of the date picker",
      table: {
        type: { summary: "single | multiple | range" },
      },
    },
    booked: {
      control: false,
      description: "Array of dates that are marked as booked",
      table: {
        type: { summary: "Date[]" },
      },
    },
    disabledBefore: {
      control: false,
      description: "Disable all dates before this date",
      table: {
        type: { summary: "Date" },
      },
    },
    disabledAfter: {
      control: false,
      description: "Disable all dates after this date",
      table: {
        type: { summary: "Date" },
      },
    },
    disabledDays: {
      control: false,
      description: "Array of specific dates to disable",
      table: {
        type: { summary: "Date[]" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const SingleDate: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date("12/22/2024"));

    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelect={({ date }) => setSelectedDate(date || new Date())}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const SingleDatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <DatePicker
      mode="single"
      selectedDate={selectedDate}
      onSelect={({ date }) => date && setSelectedDate(date)}
    />
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const MultipleDates: Story = {
  render: (args) => {
    const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date()]);

    return (
      <DatePicker
        {...args}
        mode="multiple"
        selectedDates={selectedDates}
        onSelect={({ dates }) => dates && setSelectedDates(dates)}
        minSelectedCount={1}
        maxSelectedCount={3}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const MultipleDatePicker = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date()]);

  return (
    <DatePicker
      mode="multiple"
      selectedDates={selectedDates}
      onSelect={({ dates }) => dates && setSelectedDates(dates)}
      minSelectedCount={1}
      maxSelectedCount={3}
    />
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const DateRange: Story = {
  render: (args) => {
    const [selectedDates, setSelectedDates] = React.useState<{ from: Date; to: Date }>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return (
      <DatePicker
        {...args}
        mode="range"
        selectedDates={selectedDates}
        onSelect={({ date }) =>
          date?.from &&
          date.to &&
          setSelectedDates({
            from: date.from,
            to: date.to,
          })
        }
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const DateRangePicker = () => {
  const [selectedDates, setSelectedDates] = React.useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <DatePicker
      mode="range"
      selectedDates={selectedDates}
      onSelect={({ date }) =>
        date?.from &&
        date.to &&
        setSelectedDates({
          from: date.from,
          to: date.to,
        })
      }
    />
  );
}`,
        language: "tsx",
        type: "code",
      },
    },
  },
};

export const WithDisabledDates: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelect={({ date }) => date && setSelectedDate(date)}
        disabledBefore={new Date()}
        disabledAfter={addDays(new Date(), 30)}
        disabledDays={[addDays(new Date(), 5), addDays(new Date(), 10)]}
      />
    );
  },
};

export const WithBookedDates: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

    return (
      <DatePicker
        {...args}
        mode="single"
        selectedDate={selectedDate}
        onSelect={({ date }) => date && setSelectedDate(date)}
        booked={[addDays(new Date(), 2), addDays(new Date(), 3), addDays(new Date(), 4)]}
      />
    );
  },
};
