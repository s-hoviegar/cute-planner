import ImportantTaskItem from "./ImportantTaskItem";

const ImportantTasksList = (props) => {
  const setDate = (date) => {
    props.dateHandler(date);
  };

  // A check to find out if only one given month doesn't have important task show this.
  let result = props.items.flatMap((task) =>
    task.date.split("-")[0] + "-" + task.date.split("-")[1] ===
    props.value.format("YYYY-MM") ? (
      <ImportantTaskItem
        key={task.id}
        title={task.title}
        date={task.date}
        status={task.status}
        changeDateHandler={setDate}
      />
    ) : (
      []
    )
  );

  if (result.length !== 0) {
    // console.log(result);
    return <ul className="tasks-list">{result}</ul>;
  } else {
    // console.log("no item!!!");
    return <h2>آیتمی وجود ندارد!</h2>;
  }
};

export default ImportantTasksList;
