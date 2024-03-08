"use client";

import React, { useState } from "react";

const Dropdown = ({ label, options, message, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label>{label}</label>
      <button
        type="button"
        className="border border-gray-300 border-1 px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[200px] bg-white shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
        // para ficar sobreposto
        style={{ zIndex: 1000 }}
      >
        {selectedOption ? selectedOption.label : message}
        <img width="15" src="add/icon.svg" alt="Arrow Down" className="ml-2" />
      </button>
      {isOpen && (
        <div
          className="absolute rounded border border-gray-300 bg-white top-full w-[200px] shadow-md"
          // para ficar sobreposto
          style={{ zIndex: 1000 }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer hover:bg-gray-300 p-2"
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
