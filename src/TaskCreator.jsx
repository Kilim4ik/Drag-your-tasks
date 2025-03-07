import React, { useState } from "react";
import "./Styles.css";
import { setData } from "./localStorage";
export const TaskCreator = ({ setLists }) => {
  const [inputValue, setInputValue] = useState("");
  const createNewTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
    };
    setLists((prev) => {
      return prev.map((list, index) =>
        index === 0 ? { ...list, tasks: [...list.tasks, newTask] } : list
      );
    });
    setInputValue(" ");
    setData();
  };
  return (
    <form className="creator-container" onSubmit={createNewTask}>
      <input
        className={"creator-input"}
        type="text"
        value={inputValue}
        placeholder="Write a new task ... "
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={"create-task-button"}>
        Create
        <img src="./plus.svg" alt="" />
      </button>
    </form>
  );
};
