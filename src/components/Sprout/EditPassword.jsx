import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import TextInput from "../TextInputUpdated";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { decrypt } from "src/session/crypt";
export default function EditPassword() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleOldPassword = (value) => {
    setCurrentPassword(value);
  };

  const handleNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  async function saveProfile() {
    try {
      if (currentPassword > 0 && newPassword > 0) {
        const validAttempt = await validation(currentPassword);
        if (validAttempt.code == 200) {
          if (newPassword.length >= 8) {
            if (newPassword == ConfirmPassword) {
              const response = await changePassword(newPassword);
              console.log(response);
              toast.success("Success.");
            } else toast.error("Invalid new password!");
          } else
            toast.error(
              "The new password needs to have 8 characters, at least!"
            );
        } else {
          toast.error("Invalid Credentials!");
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  async function validation(password) {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);
      const email = decryptedSession.user.email;
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

      const response = await fetch(
        "http://localhost:3000/api/sprout/changepassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: decryptedSession.user.id,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="border rounded mt-5 mb-5 max-w-screen">
      <Toaster richColors position="bottom-center" />
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          Edit my Profile
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded ">
          <div className="max-w-96">
            <TextInput
              id={"old"}
              type="password"
              label="Current Password"
              returned={handleOldPassword}
            />
          </div>
          <div className="max-w-96">
            <TextInput
              id={"new"}
              type="password"
              label="New Password"
              returned={handleNewPassword}
            />
          </div>
          <div className="max-w-96">
            <TextInput
              id={"newConfirm"}
              type="password"
              label="Confirm Password"
              returned={handleConfirmPassword}
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
