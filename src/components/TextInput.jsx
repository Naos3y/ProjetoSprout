import React, { useState } from "react";

const TextInput = ({ label, returned }) => {
  const [text, setText] = useState("");

  const handleChange = (text) => {
    const newText = text.target.value;
    setText(newText);
    returned(newText);
  };

  return (
    <div className="relative px-3 py-3 space-x-3">
      <label className="px-3">{label}</label>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500"
      />
    </div>
  );
};

export default TextInput;
