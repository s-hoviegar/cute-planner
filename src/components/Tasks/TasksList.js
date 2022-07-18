import TaskItem from "./TaskItem";
import "./TasksList.css";

function TasksList(props) {
  const setStatus = (checked, id) => {
    props.statusHandler(checked, id);
  };

  const setImportant = (checked, id) => {
    props.importantHandler(checked, id);
  };

  if (props.items.length > 0) {
    return (
      <ul className="tasks-list">
        {props.items.map((task) => {
          if (props.date.format("YYYY-MM-D") === task.date) {
            return (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                important={task.important}
                checkboxHandler={setStatus}
                importantCheckboxHandler={setImportant}
              />
            );
          } else return "";
        })}
      </ul>
    );
  }
  return <h2 className="tasks-list__fallback">No tasks found.</h2>;
}

export default TasksList;
