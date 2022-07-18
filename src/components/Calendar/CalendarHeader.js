import Tile from "../UI/Tile/Tile";
import Button from "../UI/Button/Button";

const CalendarHeader = ({ value, setValue }) => {
  const currMonthName = () => {
    return value.format("MMMM");
  };
  const currYear = () => {
    return value.format("YYYY");
  };
  const prevMonth = () => {
    return value.clone().subtract(1, "month");
  };
  const nextMonth = () => {
    return value.clone().add(1, "month");
  };

  return (
    <div className="header">
      <Tile className="small previous" onClick={() => setValue(prevMonth())}>
        {String.fromCharCode(171)}
      </Tile>
      <Button className="current">
        {currMonthName()} {currYear()}
      </Button>
      <Tile className="small next" onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(187)}
      </Tile>
    </div>
  );
};

export default CalendarHeader;
