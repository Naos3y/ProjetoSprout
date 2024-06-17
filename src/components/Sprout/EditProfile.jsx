import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import TextInput from "../TextInputUpdated";
import { Toaster, toast } from "sonner";

export default function EditProfile() {
  const profile = {
    name: "Samuel",
    email: "sam@root.pt",
    location: "my Location",
    groups: ["g1", "g2", "g3", "g4"],
    team: "Green",
    department: "goat",
  };

  const [contact, setContact] = useState("");

  const handleReturnedValue = (value) => {
    setContact(value);
  };

  const saveProfile = () => {
    try {
      //function to change password
      toast.success("Success!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="border rounded mt-5 mb-5 max-w-screen">
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          Edit my Profile
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded ">
          <div className="max-w-96">
            <TextInput
              label="Upload a new photo"
              returned={handleReturnedValue}
            />
          </div>
          <button
            onClick={saveProfile}
            className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 ml-10 mt-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
