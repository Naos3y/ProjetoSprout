import React, { useState } from "react";

const Dropdown = ({ label, options, message, returned, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    returned(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <label>{label}</label>
      <button
        required
        type="button"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[220px] bg-white shadow-sm w-50 mt-2"
        onClick={() => setIsOpen(!isOpen)}
        // para ficar sobreposto
        style={{ zIndex: 1000 }}
      >
        {selectedOption ? selectedOption.label : message}
        <img
          width="15"
          src="addNewUser/icon.svg"
          alt="Arrow Down"
          className="ml-2"
        />
      </button>
      {isOpen && (
        <div
          className="absolute rounded border border-gray-300 bg-white top-full w-[220px] shadow-md"
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
