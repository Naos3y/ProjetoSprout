"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";
import Multiselect from "@/components/Multiselect";
import Counter from "@/components/Counter";
import TextInput from "@/components/TextInput";
import BigInput from "@/components/BigInput";
import DatePicker from "@/components/DatePicker";
import TableTextInput from "@/components/EnrollUser";
import { Toaster, toast } from "sonner";

const AddTraining = () => {
  const [trainingType, setTrainingType] = useState(null);
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [oponFor, setOpenFor] = useState([]);
  const [numMin, setNumMin] = useState(0);
  const [text, setText] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [minParticipants, setMinParticipants] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [trainingName, setTrainingName] = useState(null);

  const [showStartButton, setShowStartButton] = useState(false);
  const [idTraining, setIdTraining] = useState(0);

  const [userEmail, setUserEmail] = useState([]);

  /*   console.log("trainingType:", trainingType);
  console.log("trainingArea:", trainingArea);
  console.log("eventType:", eventType);
  console.log("oponFor:", oponFor);
  console.log("numMin:", numMin);
  console.log("text:", text);
  console.log("Big text:", bigText);
  console.log("Date:", date); 
  console.log("userEmail:", userEmail);
  console.log("oponFor:", oponFor);
  */

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

        ...(emptyDescription ? {} : { description: description.toString() }),
      };

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
          const trainingId = parseInt(responseData.id);
          setIdTraining(trainingId);

          console.log("Training ID:", trainingId);
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
    }
  };

  const handleInitTraining = () => {
    if (userEmail.length == 0) {
      toast.error("Enroll vazio");
    }
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
        console.log("Tipo escolhido: externo");
      } else {
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
            //console.log(responseData);
          } else {
            toast.error("Failed to get trainers");
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

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-80 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>
        <div className="mx-auto max-w-6xl my-4 space-y-4">
          <div className="flex flex-wrap">
            <Dropdown
              label="Training Type"
              options={[
                { value: "internal", label: "Internal" },
                { value: "external", label: "External" },
              ]}
              message="Select One"
              returned={setTrainingType}
            />

            {trainingType && (
              <>
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

                <Dropdown
                  label="Event Type"
                  options={[
                    { value: "offline", label: "Offline" },
                    { value: "onsite", label: "On Site" },
                    { value: "virtual", label: "Virtual" },
                    { value: "virtualonsite", label: "Virtual or Onsite" },
                  ]}
                  message="Select One"
                  returned={setEventType}
                />

                <Multiselect
                  label="Trainers"
                  options={handleTrainerOptions(trainingType)}
                  message="Select One / Multi"
                  returned={setTrainers}
                />

                <Multiselect
                  label="Enrolement Open For"
                  options={[
                    { value: "all", label: "All" },
                    { value: "department", label: "Department" },
                    { value: "groups", label: "Groups" },
                    { value: "teams", label: "Teams" },
                  ]}
                  message="Select One / Multi"
                  returned={setOpenFor}
                />

                <Counter label="Duration (Minutes)" returned={setNumMin} />

                <Counter
                  label="Min Nº of Participants"
                  returned={setMinParticipants}
                />

                <Counter
                  label="Max Nº of Participants"
                  returned={setMaxParticipants}
                />

                <TableTextInput label={"Enroll"} returned={setUserEmail} />

                <TextInput label={"Training Name"} returned={setTrainingName} />

                <BigInput
                  label={"Event | Training Description"}
                  returned={setDescription}
                />
              </>
            )}

            {/* <DatePicker label={"Date"} returned={setDate} /> */}
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
      </div>
    </div>
  );
};

export default AddTraining;
