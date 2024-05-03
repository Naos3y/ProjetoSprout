import React from "react";
import { useState, useEffect } from "react";
import { GrClearOption } from "react-icons/gr";
import Dropdown from "../DropdownFilter";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ColorHelp from "../Sprout/ColorInfor";
import { MdOutlineHelp } from "react-icons/md";
import { react } from "react";
import { Toaster, toast } from "sonner";

function TrainingTeam(condition) {
  return (
    <div className="border rounded mt-5 mb-5 h-screen">
      <Toaster richColors position="bottom-center" />
      <div className="flex flex-col lg:flex-row rounded mt-1 mb-1"></div>
    </div>
  );
}
