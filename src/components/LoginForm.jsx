import React from "react";
import { getSession, Login, Logout } from "@/auth/session";

export default async function LoginForm(props) {
  return (
    <div className="rounded-lg sm:rounded-none sm:rounded-r-lg bg-white p-6 shadow-md sm:w-full md:w-96">
      <h1 className="text-5xl font-black text-center text-green-700 mb-10 mt-6 font-tara">
        Sprout
      </h1>

      <form
        action={async (email, password) => {
          "use server";
          await Login(email, password);
        }}
      >
        <div className="mb-6 text-left ml-2">
          <label className="font-bold text-gray-500 mb-10 ">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-black rounded-md text-black"
            placeholder="Write your Email"
            required
          />
        </div>

        <div className="mb-2 text-left ml-2">
          <label className="font-bold text-gray-500  mb-10">Password</label>
          <input
            name="password"
            type="password"
            className="w-full px-3 py-2 border border-black rounded-md text-black "
            placeholder="Write your Password"
            required
          />
        </div>

        <div className="mb-8 text-center">
          <a
            href="#"
            className="text-black transition-colors hover:text-gray-500 duration-300 font-bold"
          >
            Forgot the Password ?
          </a>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-1/2 bg-green-700 font-black text-center text-white py-2 px-4 rounded-md hover:bg-green-400 hover:text-black transition-colors duration-300 mb-2"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          {props.error == true ? (
            <p className=" text-sm transition-colors text-red-400 duration-300 font-bold">
              Incorrect Login or Password !
            </p>
          ) : (
            <p className=" text-sm transition-colors text-gray-500 duration-300 font-bold">
              Insert your credentials !
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
