import React, { Component } from "react";
import Link from "next/link";

export default function ColorHelp({ onClose }) {
  const handleClick = () => {
    onClose();
  };

  return (
    <div className="n fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4 flex flex-col items-justify w-full md:w-auto md:max-w-lg px-8 py-8 text-lg border border-gray-300">
      <div className="p-2">
        <label className="text-red-400 text-center font-bold">
          Light Red Banner
        </label>
        <p>Your training is pending and already started</p>
      </div>

      <div className="p-2">
        <label className="text-blue-400 text-center font-bold  mt-1">
          Light Blue Banner
        </label>
        <p>Your training is pending but didn't start yet</p>
      </div>
      <div className="p-2">
        <label className="text-black text-center font-bold  mt-1">
          Black Banner
        </label>
        <p>Training already completed</p>
      </div>
      <div className="p-2">
        <label className="text-green-400 text-center font-bold  mt-1">
          Light Gree Banner
        </label>
        <p>Incoming Training</p>
      </div>
      <div className="p-2 border-gray-300 border mb-1 rounded-sm">
        <label className="text-gray-500 text-center font-bold  mt-1">
          Gray Border
        </label>
        <p>Inside Trainings</p>
      </div>
      <div className="p-2 border-blue-300 border rounded-sm">
        <label className="text-blue-500 text-center font-bold mt-1">
          Blue Border
        </label>
        <p>Outside Trainings</p>
      </div>
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        GOT IT!
      </button>
    </div>
  );
}
