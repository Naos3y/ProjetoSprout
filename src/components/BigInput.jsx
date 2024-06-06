import React, { useState } from "react";

const BigInput = ({ label, returned }) => {
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
>>>>>>> origin/Samuel
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
