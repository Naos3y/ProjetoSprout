import React, { useState } from "react";

const TextInput = ({ label, returned }) => {
  const [text, setText] = useState("");

  const handleChange = (text) => {
    const newText = text.target.value;
    setText(newText);
    returned(newText);
  };

  return (
<<<<<<< HEAD
    <div className="relative py-5 ">
      <label>{label}</label>
=======
    <div className="relative px-5 py-5 space-x-5">
      <label className="px-5">{label}</label>
>>>>>>> origin/Rodrigo
      <input
        type="text"
        value={text}
        onChange={handleChange}
<<<<<<< HEAD
        className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500  mt-2 text-black"
=======
        className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500  mt-2"
>>>>>>> origin/Rodrigo
      />
    </div>
  );
};

export default TextInput;
