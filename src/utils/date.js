import moment from "moment";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function years(startYear, endYear) {
  const currentYear = endYear || 2090;
  const years = [];
  startYear = startYear || 1960;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export const dateConstants = {
  today: moment().format("YYYY-MM-DD"),
  yesterday: moment().add(-1, "days").format("YYYY-MM-DD"),
  startOfWeek: moment().clone().startOf("week").format("YYYY-MM-DD"),
  endOfWeek: moment().clone().endOf("week").format("YYYY-MM-DD"),
  startOfMonth: moment().clone().startOf("month").format("YYYY-MM-DD"),
  endOfMonth: moment().clone().endOf("month").format("YYYY-MM-DD"),
  startOfYear: moment().clone().startOf("year").format("YYYY-MM-DD"),
  endOfYear: moment().clone().endOf("year").format("YYYY-MM-DD"),
  startOfLastMonth: moment()
    .add(-1, "month")
    .clone()
    .startOf("month")
    .format("YYYY-MM-DD"),
  endOfLastMonth: moment()
    .add(-1, "month")
    .clone()
    .endOf("month")
    .format("YYYY-MM-DD"),
  thisMonth: moment().format("MMMM"),
  lastMonth: moment().format("MMMM"),
  monthsOfYear: moment.months(),
  firstDay: "2022-01-01",
};
export const filterRangeOptions = [
  {
    label: "This week",
    startDate: new Date(dateConstants?.startOfWeek),
    endDate: new Date(dateConstants?.endOfWeek),
    value: "this_week",
    key: "selection",
  },
  {
    label: "This month",
    startDate: new Date(dateConstants?.startOfMonth),
    endDate: new Date(dateConstants?.endOfMonth),
    value: "this_month",
    key: "selection",
  },
  {
    label: "All time",
    startDate: new Date(dateConstants?.firstDay),
    endDate: new Date(dateConstants?.endOfYear),
    value: "all_time",
    key: "selection",
  },
  {
    label: "Custom date",
    startDate: new Date(dateConstants?.yesterday),
    endDate: new Date(dateConstants?.today),
    value: "custom",
    key: "selection",
  },
];
