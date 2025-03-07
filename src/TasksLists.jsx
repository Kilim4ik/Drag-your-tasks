import React from "react";
import "./Styles.css";
import { Tasks } from "./Tasks";

export const TasksLists = ({ lists, setLists }) => {
  const changeListName = (e, id) => {
    setLists((prev) => {
      return prev.map((list) =>
        list.id === id ? { ...list, name: e.target.value } : list
      );
    });
  };
  return (
    <div className={"lists-container"}>
      {lists.map((list, index) => (
        <ul className={"tasks-list"} key={list.id}>
          <li data-inlist={index}>
            <input
              className={"list-title"}
              type="text"
              value={list.name}
              onChange={(e) => changeListName(e, list.id)}
            />
          </li>
          <Tasks tasks={list.tasks} setLists={setLists} listId={index} />
        </ul>
      ))}
    </div>
  );
};
