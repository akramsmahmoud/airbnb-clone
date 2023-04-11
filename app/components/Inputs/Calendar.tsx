"use client";

import { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarProps {
  onChange: (value: RangeKeyDict) => void;
  value: Range;
  disabledDates?: Date[];
}

const Calendar: FC<CalendarProps> = ({
  onChange,
  value,
  disabledDates = [],
}) => {
  return (
    <DateRange
      onChange={onChange}
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      direction="vertical"
      minDate={new Date()}
      disabledDates={disabledDates}
      showDateDisplay={false}
    />
  );
};

export default Calendar;
