"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";
import Multiselect from "@/components/Multiselect";
import Counter from "@/components/Counter";
import TextInput from "@/components/TextInput";
import BigInput from "@/components/BigInput";
import DatePicker from "@/components/DatePicker";
import TableTextInput from "@/components/EnrollUser";
import { Toaster, toast } from "sonner";
import DropdownState from "@/components/DropdownState";
import MultiselectSearch from "@/components/MultiselectSearch";
import AddedUsersToTraining from "@/components/AddedUsersToTraining";
import TimePicker from "@/components/TimePicker";
import { FiHelpCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";

const AddTraining = () => {
  // variaveis para o treino
  const [trainingType, setTrainingType] = useState(null);
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [numMin, setNumMin] = useState(0);
  const [description, setDescription] = useState(null);
  const [minParticipants, setMinParticipants] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [trainingName, setTrainingName] = useState(null);
  const [trainingStartTime, setStartTime] = useState(null);
  const [location, setLocation] = useState(null);

  // para uso geral em componentes e afins
  const [options, setOptions] = useState([]);
  const [trainingTypeSelected, setTrainingTypeSelected] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupOptions, setGroupOtions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [addTrainingInfo, setaddTrainingInfo] = useState(false);
  const [showAddTrainingConfirmation, setShowAddTrainingConfirmation] =
    useState(false);
  const [confirmTrainingAdded, setConfirmTrainingAdded] = useState(false);
  const [usersAssociated, setUsersAssociated] = useState(false);
  const [showAssociatedUsersConfirmation, setShowAssociatedUsersConfirmation] =
    useState(false);
  const [addNewTraining, setAddNewTraining] = useState(false);
  const [showRefreshConfirmation, setShowConfirmFefreshPage] = useState(false);

  // para adicionar pessoas ao treino
  const [department, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [idTraining, setIdTraining] = useState(0);
  const [date, setDate] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [finalEnrolledUserArray, setFinalEnrolledUserArray] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [finalUserArray, setFinalUserArray] = useState([]);

  // useEffect obtido através do gemini
  useEffect(() => {
    const fetchData = async () => {
      const trainers = await handleTrainerOptions(trainingType);
      setOptions(trainers);
    };
    fetchData();
  }, [trainingType]);

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

  const handleAddTraining = async () => {
    const isEmpty = validateTrainingData();
    const emptyDescription = validateDescription();

    if (!isEmpty) {
      const dataToSend = {
        trainingName: trainingName.toString(),
        numMin: numMin.toString(),
        eventType: eventType.value.toString(),
        minParticipants: minParticipants.toString(),
        maxParticipants: maxParticipants.toString(),
        trainingArea: trainingArea.value.toString(),

        // pedaço codigo do chatgpt
        ...(emptyDescription ? {} : { description: description.toString() }),
      };

      if (trainingType.value == "internal") {
        try {
          const response = await fetch("/api/adminTrainings/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });

          console.log(response);

          if (response.ok) {
            const responseData = await response.json();
            setIdTraining(parseInt(responseData.id));
            toast.success("The Training was added to the database!");
          } else {
            toast.error(
              "It wasn't possible to add the training. Please try again."
            );
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(
            "An error occurred while adding the training. Please try again later."
          );
        }
      } else {
        toast.error("treino externo por implementar");
      }
    }
    setShowAddTrainingConfirmation(false);
    setConfirmTrainingAdded(true);
    setAddNewTraining(true);
  };

  const handleDontWantToAddUsersToTraining = () => {
    setaskIfWantToAddParticipants(false);
    window.location.reload();
  };

  const handleInitTraining = async () => {
    const userIDsArray = [];
    const uniqueUserIDs = new Set();

    if (
      department.length === 0 &&
      groups.length === 0 &&
      teams.length === 0 &&
      userEmail.length === 0
    ) {
      toast.error(
        "Unable to initiate training. Please ensure participants are added to the training session."
      );
      return;
    }

    if (!date) {
      toast.error("Please insert the start date");
      return;
    }

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

      for (const email of userEmail) {
        const response = await fetch(
          `/api/adminTrainings/getUserIDWithEmail?email=${email}`,
          { method: "GET" }
        );
        if (response.ok) {
          const responseData = await response.json();
          await extractUserIDs(responseData.emails);
        }
      }

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
                  `/api/adminTrainings/startIT`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      trainingID: idTraining,
                      userIDs: responseData.userids,
                      teacherIDs: responseDataTeacher.userids,
                      startDate: date,
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
                toast.error("An error occurred while inserting training data.");
              }
            } else {
              toast.error(responseDataTeacher.message);
            }
          } catch (error) {
            console.log(error);
            toast.error(
              "An error occurred while converting userIDs into teacher id."
            );
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
        "An error occurred while initiating the training. Please try again later."
      );
    }

    console.log(" final", finalUserArray);
  };

  const validateTrainingData = () => {
    let isEmpty = false;

    if (!trainingArea) {
      isEmpty = true;
      toast.error("Please select a Training Area.");
    }

    if (!eventType) {
      isEmpty = true;
      toast.error("Please select an Event Type.");
    }

    if (numMin < 30) {
      isEmpty = true;
      toast.error("Training duration must be at least 30 minutes.");
    }

    if (minParticipants <= 0) {
      isEmpty = true;
      toast.error("Minimum number of participants must be greater than zero.");
    }

    if (maxParticipants < minParticipants) {
      isEmpty = true;
      toast.error(
        "Maximum number of participants cannot be less than the minimum number."
      );
    }

    if (!trainingName) {
      isEmpty = true;
      toast.error("Please enter a training name.");
    }
    return isEmpty;
  };

  const validateAssociatedUsers = () => {
    if (trainers.length === 0) {
      toast.error("Please add at least one teacher.");
      return false;
    }

    if (
      department.length > 0 ||
      groups.length > 0 ||
      teams.length > 0 ||
      userEmail.length > 0
    ) {
      return true;
    }

    toast.error(
      "You must add users to the training. Check the help button for more information."
    );
    return false;
  };

  const validateDescription = () => {
    let isEmpty = false;

    if (!description) {
      isEmpty = true;
    }

    return isEmpty;
  };

  const handleTrainerOptions = async (type) => {
    try {
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
      } else if (type.value == "internal") {
        setTrainers([]);
        try {
          const response = await fetch(
            `/api/adminTrainings/getInternalTrainers`,
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
      }
    } catch (error) {
      return [];
    }
  };

  const handleTrainingTypeSelect = (selectedType) => {
    setTrainingTypeSelected(true);
    setTrainingType(selectedType);
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

  const handleAddTrainingInfo = () => {
    setaddTrainingInfo(true);
  };

  const handleAssociateUsers = async () => {
    const userIDsArray = [];
    const uniqueUserIDs = new Set();

    if (
      department.length === 0 &&
      groups.length === 0 &&
      teams.length === 0 &&
      userEmail.length === 0
    ) {
      toast.error(
        "Unable to initiate training. Please ensure participants are added to the training session."
      );
      return;
    }

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
                toast.error("An error occurred while inserting training data.");
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
        console.log("responseData ", responseData);

        try {
          const responseEnroll = await fetch(
            `/api/adminTrainings/getRegularUserIdsByUserID?userids=${encodeURIComponent(
              enrolledUsers
            )}`
          );
          const responseDataEnroll = await responseEnroll.json();
          console.log("Id regular user do user email: ", responseDataEnroll);

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

    setUsersAssociated(true);
    setShowAssociatedUsersConfirmation(false);
  };

  const confirmTrainigData = () => {
    const isEmpty = validateTrainingData();
    if (!isEmpty) {
      setShowAddTrainingConfirmation(true);
    }
  };

  const confirmAssociatedUsers = () => {
    if (idTraining == 0) {
      toast.error("Please add a training first.");
    } else if (validateAssociatedUsers()) {
      setShowAssociatedUsersConfirmation(true);
    } else {
      return;
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-80 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>

        <>
          <div className="mx-auto max-w-6xl my-4 space-y-4">
            {addTrainingInfo && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Help
                    </h2>
                    <h2 className="text-left text-black text-lg font-semibold mb-4">
                      Adding a Training:
                    </h2>
                    <p>
                      - This page allows you to
                      <strong> create a new training</strong>. It is imperative
                      to complete all fields (description is optional)
                      pertaining to the training.
                    </p>
                    <p>
                      - Once all fields are filled,
                      <strong> click the "Add Training" button</strong> to save
                      the details.
                    </p>
                    <p>
                      <strong>- Please note:</strong> After adding a training,
                      any further modifications can only be made on the Edit
                      Page.
                    </p>
                    <p>
                      - Upon adding a training, a new button will appear at the
                      top right corner. You can utilize this button to add
                      another training.
                    </p>

                    <h2 className="text-left text-black text-lg font-semibold mb-4 pt-5">
                      Enrolment Open For:
                    </h2>

                    <p>
                      - This setting allows individuals belonging to the
                      selected Department, group, or team to request
                      participation in the training.
                    </p>
                    <p>
                      - <strong>It is mandatory</strong> to
                      <strong>
                        {" "}
                        select at least one teacher and one of the other fields
                      </strong>
                      .
                    </p>

                    <h2 className="text-left text-black text-lg font-semibold mb-4 pt-5">
                      Enroll users:
                    </h2>
                    <p>
                      - Users can also be directly enrolled in the training via
                      email. This action makes the training mandatory for those
                      whose email addresses have been specified and are recorded
                      in the designated table.
                    </p>

                    <p>
                      - Should you wish to remove a user from the enrollment
                      list, simply utilize the "Remove" button.
                    </p>

                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={() => {
                          setaddTrainingInfo(false);
                        }}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {showAddTrainingConfirmation && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Add Training
                    </h2>
                    <h2 className="text-left text-black text-lg font-semibold mb-4">
                      Please review the details of the training before adding
                      it:
                    </h2>
                    <p>
                      <strong>Training Name: </strong> {trainingName.toString()}
                    </p>
                    <p className="pt-2">
                      <strong>Number of Minutes: </strong> {numMin.toString()}
                    </p>
                    <p className="pt-2">
                      <strong>Event Type: </strong> {eventType.value.toString()}
                    </p>
                    <p className="pt-2">
                      <strong>Minimum Participants: </strong>{" "}
                      {minParticipants.toString()}
                    </p>
                    <p className="pt-2">
                      <strong>Maximum Participants: </strong>{" "}
                      {maxParticipants.toString()}
                    </p>
                    <p className="pt-2">
                      <strong>Training Area: </strong>{" "}
                      {trainingArea.value.toString()}
                    </p>
                    {description && (
                      <p className="pt-2">
                        <strong>Description: </strong> {description.toString()}
                      </p>
                    )}
                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={handleAddTraining}
                      >
                        It's Correct!
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={() => {
                          setShowAddTrainingConfirmation(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {showRefreshConfirmation && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Add New Training
                    </h2>
                    <h2 className="text-center text-black text-lg font-semibold mb-4">
                      Please confirm if you wish to proceed with adding a new
                      training. The page will refresh upon confirmation.
                    </h2>
                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={refreshPage}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={() => {
                          setShowConfirmFefreshPage(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {showAssociatedUsersConfirmation && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Associated Users
                    </h2>
                    <h2 className="text-left text-black text-lg font-semibold mb-4">
                      Please review the associated users before adding this
                      information to the database.
                    </h2>

                    {/* Tabela adaptada do gpt */}
                    {trainers.length > 0 && (
                      <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                        <thead>
                          <tr>
                            <th className="border border-gray-200 p-2">
                              Trainer Names
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {trainers.map((trainer) => (
                            <tr key={trainer.id}>
                              <td className="border border-gray-200 p-2">
                                {trainer.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {(department.length > 0 ||
                      groups.length > 0 ||
                      teams.length > 0) && (
                      <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                        <thead>
                          <tr>
                            <th className="border border-gray-200 p-2">
                              Associated Departments
                            </th>
                            <th className="border border-gray-200 p-2">
                              Associated Groups
                            </th>
                            <th className="border border-gray-200 p-2">
                              Associated Teams
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ...Array(
                              Math.max(
                                department.length,
                                groups.length,
                                teams.length
                              )
                            ).keys(),
                          ].map((index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 p-2">
                                {department[index]?.label}
                              </td>
                              <td className="border border-gray-200 p-2">
                                {groups[index]?.label}
                              </td>
                              <td className="border border-gray-200 p-2">
                                {teams[index]?.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {userEmail.length > 0 && (
                      <table className="w-full table-auto border-collapse border border-gray-200 mb-4">
                        <thead>
                          <tr>
                            <th className="border border-gray-200 p-2">
                              Enrolled Users
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEmail.map((email, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 p-2">
                                {email}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={handleAssociateUsers}
                      >
                        It's Correct!
                      </button>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                        onClick={() => {
                          setShowAssociatedUsersConfirmation(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-20 gap-y-3">
              {!trainingType && (
                <>
                  <div className="col-span-3">
                    <p className="text-lg font-bold text-red-500">NOTE:</p>
                    <p className="text-lg font-bold">
                      Please insert the Training Type. Keep in mind that this
                      option will be locked further on.
                    </p>
                  </div>
                </>
              )}

              {trainingType && (
                <>
                  <div className="col-span-2">
                    <span className="font-semibold text-green-500 text-lg ml-2 ">
                      Add Inside Training Data (Required)
                    </span>
                    <p className="w-full">
                      *Please fill out all fields before proceeding.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {addNewTraining && (
                      <>
                        <span className="font-semibold text-green-500 text-lg pr-2">
                          Add New Training
                        </span>
                        <FiPlusCircle
                          onClick={() => {
                            setShowConfirmFefreshPage(true);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </>
                    )}

                    <span className="font-semibold text-green-500 text-lg pr-2 pl-10">
                      Help
                    </span>
                    <FiHelpCircle
                      onClick={handleAddTrainingInfo}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </>
              )}

              <div>
                <DropdownState
                  label="Training Type"
                  options={[
                    { value: "internal", label: "Internal" },
                    { value: "external", label: "External" },
                  ]}
                  message="Select One"
                  returned={handleTrainingTypeSelect}
                  disabled={trainingTypeSelected}
                />
              </div>

              {trainingType && (
                <>
                  <div>
                    <Dropdown
                      label="Trainig Area"
                      options={[
                        { value: "p&c", label: "P&C" },
                        { value: "itdevelopment", label: "IT Development" },
                        { value: "sales", label: "Sales" },
                        { value: "languages", label: "Languages" },
                        { value: "product", label: "Product" },
                        {
                          value: "interpersonalskills",
                          label: "Interpersonal Skills",
                        },
                        { value: "leadership", label: "Leadership" },
                        { value: "h&s", label: "Health and Safety" },
                        {
                          value: "businesspracticess",
                          label: "Business Practices",
                        },
                      ]}
                      message="Select One"
                      returned={setTrainingArea}
                    />
                  </div>

                  <div>
                    <Dropdown
                      label="Event Type"
                      options={[
                        { value: "offline", label: "Offline" },
                        { value: "onsite", label: "On Site" },
                        { value: "virtual", label: "Virtual" },
                        {
                          value: "virtualonsite",
                          label: "Virtual or Onsite",
                        },
                      ]}
                      message="Select One"
                      returned={setEventType}
                    />
                  </div>

                  <div>
                    <Counter label="Duration (Minutes)" returned={setNumMin} />
                  </div>

                  <div>
                    <Counter
                      label="Min Nº of Participants"
                      returned={setMinParticipants}
                    />
                  </div>

                  <div>
                    <Counter
                      label="Max Nº of Participants"
                      returned={setMaxParticipants}
                    />
                  </div>

                  <div>
                    <TextInput
                      label={"Training Name"}
                      returned={setTrainingName}
                    />
                  </div>

                  <div className="col-span-2 ">
                    <BigInput
                      label={"Event | Training Description (Optional)"}
                      returned={setDescription}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <Toaster richColors position="bottom-center" />
              {trainingType && !confirmTrainingAdded && (
                <>
                  <button
                    className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                    onClick={confirmTrainigData}
                  >
                    Add Training
                  </button>
                </>
              )}

              {confirmTrainingAdded && (
                <>
                  <button
                    className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                    onClick={() => {
                      toast.info("Training Already Added");
                    }}
                  >
                    Add Training
                  </button>
                </>
              )}
            </div>

            {trainingType && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-20 gap-y-3">
                  <div className="col-span-4 pt-10"></div>
                  <div className="col-span-4">
                    <span className="font-semibold text-green-500 text-lg ml-2 ">
                      Enrolment Open For (Optional)
                    </span>
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

                  <div className="col-span-4 ">
                    <TableTextInput label={"Enroll"} returned={setUserEmail} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Toaster richColors position="bottom-center" />
                  {usersAssociated && (
                    <>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={() => {
                          toast.info("Users already Associated");
                        }}
                      >
                        Associate Users
                      </button>
                    </>
                  )}
                  {!usersAssociated && (
                    <>
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={confirmAssociatedUsers}
                      >
                        Associate Users
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default AddTraining;
