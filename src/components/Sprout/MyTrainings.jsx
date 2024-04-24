import React, { Component, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineHelp } from "react-icons/md";
import Dropdown from "../DropdownFilter";
import { GrClearOption } from "react-icons/gr";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import ColorHelp from "./ColorInfor";

export default function MyTrainings() {
  const [formacoes, setFormacoes] = useState([]);
  const [ruid, setRuid] = useState("");
  const [filter, setFilter] = useState("");
  const [expandedTrainings, setExpandedTrainings] = useState([]);
  const [prof, setProf] = useState("");
  const [type, setType] = useState("");
  const [Mprof, setMProf] = useState("Instructor");
  const [Mtype, setMType] = useState("Location");
  const [showHelp, setShowHelp] = useState(false);

  async function tryGetUserRuid() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/getruid");
      url.searchParams.append("uid", decryptedSession.user.id);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function tryGetTrainingsData() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/gettrainingsdata");
      url.searchParams.append("uid", decryptedSession.user.id);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function tryGetOutsideTrainingsData() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL(
        "http://localhost:3000/api/sprout/getoutsidetrainingsdata"
      );
      url.searchParams.append("uid", decryptedSession.user.id);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const updateData = async () => {
      try {
        const atrainings = await tryGetTrainingsData();
        atrainings.message.forEach((training) => {
          training.who = "inside";
        });
        const otrainings = await tryGetOutsideTrainingsData();
        otrainings.message.forEach((training) => {
          training.who = "outside";
        });
        const trainings = atrainings.message.concat(otrainings.message);
        setFormacoes(trainings);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    updateData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleProf = (e) => {
    setProf(e.value);
  };

  const handleType = (e) => {
    setType(e.value);
  };

  const resetFilter = () => {
    setFilter("");
  };

  function handleExpand(index) {
    const newExpandedTrainings = [...expandedTrainings];
    if (newExpandedTrainings.includes(index)) {
      newExpandedTrainings.splice(newExpandedTrainings.indexOf(index), 1);
    } else {
      newExpandedTrainings.push(index);
    }
    setExpandedTrainings(newExpandedTrainings);
  }

  // const optionsProf = [
  //   { value: "", label: "All" },
  //   { value: "intern", label: "Internal" },
  //   { value: "extern", label: "External" },
  // ];

  const optionsType = [
    { value: "", label: "All" },
    { value: "virtual", label: "Virtual" },
    { value: "onsite", label: "OnSite" },
    { value: "offline", label: "Offline" },
  ];

  const filteredFormacoes = formacoes.filter((formacao) => {
    const nomeLowerCase = formacao.treino.toLowerCase();
    const tipoLowerCase = formacao.local.toLowerCase();

    const filterLowerCase = filter.toLowerCase();
    const typeLowerCase = typeof type === "string" ? type.toLowerCase() : "";

    return (
      nomeLowerCase.includes(filterLowerCase) &&
      tipoLowerCase.includes(typeLowerCase)
    );
  });

  const closeHelp = () => {
    setShowHelp(false);
  };

  return (
    <div className="border rounded mt-5 mb-5 max-w-screen">
      <div className="text-left border-b flex">
        <input
          name="filter"
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-5 max-w-96 ml-4 text-black"
          placeholder="filter by training"
          required
        />
        <button
          onClick={resetFilter}
          className="p-2 w-max-100 mt-5 mb-5 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none  cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
        >
          <GrClearOption />
        </button>
        {/* <Dropdown
          options={optionsProf}
          message="Instructor"
          returned={handleProf}
        /> */}
        <Dropdown options={optionsType} message="Type" returned={handleType} />
      </div>
      <div className="h-screen">
        <div className="max-h-screen overflow-y-auto max-w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
          {filteredFormacoes.map(function (training, index) {
            return (
              <div
                id={index}
                key={index}
                className={`${
                  training.who === "inside"
                    ? "border-t border-gray-200 rounded-s"
                    : "border-t border-blue-500 rounded-s"
                }`}
              >
                <div className="flex">
                  {training.pending == true ? (
                    training.start == true ? (
                      <div className="w-4 h-auto">
                        <div className="bg-red-300 block object-cover rounded-tl rounded-bl h-full w-full" />
                      </div>
                    ) : (
                      <div className="w-4 h-auto">
                        <div className="bg-blue-300 block object-cover rounded-tl rounded-bl h-full w-full" />
                      </div>
                    )
                  ) : training.start == true ? (
                    <div className="w-4 h-auto">
                      <div className="bg-black block object-cover rounded-tl rounded-bl h-full w-full" />
                    </div>
                  ) : (
                    <div className="w-4 h-auto">
                      <div className="bg-green-200 block object-cover rounded-tl rounded-bl h-full w-full" />
                    </div>
                  )}

                  <div className="flex-1 p-4 border-b">
                    <div className="text-l text-gray-600 font-bold text-left">
                      <div className="mt-1">
                        <span className="text-black">{training.treino}</span>
                      </div>
                      <div className="mt-1 border-b">
                        <span className="text-black">{training.inicio}</span>
                      </div>
                      <div className="mt-1">
                        <label className="font-bold text-gray-800">
                          Duration:{" "}
                        </label>
                        <span className="text-gray-600">
                          {training.duracao}
                        </span>
                      </div>
                      <div className="mt-1">
                        <label className="font-bold text-gray-800">
                          Trainings Type:{" "}
                        </label>
                        <span className="text-gray-600">{training.area}</span>
                      </div>
                      <div className="mt-1">
                        <label className="font-bold text-gray-800">
                          Location:{" "}
                        </label>
                        <span className="text-gray-600">{training.local}</span>
                      </div>
                      {expandedTrainings.includes(index) && (
                        <div className="text-l text-gray-600 font-bold text-left">
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Professor:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.formador}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Min. Participants:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.min}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Max. Participants:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.max}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Description:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.descricao}
                            </span>
                          </div>
                          {/* <button
                            className="bg-[#DFDFDF] text-[#818181] font-bold mt-2 px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700"
                            //onClick={() => handleAppyToTraining(index)}
                          >
                            Apply
                          </button> */}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="bg-[#DFDFDF] text-[#818181] font-bold mt-2 px-2 py-1 rounded-full shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={() => handleExpand(index)}
                      >
                        <IoMdInformationCircleOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="fixed bottom-4 right-4 p-4">
        <button
          className="bg-[#DFDFDF] text-[#818181]  rounded-full shadow-sm hover:bg-blue-500 hover:text-white active:bg-blue-500 text-2xl"
          onClick={() => setShowHelp(true)}
        >
          <MdOutlineHelp />
        </button>
      </div>
      {showHelp && <ColorHelp onClose={closeHelp} />}
    </div>
  );
}
