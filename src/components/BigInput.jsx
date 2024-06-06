import React, { useState } from "react";

const BigInput = ({ label, returned }) => {
  const [text, setText] = useState("");

  const handleChange = (text) => {
    const newText = text.target.value;
    setText(newText);
    returned(newText);
  };

  return (
    <div className="relative py-5 ">
      <label>{label}</label>
      <textarea
        value={text}
        onChange={handleChange}
        className="border p-2 w-full rounded-md border-gray-300 focus:outline-none focus:border-green-500 resize-none  mt-2"
        rows={4}
      />
    </div>
  );
};

export default BigInput;
