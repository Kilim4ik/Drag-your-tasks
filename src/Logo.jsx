import React from "react";
export const Logo = ({ name }) => {
  return (
    <div className="logo-container">
      <svg>
        <use href="./logo.svg#logo" />
      </svg>
      <div className="logo-name">
        <p>{name.slice(0, name.length / 2)}</p>
        <span> {name.slice(name.length / 2)}</span>
      </div>
    </div>
  );
};
