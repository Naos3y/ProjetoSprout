"use client";

import React, { useState, useEffect } from "react";
const MultiselectSearch = ({ label, options, message, returned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="relative py-5 ">
      <label>{label}</label>
      <button
        type="button"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-full bg-white shadow-sm mt-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center w-full">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(", ")
            : message}
        </div>
        <img width="15" src="add/icon.svg" alt="Arrow Down" className="ml-2" />
      </button>
      {isOpen && (
        <div
          className="absolute rounded border border-gray-300 bg-white top-full w-full shadow-md"
          style={{ zIndex: 1000 }}
        >
          <div className="px-2 py-1 border-b border-gray-300">
            <input
              type="text"
              className="px-2 py-1 border-none focus:outline-none focus:ring-green-500 focus:ring-opacity-50 w-full"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          {filteredOptions.map((option) => (
            <div key={option.value} className="hover:bg-gray-300 p-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={selectedOptions.some(
                  (op) => op.value === option.value
                )}
                onChange={() => handleSelect(option)}
              />
              <span className="ml-2">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiselectSearch;
