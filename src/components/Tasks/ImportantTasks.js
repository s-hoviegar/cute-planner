import ImportantTasksList from "./ImportantTasksList";

const ImportantTasks = (props) => {
  const changeToImportantTaskDate = (date) => {
    props.dateChangeHandler(date);
  };

  return (
    <ImportantTasksList
      value={props.value}
      items={props.items}
      dateHandler={changeToImportantTaskDate}
    />
  );
};

export default ImportantTasks;
