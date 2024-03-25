"use client";
import React, { Component } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
export default function UserOptions(active) {
  return (
    <div className="flex justify-end mb-2">
      <Link
        href="/profile"
        className={
          active === 1
            ? "bg-grey-400 py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
            : "py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
        }
      >
        <FaUserAlt size={20} />
      </Link>
      <button
        href=""
        className="hover:bg-red-400  text-white font-bold py-1 px-2.5 flex items-center transition: bg-color duration-200 ease-in-out, text-color  ease-in-out cursor-pointer mx-4"
      >
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
}
