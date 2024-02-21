"use client";

import React from "react";
import { useState } from "react";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="rounded-lg sm:rounded-none sm:rounded-r-lg bg-gray-100 p-6 shadow-md sm:w-full md:w-96">
      <h1 class="text-5xl font-black text-center text-green-600 mb-10">
        Sprout
      </h1>

      <form>
        <div className="flex items-center mb-10">
          <label className="mr-2 font-bold text-black text-xl">👤</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-black rounded-md text-black"
            placeholder="Write your Email"
          />
        </div>

        <div className="flex items-center mb-10">
          <label className="mr-2 font-bold text-black text-xl">🔐</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-black rounded-md text-black "
            placeholder="Write your Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 font-black text-center text-black py-2 px-4 rounded-md hover:bg-green-300 transition-colors duration-300 mb-10"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
