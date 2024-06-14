"use client";

import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import TimePicker from "@/components/TimePicker";
import DatePicker from "@/components/DatePicker";
import TextInput from "@/components/TextInput";
import TableTextInput from "@/components/EnrollUser";
import MultiselectSearch from "@/components/MultiselectSearch";
import { GrClearOption } from "react-icons/gr";
import FilterDropDown from "@/components/FilterDropDown";
import TextInputEdit from "@/components/TextInputEdit";
import axios from "axios";
import { saveAs } from "file-saver";
import SideNav from "@/components/Static/sidenav";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "@/session/sessionUtils";
import "tailwindcss/tailwind.css";

function StartInsideTraining() {
  const [trainingStartDate, setTrainingStartDate] = useState(null);
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [numMin, setNumMin] = useState(0);
  const [description, setDescription] = useState(null);
  const [minParticipants, setMinParticipants] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [trainingName, setTrainingName] = useState(null);
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [associatedTeachers, setAssociatedTeachers] = useState([]);
  const [openForGroup, setOpenForGroup] = useState([]);
  const [openForTeam, setOpenForTeam] = useState([]);
  const [openForDepartment, setOpenForDepartment] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [trainingID, setTrainingID] = useState(0);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [showStartConfirmation, setShowStartConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const [department, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [options, setOptions] = useState([]);
  const [trainingType, setTrainingType] = useState("internal");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupOptions, setGroupOtions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);

  const [filter, setFilter] = useState("");
  const [type, setType] = useState("all");

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const [control, setControl] = useState(-1);
  const [permission, setPermission] = useState(0);
  const [showExpired, setShowExpired] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  const downloadCertificate = async (trainingName, userName, date) => {
    try {
      const response = await axios.post(
        "/api/adminTrainings/generatePDF",
        {
          trainingName,
          userName,
          date,
        },
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "certificate.pdf");
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const resetFilter = () => {
    setFilter("");
  };

  const handleType = (e) => {
    setType(e.value);
  };

  const filteredTrainings = trainings.filter((training) => {
    const matchesFilter = training.itname
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesStatus =
      type === "all" ||
      (type === "started" && training.itstarted) ||
      (type === "notstarted" && !training.itstarted);
    return matchesFilter && matchesStatus;
  });

  useEffect(() => {
    getAllInsideTrainings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const trainers = await handleTrainerOptions(trainingType);
      setOptions(trainers);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const departments = await handleDepartmentOptions();
      setDepartmentOptions(departments);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await handleGroupOptions();
      setGroupOtions(groups);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const teams = await handleTeamOptions();
      setTeamOptions(teams);
    };
    fetchData();
  }, []);

  const handleTeamOptions = async () => {
    try {
      const response = await fetch(`/api/adminTrainings/getTeamNames`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const mappedTeams = responseData.trainers.map((teams) => ({
          value: teams.team_id,
          label: teams.team_name,
        }));
        return mappedTeams;
      } else {
        toast.error("Failed to get teams");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to get the teams. Please try again later."
      );
    }
  };

  const handleGroupOptions = async () => {
    try {
      const response = await fetch(`/api/adminTrainings/getGroupNames`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const mappedGroups = responseData.trainers.map((groups) => ({
          value: groups.group_id,
          label: groups.group_name,
        }));
        return mappedGroups;
      } else {
        toast.error("Failed to get groups");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to get the groups. Please try again later."
      );
    }
  };

  const handleDepartmentOptions = async () => {
    try {
      const response = await fetch(`/api/adminTrainings/getDepartmentNames`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const mappedDepartments = responseData.trainers.map((departments) => ({
          value: departments.department_id,
          label: departments.department_name,
        }));
        return mappedDepartments;
      } else {
        toast.error("Failed to get departments");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to get the departments. Please try again later."
      );
    }
  };

  const handleTrainerOptions = async () => {
    /* try {
      if (type.value == "external") {
        setTrainers([]);
        try {
          const response = await fetch(
            `/api/adminTrainings/getExternalTrainers`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            const mappedTrainers = responseData.trainers.map((trainer) => ({
              value: trainer.trainer_id,
              label: trainer.trainer_name,
            }));
            //console.log("aqui", mappedTrainers);
            return mappedTrainers;
          } else {
            toast.error("Failed to get trainers");
            return [];
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(
            "An error occurred while trying to get internal trainers. Please try again later."
          );
        }
      } else if (type.value == "internal") { */
    setTrainers([]);
    try {
      const response = await fetch(`/api/adminTrainings/getInternalTrainers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const mappedTrainers = responseData.trainers.map((trainer) => ({
          value: trainer.user_id,
          label: trainer.teacher_name,
        }));
        //console.log("aqui", mappedTrainers);
        return mappedTrainers;
      } else {
        toast.error("Failed to get trainers");
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to get internal trainers. Please try again later."
      );
    }
    /*}
     } catch (error) {
      return [];
    } */
  };

  const showHelp = () => {
    setShowHelpModal(true);
  };

  const getTrainingDataByID = async (trainingID) => {
    setTrainingID(trainingID);

    try {
      const response = await fetch(
        `/api/adminTrainings/getTrainingDetails?id=${encodeURIComponent(
          trainingID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const training = responseData.trainings[0];

        setTrainingArea(training.ittrainingarea);
        setEventType(training.iteventtype);
        setNumMin(training.itnumofmin);
        setDescription(training.itdescription);
        setMinParticipants(training.itminparticipants);
        setMaxParticipants(training.itmaxparticipants);
        setTrainingName(training.itname);
      } else {
        toast.error("Training not found.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting training data.");
    }

    try {
      const response = await fetch(
        `/api/adminTrainings/getTrainingsUsers?id=${encodeURIComponent(
          trainingID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        const users = responseData.users.map((user) => ({
          id: user.user_id,
          name: user.user_name,
          department: user.department_name,
          group: user.group_name,
          team: user.team_name,
        }));

        setAssociatedUsers(users);
      } else {
        toast.error("Training not found.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting training data.");
    }

    try {
      const response = await fetch(
        `/api/adminTrainings/getTrainingTeachers?id=${encodeURIComponent(
          trainingID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const teachers = responseData.teachers.map((teacher) => ({
          id: teacher.inside_teacher_id,
          name: teacher.inside_teacher_name,
        }));

        setAssociatedTeachers(teachers);
      } else {
        toast.error("Training not found.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting training data.");
    }

    try {
      const response = await fetch(
        `/api/adminTrainings/getDepTeamGroupByTrainingID?id=${encodeURIComponent(
          trainingID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        // pedaço codigo GPT

        // Filtrar informações únicas para cada opção
        const uniqueDepartments = [
          ...new Set(responseData.data.map((d) => d.department_name)),
        ];
        const uniqueGroups = [
          ...new Set(responseData.data.map((d) => d.group_name)),
        ];
        const uniqueTeams = [
          ...new Set(responseData.data.map((d) => d.team_name)),
        ];

        // Adicionar informações filtradas aos respectivos estados
        setOpenForDepartment(uniqueDepartments);
        setOpenForGroup(uniqueGroups);
        setOpenForTeam(uniqueTeams);
      } else {
        toast.error("Training not found.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting training data.");
    }
  };

  const getAllInsideTrainings = async () => {
    try {
      const response = await fetch(`/api/adminTrainings/getTrainingData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setTrainings(responseData.trainings);
        setShowTable(true);
      } else {
        toast.error("Failed to get trainings");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while trying to get all trainings. Please try again later."
      );
    }
  };

  const showAddModal = (TID) => {
    getTrainingDataByID(TID);
    setShowAddOptions(true);
  };

  const showEditModal = async (TID) => {
    await getTrainingDataByID(TID);
    setShowEdit(true);
  };

  const editTraining = async () => {
    editTrainingData(trainingID);
  };

  const handleModalSwitch = () => {
    if (time == null || date == null || location == null) {
      toast.error("Complete all fields");
    } else {
      setShowAddOptions(false);
      setShowStartConfirmation(true);
    }
  };

  const handleShowBackStartModal = () => {
    setShowStartConfirmation(false);
    setShowAddOptions(true);
  };

  const startTraining = async () => {
    setShowStartConfirmation(false);

    if (associatedUsers.length === 0 || associatedTeachers.length === 0) {
      toast.error("Please add users to the training before starting it");
      return;
    }

    try {
      const response = await fetch(`/api/adminTrainings/StartIT_Updated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainingID: trainingID,
          date: date,
          time: time,
          location: location,
        }),
      });

      if (response.ok) {
        toast.success("Training Started!");
      } else {
        toast.error("Training not found");
      }
    } catch (error) {
      toast.error("An error occurred while starting the training.");
    }

    setDate(null);
    setTime(null);
    setLocation(null);
  };

  const fetchUserIDsByDepartment = async (departments) => {
    const userIDs = new Set();
    const extractUserIDs = (responseData) => {
      responseData.forEach((item) => {
        const userID = item.bruno_getusersbydepartmentid;
        if (userID) {
          userIDs.add(userID);
        }
      });
    };

    for (const dept of departments) {
      const response = await fetch(
        `/api/adminTrainings/getUsersByDepartmentID?id=${dept.value}`,
        { method: "GET" }
      );
      if (response.ok) {
        const responseData = await response.json();
        extractUserIDs(responseData.departments);
      }
    }
    return [...userIDs];
  };

  const fetchUserIDsByTeam = async (teams) => {
    const userIDs = new Set();
    const extractUserIDs = (responseData) => {
      responseData.forEach((item) => {
        const userID = item.bruno_getusersbyteamid;
        if (userID) {
          userIDs.add(userID);
        }
      });
    };

    for (const team of teams) {
      const response = await fetch(
        `/api/adminTrainings/getUsersByTeamID?id=${team.value}`,
        { method: "GET" }
      );
      if (response.ok) {
        const responseData = await response.json();
        extractUserIDs(responseData.teams);
      }
    }
    return [...userIDs];
  };

  const fetchUserIDsByGroup = async (groups) => {
    const userIDs = new Set();
    const extractUserIDs = (responseData) => {
      responseData.forEach((item) => {
        const userID = item.bruno_getusersbygroupid;
        if (userID) {
          userIDs.add(userID);
        }
      });
    };

    for (const group of groups) {
      const response = await fetch(
        `/api/adminTrainings/getUsersByGroupID?id=${group.value}`,
        { method: "GET" }
      );
      if (response.ok) {
        const responseData = await response.json();
        extractUserIDs(responseData.groups);
      }
    }
    return [...userIDs];
  };

  const fetchTeacherIDs = async (trainers) => {
    const trainerIds = trainers.map((trainer) => trainer.value);
    const response = await fetch(
      `/api/adminTrainings/getInsideTeacherByUserID?userids=${encodeURIComponent(
        trainerIds
      )}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData.userids;
    } else {
      toast.error("Failed to get teacher IDs");
      return [];
    }
  };

  const editTrainingData = async (idTraining) => {
    try {
      const response = await fetch(
        `/api/adminTrainings/editTrainingDescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trainingID: idTraining,
            description: description,
          }),
        }
      );

      if (response.ok) {
        //toast.success("description edited");
      } else {
        //toast.error("erro editing description");
      }
    } catch (error) {
      //console.log("description error: ", error);
      toast.error("An error occurred while editing the description");
    }

    try {
      const response = await fetch(`/api/adminTrainings/editTrainingDuration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainingID: idTraining,
          duration: numMin,
        }),
      });

      if (response.ok) {
        //toast.success("ok");
      } else {
        //toast.error("erro editing duration");
      }
    } catch (error) {
      // console.log("duration error: ", error);
      toast.error("An error occurred while editing the training duration");
    }

    try {
      const response = await fetch(`/api/adminTrainings/editTrainingName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trainingID: idTraining,
          name: trainingName,
        }),
      });

      if (response.ok) {
        //toast.success("name edited");
      } else {
        //toast.error("erro editing name");
      }
    } catch (error) {
      //console.log("name error: ", error);
      toast.error("An error occurred while editing the training name");
    }

    try {
      const userIDsByDepartment = await fetchUserIDsByDepartment(department);
      const userIDsByTeam = await fetchUserIDsByTeam(teams);
      const userIDsByGroup = await fetchUserIDsByGroup(groups);

      // pedaço de código chat gpt
      const uniqueUserIDs = new Set([
        ...userIDsByDepartment,
        ...userIDsByTeam,
        ...userIDsByGroup,
      ]);
      const userIDsArray = [...uniqueUserIDs];

      const response = await fetch(
        `/api/adminTrainings/getRegularUserIdsByUserID?userids=${encodeURIComponent(
          userIDsArray
        )}`
      );
      if (response.ok) {
        const responseData = await response.json();

        try {
          const regularUsersResponse = await fetch(
            `/api/adminTrainings/editTrainingRegularUsers`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                trainingID: idTraining,
                userIDs: responseData.userids,
              }),
            }
          );

          const regularData = await regularUsersResponse.json();
          if (regularUsersResponse.ok) {
            // console.log("ok");
          } else {
            //toast.error(regularData.message);
          }
        } catch (error) {
          //toast.error("Error e2: ", error);
          toast.error("An error occurred while editing the training.");
        }
      } else {
        //toast.error("Failed to get regular user IDs");
      }
    } catch (error) {
      // toast.error("Error e1: ", error);
      toast.error("An error occurred while editing the training.");
    }

    try {
      const teacherIDs = await fetchTeacherIDs(trainers);

      const trainingResponse = await fetch(
        `/api/adminTrainings/editTrainingInsideTeachers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trainingID: idTraining,
            teacherIDs: teacherIDs,
          }),
        }
      );

      const trainingData = await trainingResponse.json();
      if (trainingResponse.ok) {
        // toast.success(trainingData.message);
      } else {
        // toast.error(trainingData.message);
      }
    } catch (error) {
      // toast.error("Error e2: ", error);
      toast.error("An error occurred while editing the training.");
    }

    setShowEdit(false);
    setTrainers([]);
    setDepartments([]);
    setGroups([]);
    setTeams([]);
  };

  function showAttenModal({ id, name, startDate }) {
    //console.log("Training ID gfdssdfg :", id);
    //console.log("Training Name sgdf gfds:", name);
    //console.log("Start Date s sgdf:", startDate);
    // Resto da lógica da função
    setShowAttendanceModal(true);
    getTrainingDataByID(id);
    setTrainingID(id);
    setTrainingName(name);
    setTrainingStartDate(startDate);

    // nao esquecer de dar reset nas variaveis no fim de marcar presenças!!!!
  }

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
            isOpen={isOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main>
              <div className="flex">
                <div className="mx-auto max-w-9xl my-4 space-y-4">
                  <Toaster richColors position="bottom-center" />
                  <div className="grid grid-cols-3">
                    {!showTable && (
                      <>
                        <div className="font-semibold text-green-500 text-lg pb-3 text-align-left">
                          Loading Inside Trainings ...
                        </div>
                      </>
                    )}

                    {showHelpModal && (
                      <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                          <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                              Help
                            </h2>
                            <h2 className="text-left text-black text-lg font-semibold mb-4">
                              Starting a Training
                            </h2>
                            <p>
                              - Begin by selecting the training you wish to
                              initiate by checking the checkbox.
                            </p>
                            <p>
                              - Upon selection, all pertinent details of the
                              chosen training will be displayed, including
                              associated users if applicable.
                            </p>
                            <p>
                              - You have the option to modify the list of
                              associated users as needed.
                            </p>
                            <p>
                              - Following this, kindly provide the training
                              date, time, and location.
                            </p>
                            <p>
                              - Once all necessary information is provided,
                              please press the "Start" button to begin the
                              training.
                            </p>

                            <div className="flex justify-center space-x-4 pt-5">
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={() => {
                                  setShowHelpModal(false);
                                }}
                              >
                                Ok
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {showStartConfirmation && (
                      <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                          <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                              Please verify the information below before
                              starting the training:
                            </h2>
                            <div>
                              <p>
                                <strong>Date: </strong> {date}
                              </p>
                              <p>
                                <strong>Time: </strong> {time}
                              </p>
                              <p>
                                <strong>Location:</strong> {location}
                              </p>
                            </div>
                            <div className="flex justify-center space-x-4 pt-5">
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                                onClick={handleShowBackStartModal}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={startTraining}
                              >
                                It's Correct!
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {showAddOptions && (
                      <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-10">
                          <div className="relative bg-white p-10 rounded-lg shadow-lg overflow-y-auto h-[850px]">
                            <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                              Start Training
                            </h2>
                            <p className="pb-5">
                              Please <strong>review all the information</strong>{" "}
                              about the training before pressing{" "}
                              <strong>"Start"</strong>
                            </p>
                            <div>
                              <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                <thead>
                                  <tr>
                                    <th className="border border-gray-200 p-2">
                                      Training Name
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Duration (min)
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Type
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Min Participants
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Max Participants
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Area
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {trainingName}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {numMin}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {eventType}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {minParticipants}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {maxParticipants}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {trainingArea}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                      {description}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <p className="pb-5 pt-3">
                                <strong>Enrolled Sprouts</strong>
                              </p>
                              <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                <thead>
                                  <tr>
                                    <th className="border border-gray-200 p-2">
                                      User Name
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      User Department
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      User Group
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      User Team
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {associatedUsers.map((user) => (
                                    <tr key={user.id}>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {user.name}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {user.department}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {user.group}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {user.team}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div>
                              <p className="pb-5 pt-3">
                                <strong>Trainers</strong>
                              </p>
                              <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                <thead>
                                  <tr>
                                    <th className="border border-gray-200 p-2">
                                      Trainer Name
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {associatedTeachers.map((teacher) => (
                                    <tr key={teacher.id}>
                                      <td className="border border-gray-200 p-2 text-left">
                                        {teacher.name}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div>
                              <div>
                                <p className="pb-5 pt-3">
                                  <strong>Enrollment Open For</strong>
                                </p>
                              </div>
                              <div>
                                <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                  <thead>
                                    <tr>
                                      <th className="border border-gray-200 p-2">
                                        Departments
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {openForDepartment.map(
                                      (department, index) => (
                                        <tr key={index}>
                                          <td className="border border-gray-200 p-2">
                                            {department}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>

                                <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                  <thead>
                                    <tr>
                                      <th className="border border-gray-200 p-2">
                                        Groups
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {openForGroup.map((group, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-200 p-2">
                                          {group}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>

                                <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                  <thead>
                                    <tr>
                                      <th className="border border-gray-200 p-2">
                                        Teams
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {openForTeam.map((team, index) => (
                                      <tr key={index}>
                                        <td className="border border-gray-200 p-2">
                                          {team}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <h2 className="text-left text-green-500 text-lg font-semibold pt-5">
                              In order to Start this training, please indicate:
                            </h2>

                            <div className="grid grid-cols-4 gap-2">
                              <div className="col-span-1 flex">
                                <DatePicker label={"Date"} returned={setDate} />
                              </div>

                              <div className="col-span-1 flex">
                                <TimePicker label={"Time"} returned={setTime} />
                              </div>

                              <div className="col-span-2">
                                <TextInput
                                  label={"Location"}
                                  returned={setLocation}
                                />
                              </div>
                            </div>

                            <div className="flex justify-center space-x-4 pt-5">
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                                onClick={() => {
                                  setShowAddOptions(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={handleModalSwitch}
                              >
                                Start
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {showTable && (
                      <>
                        <div className="font-semibold text-green-500 text-lg pb-3 text-align-left col-span-2">
                          Trainings
                        </div>
                        <div className="flex justify-end">
                          <span className="font-semibold text-green-500 text-lg pr-2 pl-10">
                            Help
                          </span>
                          <FiHelpCircle
                            onClick={showHelp}
                            style={{ cursor: "pointer" }}
                          />
                        </div>

                        <div className="col-span-1 flex items-center">
                          <input
                            name="Filter"
                            type="text"
                            value={filter}
                            onChange={handleFilterChange}
                            className="p-1 border-l border-t border-b w-full rounded-tl rounded-bl border-gray-300 focus:outline-none focus:border-green-500 text-black py-2"
                            placeholder="Filter by Training Name"
                          />
                          <button
                            onClick={resetFilter}
                            className="p-2 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black py-3"
                          >
                            <GrClearOption />
                          </button>
                        </div>

                        <div className="col-span-1 pl-7">
                          <FilterDropDown
                            label={""}
                            options={[
                              { value: "all", label: "ALL" },
                              { value: "started", label: "Started" },
                              { value: "notstarted", label: "Not Started" },
                            ]}
                            message="Status"
                            returned={handleType}
                          />
                        </div>

                        <div className="col-span-3 pt-2">
                          <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                            <thead>
                              <tr>
                                <th className="border border-gray-200 p-2">
                                  Training Name
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Duration (min)
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Type
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Min Participants
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Max Participants
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Area
                                </th>
                                <th className="border border-gray-200 p-2">
                                  Description
                                </th>
                                <th></th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(trainings) &&
                                filteredTrainings.map((trainings, index) => {
                                  const currentDate = new Date();
                                  const trainingDate = new Date(
                                    trainings.itstartdate
                                  );
                                  const hasTrainingDatePassed =
                                    trainingDate < currentDate;

                                  return (
                                    <tr key={index}>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.itname}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.itnumofmin}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.iteventtype}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.itminparticipants}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.itmaxparticipants}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.ittrainingarea}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {trainings.itdescription}
                                      </td>
                                      {trainings.itstarted &&
                                      hasTrainingDatePassed ? (
                                        <td
                                          colSpan="2"
                                          className="border border-gray-200 p-2 text-center"
                                        >
                                          <button
                                            className="bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                            onClick={() =>
                                              showAttenModal({
                                                id: trainings.itid,
                                                name: trainings.itname,
                                                startDate:
                                                  trainings.itstartdate,
                                              })
                                            }
                                          >
                                            Attendance
                                          </button>
                                        </td>
                                      ) : (
                                        <>
                                          <td className="border border-gray-200 p-2 text-center">
                                            <button
                                              className={`bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 ${
                                                trainings.itstarted
                                                  ? "opacity-50 cursor-not-allowed"
                                                  : "hover:bg-green-500 hover:text-white active:bg-green-700"
                                              }`}
                                              onClick={() =>
                                                showEditModal(trainings.itid)
                                              }
                                              disabled={trainings.itstarted}
                                            >
                                              Edit
                                            </button>
                                          </td>
                                          <td className="border border-gray-200 p-2 text-center">
                                            <button
                                              className={`bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 ${
                                                trainings.itstarted
                                                  ? "opacity-50 cursor-not-allowed"
                                                  : "hover:bg-green-500 hover:text-white active:bg-green-700"
                                              }`}
                                              onClick={() =>
                                                showAddModal(trainings.itid)
                                              }
                                              disabled={trainings.itstarted}
                                            >
                                              Start
                                            </button>
                                          </td>
                                        </>
                                      )}
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    {showEdit && (
                      <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-10">
                          <div
                            className="relative bg-white p-10 rounded-lg shadow-lg overflow-y-auto h-[850px]
                  "
                          >
                            <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                              Edit Training
                            </h2>

                            <div className="grid grid-cols-2 gap-x-5">
                              <div>
                                <TextInputEdit
                                  label={"Edit Name"}
                                  initialValue={trainingName}
                                  returned={setTrainingName}
                                />
                              </div>
                              <div>
                                <TextInputEdit
                                  label={"Edit Durantion (minutes)"}
                                  initialValue={numMin}
                                  returned={setNumMin}
                                />
                              </div>
                            </div>
                            <TextInputEdit
                              label={"Edit Description"}
                              initialValue={description}
                              returned={setDescription}
                            />

                            <div className="grid grid-cols-4  gap-x-20">
                              <div className="col-span-4 ">
                                <TableTextInput
                                  label={"Enrolled Users"}
                                  tid={trainingID}
                                />
                              </div>
                              <div className="col-span-4">
                                <span>Enrolment Open For</span>
                              </div>
                              <div>
                                <MultiselectSearch
                                  label="Trainers"
                                  options={options}
                                  message="Select One / Multi"
                                  returned={setTrainers}
                                />
                              </div>

                              <div>
                                <MultiselectSearch
                                  label="Enrolment for Department"
                                  options={departmentOptions}
                                  message="Select One / Multi"
                                  returned={setDepartments}
                                />
                              </div>

                              <div>
                                <MultiselectSearch
                                  label="Enrolment for Groups"
                                  options={groupOptions}
                                  message="Select One / Multi"
                                  returned={setGroups}
                                />
                              </div>

                              <div>
                                <MultiselectSearch
                                  label="Enrolment for Teams"
                                  options={teamOptions}
                                  message="Select One / Multi"
                                  returned={setTeams}
                                />
                              </div>
                            </div>
                            <div className="flex justify-center space-x-4 pt-5">
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                                onClick={() => setShowEdit(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={editTraining}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {showAttendanceModal && (
                      <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-10">
                          <div
                            className="relative bg-white p-10 rounded-lg shadow-lg overflow-y-auto h-[600px] w-[600px]
                  "
                          >
                            <div>
                              <p className="pb-5 pt-3">
                                <strong>Attendance at '{trainingName}' </strong>
                              </p>

                              <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                                <thead>
                                  <tr>
                                    <th className="border border-gray-200 p-2">
                                      User Name
                                    </th>
                                    <th className="border border-gray-200 p-2">
                                      Generate Certificate
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {associatedUsers.map((user) => (
                                    <tr key={user.id}>
                                      <td className="border border-gray-200 p-2 text-center">
                                        {user.name}
                                      </td>
                                      <td className="border border-gray-200 p-2 text-center">
                                        <button
                                          onClick={() =>
                                            downloadCertificate(
                                              trainingName,
                                              user.name,
                                              trainingStartDate
                                            )
                                          }
                                          className="bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                        >
                                          Generate Certificate
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              <div className="flex justify-center space-x-4 pt-5">
                                <button
                                  className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                                  onClick={() => setShowAttendanceModal(false)}
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartInsideTraining;
