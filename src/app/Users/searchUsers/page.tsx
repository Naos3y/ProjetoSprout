"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CompleteName from "@/components/CompleteName";
import Multiselect from "@/components/MultiselectEditUser";
import { Toaster, toast } from "sonner";

const Formulario = () => {
  const [completeName, setCompleteName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "Full Name",
    "User Type",
  ]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

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
    if (completeName.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.uname.toLowerCase().includes(completeName.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [completeName, users]);

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
            {filteredUsers &&
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  {selectedColumns.map((column) => (
                    <td
                      key={column}
                      className="border border-gray-400 p-2 whitespace-nowrap"
                    >
                      {getColumnValue(user, column)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getColumnValue = (user: any, column: any) => {
    switch (column) {
      case "Full Name":
        return user.uname;
      case "User Type":
        return user.utype;
      case "Admin Rights":
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
      case "Employee Number":
        return user.uemployeenumber;
      case "Role":
        return user.urole;
      case "Seniority":
        return user.useniority;
      case "Photo":
        return user.uphoto;
      case "Email":
        return user.login ? user.login.lemail : "";
      case "Team":
        return user.team.tname;
      case "Leader":
        return user.leaderName;
      case "Department":
        return user.departmentName;
      case "Groups":
        return user.groupName;
      case "Country":
        return user.ucountry;
      case "City":
        return user.ucity;
      case "Start Date":
        return user.ustartdate;
      default:
        return "";
    }
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
            <CompleteName
              label={"Search User Name"}
              value={completeName}
              returned={(value: string) => setCompleteName(value)}
            />
          </div>
        </div>

        <div className="ml-60">
          <Multiselect
            label="Select Columns"
            options={[
              { value: "Full Name", label: "Full Name" },
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
            ]}
            message="Select One / Multi"
            returned={setSelectedColumns}
          />
        </div>
      </div>

      {selectedColumns.length > 0 && renderTable()}
    </div>
  );
};

export default Formulario;
