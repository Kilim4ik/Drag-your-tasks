import React, { useState, useEffect } from "react";
import { getData, setData } from "./localStorage";
import { Header } from "./Header";
import { TaskCreator } from "./TaskCreator";
import { TasksLists } from "./TasksLists";
import { ListCreator } from "./ListCreator";
import { Reseter } from "./Reseter";

function App() {
  const [lists, setLists] = useState(getData);
  useEffect(() => {
    setData(lists);
  }, [lists]);
  return (
    <>
      <Header />
      <main>
        <TaskCreator setLists={setLists} />
        <TasksLists lists={lists} setLists={setLists} />
      </main>
      <div className="task-controller">
        <ListCreator setLists={setLists} />
        <Reseter setLists={setLists} />
      </div>
    </>
  );
}

export default App;
