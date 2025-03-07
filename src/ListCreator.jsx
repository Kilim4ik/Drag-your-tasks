import React from "react";
import { newListPreset } from "./localStorage";
import "./Styles.css";
export const ListCreator = ({ setLists }) => {
  return (
    <button
      className="btn-controller"
      onClick={() => setLists((prev) => [...prev, newListPreset()])}
    >
      Create new list
    </button>
  );
};
