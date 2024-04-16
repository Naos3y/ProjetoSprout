"use client";

import React, { useState } from "react";

const MultiselectEnroll = ({ label, options, message, returned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    let updatedOptions;
    if (selectedOptions.some((op) => op.value === option.value)) {
      updatedOptions = selectedOptions.filter(
        (op) => op.value !== option.value
      );
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    returned(updatedOptions);
  };

  const handleOpenSubmenu = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setIsOpen(true);
  };

  return (
    <div className="relative px-5 py-5 space-x-5">
      <label className="px-5">{label}</label>
      <button
        type="button"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[200px] bg-white shadow-sm  mt-2"
        onClick={() => setIsOpen(!isOpen)}
        // Para ficar sobreposto
        style={{ zIndex: 1000 }}
      >
        {selectedOptions.length > 0
          ? selectedOptions.map((option) => option.label).join(", ")
          : message}
        <img width="15" src="add/icon.svg" alt="Arrow Down" className="ml-2" />
      </button>
      {isOpen && (
        <div
          className="absolute rounded border border-gray-300 bg-white top-full w-[200px] shadow-md"
          // Para ficar sobreposto
          style={{ zIndex: 1000 }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="hover:bg-gray-300 p-2 cursor-pointer"
              onMouseEnter={() => handleOpenSubmenu(option)}
              onMouseLeave={() => setSelectedOptions([])}
            >
              <span className="ml-2">{option.label}</span>

              {selectedOptions.some((op) => op.value === option.value) && (
                <div>Submenu content for {option.label}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiselectEnroll;
