"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "sonner";
import CompleteName from "@/components/CompleteName";

const Formulario = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<{ gid: number; gname: string }[]>([]);

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
    }
  };

  const handleRemoveGroup = async (id: number) => {
    try {
      const response = await fetch("/api/removeGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gid: id }), // Enviar o ID do departamento a ser removido
      });

      if (response.ok) {
        fetchGroups(); // Recarregar a lista de grupos após a remoção
        toast.success("Group removed successfully!");
      } else {
        toast.error("Failed to remove group.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while removing group.");
    }
  };

  const handleSubmit = async () => {
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
        setGroupName(""); // Limpa o campo do nome do grupo após o registro bem-sucedido
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
              marginBottom: "100px",
            }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
            onClick={() => {
              toast.error("Registration Canceled!");
              setGroupName("");
            }}
          >
            Cancel
          </button>
          <button
            style={{ marginTop: "50px", marginBottom: "100px" }}
            className=" bg-green-500 text-white font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-800 hover:text-white active:bg-green-700"
            onClick={handleSubmit}
          >
            Register New Group
          </button>
        </div>
      </div>

      <div className="mt-8">
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
                      className="text-black-900 cursor-pointer"
                      onClick={() => handleRemoveGroup(group.gid)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Formulario;
