import React, { Component, useState } from "react";
import Link from "next/link";

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
      name: "JavaScript Básico",
      Inicio: "01-04-2024",
      formador: "Ana",
      tipo: "presencial",
    },
    {
      name: "HTML e CSS Avançado",
      Inicio: "05-04-2024",
      formador: "Pedro",
      tipo: "remoto",
    },
    {
      name: "Introdução ao Node.js",
      Inicio: "10-04-2024",
      formador: "Mariana",
      tipo: "presencial",
    },
    {
      name: "React Native para Iniciantes",
      Inicio: "15-04-2024",
      formador: "João",
      tipo: "online",
    },
    {
      name: "Python para Ciência de Dados",
      Inicio: "20-04-2024",
      formador: "Lucas",
      tipo: "remoto",
    },
    {
      name: "Machine Learning com TensorFlow",
      Inicio: "25-04-2024",
      formador: "Carla",
      tipo: "presencial",
    },
    {
      name: "Desenvolvimento Web Full Stack",
      Inicio: "30-04-2024",
      formador: "Rafael",
      tipo: "online",
    },
    {
      name: "Segurança da Informação",
      Inicio: "05-05-2024",
      formador: "Fernanda",
      tipo: "presencial",
    },
    {
      name: "Gestão de Projetos Ágeis",
      Inicio: "10-05-2024",
      formador: "Diego",
      tipo: "remoto",
    },
    {
      name: "Design Thinking",
      Inicio: "15-05-2024",
      formador: "Sofia",
      tipo: "presencial",
    },
    {
      name: "JavaScript Básico",
      Inicio: "01-04-2024",
      formador: "Ana",
      tipo: "presencial",
    },
    {
      name: "HTML e CSS Avançado",
      Inicio: "05-04-2024",
      formador: "Pedro",
      tipo: "remoto",
    },
    {
      name: "Introdução ao Node.js",
      Inicio: "10-04-2024",
      formador: "Mariana",
      tipo: "presencial",
    },
    {
      name: "React Native para Iniciantes",
      Inicio: "15-04-2024",
      formador: "João",
      tipo: "online",
    },
    {
      name: "Python para Ciência de Dados",
      Inicio: "20-04-2024",
      formador: "Lucas",
      tipo: "remoto",
    },
    {
      name: "Machine Learning com TensorFlow",
      Inicio: "25-04-2024",
      formador: "Carla",
      tipo: "presencial",
    },
    {
      name: "Desenvolvimento Web Full Stack",
      Inicio: "30-04-2024",
      formador: "Rafael",
      tipo: "online",
    },
    {
      name: "Segurança da Informação",
      Inicio: "05-05-2024",
      formador: "Fernanda",
      tipo: "presencial",
    },
    {
      name: "Gestão de Projetos Ágeis",
      Inicio: "10-05-2024",
      formador: "Diego",
      tipo: "remoto",
    },
    {
      name: "Design Thinking",
      Inicio: "15-05-2024",
      formador: "Sofia",
      tipo: "presencial",
    },
  ];

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredFormacoes = formacoes.filter((formacao) => {
    return formacao.name.toLowerCase().includes(filter.toLowerCase());
  });

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
              <div
                id={index}
                key={index}
                className="border border-gray-300 rounded-lg flex"
              >
                <div className="w-32 h-auto">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"
                    alt="Image of a Sprout"
                    className="block object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="text-l text-gray-600 font-bold text-left">
                    <div className="mt-1">
                      <label className="font-bold text-gray-800">
                        Training:{" "}
                      </label>
                      <span className="text-gray-600">{training.name}</span>
                    </div>
                    <div className="mt-1">
                      <label className="font-bold text-gray-800">
                        Beginning:{" "}
                      </label>
                      <span className="text-gray-600">{training.Inicio}</span>
                    </div>
                    <div className="mt-1">
                      <label className="font-bold text-gray-800">
                        Teacher:{" "}
                      </label>
                      <span className="text-gray-600">{training.formador}</span>
                    </div>
                    <div className="mt-1">
                      <label className="font-bold text-gray-800">Type: </label>
                      <span className="text-gray-600">{training.tipo}</span>
                    </div>
                  </div>
                  <button className="bg-[#DFDFDF] text-[#818181] font-bold mt-2 px-2 py-1 rounded-md shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700">
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
