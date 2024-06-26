"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Dropdown from "/src/components/Dropdown";
import Counter from "/src/components/Counter";
import TextInput from "/src/components/TextInput";
import BigInput from "/src/components/BigInput";
import { Toaster, toast } from "sonner";
import DropdownState from "/src/components/DropdownState";
import { FiHelpCircle } from "react-icons/fi";
import Navbar from "/src/components/Navbar";
import cookies from "js-cookie";
import { decrypt } from "/src/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "/src/session/sessionUtils";
import SideNav from "/src/components/Static/sidenav";
import "tailwindcss/tailwind.css";

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

  const [control, setControl] = useState(-1);
  const [permission, setPermission] = useState(0);
  const [showExpired, setShowExpired] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
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
        <div className="flex justify-center h-screen">
          <SideNav
            isOpen={isOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main className="ml-14 mt-10">
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
                          <strong> click the "Add Training" button</strong> to
                          save the details.
                        </p>

                        <p>
                          - After pressing the "Add Training" button, a popup
                          will appear, where you can choose to add a new
                          training or go to the "Edit training" page.
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
                          Please review the details of the training before
                          adding it:
                        </h2>
                        <p>
                          <strong>Training Name: </strong>{" "}
                          {trainingName.toString()}
                        </p>
                        <p className="pt-2">
                          <strong>Number of Minutes: </strong>{" "}
                          {numMin.toString()}
                        </p>
                        <p className="pt-2">
                          <strong>Event Type: </strong>{" "}
                          {eventType.value.toString()}
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
                            <strong>Description: </strong>{" "}
                            {description.toString()}
                          </p>
                        )}
                        <div className="flex justify-center space-x-4 pt-5">
                          <button
                            className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-red-500 hover:text-white active:bg-red-700"
                            onClick={() => {
                              setShowAddTrainingConfirmation(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                            onClick={handleAddTraining}
                          >
                            It's Correct!
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
                          Please insert the Training Type. Keep in mind that
                          this option will be locked further on.
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
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTraining;
