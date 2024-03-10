import React from "react";

const DatePicker = ({ label, returned }) => {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    returned(selectedDate);
  };

  return (
    <div className="relative px-3 py-3 space-x-3">
      <label className="px-3">{label}</label>
      <input
        type="date"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[200px] bg-white shadow-sm"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
