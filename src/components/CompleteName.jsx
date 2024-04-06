import React, { useState, useEffect } from "react";

const CompleteName = ({ label, returned, value }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setText(value);
    }
  }, [value]);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    returned(newText);
  };

  return (
    <div className="relative px-5 py-5 space-x-5">
      <div className="flex flex-col">
        <label className="px-5">{label}</label>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          style={{ width: "550px", marginLeft: "20px" }}
          className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500  mt-2"
        />
      </div>
    </div>
  );
};

export default CompleteName;
