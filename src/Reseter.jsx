import React from "react";
import { newListPreset } from "./localStorage";
import "./Styles.css";
export const Reseter = ({ setLists }) => {
  return (
    <button
      className="btn-controller"
      onClick={() => setLists([newListPreset()])}
    >
      Reset all lists
    </button>
  );
};
