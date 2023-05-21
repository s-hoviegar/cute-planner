import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import Tile from "../UI/Tile/Tile";
import buildCalendar from "./buildCalendar";
import setStyles from "./setStyles";
import CalendarHeader from "./CalendarHeader";
import Button from "../UI/Button/Button";
import styles from "./styles.module.css";

const Calendar = ({ value, onChange, onChangeMonth }) => {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const weekdayshort = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const weekdayshortname = weekdayshort.map((day, index) => {
    return (
      <th key={day}>
        <Tile className={`small week-header${index === 0 ? 6 : +index - 1}`}>
          {day}
        </Tile>
      </th>
    );
  });

  return (
    <>
      <CalendarHeader value={value} setValue={(v) => onChangeMonth(v)} />
      <table className={styles.main}>
        <thead>
          <tr>{weekdayshortname}</tr>
        </thead>
        <tbody>
          {calendar.map((week) => (
            <tr key={week}>
              {week.map((day) => (
                <td key={day}>
                  <Tile
                    className={"small " + setStyles(day, value)}
                    onClick={() => onChange(day)}
                  >
                    {day.format("D")}
                  </Tile>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <Button
          onClick={() =>
            onChange(
              moment().locale("fa", {
                week: {
                  dow: 6, // First day of week is Saturday
                },
              })
            )
          }
        >
          برو به امروز
        </Button>
      </div>
    </>
  );
};

export default Calendar;
