import React from "react";
import { Logo } from "./Logo";
import "./Styles.css";
export const Header = () => {
  return (
    <header className={"header"}>
      <Logo name={"todo"} />
    </header>
  );
};
