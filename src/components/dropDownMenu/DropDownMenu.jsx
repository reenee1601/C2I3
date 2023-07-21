import React from "react";
import "./dropDownMenu.css";

const DropDownMenu = ({ options, selected, setSelected, setIsOpen }) => {
  return (
    <div className="dropdown-content">
      {options.map((option) => (
        <div
          onClick={(e) => {
            setSelected(option === options[0] ? "" : option);
            setIsOpen(false);
          }}
          className="dropdown-item"
          key={option}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
