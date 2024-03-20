"use client";
import React, { Component } from "react";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
export default function UserOptions() {
  return (
    <div className="flex justify-end">
      <Link
        href=""
        className="bg-gray-400 hover:bg-gray-200 py-1 px-3 rounded-lg shadow-md flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out mx-4 cursor-pointer"
      >
        <FaUser size={20} />
      </Link>
      <Link
        href=""
        className="bg-red-400 hover:bg-red-100 text-white font-bold py-1 px-2.5 rounded-lg shadow-md flex items-center transition: bg-color duration-200 ease-in-out, text-color  ease-in-out cursor-pointer"
      >
        <FaSignOutAlt size={20} />
      </Link>
    </div>
  );
}
