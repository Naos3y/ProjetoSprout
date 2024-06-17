"use client";

import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import cookies from "js-cookie";
import { decrypt } from "/src/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "/src/session/sessionUtils";
import SideNav from "/src/components/Static/sidenav";
import "tailwindcss/tailwind.css";

import {
  getCountries,
  getStates,
  getCities,
} from "/src/app/api/getCountryCity/api";
import DropdownCountry from "/src/components/DropdownCoutryCity/DropdownCountry";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import TextInput from "/src/components/TextInputRodrigo";
import Dropdown from "/src/components/DropdownRodrigo";
import CompleteName from "/src/components/CompleteName";
import DatePicker from "/src/components/DatePickerRodrigo";
import PhotoInput from "/src/components/PhotoInput";
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

  const [userType, setUserType] = useState("");
  const [adminRights, setAdminRights] = useState(0);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [role, setRole] = useState("");
  const [completeName, setCompleteName] = useState("");
  const [seniority, setSeniority] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState<string>("");
  const [day, setStartDate] = useState("");

  //Dropdown do Report Team
  const [isOpenReportTeam, setIsOpenReportTeam] = useState(false);
  const [selectedReportTeamID, setSelectedReportTeamId] = useState<string>();
  const [reportTeam, setReportTeam] = useState<
    { tid: number; tname: string }[]
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

  //Dropdown do Leader
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLeaderID, setSelectedDepartmentId] = useState<number>();
  const [leaderType, setLeaderType] = useState<
    { uid: number; uname: string }[]
  >([]);

  //Dropdown dos Groups
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [selectedGroupID, setSelectedGroupId] = useState<number>();
  const [groupsName, setGroupsName] = useState<
    { gid: number; gname: string }[]
  >([]);

  useEffect(() => {
    fetchLeader();
    fetchReportTeam();
    fetchTeam();
    fetchGroups();
  }, []);

  interface OptionGroup {
    value: number;
    label: string;
  }

  const handleSelectGroup = (option: OptionGroup) => {
    setSelectedGroupId(option.value);
    setIsOpenGroup(false);
  };

  interface OptionReportTeam {
    value: number;
    label: string;
  }

  const handleSelectReportTeam = (option: OptionReportTeam) => {
    setSelectedReportTeamId(option.label.toString());
    setIsOpenReportTeam(false);
  };

  interface OptionTeam {
    value: number;
    label: string;
  }

  const handleSelectTeam = async (option: OptionTeam) => {
    setSelectedTeamId(option.value);
    setIsOpenTeam(false);
  };

  interface Option {
    value: number;
    label: string;
  }

  const handleSelect = (option: Option) => {
    setSelectedDepartmentId(option.value);
    setIsOpen(false);
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

  const fetchReportTeam = async () => {
    try {
      const response = await fetch("/api/getReportTeams");
      if (response.ok) {
        const data = await response.json();
        setReportTeam(data.data);
        setTeamDrop(data.data);
      } else {
        toast.error("Failed to fetch report teams.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching report teams.");
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/getTeamAndDepartmentAssociated");
      if (response.ok) {
        const data = await response.json();
        //setTeamDrop(data.data);
      } else {
        toast.error("Failed to fetch teams.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching teams.");
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

  //VERIFICACAO DO EMAIL

  const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    try {
      // Verificar se o email é válido antes de avançar
      if (!isValidEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      console.log("Selected Team ID:", selectedTeamID);

      const response3 = await fetch(photo, {
        headers: {
          Accept: "image/jpeg", // Especifique o tipo de conteúdo que você espera receber
        },
      });

      const imageBlob = await response3.blob();

      // Upload da imagem para o Firebase Storage
      const imageRef = ref(storage, `images/${photo + v4()}`);
      await uploadBytes(imageRef, imageBlob);

      const selectededReportTeamID = selectedReportTeamID || "";
      console.log("Selected ReportTeam ID:", selectededReportTeamID);

      let userData: any = {
        userType,
        adminRights,
        employeeNumber,
        role,
        completeName,
        seniority,
        photo,
        email,
        startDate: day,
        selectedLeaderID: selectedLeaderID ? String(selectedLeaderID) : null,
        selectedTeamID,
        selectedGroupID,
        country: selectedCountry,
        City: selectedState,
        selectededReportTeamID,
      };

      const response = await fetch("/api/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.code === 200) {
        console.log("data", data);

        console.log("User registered successfully:", data);
        toast.success("User registered successfully.");

        window.location.reload();
      } else if (data.code === 400) {
        console.log("data", data);
        toast.error("User already exists!");

        //window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Failed to register user:", errorData);
        toast.error("Failed to register user, please fill out all text box");
      }

      fetchLeader();
      fetchReportTeam();
      fetchTeam();
      fetchGroups();
      getCountries().then((result) => {
        setCountries(result.data.data);
      });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred while registering user.");
    }
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

  const setPhotos = (fileName: string) => {
    // Atualize o estado da photo com o nome do ficheiro
    setPhoto(fileName);
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
            iisOpen={isOpen}
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
                    Add New User
                  </span>
                </div>
                <div className="flex flex-wrap">
                  <div className="gap-4 ml-10">
                    <Dropdown
                      label={
                        <span>
                          User Type <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={[
                        { value: "IC", label: "IC" },
                        { value: "Leader", label: "Leader" },
                      ]}
                      message="Select One"
                      returned={(option: { value: string }) =>
                        setUserType(option.value)
                      }
                    />
                  </div>

                  <div className="gap-4 ml-10">
                    <Dropdown
                      label={
                        <span>
                          Admin Rights <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={[
                        { value: "4", label: "Sprout" },
                        { value: "3", label: "Manager" },
                        { value: "0", label: "Admin" },
                      ]}
                      message="Select One"
                      returned={handleSelectAdminRights}
                    />
                  </div>

                  <div className="ml-10">
                    <TextInput
                      label={
                        <span>
                          Employee Number{" "}
                          <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      returned={setEmployeeNumber}
                    />
                  </div>

                  <div className="ml-10">
                    <Dropdown
                      label={
                        <span>
                          Role <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
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
                        { value: "Data Engineer", label: "Data Engineer" },
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
                        { value: "Devops Engineer", label: "Devops Engineer" },
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
                      message="Select One"
                      returned={handleSelectRole}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="ml-10">
                    <Dropdown
                      label={
                        <span>
                          Seniority <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={[
                        { value: "Senior", label: "Senior" },
                        { value: "Junior", label: "Junior" },
                        { value: "Mid", label: "Mid" },
                      ]}
                      message="Select One"
                      returned={handleSelectSeniority}
                    />
                  </div>

                  <div className="ml-10">
                    {userType === "Leader" && (
                      <Dropdown
                        label={
                          <span>
                            Report Team <span style={{ color: "red" }}>*</span>{" "}
                          </span>
                        }
                        options={
                          reportTeam && reportTeam.length > 0
                            ? reportTeam.map((team) => ({
                                value: team.tid,
                                label: team.tname,
                              }))
                            : []
                        }
                        message="Select One"
                        returned={handleSelectReportTeam}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="ml-10">
                    <CompleteName
                      label={
                        <span>
                          Full Name <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      value={completeName}
                      returned={setCompleteName}
                    />
                  </div>

                  <div className="ml-10 ">
                    <PhotoInput
                      label={
                        <span>
                          Photo <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      returned={setPhotos}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="ml-10 flex items-center">
                    <CompleteName
                      label={
                        <span>
                          Email <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      value={email}
                      returned={setEmail}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="gap-4 ml-10">
                    <Dropdown
                      label={
                        <span>
                          Leader <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={
                        leaderType && leaderType.length > 0
                          ? leaderType.map((user) => ({
                              value: user.uid,
                              label: user.uname,
                            }))
                          : []
                      }
                      message="Select One"
                      returned={handleSelect}
                    />
                  </div>

                  <div className="ml-10">
                    <Dropdown
                      label={
                        <span>
                          Team <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={
                        teamDrop && teamDrop.length > 0
                          ? teamDrop.map((team) => ({
                              value: team.tid,
                              label: team.tname,
                            }))
                          : []
                      }
                      message="Select One"
                      returned={handleSelectTeam}
                    />
                  </div>

                  <div className="ml-10">
                    <Dropdown
                      label={
                        <span>
                          Groups <span style={{ color: "red" }}>*</span>{" "}
                        </span>
                      }
                      options={
                        groupsName && groupsName.length > 0
                          ? groupsName.map((team) => ({
                              value: team.gid,
                              label: team.gname,
                            }))
                          : []
                      }
                      message="Select One"
                      returned={handleSelectGroup}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="mt-6 ml-20">
                    <DropdownCountry
                      label="Country"
                      options={countries}
                      customValueKey="name"
                      onChange={handleCountryChange}
                    />
                  </div>
                  <div className="mt-6 ml-20">
                    <DropdownCountry
                      label="State"
                      options={countryStates}
                      customValueKey="name"
                      onChange={handleStateChange}
                    />
                  </div>
                  <div className="mt-6 ml-20">
                    <DropdownCountry label="City" options={cities} />
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="mt-6 ml-10">
                    {
                      <DatePicker
                        label={
                          <span>
                            Start Date <span style={{ color: "red" }}>*</span>{" "}
                          </span>
                        }
                        returned={setStartDate}
                      />
                    }
                  </div>
                </div>

                <div className="flex justify-center ">
                  <div className="flex flex-wrap ">
                    <Toaster richColors position="bottom-center" />
                    <button
                      style={{
                        marginTop: "50px",
                        marginRight: "10px",
                        marginBottom: "100px",
                      }}
                      className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
                      onClick={() => toast.error("Registration Canceled!")}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ marginTop: "50px", marginBottom: "100px" }}
                      className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                      onClick={handleSubmit}
                    >
                      Regist New User
                    </button>
                  </div>
                </div>
              </div>
              );
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
