import React, { Component, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function IncomingLayout() {
  const getTrainings = () => {
    // pedido da api
    // o body do pedido da api deve conter todas as formações a que essa pessoas está associada (já definido no ER)
    // o dicionario deve estar corretamente formatado -> ainda a decidir como o cliente quer que sejam apresentadas
    // -------------
    //
  };

  const formacoes = [
    {
      nome: "Desenvolvimento Web com NodeJS",
      inicio: "06-05-2024",
      duracao: "2h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "João Silva",
      minParticipantes: 10,
      maxParticipantes: 20,
    },
    {
      nome: "APIs RESTful com Express",
      inicio: "13-05-2024",
      duracao: "1h30min",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Maria Oliveira",
      minParticipantes: 5,
      maxParticipantes: 15,
    },
    {
      nome: "Testes Unitários com Jest",
      inicio: "20-05-2024",
      duracao: "1h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Pedro Santos",
      minParticipantes: 8,
      maxParticipantes: 12,
    },
    {
      nome: "Implementação de Segurança em Aplicações Web",
      inicio: "27-05-2024",
      duracao: "2h",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Ana Costa",
      minParticipantes: 7,
      maxParticipantes: 14,
    },
    {
      nome: "Desenvolvimento Mobile com React Native",
      inicio: "03-06-2024",
      duracao: "2h30min",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Bruno Fernandes",
      minParticipantes: 12,
      maxParticipantes: 25,
    },
    {
      nome: "Desenvolvimento Web com NodeJS",
      inicio: "06-05-2024",
      duracao: "2h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "João Silva",
      minParticipantes: 10,
      maxParticipantes: 20,
    },
    {
      nome: "APIs RESTful com Express",
      inicio: "13-05-2024",
      duracao: "1h30min",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Maria Oliveira",
      minParticipantes: 5,
      maxParticipantes: 15,
    },
    {
      nome: "Testes Unitários com Jest",
      inicio: "20-05-2024",
      duracao: "1h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Pedro Santos",
      minParticipantes: 8,
      maxParticipantes: 12,
    },
    {
      nome: "Implementação de Segurança em Aplicações Web",
      inicio: "27-05-2024",
      duracao: "2h",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Ana Costa",
      minParticipantes: 7,
      maxParticipantes: 14,
    },
    {
      nome: "Desenvolvimento Mobile com React Native",
      inicio: "03-06-2024",
      duracao: "2h30min",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Bruno Fernandes",
      minParticipantes: 12,
      maxParticipantes: 25,
    },
    {
      nome: "Desenvolvimento Web com NodeJS",
      inicio: "06-05-2024",
      duracao: "2h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "João Silva",
      minParticipantes: 10,
      maxParticipantes: 20,
    },
    {
      nome: "APIs RESTful com Express",
      inicio: "13-05-2024",
      duracao: "1h30min",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Maria Oliveira",
      minParticipantes: 5,
      maxParticipantes: 15,
    },
    {
      nome: "Testes Unitários com Jest",
      inicio: "20-05-2024",
      duracao: "1h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Pedro Santos",
      minParticipantes: 8,
      maxParticipantes: 12,
    },
    {
      nome: "Implementação de Segurança em Aplicações Web",
      inicio: "27-05-2024",
      duracao: "2h",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Ana Costa",
      minParticipantes: 7,
      maxParticipantes: 14,
    },
    {
      nome: "Desenvolvimento Mobile com React Native",
      inicio: "03-06-2024",
      duracao: "2h30min",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Bruno Fernandes",
      minParticipantes: 12,
      maxParticipantes: 25,
    },
    {
      nome: "Desenvolvimento Web com NodeJS",
      inicio: "06-05-2024",
      duracao: "2h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "João Silva",
      minParticipantes: 10,
      maxParticipantes: 20,
    },
    {
      nome: "APIs RESTful com Express",
      inicio: "13-05-2024",
      duracao: "1h30min",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Maria Oliveira",
      minParticipantes: 5,
      maxParticipantes: 15,
    },
    {
      nome: "Testes Unitários com Jest",
      inicio: "20-05-2024",
      duracao: "1h",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Pedro Santos",
      minParticipantes: 8,
      maxParticipantes: 12,
    },
    {
      nome: "Implementação de Segurança em Aplicações Web",
      inicio: "27-05-2024",
      duracao: "2h",
      tipoFormador: "interno",
      tipo: "online",
      professor: "Ana Costa",
      minParticipantes: 7,
      maxParticipantes: 14,
    },
    {
      nome: "Desenvolvimento Mobile com React Native",
      inicio: "03-06-2024",
      duracao: "2h30min",
      tipoFormador: "externo",
      tipo: "presencial",
      professor: "Bruno Fernandes",
      minParticipantes: 12,
      maxParticipantes: 25,
    },
  ];

  const [filter, setFilter] = useState("");
  const [expandedTrainings, setExpandedTrainings] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredFormacoes = formacoes.filter((formacao) => {
    return formacao.nome.toLowerCase().includes(filter.toLowerCase());
  });

  function handleExpand(index) {
    const newExpandedTrainings = [...expandedTrainings];
    if (newExpandedTrainings.includes(index)) {
      newExpandedTrainings.splice(newExpandedTrainings.indexOf(index), 1);
    } else {
      newExpandedTrainings.push(index);
    }
    setExpandedTrainings(newExpandedTrainings);
  }

  return (
    <div className="border rounded mt-5 max-w-screen">
      <div className="text-left ml-2 mr-2 mb-2 border-b">
        <input
          name="filter"
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 w-full rounded-md border-gray-300 focus:outline-none  focus:border-green-500 mt-5 mb-3 max-w-96 ml-4 text-black"
          placeholder="filter by training"
          required
        />
      </div>
      <div className="h-screen">
        <div className="max-h-screen overflow-y-auto max-w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
          {filteredFormacoes.map(function (training, index) {
            return (
              <div className="border-t border-gray-200 rounded-s">
                <div id={index} key={index} className="flex">
                  <div className="w-4 h-auto">
                    <div
                      // src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"
                      // alt="Image of a Sprout"
                      className="bg-green-200 block object-cover rounded-tl rounded-bl h-full w-full"
                    />
                  </div>
                  <div className="flex-1 p-4 border-b">
                    <div className="text-l text-gray-600 font-bold text-left">
                      <div className="mt-1">
                        <span className="text-black">{training.nome}</span>
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
                        <span className="text-gray-600">
                          {training.tipoFormador}
                        </span>
                      </div>
                      <div className="mt-1">
                        <label className="font-bold text-gray-800">
                          Location:{" "}
                        </label>
                        <span className="text-gray-600">{training.tipo}</span>
                      </div>
                      {expandedTrainings.includes(index) && (
                        <div className="text-l text-gray-600 font-bold text-left">
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Professor:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.professor}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Min. Participants:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.minParticipantes}
                            </span>
                          </div>
                          <div className="mt-1">
                            <label className="font-bold text-gray-800">
                              Max. Participants:{" "}
                            </label>
                            <span className="text-gray-600">
                              {training.maxParticipantes}
                            </span>
                          </div>
                          <button
                            className="bg-[#DFDFDF] text-[#818181] font-bold mt-2 px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700"
                            //onClick={() => handleAppyToTraining(index)}
                          >
                            Apply
                          </button>
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
    </div>
  );
}
