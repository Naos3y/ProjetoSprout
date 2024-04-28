"use client";

import React, { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const Dropdown = ({ options, message, returned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    returned(option);
    setIsOpen(false);
  };

  return (
    <div className="relative ml-5 py-5 ">
      <button
        type="button"
        className="border border-gray-300 focus:border-green-500 focus:outline-none pl-2 pr-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
        onClick={() => setIsOpen(!isOpen)}
        // para ficar sobreposto
        style={{ zIndex: 1000 }}
      >
        {" "}
        <MdOutlineArrowDropDownCircle className="mr-2" />
        {selectedOption ? selectedOption.label : message}
      </button>
      {isOpen && (
        <div
          className="absolute rounded border border-gray-300 bg-white top-full shadow-md"
          // para ficar sobreposto
          style={{ zIndex: 1000 }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer hover:bg-gray-300 p-2 text-gray-500"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
