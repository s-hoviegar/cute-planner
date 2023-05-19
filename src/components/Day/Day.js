import React, { useContext } from "react";
import { db } from "../../utils/firebase";
import { ref, set, update } from "firebase/database";

import Tile from "../UI/Tile/Tile";
import NewTask from "../Tasks/NewTask";
import Tasks from "../Tasks/Tasks";
import AuthContext from "../../store/auth-context";

const Day = ({ value, tasks, setTasks, setImportant, showCalendar }) => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;

  // return value.format("ddd D MMM YYYY");
  const addTaskHandler = (task) => {
    setTasks([]);
    set(ref(db, "tasks/" + userID + "/" + task.id), {
      id: task.id,
      title: task.title,
      date: task.date,
      status: task.status,
      important: task.important,
    });
  };

  const getWeekDay = (day) => {
    return day.format("d");
  };

  const changeStatusHandler = async (checked, id) => {
    const index = tasks.findIndex((object) => {
      return object.id === id;
    });
    const task = {
      id: tasks[index].id,
      title: tasks[index].title,
      status: checked,
      date: tasks[index].date,
      important: tasks[index].important,
    };

    update(ref(db, "tasks/" + userID + "/" + id), {
      id: tasks[index].id,
      title: tasks[index].title,
      status: checked,
      date: tasks[index].date,
      important: tasks[index].important,
    });

    const tempArray = tasks;
    tempArray.splice(index, 1, task);
    console.log(tempArray);
    setTasks(() => [...tempArray]);

    const tempImportant = tasks.filter((task) => {
      if (task.important === true && task.status !== true) {
        return task;
      } else return null;
    });
    setImportant(() => [...tempImportant]);
  };

  const changeImportantHandler = (checked, id) => {
    const index = tasks.findIndex((object) => {
      return object.id === id;
    });
    const task = {
      id: tasks[index].id,
      title: tasks[index].title,
      status: tasks[index].status,
      date: tasks[index].date,
      important: checked,
    };

    update(ref(db, "tasks/" + userID + "/" + id), {
      id: tasks[index].id,
      title: tasks[index].title,
      status: tasks[index].status,
      date: tasks[index].date,
      important: checked,
    });

    const tempArray = tasks;
    tempArray.splice(index, 1, task);
    setTasks(() => [...tempArray]);

    const tempImportant = tasks.filter((task) => {
      if (task.important === true && task.status !== true) {
        return task;
      } else return null;
    });
    setImportant(() => [...tempImportant]);
  };

  return (
    <>
      <Tile
        className={`big week-header${
          getWeekDay(value) === 0 ? 6 : +getWeekDay(value)
        }`}
      >
        {value.format("ddd")}
      </Tile>
      <Tile
        className={`week-header${
          getWeekDay(value) === 0 ? 6 : +getWeekDay(value)
        }`}
      >
        {value.format("D MMM YYYY ")}
      </Tile>
      <Tile className="back" onClick={() => showCalendar()}>
        بازگشت
      </Tile>
      <NewTask date={value} onAddTask={addTaskHandler}></NewTask>
      <Tasks
        items={tasks}
        date={value}
        setCheckboxStatus={changeStatusHandler}
        setCheckboxImportant={changeImportantHandler}
      ></Tasks>
    </>
  );
};

export default Day;
