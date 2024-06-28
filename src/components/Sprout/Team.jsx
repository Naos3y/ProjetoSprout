import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import TextInput from "../TextInputUpdated";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { useEffect } from "react";
import { decrypt } from "src/session/crypt";
import { GrClearOption } from "react-icons/gr";
import TrainingModal from "../Manager/TrainingModal";

export default function TeamLayout(condition) {
  const [team, setTeam] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [currUser, setCurrUser] = useState(0);
  const [ModalState, setModalState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function tryGetTeam() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/myteam");
      url.searchParams.append("uid", decryptedSession.user.team);

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

  const filteredTeam = team.filter((member) => {
    const nomeLowerCase = member.uname.toLowerCase();
    const filterLowerCase = userFilter.toLowerCase();

    if (condition.condition) {
      return nomeLowerCase.includes(filterLowerCase);
    } else {
      return nomeLowerCase.includes(filterLowerCase);
    }
  });

  const resetUsernameFilter = () => {
    setUserFilter("");
  };

  const handleUsernameFilterChange = (e) => {
    setUserFilter(e.target.value);
  };

  const toggleModal = (e) => {
    setCurrUser(e.uid);
    console.log(e.uid);
    setModalState(!ModalState);
    setModalOpen(!modalOpen);
  };

  const doNothing = () => {};

  useEffect(() => {
    const updateData = async () => {
      try {
        const aTeam = await tryGetTeam();
        setTeam(aTeam.message);
        console.log(aTeam);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    updateData();
  }, []);

  return (
    <div className="border rounded-s mt-5 mb-5 max-w-screen">
      <Toaster richColors position="bottom-center" />
      <div className="flex flex-col lg:flex-row rounded mt-1 mb-1">
        <input
          name="filter"
          type="text"
          value={userFilter}
          onChange={handleUsernameFilterChange}
          className="ml-4 border-l border-t border-b p-2 w-full rounded-tl rounded-bl border-gray-300 focus:outline-none focus:border-green-500 mt-5 mb-5 lg:max-w-lg text-black"
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
      <div className="h-screen">
        <div className="max-h-screen overflow-y-auto max-w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
          {team.length > 0 ? (
            Array.isArray(filteredTeam) && filteredTeam.length > 0 ? (
              filteredTeam.map(function (user, index) {
                return (
                  <button
                    className="border border-gray-200 rounded"
                    key={index}
                    name={"user" + index}
                    onClick={() => {
                      if (condition.condition) {
                        toggleModal(user);
                      } else {
                        doNothing();
                      }
                    }}
                  >
                    <div id={index} key={index} className="flex">
                      <div className="w-4 h-auto">
                        <div className="bg-gray-200 block object-cover rounded-tl rounded-bl h-full w-full" />
                      </div>
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
                        {condition.condition ? (
                          <div className="text-l text-gray-600 font-bold text-left">
                            Training hours:
                            <span className="text-black mt-1 ml-1">
                              {user.nhoras}
                            </span>
                          </div>
                        ) : (
                          <div> </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="border border-gray-300 rounded p-5 bg-white">
                <p className="text-black mt-1 ml-1 font-bold">
                  No team members found.
                </p>
              </div>
            )
          ) : (
            <div> </div>
          )}
          {modalOpen && (
            <TrainingModal
              isOpen={ModalState}
              onRequestClose={toggleModal}
              userid={currUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
