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

      <div className="flex flex-wrap">
        <div className="ml-10">
          <Dropdown
            label="Seniority"
            options={[{ value: "Iniciante", label: "Iniciante" }]}
            message="Select One"
            returned={setSeniority}
          />
        </div>

        {userType === "Leader" && (
          <div className="ml-10">
            <Dropdown
              label="Report"
              options={[{ value: "ola", label: "ola" }]}
              message="Select One"
              returned={setReport}
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap">
        <div className="ml-10">
          <CompleteName label={"Email"} returned={setEmail} />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="gap-4 ml-10">
          <Dropdown
            label="Leader"
            options={[{ value: "Jorge", label: "Jorge" }]}
            message="Select One"
            returned={setLeader}
          />
        </div>

        <div className="ml-10">
          <Dropdown
            label="Team"
            options={[{ value: "Developers", label: "Developers" }]}
            message="Select One"
            returned={setTeam}
          />
        </div>

        <div className="ml-10">
          <TextInput label={"Department"} returned={setDepartment} />
        </div>

        <div className="ml-10">
          <Dropdown
            label="Groups"
            options={[{ value: "Xbox", label: "Xbox" }]}
            message="Select One"
            returned={setGroups}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="ml-10">
          <Dropdown
            label="Country"
            options={[{ value: "portugal", label: "Portugal" }]}
            message="Select One"
            returned={setCountry}
          />
        </div>

        <div className="ml-10">
          <Dropdown
            label="City"
            options={[{ value: "Santarem", label: "Santarem" }]}
            message="Select One"
            returned={setCity}
          />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="ml-10">
          {<DatePicker label={"Start Date"} returned={setStartDate} />}
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="gap-4 ml-10">
          <Dropdown
            label="Associate Training Plans?"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            message="Select One"
            returned={handleAssociateTrainingChange}
          />
        </div>

        {/* Renderiza o componente Multiselect apenas se a opção for "Yes" */}
        {associateTraining === "Yes" && (
          <div className="ml-10">
            <Multiselect
              label="Select Training Plan"
              options={[
                { value: "all", label: "All" },
                { value: "department", label: "Department" },
                { value: "groups", label: "Groups" },
                { value: "teams", label: "Teams" },
                { value: "people", label: "People" },
              ]}
              message="Select One / Multi"
              returned={setSelectedTrainingPlans}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center ">
        <div className="flex flex-wrap ">
          <Toaster richColors position="bottom-center" />
          <button
            style={{
              marginTop: "50px",
              marginRight: "10px",
              marginBottom: "100px",
            }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-gray-500 hover:text-white active:bg-gray-500"
            onClick={() => toast.error("Registration Canceled!")}
          >
            Cancel
          </button>
          <button
            style={{ marginTop: "50px", marginBottom: "100px" }}
            className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
            onClick={() => toast.success("User registed successfully!")}
          >
            Regist New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
