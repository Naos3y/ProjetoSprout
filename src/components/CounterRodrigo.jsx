import React, { useState } from "react";

const Counter = ({ label, value, onChange }) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + 1;
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, 0);
    onChange(newValue);
  };

  return (
    <div className="relative flex justify-center items-center py-5">
      <div>
        <label>{label}</label>
        <div className="mt-2 flex justify-center items-center">
          <button
            onClick={handleDecrement}
            className="p-2 border-transparent text-lg font-bold"
            type="button"
            style={{ color: "#87B421" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1 8L15 8"
                stroke="#87B421"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="border focus:border-green-500 focus:outline-none border-gray-300 p-2 w-12 text-center rounded-md"
            inputMode="numeric"
          />
          <button
            onClick={handleIncrement}
            className="p-2 border-transparent"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1 8L15 8M8 1L8 15"
                stroke="#87B421"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
