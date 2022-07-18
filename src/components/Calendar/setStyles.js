const isToday = (day) => {
  return day.isSame(new Date(), "day");
};
const isSelected = (day, value) => {
  return value.isSame(day, "day");
};
const isPrevMonth = (day, value) => {
  return day.isBefore(value.clone().startOf("month"));
};
const isNextMonth = (day, value) => {
  return day.isAfter(value.clone().endOf("month"));
};
const isThursday = (day) => {
  return +day.format("d") === 4;
};
const isFriday = (day) => {
  return +day.format("d") === 5;
};

const setStyles = (day, value) => {
  if (isToday(day)) return "week-header" + day.format("d");
  if (isSelected(day, value)) return "selected";
  if (isPrevMonth(day, value)) return "other";
  if (isNextMonth(day, value)) return "other";
  if (isThursday(day)) return "thursday";
  if (isFriday(day)) return "friday";
  return "";
};

export default setStyles;
