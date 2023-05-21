import React from "react";
import Card from "../UI/Card/Card";
import "./TaskItem.css";

const TaskItem = (props) => {
  // const [checked, setChecked] = useState(false);

  const handleStatus = (event) => {
    props.checkboxHandler(event.target.checked, props.id);
  };

  const handleImportant = (event) => {
    props.importantCheckboxHandler(event.target.checked, props.id);
  };

  return (
    <li className="center">
      <Card className="task-item">
        <input
          className="status"
          type="checkbox"
          onChange={handleStatus}
          value={props.title + "status"}
          defaultChecked={props.status ? "checked" : null}
        />
        <div className="task-item__description">
          <h2 className={props.status ? "checked" : ""}>{props.title}</h2>
        </div>
        <input
          className="important"
          type="checkbox"
          onChange={handleImportant}
          value={props.title + "importatnt"}
          defaultChecked={props.important ? "checked" : null}
        />
      </Card>
    </li>
  );
};

export default TaskItem;
