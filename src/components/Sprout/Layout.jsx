import React, { Component, useState } from "react";
import Link from "next/link";

export default function Layout() {
  const getTrainings = () => {
    // pedido da api
    // o body do pedido da api deve conter todas as formações a que essa pessoas está associada (já definido no ER)
    // o dicionario deve estar corretamente formatado -> ainda a decidir como o cliente quer que sejam apresentadas
    // -------------
    //
  };

  const formacoes = [
    {
      formacao: "JavaScript Básico",
      Inicio: "01-04-2024",
      formador: "Ana",
      tipo: "presencial",
    },
    {
      formacao: "HTML e CSS Avançado",
      Inicio: "05-04-2024",
      formador: "Pedro",
      tipo: "remoto",
    },
    {
      formacao: "Introdução ao Node.js",
      Inicio: "10-04-2024",
      formador: "Mariana",
      tipo: "presencial",
    },
    {
      formacao: "React Native para Iniciantes",
      Inicio: "15-04-2024",
      formador: "João",
      tipo: "online",
    },
    {
      formacao: "Python para Ciência de Dados",
      Inicio: "20-04-2024",
      formador: "Lucas",
      tipo: "remoto",
    },
    {
      formacao: "Machine Learning com TensorFlow",
      Inicio: "25-04-2024",
      formador: "Carla",
      tipo: "presencial",
    },
    {
      formacao: "Desenvolvimento Web Full Stack",
      Inicio: "30-04-2024",
      formador: "Rafael",
      tipo: "online",
    },
    {
      formacao: "Segurança da Informação",
      Inicio: "05-05-2024",
      formador: "Fernanda",
      tipo: "presencial",
    },
    {
      formacao: "Gestão de Projetos Ágeis",
      Inicio: "10-05-2024",
      formador: "Diego",
      tipo: "remoto",
    },
    {
      formacao: "Design Thinking",
      Inicio: "15-05-2024",
      formador: "Sofia",
      tipo: "presencial",
    },
    {
      formacao: "JavaScript Básico",
      Inicio: "01-04-2024",
      formador: "Ana",
      tipo: "presencial",
    },
    {
      formacao: "HTML e CSS Avançado",
      Inicio: "05-04-2024",
      formador: "Pedro",
      tipo: "remoto",
    },
    {
      formacao: "Introdução ao Node.js",
      Inicio: "10-04-2024",
      formador: "Mariana",
      tipo: "presencial",
    },
    {
      formacao: "React Native para Iniciantes",
      Inicio: "15-04-2024",
      formador: "João",
      tipo: "online",
    },
    {
      formacao: "Python para Ciência de Dados",
      Inicio: "20-04-2024",
      formador: "Lucas",
      tipo: "remoto",
    },
    {
      formacao: "Machine Learning com TensorFlow",
      Inicio: "25-04-2024",
      formador: "Carla",
      tipo: "presencial",
    },
    {
      formacao: "Desenvolvimento Web Full Stack",
      Inicio: "30-04-2024",
      formador: "Rafael",
      tipo: "online",
    },
    {
      formacao: "Segurança da Informação",
      Inicio: "05-05-2024",
      formador: "Fernanda",
      tipo: "presencial",
    },
    {
      formacao: "Gestão de Projetos Ágeis",
      Inicio: "10-05-2024",
      formador: "Diego",
      tipo: "remoto",
    },
    {
      formacao: "Design Thinking",
      Inicio: "15-05-2024",
      formador: "Sofia",
      tipo: "presencial",
    },
  ];

  //           src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"

  return (
    <div className="overflow-y-auto border max-h-screen max-w-screen rounded">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-6">
        {formacoes.map(function (training, index) {
          return (
            <div
              id={index}
              key={index}
              className="border border-black rounded-lg flex"
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
                    <span className="text-gray-600">{training.formacao}</span>
                  </div>
                  <div className="mt-1">
                    <label className="font-bold text-gray-800">
                      Beginning:{" "}
                    </label>
                    <span className="text-gray-600">{training.Inicio}</span>
                  </div>
                  <div className="mt-1">
                    <label className="font-bold text-gray-800">Teacher: </label>
                    <span className="text-gray-600">{training.formador}</span>
                  </div>
                  <div className="mt-1">
                    <label className="font-bold text-gray-800">Type: </label>
                    <span className="text-gray-600">{training.tipo}</span>
                  </div>
                </div>
                <button className="mt-4 text-white font-bold bg-green-500 p-1 rounded hover:bg-green-300 hover:text-black">
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
