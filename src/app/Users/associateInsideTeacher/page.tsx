"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CompleteName from "@/components/CompleteName";
import { Toaster, toast } from "sonner";

const Formulario = () => {
  const [usersName, setUsersName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getUserGroupTeamDepartment");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
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

  const handleSubmit = async () => {
    try {
      if (!selectedUser) {
        toast.error("Please select a user.");
        return;
      }

      const response = await fetch("/api/addNewInsideTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ useruid: selectedUser.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User associated successfully:", data);
        toast.success("User associated successfully.");
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Failed to associate user:", errorData);
        toast.error("Failed to associate user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error associating user:", error);
      toast.error("An error occurred while associating user.");
    }
  };

  return (
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
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.uname}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.utype}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
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
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.urole}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.uemployeenumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <Icon
                      icon="la:chalkboard-teacher"
                      width="24"
                      height="24"
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleAssociateTeacher(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <Icon icon="zondicons:close-solid" width="24" height="24" />
            </button>
            <div className="flex items-center ml-4 mt-16">
              <span className="font-semibold  text-lg">
                Are you sure you want to associate the user{" "}
                <span className="underline">{selectedUser?.uname}</span> to be
                an inside teacher?
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
    </div>
  );
};

export default Formulario;
