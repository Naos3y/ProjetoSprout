"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/Dropdown";
import { Toaster, toast } from "sonner";
import CompleteName from "@/components/CompleteName";

const Formulario = () => {
  const [groupName, setGroupName] = useState("");

  return (
    <div>
      <div className="flex items-center ml-4">
        <Icon
          icon="clarity:employee-group-solid"
          width="19"
          height="19"
          className="text-green-500"
        />
        <span className="font-semibold text-green-500 text-lg ml-2">
          Add New Group
        </span>
      </div>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-md mr-48">
          <CompleteName label={"New Group Name"} returned={setGroupName} />
        </div>
      </div>

      <div className="flex justify-center ">
        <div className="flex flex-wrap mt-16">
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
            onClick={() => toast.success("Group registed successfully!")}
          >
            Regist New Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
