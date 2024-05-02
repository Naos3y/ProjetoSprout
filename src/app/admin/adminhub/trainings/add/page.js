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

  // para uso geral em componentes e afins
  const [showStartButton, setShowStartButton] = useState(false);
  const [options, setOptions] = useState([]);
  const [trainingTypeSelected, setTrainingTypeSelected] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupOptions, setGroupOtions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [abreTimePicker, setAbreTimePicker] = useState(false);

  // para adicionar pessoas ao treino
  const [department, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [idTraining, setIdTraining] = useState(0);
  const [date, setDate] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
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

      //console.log("training type: ", trainingType);
      if (trainingType.value == "internal") {
        try {
          const response = await fetch("/api/adminTrainings/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });

          if (response.ok) {
            const responseData = await response.json();
            setIdTraining(parseInt(responseData.id));

            //console.log("Training ID aqui:", trainingId);
            toast.success("Training Added");
            setShowStartButton(true);

            //window.location.reload();
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
      toast.error("Training type is required");
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

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-80 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>
        {!abreTimePicker && (
          <>
            <div className="mx-auto max-w-6xl my-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-20 gap-y-3">
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

                    {/* <Multiselect
                  label="Enrolement Open For"
                  options={[
                    { value: "all", label: "All" },
                    { value: "department", label: "Department" },
                    { value: "groups", label: "Groups" },
                    { value: "teams", label: "Teams" },
                  ]}
                  message="Select One / Multi"
                  returned={setOpenFor}
                /> */}

                    <div>
                      <Counter
                        label="Duration (Minutes)"
                        returned={setNumMin}
                      />
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

                    <div className="col-span-2 ">
                      <TableTextInput
                        label={"Enroll"}
                        returned={setUserEmail}
                      />
                    </div>

                    <div className="col-span-2">
                      <TextInput
                        label={"Training Name"}
                        returned={setTrainingName}
                      />
                    </div>

                    <div className="col-span-2 ">
                      <BigInput
                        label={"Event | Training Description"}
                        returned={setDescription}
                      />
                    </div>

                    <div>
                      <DatePicker
                        label={"Training Start Date"}
                        returned={setDate}
                      />
                    </div>

                    {/* <div className="col-span-4 ">
                  <AddedUsersToTraining
                    users={[
                      { value: "1", label: "Bruno" },
                      { value: "2", label: "Luis" },
                      { value: "3", label: "Afonso" },
                      { value: "4", label: "Lopes" },
                    ]}
                  />
                </div> */}
                  </>
                )}
              </div>
              <div className="flex justify-center">
                <Toaster richColors position="bottom-center" />
                {trainingType && (
                  <>
                    <button
                      className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                      onClick={handleAddTraining}
                    >
                      Add Training
                    </button>
                  </>
                )}

                {showStartButton && (
                  <button
                    className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                    onClick={handleInitTraining}
                  >
                    Initiate Training
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTraining;
