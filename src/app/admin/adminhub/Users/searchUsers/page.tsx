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
import Multiselect from "/src/components/MultiselectEditUser";
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

  const [completeName, setCompleteName] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); //CARREGAR A PAGINA

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
      } finally {
        setIsLoading(false);
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
        {!isLoading ? (
          <>
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
          </>
        ) : (
          <div className="flex justify-center">
            <div className="font-semibold text-green-500 text-lg pb-3">
              Loading Groups ...
            </div>
          </div>
        )}
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
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
