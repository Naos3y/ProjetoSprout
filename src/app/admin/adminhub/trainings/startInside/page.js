"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { toast } from "sonner";

function StartInsideTraining() {
  // training data
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [numMin, setNumMin] = useState(0);
  const [description, setDescription] = useState(null);
  const [minParticipants, setMinParticipants] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [trainingName, setTrainingName] = useState(null);
  const [trainingID, setTrainingID] = useState(0);

  const [trainings, setTrainings] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);

  useEffect(() => {
    getAllInsideTrainings();
  }, []);

  const showHelp = () => {
    setShowHelpModal(true);
  };

  const getTrainingDataByID = async (trainingID) => {
    try {
      const response = await fetch(
        `/api/adminTrainings/getTrainingDetails?id=${encodeURIComponent(
          trainingID
        )}`
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
        )}`
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
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

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-80 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>
        <div className="mx-auto max-w-9xl my-4 space-y-4">
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

            {showAddOptions && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Start Training
                    </h2>
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
                            <td className="border border-gray-200 p-2">
                              {trainingName}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {numMin}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {eventType}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {minParticipants}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {maxParticipants}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainingArea}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {description}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        //onClick={}
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
                  Start Training
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
                        <th>Start Training</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(trainings) &&
                        trainings.map((trainings, index) => (
                          <tr key={index}>
                            <td className="border border-gray-200 p-2">
                              {trainings.itname}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.itnumofmin}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.iteventtype}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.itminparticipants}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.itmaxparticipants}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.ittrainingarea}
                            </td>
                            <td className="border border-gray-200 p-2">
                              {trainings.itdescription}
                            </td>
                            <td className="border border-gray-200 p-2">
                              <input
                                type="checkbox"
                                onClick={() => showAddModal(trainings.itid)}
                              />
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
