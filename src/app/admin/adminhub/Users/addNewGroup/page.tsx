"use client";
import cookies from "js-cookie";
import { decrypt } from "/src/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "/src/session/sessionUtils";
import SideNav from "/src/components/Static/sidenav";
import "tailwindcss/tailwind.css";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "sonner";
import CompleteName from "/src/components/CompleteName";

export default function Sprout() {
  const [control, setControl] = useState(-1);
  const [permission, setPermission] = useState(0);
  const [showExpired, setShowExpired] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let flag = true;
    let sessionStatus;
    const getSession = async () => {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);
      const auxPermission = decryptedSession.user.permission;
      setPermission(auxPermission);

      if (!flag) {
        const expired = await sessionExpired();
        if (sessionStatus === 1 && expired === 1 && !showExpired) {
          setShowExpired(true);
        }
      } else if (flag) {
        sessionStatus = await validSession(0, 1, 3, 4);
        setControl(sessionStatus);
        flag = !flag;
      }
    };
    getSession();
    const intervalId = setInterval(getSession, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<{ gid: number; gname: string }[]>([]);
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);
  const [groupToRemoveId, setGroupToRemoveId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true); //CARREGAR A PAGINA

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/getGroups");
      if (response.ok) {
        const data = await response.json();
        setGroups(data.data);
      } else {
        toast.error("Failed to fetch Groups.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching groups.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveGroup = async (id: number) => {
    setGroupToRemoveId(id);
    setConfirmRemoveModal(true);
  };

  const confirmRemove = async () => {
    try {
      const response = await fetch("/api/removeGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gid: groupToRemoveId }),
      });

      if (response.ok) {
        fetchGroups();
        toast.success("Group removed successfully!");
        setConfirmRemoveModal(false);
      } else {
        toast.error("Failed to remove group.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while removing group.");
    }
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      toast.warning("Group name cannot be empty.");
      return;
    }

    const groupExists = groups.some((group) => group.gname === groupName);
    if (groupExists) {
      toast.error("Group already exists!");
      setGroupName("");
      return;
    }

    try {
      const response = await fetch("/api/addNewGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gname: groupName }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Group registered successfully!");
        setGroups([]);
        setGroupName("");
        fetchGroups();
      } else {
        toast.error(data.message || "Failed to register group.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering group.");
    }
  };

  return (
    <div>
      {control === -1 ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
            <h2 className="text-2xl text-gray-600 font-bold text-center">
              Loading...
            </h2>
          </div>
        </div>
      ) : control === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
            <h2 className="text-2xl text-gray-600 font-bold text-center">
              ACCESS DENIED !
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <SideNav
            isOpen={isOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main className="ml-14">
              <div>
                <div className="flex items-center ml-4">
                  <Icon
                    icon="clarity:employee-group-solid"
                    width="19"
                    height="19"
                    className="text-green-500"
                  />
                  <span className="font-semibold text-green-500 text-lg ml-2">
                    Add New Group
                  </span>
                </div>
                <div className="flex justify-center mt-16">
                  <CompleteName
                    label={"New Group Name"}
                    value={groupName}
                    returned={setGroupName}
                  />
                </div>

                <div className="flex justify-center ">
                  <div className="flex flex-wrap mt-2">
                    <Toaster richColors position="bottom-center" />
                    <button
                      style={{
                        marginTop: "50px",
                        marginRight: "10px",
                        marginBottom: "50px",
                      }}
                      className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
                      onClick={() => {
                        toast.error("Registration Canceled!");
                        setGroupName("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ marginTop: "50px", marginBottom: "50px" }}
                      className=" bg-green-500 text-white font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-800 hover:text-white active:bg-green-700"
                      onClick={handleSubmit}
                    >
                      Register New Group
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  {!isLoading ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4 text-center ">
                        Table of Groups
                      </h2>
                      <table className="mt-2 w-1/2 mx-auto border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Group
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Remove
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {groups.map((group) => (
                            <tr key={group.gid}>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                {group.gname}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex justify-center items-center">
                                  <Icon
                                    icon="pajamas:remove"
                                    width="19"
                                    height="19"
                                    className="text-red-700 cursor-pointer"
                                    onClick={() => handleRemoveGroup(group.gid)}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="flex justify-center">
                      <div className="font-semibold text-green-500 text-lg pb-3">
                        Loading Groups ...
                      </div>
                    </div>
                  )}
                </div>

                {confirmRemoveModal && (
                  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                      <h2 className="text-center text-lg font-semibold mb-4">
                        Confirm Remove Group
                      </h2>
                      <p className="mb-4">
                        Are you sure you want to remove this group?
                      </p>
                      <div className="flex justify-center">
                        <button
                          className="bg-red-500 text-white font-bold px-4 py-2 rounded-md shadow-sm mr-4 hover:bg-red-600"
                          onClick={confirmRemove}
                        >
                          Remove
                        </button>
                        <button
                          className="bg-gray-500 text-white font-bold px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
                          onClick={() => setConfirmRemoveModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
