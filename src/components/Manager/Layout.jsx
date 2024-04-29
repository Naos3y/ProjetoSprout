import React from "react";
import { useState, useEffect } from "react";
import { GrClearOption } from "react-icons/gr";
import Dropdown from "../DropdownFilter";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import { IoMdInformationCircleOutline } from "react-icons/io";

function Layout() {
  const [userFilter, setUserFilter] = useState("");
  const [trainingFilter, setTrainingFilter] = useState("");
  const [team, setTeam] = useState([]);
  const [type, setType] = useState("");
  const [formacoes, setFormacoes] = useState([]);
  const [filter, setFilter] = useState("");
  const [expandedTrainings, setExpandedTrainings] = useState([]);

  const handleUsernameFilterChange = (e) => {
    setUserFilter(e.target.value);
  };

  const handleTrainingFilterChange = (e) => {
    setTrainingFilter(e.target.value);
  };

  const resetUsernameFilter = () => {
    setUserFilter("");
  };

  const resetTrainingFilter = () => {
    setTrainingFilter("");
  };
  const optionsType = [
    { value: "", label: "All" },
    { value: "virtual", label: "Virtual" },
    { value: "onsite", label: "OnSite" },
    { value: "offile", label: "Offile" },
  ];
  const handleType = (e) => {
    setType(e.value);
  };

  const handleUserTrainings = async (e) => {
    try {
      const atrainings = await tryGetTrainingsData(e.uid);
      atrainings.message.forEach((training) => {
        training.who = "inside";
      });
      const otrainings = await tryGetOutsideTrainingsData(e.uid);
      otrainings.message.forEach((training) => {
        training.who = "outside";
      });
      const trainings = atrainings.message.concat(otrainings.message);
      setFormacoes(trainings);
      console.log(trainings);
    } catch (error) {}
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

  async function tryGetTrainingsData(uid) {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/gettrainingsdata");
      url.searchParams.append("uid", uid);

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

  async function tryGetOutsideTrainingsData(uid) {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL(
        "http://localhost:3000/api/sprout/getoutsidetrainingsdata"
      );
      url.searchParams.append("uid", uid);

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

  async function tryGetTeam() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/myteam");
      url.searchParams.append("uid", decryptedSession.user.team);
      console.log(decryptedSession.user);

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
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    const updateData = async () => {
      try {
        const aTeam = await tryGetTeam();
        console.log(aTeam);
        setTeam(aTeam.message);
      } catch (error) {}
    };
    updateData();
  }, []);

  return (
    <div className="border rounded mt-5 mb-5">
      <div className="flex h-screen rounded mt-1 mb-1">
        <div className="w-1/3 relative border-r">
          <h2 className="text-Left text-green-700 text-3xl font-semibold ml-5 mt-5">
            Sprouts
          </h2>

          <div className="text-left flex">
            <input
              name="filter"
              type="text"
              value={userFilter}
              onChange={handleUsernameFilterChange}
              className="border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-5 max-w-96 ml-4 text-black"
              placeholder="filter by username"
              required
            />
            <button
              onClick={resetUsernameFilter}
              className="p-2 w-max-100 mt-5 mb-5 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none  cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
            >
              <GrClearOption />
            </button>
          </div>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: `calc(100vh - 15vh)` }}
          >
            {Array.isArray(team) && team.length > 0 ? (
              team.map(function (user, index) {
                return (
                  <button
                    className="border border-gray-200 rounded mb-4 ml-4 w-11/12 hover:bg-slate-100 focus:bg-gray-200 focus:border-black"
                    key={index}
                    onClick={() => handleUserTrainings(user)}
                  >
                    <div className="flex">
                      <div id={index} className="flex">
                        <div className="flex-1 p-4">
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Name:
                            <span className="text-black mt-1 ml-1">
                              {user.uname}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Email:
                            <span className="text-black mt-1 ml-1">
                              {user.lemail}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Role:
                            <span className="text-black mt-1 ml-1">
                              {user.urole}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left mb-1">
                            Team:
                            <span className="text-black mt-1 ml-1">
                              {user.tname}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left">
                            Department:
                            <span className="text-black mt-1 ml-1">
                              {user.dname}
                            </span>
                          </div>
                          <div className="text-l text-gray-600 font-bold text-left">
                            Training hours:
                            <span className="text-black mt-1 ml-1">
                              {user.thours}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="border border-gray-300 rounded p-5 bg-white mr-1 ml-1">
                <p className="text-black mt-1 ml-1 font-bold">
                  No team members found.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-2/3 relative">
          <h2 className="text-Left text-green-700 text-3xl font-semibold ml-5 mt-5">
            Trainings
          </h2>
          <div className="text-left flex">
            <input
              name="filter"
              type="text"
              value={trainingFilter}
              onChange={handleTrainingFilterChange}
              className="border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-5 max-w-96 ml-4 text-black"
              placeholder="Filter by training name"
              required
            />
            <button
              onClick={resetTrainingFilter}
              className="p-2 w-max-100 mt-5 mb-5 border rounded-tr rounded-br border-gray-300 hover:border-green-500 focus:outline-none  cursor-pointer font-bold flex items-center justify-between bg-white shadow-sm text-black"
            >
              <GrClearOption />
            </button>
            <Dropdown
              options={optionsType}
              message="Type "
              returned={handleType}
            />
          </div>
          <div
            className="overflow-y-auto ml-4"
            style={{ maxHeight: `calc(100vh - 15vh)` }}
          >
            {Array.isArray(filteredFormacoes) &&
            filteredFormacoes.length > 0 ? (
              filteredFormacoes.map(function (training, index) {
                return (
                  <div
                    id={index}
                    key={index}
                    className={`${
                      training.who === "inside"
                        ? "border border-gray-200 rounded-s mb-4 w-11/12"
                        : "border border-blue-500 rounded-s mb-4 w-11/12"
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
                            <span className="text-black">
                              {training.treino}
                            </span>
                          </div>
                          <div className="mt-1 border-b">
                            <span className="text-black">
                              {training.inicio}
                            </span>
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
                            <span className="text-gray-600">
                              {training.area}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Location:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.local}
                            </span>
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
              })
            ) : (
              <div className="border border-gray-300 rounded p-5 bg-white mr-1 ml-1 w-11/12">
                <p className="text-black mt-1 ml-1 font-bold">
                  This user has no trainings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
