"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "sonner";
import CompleteName from "@/components/CompleteName";

const Formulario = () => {
  const [usersName, setUsersName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Estado para o usuário selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a exibição do modal

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

  // Função para abrir o modal e definir o usuário selecionado
  const handleEditUser = (userId: number) => {
    const user = filteredUsers.find((user) => user.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="ic:outline-edit"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Edit Users
        </span>
      </div>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md mr-48">
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
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Admin Rights
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Edit User
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
                  {user.login ? user.login.lemail : ""}
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
                  <div className="flex justify-center items-center">
                    <Icon
                      icon="fa-solid:user-edit"
                      width="19"
                      height="19"
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleEditUser(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal simples */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-lg relative">
            <h2>User Details</h2>
            <button
              className="modal-close absolute top-0 right-0 p-3 text-red-600"
              onClick={closeModal}
            >
              <Icon icon="zondicons:close-solid" width="24" height="24" />
            </button>
            <p>Name: {selectedUser?.uname}</p>
            <p>Email: {selectedUser?.login?.lemail}</p>
            {/* Adicione mais detalhes do usuário conforme necessário */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;
