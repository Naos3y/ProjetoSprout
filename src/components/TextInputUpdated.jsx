import React, { useState } from "react";

const TextInput = ({ label, returned, type }) => {
  const [text, setText] = useState("");

  const handleChange = (text) => {
    const newText = text.target.value;
    setText(newText);
    returned(newText);
  };

  return (
    <div className="relative px-5 py-5 space-x-5">
      <label className="px-5 text-black font-bold">{label}</label>
      <input
        type={type}
        value={text}
        onChange={handleChange}
        className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500 text-black"
      />
    </div>
  );
};

export default TextInput;
