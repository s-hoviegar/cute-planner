import React from "react";
import TasksList from "./TasksList";

function Tasks(props) {
  const checkboxHandler = (checked, id) => {
    props.setCheckboxStatus(checked, id);
  };

  const importantCheckboxHandler = (checked, id) => {
    props.setCheckboxImportant(checked, id);
  };

  return (
    <TasksList
      items={props.items}
      date={props.date}
      statusHandler={checkboxHandler}
      importantHandler={importantCheckboxHandler}
    />
  );
}

export default Tasks;
