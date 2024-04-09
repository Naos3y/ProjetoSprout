import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import TextInput from "../TextInput";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { useEffect } from "react";
import { decrypt } from "@/session/crypt";

export default function TeamLayout() {
  const [team, setTeam] = useState([]);
  async function tryGetTeam() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/myteam");
      url.searchParams.append("uid", decryptedSession.user.id);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  useEffect(() => {
    const updateData = async () => {
      try {
        const aTeam = await tryGetTeam();
        setTeam(aTeam.message);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    updateData();
  }, []);
  return (
    <div className="border rounded mt-5 max-w-screen">
      <Toaster richColors position="bottom-center" />
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          My Team
        </div>

        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <div className="h-screen">
            <div className="max-h-screen overflow-y-auto max-w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
              {Array.isArray(team) && team.length > 0 ? (
                team.map(function (user, index) {
                  return (
                    <div className="border border-gray-200 rounded">
                      <div id={index} key={index} className="flex">
                        <div className="w-4 h-auto">
                          <div className="bg-gray-200 block object-cover rounded-tl rounded-bl h-full w-full" />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Name:
                            <span className="text-black mt-1 ml-1">
                              {user.uname}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Email:
                            <span className="text-black mt-1 ml-1">
                              {user.lemail}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Role:
                            <span className="text-black mt-1 ml-1">
                              {user.urole}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Team:
                            <span className="text-black mt-1 ml-1">
                              {user.tname}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left">
                            Department:
                            <span className="text-black mt-1 ml-1">
                              {user.dname}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="border border-gray-300 rounded p-5 bg-white">
                  <p className="text-black mt-1 ml-1 font-bold">
                    No team members found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
