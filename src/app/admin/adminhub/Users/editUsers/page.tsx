"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "sonner";
import CompleteName from "/src/components/CompleteName";
import Dropdown from "/src/components/DropdownRodrigo";

import cookies from "js-cookie";
import { decrypt } from "/src/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "/src/session/sessionUtils";
import SideNav from "/src/components/Static/sidenav";
import "tailwindcss/tailwind.css";

import DropdownCountry from "/src/components/DropdownCoutryCity/DropdownCountry";
import {
  getCountries,
  getStates,
  getCities,
} from "/src/app/api/getCountryCity/api";

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
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userType, setUserType] = useState("");
  const [adminRights, setAdminRights] = useState(0);
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const [completeName, setCompleteName] = useState("");
  const [selectedLeaderName, setSelectedLeaderName] = useState("");
  const [selectedAdminRights, setSelectedAdminRights] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedTeamIDNaoTrocado, setSelectedTeamIDNaoTrocado] = useState(0);
  const [selectedGroupNaoTrocado, setSelectedGroupNaoTrocado] = useState(0);

  const [selectedCountrys, setSelectedCountrys] = useState("");
  const [selectedCitys, setSelectedCitys] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //CARREGAR A PAGINA

  useEffect(() => {
    fetchLeader();
    fetchTeam();
    fetchGroups();
  }, []);

  const reloadUserData = async () => {
    try {
      const response = await fetch("/api/getUserGroupTeamDepartment");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    if (reloadData) {
      reloadUserData();
      setReloadData(false);
    }
  }, [reloadData]);

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
    if (usersName.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.uname.toLowerCase().includes(usersName.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [usersName, users]);

  const handleEditUser = (userId: number) => {
    const user = filteredUsers.find((user) => user.id === userId);
    if (user) {
      setSelectedUser(user);
      setUserType(user.utype);
      setCompleteName(user.uname);
      setSeniority(user.useniority);
      setAdminRights(user.uadminrights);
      setRole(user.urole);
      setSelectedTeamIDNaoTrocado(user.team.tid);
      setSelectedTeamId(user.teamtid);
      setSelectedGroupNaoTrocado(user.groupID);

      switch (user.uadminrights) {
        case 0:
          setSelectedAdminRights("Admin");
          break;
        case 1:
          setSelectedAdminRights("Admin");
          break;
        case 3:
          setSelectedAdminRights("Manager");
          break;
        case 4:
          setSelectedAdminRights("Sprout");
          break;
        default:
          setSelectedAdminRights("Select One");
          break;
      }

      if (user.groupName) {
        setGroupSelectedName(user.groupName);
      } else {
        setGroupSelectedName("Select One");
      }

      if (user.leaderName) {
        setSelectedLeaderName(user.leaderName);
      } else {
        setSelectedLeaderName("Select One");
      }

      if (user.team.tname) {
        setSelectedTeamName(user.team.tname);
      } else {
        setSelectedTeamName("Select One");
      }

      if (user.ucountry) {
        setSelectedCountrys(user.ucountry);
      } else {
        setSelectedCountrys("");
      }

      if (user.ucity) {
        setSelectedCitys(user.ucity);
      } else {
        setSelectedCitys("");
      }

      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setCompleteName("");
  };

  const handleSelectAdminRights = (option: { value: string }) => {
    const adminRightsValue = parseInt(option.value);
    setAdminRights(adminRightsValue);
  };

  const handleSelectRole = (option: { value: string }) => {
    setRole(option.value);
  };

  const handleSelectSeniority = (option: { value: string }) => {
    setSeniority(option.value);
  };

  //Dropdown do Leader
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeaderID, setSelectedDepartmentId] = useState<number>();
  const [leaderType, setLeaderType] = useState<
    { uid: number; uname: string }[]
  >([]);

  //Dropdown dos Groups
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [selectedGroupID, setSelectedGroupId] = useState<number>();
  const [groupSelectedName, setGroupSelectedName] = useState<String>();
  const [groupsName, setGroupsName] = useState<
    { gid: number; gname: string }[]
  >([]);

  //Dropdown das Teams
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [selectedTeamID, setSelectedTeamId] = useState<number>();
  const [teamDrop, setTeamDrop] = useState<
    {
      tid: number;
      departmentdid: number;
      dname: string;
      tname: string;
      department?: { did: number; dname: string };
    }[]
  >([]);

  interface Option {
    value: number;
    label: string;
  }

  const handleSelect = (option: Option) => {
    setSelectedDepartmentId(option.value);
    setIsOpen(false);
  };

  const handleSelectGroup = (option: Option) => {
    setSelectedGroupId(option.value);
    setIsOpenGroup(false);
  };

  const handleSelectTeam = async (option: Option) => {
    setSelectedTeamId(option.value);
    setIsOpenTeam(false);
  };

  const fetchLeader = async () => {
    try {
      const response = await fetch("/api/getUserType");
      if (response.ok) {
        const data = await response.json();
        setLeaderType(data.data);
      } else {
        toast.error("Failed to fetch leaders.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching leaders.");
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/getReportTeams");
      if (response.ok) {
        const data = await response.json();
        setTeamDrop(data.data);
      } else {
        toast.error("Failed to fetch report teams.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching report teams.");
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/getGroups");
      if (response.ok) {
        const data = await response.json();
        setGroupsName(data.data);
      } else {
        toast.error("Failed to fetch Groups.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching groups.");
    }
  };

  //COUNTRY CITY AND STATE

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [countryStates, setCountryStates] = useState([]);
  const [selectedState, setSelectedState] = useState<string>("");

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCountries().then((result) => {
      setCountries(result.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(selectedCountry);
    if (selectedCountry !== "Select Country") {
      getStates(selectedCountry).then((result) => {
        if (result) {
          setCountryStates(result.data.data.states);
        }
      });
    }
  }, [selectedCountry]);

  useEffect(() => {
    console.log(selectedState);
    if (selectedState !== "Select State" && selectedCountry) {
      getCities(selectedCountry, selectedState).then((result) => {
        if (result) {
          setCities(result.data.data);
        }
      });
    }
  }, [selectedState]);

  const handleCountryChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    setSelectedCountry(event.currentTarget.value);
  };

  const handleStateChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    setSelectedState(event.currentTarget.value);
  };

  const handleSubmit = async () => {
    try {
      let countryToSend = selectedCountry;
      let teamID = Number(selectedTeamIDNaoTrocado);
      let groupID = Number(0);
      let groupAtual = Number(selectedGroupNaoTrocado);

      if (
        selectedTeamID !== undefined &&
        selectedTeamID !== 0 &&
        selectedTeamID !== selectedTeamIDNaoTrocado
      ) {
        teamID = selectedTeamID;
      }

      if (
        selectedGroupID !== undefined &&
        selectedGroupID !== 0 &&
        selectedGroupID !== selectedGroupNaoTrocado
      ) {
        groupID = selectedGroupID;
      } else {
        groupID = selectedGroupNaoTrocado;
      }

      // Verificar se o país foi alterado
      if (selectedCountry === "") {
        countryToSend = selectedCountrys;
      }

      const response = await fetch("/api/editUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedUser.id,
          userType,
          adminRights,
          role,
          seniority,
          completeName,
          selectedLeaderID,
          teamID,
          selectedGroupID: groupID,
          groupAtual,
          selectedCountry: countryToSend,
          selectedCitys,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setReloadData(true);
      setIsModalOpen(false);
      toast.success("User updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
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
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[180px]">
                                {user.uname}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[180px]">
                                {user.login ? user.login.lemail : ""}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[140px]">
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
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[160px]">
                                {user.urole}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-center min-w-[105px]">
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
                    </>
                  ) : (
                    <div className="flex justify-center">
                      <div className="font-semibold text-green-500 text-lg pb-3">
                        Loading Users To Edit ...
                      </div>
                    </div>
                  )}
                </div>

                {isModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75">
                    <div className="bg-white p-8 rounded shadow-lg relative">
                      <div className="flex items-center ml-4">
                        <Icon
                          icon="ic:outline-edit"
                          width="19"
                          height="19"
                          className="text-green-500"
                        />
                        <span className="font-semibold text-green-500 text-lg ml-2">
                          Edit User: {selectedUser?.uname}
                        </span>
                      </div>

                      <div className="flex flex-wrap">
                        <div className="gap-4 ml-10">
                          <Dropdown
                            label="User Type"
                            options={[
                              { value: "IC", label: "IC" },
                              { value: "Leader", label: "Leader" },
                            ]}
                            message={userType}
                            returned={(option: { value: string }) =>
                              setUserType(option.value)
                            }
                          />
                        </div>
                        <div className="ml-10">
                          <Dropdown
                            label="Seniority"
                            options={[
                              { value: "Senior", label: "Senior" },
                              { value: "Junior", label: "Junior" },
                              { value: "Mid", label: "Mid " },
                            ]}
                            message={seniority}
                            returned={handleSelectSeniority}
                          />
                        </div>
                        <div className="gap-4 ml-10">
                          <Dropdown
                            label="Admin Rights"
                            options={[
                              { value: "4", label: "Sprout" },
                              { value: "3", label: "Manager" },
                              { value: "0", label: "Admin" },
                            ]}
                            message={selectedAdminRights}
                            returned={handleSelectAdminRights}
                          />
                        </div>
                        <div className="ml-10">
                          <Dropdown
                            label="Role"
                            options={[
                              {
                                value: "Backend Engineer",
                                label: "Backend Engineer",
                              },
                              {
                                value: "Frontend Engineer",
                                label: "Frontend Engineer",
                              },
                              {
                                value: "Fullstack Engineer",
                                label: "Fullstack Engineer",
                              },
                              {
                                value: "Data Engineer",
                                label: "Data Engineer",
                              },
                              {
                                value: "Talent Acquisition Specialist",
                                label: "Talent Acquisition Specialist",
                              },
                              { value: "People Ops", label: "People Ops" },
                              {
                                value: "Technical Support",
                                label: "Technical Support",
                              },
                              {
                                value: "Costumer Service Representative",
                                label: "Costumer Service Representative",
                              },
                              { value: "Agile Coach", label: "Agile Coach" },
                              {
                                value: "Devops Engineer",
                                label: "Devops Engineer",
                              },
                              {
                                value: "Technical Advisor",
                                label: "Technical Advisor",
                              },
                              {
                                value: "Marketing Specialist",
                                label: "Marketing Specialist",
                              },
                              {
                                value: "IT Sales Representative",
                                label: "IT Sales Representative",
                              },
                            ]}
                            message={role}
                            returned={handleSelectRole}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="ml-10">
                          <CompleteName
                            label={"Full Name"}
                            value={completeName}
                            returned={setCompleteName}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="gap-4 ml-10">
                          <Dropdown
                            label="Leader"
                            options={
                              leaderType && leaderType.length > 0
                                ? leaderType.map((user) => ({
                                    value: user.uid,
                                    label: user.uname,
                                  }))
                                : []
                            }
                            message={selectedLeaderName}
                            returned={handleSelect}
                          />
                        </div>
                        <div className="ml-10">
                          <Dropdown
                            label="Team"
                            options={
                              teamDrop && teamDrop.length > 0
                                ? teamDrop.map((team) => ({
                                    value: team.tid,
                                    label: team.tname,
                                  }))
                                : []
                            }
                            message={selectedTeamName}
                            returned={handleSelectTeam}
                          />
                        </div>

                        <div className="ml-10">
                          <Dropdown
                            label="Groups"
                            options={
                              groupsName && groupsName.length > 0
                                ? groupsName.map((team) => ({
                                    value: team.gid,
                                    label: team.gname,
                                  }))
                                : []
                            }
                            message={groupSelectedName}
                            returned={handleSelectGroup}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="mt-6 ml-20">
                          <DropdownCountry
                            label={"Country: " + selectedCountrys}
                            options={countries}
                            customValueKey="name"
                            onChange={handleCountryChange}
                          />
                        </div>
                        <div className="mt-6 ml-20">
                          <DropdownCountry
                            label="State: "
                            options={countryStates}
                            customValueKey="name"
                            onChange={handleStateChange}
                          />
                        </div>
                        <div className="mt-6 ml-20">
                          <DropdownCountry
                            label={"City: " + selectedCitys}
                            options={cities}
                          />
                        </div>
                      </div>
                      <div className="flex justify-center ">
                        <div className="flex flex-wrap ">
                          <Toaster richColors position="bottom-center" />
                          <button
                            style={{
                              marginTop: "100px",
                              marginRight: "10px",
                              marginBottom: "100px",
                            }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
                            onClick={() => {
                              closeModal();
                              toast.error("Update Canceled!");
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{
                              marginTop: "100px",
                              marginBottom: "100px",
                            }}
                            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                            onClick={handleSubmit}
                          >
                            Confirm Update
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
