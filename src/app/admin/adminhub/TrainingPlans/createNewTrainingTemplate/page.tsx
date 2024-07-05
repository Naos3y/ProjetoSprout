"use client";

import cookies from "js-cookie";
import { decrypt } from "../../../../../../src/session/crypt";
import {
  sessionExpired,
  validSession,
} from "../../../../../../src/session/sessionUtils";
import SideNav from "../../../../../../src/components/Static/sidenav";
import "tailwindcss/tailwind.css";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "sonner";
import CompleteName from "../../../../../../src/components/CompleteName";
import Counter from "../../../../../../src/components/CounterRodrigo";

interface Training {
  itid: number;
  itname: string;
  itnumofmin: string;
  iteventtype: string;
  itminparticipants: string;
  itmaxparticipants: string;
  ittrainingarea: string;
  itdescription: string;
  itstarted: boolean;
  itlocation: string;
  itstarttime: string;
  day?: number; // Adiciona a propriedade `day` opcionalmente
}

export default function Sprout() {
  const [control, setControl] = useState(-1);
  const [permission, setPermission] = useState(0);
  const [showExpired, setShowExpired] = useState(false);
  const [iisOpen, setiIsOpen] = useState(false);

  const toggleSideNav = () => {
    setiIsOpen(!iisOpen);
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

  const [completeName, setCompleteName] = useState("");
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedTrainings, setSelectedTrainings] = useState<Training[]>([]);
  const [selectedDays, setSelectedDays] = useState<{ [key: number]: number }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    const filtered = trainings.filter((training) =>
      training.itname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrainings(filtered);
  }, [searchTerm, trainings]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchTrainings = async () => {
    try {
      const response = await fetch("/api/getInsideTrainings");
      if (response.ok) {
        const data = await response.json();
        setTrainings(data.data);
      } else {
        toast.error("Failed to fetch trainings.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching trainings.");
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trainings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(trainings.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSelectTraining = (training: Training) => {
    if (!selectedTrainings.some((t) => t.itid === training.itid)) {
      setSelectedTrainings([...selectedTrainings, training]);
    }
  };

  const handleDayChange = (itid: number, day: number) => {
    setSelectedDays({ ...selectedDays, [itid]: day });
  };

  const handleRemoveTraining = (trainingToRemove: Training) => {
    setSelectedTrainings(
      selectedTrainings.filter((t) => t.itid !== trainingToRemove.itid)
    );
    const { [trainingToRemove.itid]: removedItem, ...updatedDays } =
      selectedDays;
    setSelectedDays(updatedDays);
  };

  const getDaysTrainingsMap = () => {
    const daysTrainingsMap: { [key: number]: string[] } = {};
    for (const training of selectedTrainings) {
      const day = selectedDays[training.itid];
      if (day) {
        if (!daysTrainingsMap[day]) {
          daysTrainingsMap[day] = [];
        }
        daysTrainingsMap[day].push(training.itname);
      }
    }
    return daysTrainingsMap;
  };

  const reloadSuccess = () => {
    window.location.reload();
    toast.success("Training template saved successfully.");
  };

  const handleSaveTrainingTemplate = async () => {
    if (!completeName) {
      toast.error("Template name is required.");
      return;
    }

    const selectedTrainingsWithDays = selectedTrainings.map((training) => ({
      ...training,
      day: selectedDays[training.itid],
    }));

    const requestBody = {
      templateName: completeName,
      selectedTrainings: selectedTrainingsWithDays,
    };

    try {
      const response = await fetch("/api/addNewTrainingTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.code === 200) {
        toast.success("Training template created sucessfully.");

        window.location.reload();
      } else if (data.code === 400) {
        console.log("data", data);
        toast.error("Template Name already exists!");
      } else if (data.code === 500) {
        console.log("data", data);
        toast.error("Internal server error!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving the training template.");
    }
  };

  const daysTrainingsMap = getDaysTrainingsMap();
  const sortedDays = Object.keys(daysTrainingsMap)
    .map(Number)
    .sort((a, b) => a - b);

  const SelectedTrainingsList = () => (
    <div>
      <div className="flex justify-between">
        <h3 className="mr-4">
          <b>Selected Trainings:</b>
        </h3>
        <h3 className="mr-10">
          <b>Training Day</b>
        </h3>
      </div>
      <ul>
        {selectedTrainings.map((training) => (
          <li key={training.itid} className="flex items-center justify-between">
            <span>{training.itname}</span>
            <div className="flex items-center">
              <Counter
                label=""
                value={selectedDays[training.itid] || 0}
                onChange={(value: number) =>
                  handleDayChange(training.itid, value)
                }
              />
              <Icon
                icon="pajamas:remove"
                width="19"
                height="19"
                className="text-red-500 ml-2 cursor-pointer"
                onClick={() => handleRemoveTraining(training)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const DaysTrainingsTable = () => {
    const maxDay = Math.max(...sortedDays, 0); // Encontra o maior dia selecionado

    const allDays = Array.from({ length: maxDay }, (_, index) => index + 1); // Array de todos os dias até o máximo

    return (
      <div className="mt-16 flex justify-center">
        <table className="border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white">
          <thead className="bg-green-200">
            <tr>
              {allDays.map((day) => (
                <th key={day} className=" px-4 py-2 text-center">
                  Day {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {allDays.map((day) => (
                <td key={day} className=" px-4 py-2 text-center">
                  {daysTrainingsMap[day]?.map((trainingName, index) => (
                    <React.Fragment key={index}>
                      {trainingName}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
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
        <div className="flex justify-center items-center">
          <SideNav
            iisOpen={iisOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main className="ml-14">
              <div>
                <div>
                  {/* Conteúdo acima da tabela */}
                  <div className="flex items-center ml-4">
                    <Icon
                      icon="gridicons:create"
                      width="19"
                      height="19"
                      className="text-green-500"
                    />
                    <span className="font-semibold text-green-500 text-lg ml-2">
                      Create New Training Template
                    </span>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="ml-10 mt-4">
                      <CompleteName
                        label={
                          <span>
                            Template Name{" "}
                            <span style={{ color: "red" }}>*</span>{" "}
                          </span>
                        }
                        value={completeName}
                        returned={setCompleteName}
                      />
                    </div>
                  </div>
                </div>

                {/* Tabela */}
                {!isLoading ? (
                  <>
                    <div className="flex flex-wrap">
                      <div>
                        <table
                          style={{ width: "550px", height: "430px" }}
                          className="border-collapse border border-gray-400 rounded-lg overflow-hidden bg-white ml-20 mt-4"
                        >
                          <thead className="bg-gray-200">
                            <tr>
                              <th
                                style={{ width: "150px", height: "20px" }}
                                className="border border-gray-300 px-4 py-2 text-center"
                              >
                                Training Name
                              </th>
                              <th
                                style={{ width: "130px", height: "20px" }}
                                className="border border-gray-300 px-4 py-2 text-center"
                              >
                                Event Type
                              </th>
                              <th
                                style={{ width: "150px", height: "20px" }}
                                className="border border-gray-300 px-4 py-2 text-center"
                              >
                                Training Area
                              </th>
                              <th
                                style={{ width: "70px", height: "20px" }}
                                className="border border-gray-300 px-4 py-2 text-center"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((training) => (
                              <tr key={training.itid}>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  {training.itname}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  {training.iteventtype}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  {training.ittrainingarea}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <button
                                    className="bg-gray-400 text-white px-2 py-1 rounded"
                                    onClick={() =>
                                      handleSelectTraining(training)
                                    }
                                  >
                                    Select
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td
                                colSpan={4}
                                style={{ width: "550px", height: "20px" }}
                                className="text-center"
                              >
                                {/* Controles de páginação */}
                                <div className="pagination">
                                  {pageNumbers.map((number) => (
                                    <span
                                      key={number}
                                      className={`page-link ${
                                        currentPage === number ? "active" : ""
                                      }`}
                                      onClick={() => paginate(number)}
                                      style={{
                                        fontWeight:
                                          currentPage === number
                                            ? "bold"
                                            : "normal",
                                      }}
                                    >
                                      {number}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="ml-56 mt-4">
                        <div
                          className="bg-white p-4 rounded-lg"
                          style={{ width: "540px" }}
                        >
                          <SelectedTrainingsList />
                        </div>
                      </div>
                    </div>

                    <DaysTrainingsTable />
                    <div className="flex justify-center mt-4">
                      <button
                        className=" bg-[#DFDFDF] text-[#818181] font-bold px-10 py-2 rounded-md shadow-sm mx-2 hover:bg-green-500 hover:text-white active:bg-green-700"
                        onClick={handleSaveTrainingTemplate}
                      >
                        Save Training Template
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center">
                    <div className="font-semibold text-green-500 text-lg pb-3">
                      Loading Trainings ...
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
