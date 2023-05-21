import React from "react";
import Card from "../UI/Card/Card";
import "./ImportantTaskItem.css";

const ImportantTaskItem = (props) => {
  const gotoDateHandler = () => {
    props.changeDateHandler(props.date);
  };

  return (
    <li>
      <Card className="important-task-item" onClick={gotoDateHandler}>
        <div className="important-task-item__description">
          <div className="date">{props.date.split("-")[2]}</div>
          <h5>{props.title}</h5>
        </div>
      </Card>
    </li>
  );
};

export default ImportantTaskItem;
