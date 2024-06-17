"use client";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";
import Link from "next/link";
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

export default function UserOptions(active) {
  const logout = async () => {
    try {
      Cookies.remove("session");
      toast.success("Good bye sprout :)");
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong ...");
    }
  };

  return (
    <div className="flex justify-end mb-2">
      <Link
        href="/settings"
        className={
          active === 1
            ? "bg-grey-400 py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
            : "py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
        }
      >
        <IoIosSettings size={22} />
      </Link>
      <Link
        href="/profile"
        className={
          active === 1
            ? "bg-grey-400 py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
            : "py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
        }
      >
        <FaRegUserCircle size={22} />
      </Link>
      <Link
        href="/"
        onClick={logout}
        className={
          active === 1
            ? "bg-grey-400 py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
            : "py-1 px-3 flex items-center transition: bg-color duration-200 ease-in-out, text-color ease-in-out cursor-pointer"
        }
      >
        <RiLogoutBoxRFill size={22} />
      </Link>
    </div>
  );
}
