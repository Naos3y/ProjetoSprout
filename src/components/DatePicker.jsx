import React from "react";

const DatePicker = ({ label, returned }) => {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    returned(selectedDate);
  };

  return (
    <div className="relative  py-5 ">
      <label>{label}</label>
      <input
        type="date"
        className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-full bg-white shadow-sm  mt-2"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
