import React, { Component } from "react";
import Link from "next/link";

export default function SessionExpired() {
  return (
    <div
      className="n fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-md shadow-md p-4 flex flex-col items-center w-full md:w-auto md:max-w-lg px-8 py-8 text-lg
      "
    >
      <p className="text-gray-700 text-center font-bold">
        Your session has expired!
      </p>

      <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/">Logout </Link>
      </button>
    </div>
  );
}
