"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";

const AddTrainingPlan = () => {
  const [trainingType, setTrainingType] = useState(null);
  const [trainingArea, setTrainingArea] = useState(null);
  const [eventType, setEventType] = useState(null);

  return (
    <div>
      <Navbar activeRoute="/admin/adminhub" />
      <div className="flex">
        <div className="w-60 bg-gray-200 h-screen p-4 border-r border-gray-400">
          barra lateral
        </div>
        <div>
          <form className="flex px-3 py-3 space-x-8">
            <Dropdown
              label="Training Type"
              options={[
                { value: "internal", label: "Internal" },
                { value: "external", label: "External" },
              ]}
              message="Select One"
              onSelect={setTrainingType}
            />

            <Dropdown
              label="Trainig Area"
              options={[
                { value: "p&c", label: "P&C" },
                { value: "itdevelopment", label: "IT Development" },
                { value: "sales", label: "Sales" },
                { value: "languages", label: "Languages" },
              ]}
              message="Select One"
              onSelect={setTrainingArea}
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
              onSelect={setEventType}
            />

            {/* Fazer componenet multisect */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainingPlan;
