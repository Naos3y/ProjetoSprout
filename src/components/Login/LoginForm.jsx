import React from "react";
import { getSession, Login, Logout } from "../../session/server/session";

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
            className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500  mt-2"
            placeholder="Write your Email"
            required
          />
        </div>

        <div className="mb-2 text-left ml-2">
          <label className="font-bold text-gray-500  mb-10">Password</label>
          <input
            name="password"
            type="password"
            className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500  mt-2 text-black"
            placeholder="Write your Password"
            required
          />
        </div>

        <div className="mb-4 text-center">
          <a
            href="#"
            className="text-black transition-colors hover:text-gray-500 duration-300 font-bold"
          >
            Forgot the Password?
          </a>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#DFDFDF] text-[#818181] font-bold px-12 py-2 mb-4 rounded-md shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          {props.error == true ? (
            <p className=" text-sm transition-colors text-red-400 duration-300 font-bold">
              Incorrect Login or Password!
            </p>
          ) : (
            <p className=" text-sm transition-colors text-white duration-300 font-bold">
              :)
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
