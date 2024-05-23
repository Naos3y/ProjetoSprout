"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";
import Counter from "@/components/Counter";
import TextInput from "@/components/TextInput";
import BigInput from "@/components/BigInput";
import { Toaster, toast } from "sonner";
import DropdownState from "@/components/DropdownState";
import { FiHelpCircle } from "react-icons/fi";

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
  const [trainingTypeSelected, setTrainingTypeSelected] = useState(false);
  const [addTrainingInfo, setaddTrainingInfo] = useState(false);
  const [showAddTrainingConfirmation, setShowAddTrainingConfirmation] =
    useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  // para adicionar pessoas ao treino
  const [idTraining, setIdTraining] = useState(0);

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
    setShowFinalModal(true);
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

  const handleTrainingTypeSelect = (selectedType) => {
    setTrainingTypeSelected(true);
    setTrainingType(selectedType);
  };

  const handleAddTrainingInfo = () => {
    setaddTrainingInfo(true);
  };

  const confirmTrainigData = () => {
    const isEmpty = validateTrainingData();
    if (!isEmpty) {
      setShowAddTrainingConfirmation(true);
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
                      <strong> create a new training</strong>.
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
                      top right corner. You can click this button to add another
                      training.
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

            {showFinalModal && (
              <>
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-green-500 text-lg font-semibold mb-4">
                      Would you like to:
                    </h2>
                    <div className="flex justify-center space-x-4 pt-5">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={refreshPage}
                      >
                        Add a new training
                      </button>
                      <Link
                        href="/admin/adminhub/trainings/startInside"
                        passHref
                      >
                        <button className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700">
                          Go to Edit Trainings
                        </button>
                      </Link>
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
                      label={"Event | Training Description"}
                      returned={setDescription}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <Toaster richColors position="bottom-center" />
              {trainingType && (
                <>
                  <button
                    className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                    onClick={confirmTrainigData}
                  >
                    Add Training
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default AddTraining;
