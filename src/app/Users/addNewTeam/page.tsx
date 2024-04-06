"use client";

// components/Formulario.tsx

// pages/addNewTeam.tsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/dropdownGetDepartment";
import { Toaster, toast } from "sonner";
import CompleteName from "@/components/CompleteName";

const Formulario = () => {
  const [departments, setDepartments] = useState<
    { did: number; dname: string }[]
  >([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
  const [teamName, setTeamName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState<
    {
      departmentdid: number;
      dname: string;
      tname: string;
      department?: { did: number; dname: string };
    }[]
  >([]);

  useEffect(() => {
    fetchDepartments();
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/getTeams");
      if (response.ok) {
        const data = await response.json();
        setTeams(data.data);
      } else {
        toast.error("Failed to fetch Teams.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching Teams.");
    }
  };

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

  const handleSelectDepartment = async (selectedId: number) => {
    setSelectedDepartmentId(selectedId);
    setTeamName("");
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/addNewTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName: teamName,
          departmentId: selectedDepartmentId,
        }),
      });

      if (response.ok) {
        toast.success("Team registered successfully!");
        setTeamName(""); // Limpa os dados na caixa de texto
        fetchTeams(); //atualiza a tablea
      } else {
        toast.error("Failed to register team.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering team.");
    }
  };

  interface Option {
    value: number;
    label: string;
  }

  const handleSelect = (option: Option) => {
    setSelectedDepartmentId(option.value);
    setTeamName("");
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="ph:microsoft-teams-logo-fill"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Add New Team
        </span>
      </div>
      <div className="flex justify-center mt-16">
        <div className="mr-6">
          <Dropdown
            label="Department"
            options={
              departments && departments.length > 0
                ? departments.map((dept) => ({
                    value: dept.did,
                    label: dept.dname,
                  }))
                : []
            }
            message="Select One"
            returned={handleSelect}
          />
        </div>
        <div className="w-full max-w-md mr-48">
          <CompleteName
            label={"New Team Name"}
            value={teamName}
            returned={setTeamName}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap mt-16">
          <Toaster richColors position="bottom-center" />
          <button
            style={{
              marginTop: "50px",
              marginRight: "10px",
              marginBottom: "100px",
            }}
            className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
            onClick={() => {
              toast.error("Registration Canceled!");
              setTeamName("");
            }}
          >
            Cancel
          </button>
          <button
            style={{ marginTop: "50px", marginBottom: "100px" }}
            className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
            onClick={handleSubmit}
          >
            Register New Team
          </button>
        </div>
      </div>

      {/* Tabela de Equipes */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Teams and Respective Departments
        </h2>
        <table className="mt-2 w-1/2 mx-auto border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Team
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.departmentdid}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {team.department
                    ? team.department.dname
                    : "Unknown Department"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {team.tname}
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
