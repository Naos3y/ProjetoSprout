import React from "react";
import { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import Dropdown from "../DropdownFilter";

function Layout() {
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const resetFilter = () => {
    setFilter("");
  };
  const optionsType = [
    { value: "", label: "All" },
    { value: "virtual", label: "Virtual" },
    { value: "onsite", label: "OnSite" },
    { value: "offile", label: "Offile" },
  ];
  const handleType = (e) => {
    setType(e.value);
  };
  return (
    <div className="border rounded mt-5 mb-5">
      <div className="flex h-screen rounded mt-1 mb-1">
        {/* Secção esquerda */}
        <div className="w-1/3 relative border-r">
          <h2 className="text-Left text-green-700 text-3xl font-semibold ml-5 mt-5">
            Sprouts
          </h2>

          {/* Input e botão */}
          <div className="text-left flex">
            <input
              name="filter"
              type="text"
              value={filter}
              onChange={handleFilterChange}
              className="border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-5 max-w-96 ml-4 text-black"
              placeholder="filter by username"
              required
            />
            <button
              onClick={resetFilter}
              className="p-2 w-max-100 mt-5 mb-5 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none  cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
            >
              <GrClearOption />
            </button>
            {/* <Dropdown
          options={optionsProf}
          message="Instructor"
          returned={handleProf}
        /> */}
          </div>
          {/* Conteúdo scrollable */}
          <div
            className="overflow-y-auto bg-white"
            style={{ maxHeight: `calc(100vh - 15vh)` }}
          >
            {Array.from({ length: 50 }, (_, index) => (
              <div
                key={index}
                className="p-4 border rounded border-gray-300 m-1"
              >
                Item {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Secção direita */}
        <div className="w-2/3 relative">
          <h2 className="text-Left text-green-700 text-3xl font-semibold ml-5 mt-5">
            Trainings
          </h2>
          {/* Input e botão */}
          <div className="text-left flex">
            <input
              name="filter"
              type="text"
              value={filter}
              onChange={handleFilterChange}
              className="border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-5 max-w-96 ml-4 text-black"
              placeholder="Filter by training name"
              required
            />
            <button
              onClick={resetFilter}
              className="p-2 w-max-100 mt-5 mb-5 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none  cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
            >
              <GrClearOption />
            </button>
            <Dropdown
              options={optionsType}
              message="Type "
              returned={handleType}
            />
          </div>
          {/* Conteúdo scrollable */}
          <div
            className="overflow-y-auto bg-white"
            style={{ maxHeight: `calc(100vh - 15vh)` }}
          >
            {" "}
            {Array.from({ length: 100 }, (_, index) => (
              <div
                key={index}
                className="p-4 border rounded border-gray-300 m-1"
              >
                Item {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
