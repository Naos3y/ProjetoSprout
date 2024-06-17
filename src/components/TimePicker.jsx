import React from "react";

const TimePicker = ({ label, returned }) => {
  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    returned(selectedTime);
  };

  return (
    <div className="relative py-5">
      <label>{label}</label>
      <input
        type="time"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-full bg-white shadow-sm mt-2"
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimePicker;
