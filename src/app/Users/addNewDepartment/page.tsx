"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CompleteName from "@/components/CompleteName";
import { Toaster, toast } from "sonner";

const AddNewDepartment = () => {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<
    { did: number; dname: string }[]
  >([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/getDepartment");
      if (response.ok) {
        const data = await response.json();
        setDepartments(data.data);
      } else {
        toast.error("Failed to fetch departments.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching departments.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/addNewDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dname: department }),
      });

      if (response.ok) {
        setDepartment(""); // Limpar o campo do nome do departamento
        fetchDepartments(); // Recarregar a lista de departamentos
        toast.success("Department registered successfully!");
      } else {
        toast.error("Failed to register department.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering department.");
    }
  };

  const handleRemoveDepartment = async (id: number) => {
    try {
      const response = await fetch("/api/removeDepartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ did: id }), // Enviar o ID do departamento a ser removido
      });

      if (response.ok) {
        fetchDepartments(); // Recarregar a lista de departamentos após a remoção
        toast.success("Department removed successfully!");
      } else {
        toast.error("Failed to remove department.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while removing department.");
    }
  };

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="ph:briefcase"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Add New Department
        </span>
      </div>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md mr-48">
          <CompleteName
            label={"Department Name"}
            value={department} // Definir o valor do campo
            returned={setDepartment}
          />
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="flex flex-wrap mt-8">
          <Toaster richColors position="bottom-center" />
          <button
            className="bg-gray-500 text-white font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-600 active:bg-gray-700"
            onClick={() => {
              toast.error("Registration Canceled!");
              setDepartment("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-600 active:bg-green-700"
            onClick={handleSubmit}
          >
            Register New Department
          </button>
        </div>
      </div>

      <div className="mt-24">
        <table className="mt-2 w-1/2 mx-auto border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.did}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {dept.dname}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <Icon
                      icon="pajamas:remove"
                      width="19"
                      height="19"
                      className="text-black-900 cursor-pointer"
                      onClick={() => handleRemoveDepartment(dept.did)}
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

export default AddNewDepartment;
