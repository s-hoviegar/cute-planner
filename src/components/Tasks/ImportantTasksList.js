import ImportantTaskItem from "./ImportantTaskItem";
import "./TasksList.css";

const ImportantTasksList = (props) => {
  const setDate = (date) => {
    props.dateHandler(date);
  };

  if (props.items.length > 0) {
    return (
      <ul className="tasks-list">
        {props.items.map((task) => {
          if (
            task.date.split("-")[0] + "-" + task.date.split("-")[1] ===
            props.value.format("YYYY-MM")
          ) {
            return (
              <ImportantTaskItem
                key={task.id}
                title={task.title}
                date={task.date}
                changeDateHandler={setDate}
              />
            );
          } else return null;
        })}
      </ul>
    );
  }
  return <h2 className="tasks-list__fallback">No tasks found.</h2>;
};

export default ImportantTasksList;
