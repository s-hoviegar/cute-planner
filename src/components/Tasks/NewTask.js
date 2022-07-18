import React, { useState } from "react";
import Button from "../UI/Button/Button";
import TaskForm from "./TaskForm";
import "./NewTask.css";

const NewTask = (props) => {
  const saveTaskHandler = (enteredTaskData) => {
    const taskData = {
      id: Math.floor(Math.random() * 100000).toString(),
      ...enteredTaskData,
    };
    props.onAddTask(taskData);
  };
  const [showForm, setShowForm] = useState(false);

  const onNewClickHandler = () => {
    setShowForm(!showForm);
    // console.log(showForm);
  };
  const onCancelClickHandler = () => {
    setShowForm(!showForm);
    // console.log(showForm);
  };

  if (showForm === true) {
    return (
      <div className="new-task">
        <TaskForm
          date={props.date}
          onSaveTask={saveTaskHandler}
          onCancel={onCancelClickHandler}
        />
      </div>
    );
  }
  return (
    <div className="new-task">
      <Button onClick={onNewClickHandler}>افزودن کار جدید</Button>
    </div>
  );
};

export default NewTask;
