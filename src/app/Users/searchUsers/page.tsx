"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CompleteName from "@/components/CompleteName";
import Multiselect from "@/components/MultiselectEditUser";
import { Toaster, toast } from "sonner";

const Formulario = () => {
  const [completeName, setCompleteName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);

  // Dados de exemplo de usuários
  const users = [
    {
      id: 1,
      userType: "Admin",
      adminRights: "Full",
      employeeNumber: "EMP123",
      role: "Manager",
      seniority: "Senior",
      photo: "photo-url",
      email: "example@example.com",
      team: "Team A",
      leader: "John Doe",
      department: "Engineering",
      groups: "Group 1, Group 2",
      country: "Country A",
      city: "City A",
      startDate: "2024-04-01",
      trainingPlans: "Plan A, Plan B",
    },
    // Mais usuários...
  ];

  // Função para renderizar a tabela com as colunas selecionadas
  const renderTable = () => {
    return (
      <div className="flex justify-center mt-8">
        <table className="border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
          <thead className="bg-gray-200">
            <tr>
              {selectedColumns.map((column) => (
                <th key={column} className="border border-gray-400 p-2">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {selectedColumns.map((column) => (
                  <td
                    key={column}
                    className="border border-gray-400 p-2 whitespace-nowrap"
                  >
                    {user[column.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="wpf:add-user"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Search Users
        </span>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          <div className="ml-10">
            <CompleteName label={"Search Name"} returned={setCompleteName} />
          </div>

          <button
            style={{ marginTop: "50px", marginBottom: "100px" }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
            onClick={() => toast.success("Search actived")}
          >
            Search
          </button>
        </div>

        <div className="ml-60">
          <Multiselect
            label="Select Columns"
            options={[
              { value: "User Type", label: "User Type" },
              { value: "Admin Rights", label: "Admin Rights" },
              { value: "Employee Number", label: "Employee Number" },
              { value: "Role", label: "Role" },
              { value: "Seniority", label: "Seniority" },
              { value: "Photo", label: "Photo" },
              { value: "Email", label: "Email" },
              { value: "Team", label: "Team" },
              { value: "Leader", label: "Leader" },
              { value: "Department", label: "Department" },
              { value: "Groups", label: "Groups" },
              { value: "Country", label: "Country" },
              { value: "City", label: "City" },
              { value: "Start Date", label: "Start Date" },
              { value: "Training Plans", label: "Training Plans" },
            ]}
            message="Select One / Multi"
            returned={setSelectedColumns}
          />
        </div>
      </div>

      {/* Renderiza a tabela somente se houver colunas selecionadas */}
      {selectedColumns.length > 0 && renderTable()}
    </div>
  );
};

export default Formulario;
