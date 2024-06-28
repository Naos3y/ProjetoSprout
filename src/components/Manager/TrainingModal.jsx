import Modal from "react-modal";
import React, { Component, useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Dropdown from "../DropdownFilter";
import { GrClearOption } from "react-icons/gr";
import { decrypt } from "src/session/crypt";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
const TrainingModal = ({ isOpen, onRequestClose, userid }) => {
  const [formacoes, setFormacoes] = useState([]);
  const [filter, setFilter] = useState("");
  const [expandedTrainings, setExpandedTrainings] = useState([]);
  const [prof, setProf] = useState("");
  const [type, setType] = useState("");
  const [stop, setStop] = useState(false);
  const [control, setControl] = useState(-1);

  async function tryGetTrainingsData() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL(
        "http://localhost:3000/api/sprout/getalltrainingsdata"
      );

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
        "http://localhost:3000/api/sprout/getalloutsidetrainingsdata"
      );
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

  async function tryGetOutsideTId() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/outsidetid");
      url.searchParams.append("uid", userid);

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

  async function tryGetInsideTId() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/insidetid");
      url.searchParams.append("uid", userid);

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

  async function tryAddToTraining(tid, type, index) {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);
      let url;
      if (type == "inside")
        url = new URL("http://localhost:3000/api/manager/addtotraining");
      else
        url = new URL("http://localhost:3000/api/manager/addtooutsidetraining");

      url.searchParams.append("uid", userid);
      url.searchParams.append("tid", tid);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Something went wrong!");
        throw new Error("Something went wrong");
      }

      const newFormacoes = formacoes.filter(
        (objeto) => !(objeto.id == tid && objeto.who == type)
      );
      handleExpand(index);
      setFormacoes(newFormacoes);
      toast.success("Success!");

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Something went wrong!");
      throw error;
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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

  const optionsType = [
    { value: "", label: "All" },
    { value: "virtual", label: "Virtual" },
    { value: "onsite", label: "OnSite" },
    { value: "offline", label: "Offline" },
  ];

  const filteredFormacoes = formacoes.filter((formacao) => {
    const nomeLowerCase = formacao.treino.toLowerCase();
    // const tipoFormadorLowerCase = formacao.local.toLowerCase();
    const tipoLowerCase = formacao.local.toLowerCase();

    const filterLowerCase = filter.toLowerCase();
    // const profLowerCase = typeof prof === "string" ? prof.toLowerCase() : "";
    const typeLowerCase = typeof type === "string" ? type.toLowerCase() : "";

    return (
      nomeLowerCase.includes(filterLowerCase) &&
      // tipoFormadorLowerCase.includes(profLowerCase) &&
      tipoLowerCase.includes(typeLowerCase)
    );
  });

  useEffect(() => {
    const updateDataModel = async () => {
      try {
        let atrainings = [];
        let otrainings = [];
        let oid = [];
        let aid = [];
        let intOid = [];
        let intAid = [];
        let otrainingsFilter = [];
        let atrainingsFilter = [];

        atrainings = await tryGetTrainingsData();
        atrainings.message.forEach((training) => {
          training.who = "inside";
        });
        otrainings = await tryGetOutsideTrainingsData();
        otrainings.message.forEach((training) => {
          training.who = "outside";
        });

        oid = await tryGetOutsideTId();
        intOid = oid.message.map((object) => object.id);

        otrainingsFilter = otrainings.message.filter(
          (objeto) => !intOid.message.includes(objeto.id)
        );

        aid = await tryGetInsideTId();
        intAid = aid.message.map((object) => object.id);

        atrainingsFilter = atrainings.message.filter(
          (objeto) => !intAid.includes(objeto.id)
        );

        const trainings = atrainingsFilter.concat(otrainingsFilter);
        setFormacoes(trainings);
        setStop(true);
        setControl(1);
      } catch (error) {
        console.log(error);
      }
    };

    updateDataModel();
  }, [stop]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg max-w-screen-md"
      overlayClassName="fixed inset-0 backdrop-filter backdrop-blur-sm"
      ariaHideApp={false}
    >
      <h2 className="text-2xl mb-6 font-bold text-center text-green-500">
        Add Training
      </h2>{" "}
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

        <Dropdown options={optionsType} message="Type" returned={handleType} />
      </div>
      <div className="max-h-96 overflow-y-auto">
        {control == 1 ? (
          <>
            {" "}
            {filteredFormacoes.map((training, index) => (
              <div
                key={index}
                className={`border-t border-gray-200 rounded-sm ${
                  training.who === "inside" ? "bg-gray-100" : "bg-white"
                }`}
              >
                <div className="flex items-center p-4 mb-2 mt-2">
                  <div className="w-4 h-4 mr-2 rounded-full" />
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-700">
                      {training.treino}
                    </div>
                    <div className="text-sm text-gray-600">
                      {training.inicio}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Duration: {training.duracao} min.
                    </div>
                    <div className="text-sm text-gray-600">
                      Training Type: {training.area}
                    </div>
                    <div className="text-sm text-gray-600">
                      Location: {training.local}
                    </div>
                    {expandedTrainings.includes(index) && (
                      <div className="">
                        <div className="text-sm text-gray-600">
                          Professor: {training.formador}
                        </div>
                        <div className="text-sm text-gray-600">
                          Min. Participants: {training.min}
                        </div>
                        <div className="text-sm text-gray-600">
                          Max. Participants: {training.max}
                        </div>
                        <div className="text-sm text-gray-600">
                          Description: {training.descricao}
                        </div>
                        <button
                          className="mt-2 px-3 py-2 bg-gray-300 hover:bg-green-500 hover:text-white focus:outline-none rounded shadow-sm"
                          onClick={() =>
                            tryAddToTraining(training.id, training.who, index)
                          }
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    className="ml-4 p-1 bg-gray-300 hover:bg-green-500 hover:text-white focus:outline-none rounded-full shadow-sm"
                    onClick={() => handleExpand(index)}
                  >
                    <IoMdInformationCircleOutline />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center p-4 mb-2 mt-2">
              <div className="w-4 h-4 mr-2 rounded-full text-black">
                Loading...{" "}
              </div>{" "}
            </div>{" "}
          </>
        )}
      </div>
      <button
        onClick={onRequestClose}
        className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded shadow-sm focus:outline-none"
      >
        Close
      </button>
    </Modal>
  );
};

export default TrainingModal;
