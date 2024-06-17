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
import CompleteName from "/src/components/CompleteName";
import { Toaster, toast } from "sonner";

export default function Sprout() {
  const [control, setControl] = useState(-1);
  const [permission, setPermission] = useState(0);
  const [showExpired, setShowExpired] = useState(false);
  const [iisOpen, setiIsOpen] = useState(false);

  const toggleSideNav = () => {
    setiIsOpen(!iisOpen);
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

  const [usersName, setUsersName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //CARREGAR A PAGINA

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedUser(null);
  };

  const fetchInsideTeachers = async () => {
    try {
      const response = await fetch("/api/getNotInsideTeacher");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsideTeachers();
  }, []);

  useEffect(() => {
    if (usersName.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.uname.toLowerCase().includes(usersName.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [usersName, users]);

  const handleAssociateTeacher = (userId: number) => {
    const user = filteredUsers.find((user) => user.id === userId);

    if (user) {
      setSelectedUser(user);
    }
    setIsModalOpen(true);
  };

  const handleDesassociateTeacher = (userId: number) => {
    const user = filteredUsers.find((user) => user.id === userId);

    if (user) {
      setSelectedUser(user);
    }

    setIsConfirmationModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/addNewInsideTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useruid: selectedUser.id }),
      });

      if (response.ok) {
        fetchInsideTeachers();
        toast.success("User associated successfully.");
        closeModal();
      } else {
        const errorData = await response.json();
        toast.error("Failed to associate user: " + errorData.message);
      }
    } catch (error) {
      toast.error("An error occurred while associating user.");
    }
  };

  const handleConfirmDesassociate = async () => {
    try {
      if (!selectedUser) {
        toast.error("Please select a user.");
        return;
      }

      const response = await fetch("/api/removeInsideTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useruid: selectedUser.id }),
      });

      if (response.ok) {
        toast.success("User desassociated successfully.");
        fetchInsideTeachers();
        closeConfirmationModal();
      } else {
        const errorData = await response.json();
        toast.error("Failed to desassociate user: " + errorData.message);
      }
    } catch (error) {
      toast.error("An error occurred while desassociating user.");
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
            iisOpen={iisOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main className="ml-14">
              <div>
                <div className="flex items-center ml-4">
                  <Icon
                    icon="la:chalkboard-teacher"
                    width="19"
                    height="19"
                    className="text-green-500"
                  />
                  <span className="font-semibold text-green-500 text-lg ml-2">
                    Associate Inside Teacher
                  </span>
                </div>
                <div className="flex justify-center mt-16">
                  <div className="w-full max-w-md mr-64">
                    <div className="ml-10">
                      <CompleteName
                        label={"Search User Name"}
                        value={usersName}
                        returned={(value: string) => setUsersName(value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  {!isLoading ? (
                    <>
                      <h2 className="text-xl font-semibold mb-4 text-center ">
                        Table of Users to Edit
                      </h2>
                      <table className="mt-2 w-1/2 mx-auto border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              User Type
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Admin Rights
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Role
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Employee Number
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center">
                              Associate Inside Teacher
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id}>
                              <td
                                className="border border-gray-300 px-4 py-2 text-center min-w-[200px]"
                                style={{
                                  width: "200px",
                                }}
                              >
                                {user.uname}
                              </td>
                              <td
                                className="border border-gray-300 px-4 py-2 text-center min-w-[140px]"
                                style={{
                                  width: "130px",
                                }}
                              >
                                {user.utype}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[150px]">
                                {(() => {
                                  switch (user.uadminrights) {
                                    case 1:
                                      return "Admin";
                                    case 0:
                                      return "Admin";
                                    case 3:
                                      return "Manager";
                                    case 4:
                                      return "Sprout";
                                    default:
                                      return "";
                                  }
                                })()}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[180px]">
                                {user.urole}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[180px]">
                                {user.uemployeenumber}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[120px]">
                                {user.isInsideTeacher ? (
                                  <div className="flex justify-center items-center">
                                    <Icon
                                      icon="material-symbols:person-cancel-rounded"
                                      width="24"
                                      height="24"
                                      className="text-red-500 cursor-pointer"
                                      onClick={() =>
                                        handleDesassociateTeacher(user.id)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="flex justify-center items-center">
                                    <Icon
                                      icon="la:chalkboard-teacher"
                                      width="24"
                                      height="24"
                                      className="text-yellow-500 cursor-pointer"
                                      onClick={() =>
                                        handleAssociateTeacher(user.id)
                                      }
                                    />
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="flex justify-center">
                      <div className="font-semibold text-green-500 text-lg pb-3">
                        Loading Associate Inside Teachers ...
                      </div>
                    </div>
                  )}
                </div>

                {isModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75">
                    <div className="bg-white p-8 rounded shadow-lg relative">
                      <div className="flex items-center ml-4 mt-4">
                        <Icon
                          icon="la:chalkboard-teacher"
                          width="19"
                          height="19"
                          className="text-green-500"
                        />
                        <span className="font-semibold text-green-500 text-lg ml-2">
                          Associate Inside Teacher: {selectedUser?.uname}
                        </span>
                      </div>
                      <button
                        className="modal-close absolute top-0 right-0 p-3 text-red-600"
                        onClick={closeModal}
                      >
                        <Icon
                          icon="zondicons:close-solid"
                          width="24"
                          height="24"
                        />
                      </button>
                      <div className="flex items-center ml-4 mt-16">
                        <span className="font-semibold  text-lg">
                          Are you sure you want to associate the user{" "}
                          <span className="underline">
                            {selectedUser?.uname}
                          </span>{" "}
                          to be an inside teacher?
                        </span>
                      </div>
                      <div className="flex justify-center ">
                        <div className="flex flex-wrap ">
                          <Toaster richColors position="bottom-center" />
                          <button
                            style={{
                              marginTop: "50px",
                              marginRight: "10px",
                              marginBottom: "50px",
                            }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
                            onClick={() => {
                              toast.error("Update Canceled!");
                              closeModal();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ marginTop: "50px", marginBottom: "50px" }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                            onClick={handleSubmit}
                          >
                            Associate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isConfirmationModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75">
                    <div className="bg-white p-8 rounded shadow-lg relative">
                      <div className="flex items-center ml-4 mt-4">
                        <Icon
                          icon="la:chalkboard-teacher"
                          width="19"
                          height="19"
                          className="text-green-500"
                        />
                        <span className="font-semibold text-green-500 text-lg ml-2">
                          Desassociate Inside Teacher: {selectedUser?.uname}
                        </span>
                      </div>
                      <button
                        className="modal-close absolute top-0 right-0 p-3 text-red-600"
                        onClick={closeConfirmationModal}
                      >
                        <Icon
                          icon="zondicons:close-solid"
                          width="24"
                          height="24"
                        />
                      </button>
                      <div className="flex items-center ml-4 mt-16">
                        <span className="font-semibold  text-lg">
                          Are you sure you really want to desassociate the user{" "}
                          <span className="underline">
                            {selectedUser?.uname}
                          </span>{" "}
                          from being an inside teacher?
                        </span>
                      </div>
                      <div className="flex justify-center ">
                        <div className="flex flex-wrap ">
                          <Toaster richColors position="bottom-center" />
                          <button
                            style={{
                              marginTop: "50px",
                              marginRight: "10px",
                              marginBottom: "50px",
                            }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
                            onClick={() => {
                              toast.error("Update Canceled!");
                              closeConfirmationModal();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{ marginTop: "50px", marginBottom: "50px" }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                            onClick={handleConfirmDesassociate}
                          >
                            Desassociate
                          </button>
                        </div>
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
