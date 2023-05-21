import ImportantTaskItem from "./ImportantTaskItem";

const ImportantTasksList = (props) => {
  const setDate = (date) => {
    props.dateHandler(date);
  };

  if (props.items.length !== 0) {
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
  } else {
    // console.log("no item!!!"); // There should be a check to find out if only a given month doesn't have important task show this.
    return <h2>آیتمی وجود ندارد!</h2>;
  }
};

export default ImportantTasksList;
