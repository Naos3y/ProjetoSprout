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

function StartInsideTraining() {
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

  const [department, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [finalEnrolledUserArray, setFinalEnrolledUserArray] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [finalUserArray, setFinalUserArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [trainingType, setTrainingType] = useState("internal");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupOptions, setGroupOtions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);

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
    setTrainingID(TID);
    setShowEdit(true);
  };

  const editTraining = async (TID) => {
    handleAssociateUsers(trainingID);
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

  const handleAssociateUsers = async (idTraining) => {
    const userIDsArray = [];
    const uniqueUserIDs = new Set();

    try {
      // adaptado do chatGPT
      const extractUserIDs = async (responseData) => {
        responseData.forEach((item) => {
          const userID =
            item.bruno_getusersbydepartmentid ||
            item.bruno_getusersbyteamid ||
            item.bruno_getusersbygroupid ||
            item.bruno_getuseridwithemail;
          if (userID) {
            // Verifica se o ID de usuário não é nulo
            uniqueUserIDs.add(userID);
          }
        });
      };

      try {
        //https://www.w3schools.com/js/js_loop_forof.asp
        for (const dept of department) {
          const response = await fetch(
            `/api/adminTrainings/getUsersByDepartmentID?id=${dept.value}`,
            { method: "GET" }
          );
          if (response.ok) {
            const responseData = await response.json();
            await extractUserIDs(responseData.departments);
          }
        }

        for (const team of teams) {
          const response = await fetch(
            `/api/adminTrainings/getUsersByTeamID?id=${team.value}`,
            { method: "GET" }
          );
          if (response.ok) {
            const responseData = await response.json();
            await extractUserIDs(responseData.teams);
          }
        }

        for (const group of groups) {
          const response = await fetch(
            `/api/adminTrainings/getUsersByGroupID?id=${group.value}`,
            { method: "GET" }
          );
          if (response.ok) {
            const responseData = await response.json();
            await extractUserIDs(responseData.groups);
          }
        }

        // trata dos utilizadores que se podem inscrever
        userIDsArray.push(...uniqueUserIDs);

        try {
          const response = await fetch(
            `/api/adminTrainings/getRegularUserIdsByUserID?userids=${encodeURIComponent(
              userIDsArray
            )}`
          );
          const responseData = await response.json();

          if (response.ok) {
            console.log("Entrou no if");
            setFinalUserArray(responseData.userids);

            try {
              const trainerIds = trainers.map((trainer) => trainer.value);
              const responseteacher = await fetch(
                `/api/adminTrainings/getInsideTeacherByUserID?userids=${encodeURIComponent(
                  trainerIds
                )}`
              );
              const responseDataTeacher = await responseteacher.json();

              console.log(responseDataTeacher);
              if (responseteacher.ok) {
                console.log("teacher ids: ", responseDataTeacher.userids);
                try {
                  const trainingResponse = await fetch(
                    `/api/adminTrainings/associateUsersToTraining`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        trainingID: idTraining,
                        userIDs: responseData.userids,
                        teacherIDs: responseDataTeacher.userids,
                      }),
                    }
                  );

                  const trainingData = await trainingResponse.json();
                  console.log("trainingData: ", trainingData);

                  if (trainingResponse.ok) {
                    toast.success(trainingData.message);
                  } else {
                    toast.error(trainingData.message);
                  }
                } catch (error) {
                  console.error("Error inserting training data:", error);
                  toast.error(
                    "An error occurred while inserting training data."
                  );
                }
              } else {
                toast.error(responseDataTeacher.message);
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("Entrou no else");
            toast.error(responseData.message);
          }
        } catch (error) {
          toast.error("An error occurred while converting userIDs.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          "An error occurred while associating users to the training. Please try again later."
        );
      }

      // trata dos utilizadores que são incritos automaticamente no enroll
      for (const email of userEmail) {
        const response = await fetch(
          `/api/adminTrainings/getUserIDWithEmail?email=${email}`,
          { method: "GET" }
        );
        if (response.ok) {
          const responseData = await response.json();
          // await extractUserIDs(responseData.emails);
          //setEnrolledUsers(responseData.bruno_getuseridwithemail);
          //console.log("responseData ", responseData);

          try {
            const responseEnroll = await fetch(
              `/api/adminTrainings/getRegularUserIdsByUserID?userids=${encodeURIComponent(
                enrolledUsers
              )}`
            );
            const responseDataEnroll = await responseEnroll.json();
            //console.log("Id regular user do user email: ", responseDataEnroll);

            if (responseEnroll.ok) {
              try {
                const trainingResponse = await fetch(
                  `/api/adminTrainings/enrollUsers`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      trainingID: idTraining,
                      userIDs: responseData.emails,
                    }),
                  }
                );

                const trainingData = await trainingResponse.json();

                if (trainingResponse.ok) {
                  toast.success(trainingData.message);
                } else {
                  toast.error(trainingData.message);
                }
              } catch (error) {
                console.error("Error inserting training data!:", error);
                toast.error("An error occurred while inserting training data.");
              }
            } else {
              toast.error("An error occurred. Try again later.");
            }
          } catch (error) {
            toast.error("An error occurred. Try again later.");
          }
        }
      }

      setShowEdit(false);
      setUserEmail([]);
      setTrainers([]);
      setDepartments([]);
      setGroups([]);
      setTeams([]);
    } catch (error) {
      toast.error("Error editing training");
    }
  };

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-80 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>
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
                      - Begin by selecting the training you wish to initiate by
                      checking the checkbox.
                    </p>
                    <p>
                      - Upon selection, all pertinent details of the chosen
                      training will be displayed, including associated users if
                      applicable.
                    </p>
                    <p>
                      - You have the option to modify the list of associated
                      users as needed.
                    </p>
                    <p>
                      - Following this, kindly provide the training date, time,
                      and location.
                    </p>
                    <p>
                      - Once all necessary information is provided, please press
                      the "Start" button to begin the training.
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
                      Please verify the information below before starting the
                      training:
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
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={startTraining}
                      >
                        It's Correct!
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={handleShowBackStartModal}
                      >
                        Cancel
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
                      Please <strong>review all the information</strong> about
                      the training before pressing <strong>"Start"</strong>
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
                            <th className="border border-gray-200 p-2">Type</th>
                            <th className="border border-gray-200 p-2">
                              Min Participants
                            </th>
                            <th className="border border-gray-200 p-2">
                              Max Participants
                            </th>
                            <th className="border border-gray-200 p-2">Area</th>
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
                            {openForDepartment.map((department, index) => (
                              <tr key={index}>
                                <td className="border border-gray-200 p-2">
                                  {department}
                                </td>
                              </tr>
                            ))}
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
                        <TextInput label={"Location"} returned={setLocation} />
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={handleModalSwitch}
                      >
                        Start
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={() => {
                          setShowAddOptions(false);
                        }}
                      >
                        Cancel
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
                        <th className="border border-gray-200 p-2">Type</th>
                        <th className="border border-gray-200 p-2">
                          Min Participants
                        </th>
                        <th className="border border-gray-200 p-2">
                          Max Participants
                        </th>
                        <th className="border border-gray-200 p-2">Area</th>
                        <th className="border border-gray-200 p-2">
                          Description
                        </th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(trainings) &&
                        trainings.map((trainings, index) => (
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
                            <td className="border border-gray-200 p-2 text-center">
                              <button
                                className="bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={() => showEditModal(trainings.itid)}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="border border-gray-200 p-2 text-center">
                              <button
                                className="bg-[#f1f1f1] text-[#818181] p-1 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                                onClick={() => showAddModal(trainings.itid)}
                              >
                                Start
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {showEdit && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div
                    className="bg-white p-8 rounded-lg shadow-lg w-[1300px] overflow-y-auto
                  "
                  >
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Edit Training
                    </h2>
                    <div className="grid grid-cols-4  gap-x-20 gap-y-3">
                      <div className="col-span-4 ">
                        <TableTextInput
                          label={"Enroll Users"}
                          returned={setUserEmail}
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
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={editTraining}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={() => setShowEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInsideTraining;
