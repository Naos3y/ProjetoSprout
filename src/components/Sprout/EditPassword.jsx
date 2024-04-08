import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import TextInput from "../TextInput";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
export default function EditPassword() {
  const profile = {
    name: "Samuel",
    email: "sam@root.pt",
    contact: "91919191",
    location: "my Location",
    groups: ["g1", "g2", "g3", "g4"],
    team: "Green",
    department: "goat",
  };

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPassword = (value) => {
    setCurrentPassword(value);
  };

  const handleNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };
  async function saveProfile() {
    try {
      console.log(email.length);
      if (email.length > 0 && currentPassword > 0 && newPassword > 0) {
        const validAttempt = await validation(email, currentPassword);
        if (validAttempt.code == 200) {
          const response = await changePassword(newPassword);
          toast.success("Success.");
        } else {
          toast.success("Invalid Credentials!");
        }
      } else {
        toast.erro("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  async function validation(email, password) {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function changePassword(password) {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      console.log("Token:", token); // Add this line to check the token value
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: decryptedSession.user.id,
          password: password,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/api/changepassword",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="border rounded mt-5 max-w-screen">
      <Toaster richColors position="bottom-center" />
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          Edit my Profile
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded ">
          <div className="max-w-96">
            <TextInput label="Email" returned={handleEmail} />
          </div>
          <div className="max-w-96">
            <TextInput label="Current Password" returned={handleOldPassword} />
          </div>
          <div className="max-w-96">
            <TextInput label="New Password" returned={handleNewPassword} />
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
