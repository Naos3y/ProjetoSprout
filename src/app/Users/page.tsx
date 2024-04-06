"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import CompleteName from "@/components/CompleteName";
import DatePicker from "@/components/DatePicker";
import Multiselect from "@/components/MultiselectAddUser";
import { Toaster, toast } from "sonner";

const Formulario = () => {
  const [userType, setUserType] = useState("");
  const [adminRights, setAdminRights] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [role, setRole] = useState("");
  const [completeName, setCompleteName] = useState("");
  const [seniority, setSeniority] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");
  const [department, setDepartment] = useState("");
  const [groups, setGroups] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [day, setStartDate] = useState("");
  const [associateTraining, setAssociateTraining] = useState("");
  const [report, setReport] = useState("");
  const [selectedTrainingPlans, setSelectedTrainingPlans] = useState([]);

  interface Option {
    value: string;
    label: string;
  }

  const handleAssociateTrainingChange = (option: Option) => {
    setAssociateTraining(option.value);
    // Se a opção for "No", limpa os planos de treinamento selecionados
    if (option.value === "No") {
      setSelectedTrainingPlans([]);
    }
  };

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="wpf:add-user"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Edit Users
        </span>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          <div className="ml-10">
            <CompleteName label={"Search Name"} returned={setCompleteName} />
          </div>

          <button
            style={{ marginTop: "50px", marginBottom: "100px" }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
            onClick={() => toast.success("Search actived")}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
