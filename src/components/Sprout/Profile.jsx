import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";

export default function ProfileLayout() {
  const profile = {
    name: "Samuel",
    email: "sam@root.pt",
    location: "my Location",
    groups: ["g1", "g2", "g3", "g4"],
    team: "Green",
    department: "goat",
  };

  return (
    <div className="border rounded mt-5 max-w-screen">
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          My Profile
        </div>
        <span className="ml-3">
          <Link href="/profile/edit">
            <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 mr-2">
              Edit profile
            </button>
          </Link>
          <Link href="/profile/password">
            <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700">
              Edit password
            </button>
          </Link>
        </span>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-2xl  font-bold text-center text-[#87B421]">
            Personal Information
          </h3>
          <div className="text-l text-gray-600 font-bold text-left">
            Name:
            <span className="text-black mt-1 ml-1">{profile.name}</span>
          </div>
          <div className="text-l text-gray-600 font-bold text-left">
            Email:
            <span className="text-black  mt-1 ml-1">{profile.email}</span>
          </div>
          <div className="text-l text-gray-600 font-bold text-left">
            Location:
            <span className="text-black  mt-1 ml-1">{profile.location}</span>
          </div>
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-2xl  font-bold text-center text-[#87B421]">
            Group Information
          </h3>
          {profile.groups.map(function (group, index) {
            return (
              <div className="text-l text-gray-600 font-bold text-left">
                Group:
                <span className="text-black mt-1 ml-1">{group}</span>
              </div>
            );
          })}
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-2xl  font-bold text-center text-[#87B421]">
            Team Information
          </h3>
          <div className="text-l text-gray-600 font-bold text-left">
            Team:
            <span className="text-black mt-1 ml-1">{profile.team}</span>
          </div>
          <div className="text-l text-gray-600 font-bold text-left">
            Department:
            <span className="text-black mt-1 ml-1">{profile.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
