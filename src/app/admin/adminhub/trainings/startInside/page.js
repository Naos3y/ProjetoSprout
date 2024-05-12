"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import TimePicker from "@/components/TimePicker";
import DatePicker from "@/components/DatePicker";
import TextInput from "@/components/TextInput";

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

  useEffect(() => {
    getAllInsideTrainings();
  }, []);

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
                  <div className="relative bg-white p-10 rounded-lg shadow-lg overflow-y-auto h-screen">
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
                                //onClick={() => showAddModal(trainings.itid)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInsideTraining;
