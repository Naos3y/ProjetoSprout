"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/DropdownFilter";
import Multiselect from "@/components/Multiselect";
import Counter from "@/components/Counter";
import TextInput from "@/components/TextInputUpdated";
import BigInput from "@/components/BigInput";
import DatePicker from "@/components/DatePicker";
import { Toaster, toast } from "sonner";

const AddTrainingPlan = () => {
  const [trainingType, setTrainingType] = useState(null);
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [oponFor, setOpenFor] = useState([]);
  const [numMin, setNumMin] = useState(0);
  const [text, setText] = useState(null);
  const [bigText, setBigText] = useState(null);
  const [date, setDate] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [minParticipants, setMinParticipants] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [trainingName, setTrainingName] = useState(null);

  /*   console.log("trainingType:", trainingType);
  console.log("trainingArea:", trainingArea);
  console.log("eventType:", eventType);
  console.log("oponFor:", oponFor);
  console.log("numMin:", numMin);
  console.log("text:", text);
  console.log("Big text:", bigText);
  console.log("Date:", date); */

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

            <Dropdown
              label="Trainig Area"
              options={[
                { value: "p&c", label: "P&C" },
                { value: "itdevelopment", label: "IT Development" },
                { value: "sales", label: "Sales" },
                { value: "languages", label: "Languages" },
                { value: "product", label: "Product" },
                { value: "interpersonalskills", label: "Interpersonal Skills" },
                { value: "leadership", label: "Leadership" },
                { value: "h&s", label: "Health and Safety" },
                { value: "businesspracticess", label: "Business Practices" },
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
              options={[
                { value: "i1", label: "José Silva" },
                { value: "i2", label: "António Lopes" },
                { value: "i3", label: "Joana Marques" },
                { value: "i4", label: "Bruno Lopes" },
                { value: "i5", label: "Daniela Pinto" },
                { value: "i6", label: "Tatiana Rorigues" },
                { value: "e1", label: "ISTQB" },
                { value: "e2", label: "HGD" },
              ]}
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
                { value: "people", label: "People" },
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

            <TextInput label={"Enroll"} returned={setText} />

            <TextInput label={"Training Name"} returned={setTrainingName} />

            <BigInput
              label={"Event | Training Description"}
              returned={setBigText}
            />

            {/* <DatePicker label={"Date"} returned={setDate} /> */}
          </div>

          <div className="flex justify-center">
            <Toaster richColors position="bottom-center" />
            <button
              className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
              onClick={() => toast.success("Training Added")}
            >
              Add Training
            </button>
            <button
              className="bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
              onClick={() =>
                toast.error(
                  "It Wasnt Possible to Add the Training. Please Try Again"
                )
              }
            >
              Initiate Training
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingPlan;
