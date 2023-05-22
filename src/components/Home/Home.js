import React, { useCallback, useContext, useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";

import moment from "jalali-moment";
import Card from "../UI/Card/Card";
import Calendar from "../Calendar/Calendar";
import Day from "../Day/Day";
import ImportantTasks from "../Tasks/ImportantTasks";
import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Home = () => {
  const [value, setValue] = useState(
    moment().locale("fa", {
      week: {
        dow: 6, // First day of week is Saturday
      },
    })
  );
  const [filter, setFilter] = useState("1");
  const [tasks, setTasks] = useState([]);
  const [importants, setImportant] = useState(
    tasks.filter((task) => {
      if (task.important === true && task.status !== true) {
        return task;
      } else return null;
    })
  );

  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;
  // console.log(userID);

  //https://planner-project-ce225-default-rtdb.europe-west1.firebasedatabase.app/
  const fetchTasksHandler = useCallback(() => {
    setTasks([]);
    setImportant([]);
    const query = ref(db, "tasks/" + userID);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((task) =>
          setTasks((prevTasks) => [...prevTasks, task])
        );
      }
    });
  }, [userID]);

  useEffect(() => {
    fetchTasksHandler();
  }, [fetchTasksHandler]);

  useEffect(() => {
    setImportant(
      tasks.filter((task) => {
        if (task.important === true && task.status !== true) {
          return task;
        } else return null;
      })
    );
  }, [tasks]);

  const [showDayPage, setShowDayPage] = useState(false);

  const onDayChange = (day) => {
    setValue(day);
    setShowDayPage(true);
  };
  const onMonthChange = (day) => {
    setValue(day);
  };

  const changeDateOnImportantClick = (date) => {
    setValue(
      moment(date, "jYYYY/jM/jD").locale("fa", {
        week: {
          dow: 6, // First day of week is Saturday
        },
      })
    );
    setShowDayPage(true);
  };

  const changeFilterHandler = (event) => {
    // console.log(event.target.name);
    if (event.target.name === "1") {
      setFilter("1");
    } else {
      setFilter("2");
    }
  };

  let variant = "1";
  filter === "1" ? (variant = "کارهای مهم") : (variant = "تمام کارها");

  return (
    <>
      <div className={classes.pad}>
        {!showDayPage && (
          <div className={classes.row}>
            <div className={`${classes.column} ${classes.left}`}>
              <Card className={classes.todo_month}>
                <h2>لیست کارها</h2>
                <DropdownButton
                  as={ButtonGroup}
                  key={filter}
                  id={`dropdown-variants-${filter}`}
                  variant="danger"
                  title={variant}
                >
                  <Dropdown.Item
                    eventKey="1"
                    name="1"
                    onClick={changeFilterHandler}
                  >
                    کارهای مهم
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    name="2"
                    onClick={changeFilterHandler}
                  >
                    تمام کارها
                  </Dropdown.Item>
                </DropdownButton>
                {filter === "1" ? (
                  <ImportantTasks
                    value={value}
                    items={importants}
                    dateChangeHandler={changeDateOnImportantClick}
                  ></ImportantTasks>
                ) : (
                  <ImportantTasks
                    value={value}
                    items={tasks}
                    dateChangeHandler={changeDateOnImportantClick}
                  ></ImportantTasks>
                )}
              </Card>
            </div>
            <div className={`${classes.column} ${classes.right}`}>
              <Card className={classes.todo_month}>
                <Calendar
                  value={value}
                  onChange={onDayChange}
                  onChangeMonth={onMonthChange}
                />
              </Card>
            </div>
          </div>
        )}
        {showDayPage && (
          <Card className={classes.home}>
            <Day
              value={value}
              tasks={tasks}
              setTasks={setTasks}
              setImportant={setImportant}
              showCalendar={setShowDayPage}
            ></Day>
          </Card>
        )}
      </div>
    </>
  );
};

export default Home;
