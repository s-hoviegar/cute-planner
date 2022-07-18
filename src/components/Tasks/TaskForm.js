import React, { useState } from "react";
import Button from "../UI/Button/Button";
import "./TaskForm.css";

const TaskForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    // console.log(event.target.value);
  };

  const onCancelClickHandler = () => {
    props.onCancel();
    // console.log(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    const taskData = {
      title: enteredTitle,
      date: props.date.format("YYYY-MM-D"),
      status: false,
      important: false,
    };

    props.onSaveTask(taskData);

    // console.log(expenseData);
    setEnteredTitle("");
  };

  return (
    <form onSubmit={SubmitHandler}>
      <div className="new-task__controls">
        <div className="new-task__control">
          <label htmlFor="title">عنوان کار</label>
          <input
            id="title"
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
      </div>
      <div className="new-task__actions">
        <Button onClick={onCancelClickHandler}>انصراف</Button>
        <Button type="submit">افزودن</Button>
      </div>
    </form>
  );
};

export default TaskForm;
