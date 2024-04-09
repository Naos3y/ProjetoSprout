"use client";

import React, { useState } from "react";

const PhotoInput = ({ label, returned }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    returned(file?.name || ""); // Passa o nome do arquivo selecionado para a função retornada
  };

  return (
    <div className="relative px-5 py-5 space-x-5">
      <label className="px-5">{label}</label>
      <label className="border border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[200px] bg-white shadow-sm mt-2">
        {selectedFile ? selectedFile.name : "Select File"}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default PhotoInput;
