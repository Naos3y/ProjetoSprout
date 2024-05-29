"use client";

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
      tid: number;
      departmentdid: number;
      dname: string;
      tname: string;
      department?: { did: number; dname: string };
    }[]
  >([]);
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);
  const [teamToRemoveId, setTeamToRemoveId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true); //CARREGAR A PAGINA

  useEffect(() => {
    fetchDepartments();
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/getTeams");
      if (response.ok) {
        const data = await response.json();
        setTeams(
          data.data.sort((a: any, b: any) => {
            // Ordena os dados por nome do departamento
            if (a.department && b.department) {
              return a.department.dname.localeCompare(b.department.dname);
            }
            return 0;
          })
        );
      } else {
        toast.error("Failed to fetch Teams.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching Teams.");
    } finally {
      setIsLoading(false);
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

  const handleRemoveTeam = async (id: number) => {
    setTeamToRemoveId(id);
    setConfirmRemoveModal(true);
  };

  const confirmRemove = async () => {
    try {
      const response = await fetch("/api/removeTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tid: teamToRemoveId }), // Enviar o ID da team que vai ser removida
      });

      if (response.ok) {
        fetchDepartments();
        fetchTeams();
        toast.success("Team removed successfully!");
        setConfirmRemoveModal(false);
      } else {
        toast.error("Failed to remove team.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while removing team.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedDepartmentId) {
      toast.warning("Please select a valid department.");
      return;
    }

    if (!teamName.trim()) {
      toast.warning("Please enter a valid team name.");
      return;
    }

    const teamExists = teams.some(
      (team) =>
        team.tname === teamName && team.departmentdid === selectedDepartmentId
    );
    if (teamExists) {
      toast.error("Team already exists in this department!");
      setTeamName("");
      return;
    }

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
        setTeamName("");
        setTeams([]); //LIMPA A LISTA DE EQUIPAS
        fetchDepartments();
        fetchTeams(); //ATUALIZA A TABLEA
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
        <div className="flex flex-wrap mt-2">
          <Toaster richColors position="bottom-center" />
          <button
            style={{
              marginTop: "50px",
              marginRight: "10px",
              marginBottom: "50px",
            }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
            onClick={() => {
              toast.error("Registration Canceled!");
              setTeamName("");
            }}
          >
            Cancel
          </button>
          <button
            style={{ marginTop: "50px", marginBottom: "50px" }}
            className=" bg-green-500 text-white font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-800 hover:text-white active:bg-green-700"
            onClick={handleSubmit}
          >
            Register New Team
          </button>
        </div>
      </div>
      <div className="mt-2">
        {!isLoading ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center ">
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
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.departmentdid}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {team.department ? team.department.dname : "null"}{" "}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {team.tname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center items-center">
                        <Icon
                          icon="pajamas:remove"
                          width="19"
                          height="19"
                          className="text-red-700 cursor-pointer"
                          onClick={() => handleRemoveTeam(team.tid)}
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
              Loading Teams and Departmants ...
            </div>
          </div>
        )}
      </div>

      {confirmRemoveModal && ( //PAINEL DE REMOÇÃO DE EQUIPA
        <div className="text-center fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Remove Team</h2>
            <p className="mb-4">Are you sure you want to remove this team?</p>
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
  );
};

export default Formulario;
