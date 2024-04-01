import React, { Component, useState } from "react";

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
  ];

  //           src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"

  return (
    <div className="overflow-y-auto w-flex border max-h-screen mas-w-screen rounded">
      <div></div>
      <div className="rounded-lg bg-white p-6 shadow-md w-full h-full">
        {formacoes.map(function (training, index) {
          return (
            <span
              id={index}
              className="mb-4 border border-black p-2 rounded-lg flex"
            >
              <div>
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"
                  alt="Image of a Sprout"
                  className="hidden sm:block object-cover w-1/2 h-auto rounded-l-lg"
                />
              </div>
              <div className="text-l text-gray-600 font-bold text-left mt-6">
                <div className="mt-1">
                  <label className="font-bold text-gray-800">Training: </label>
                  <span className="text-gray-600">{training.formacao}</span>
                </div>
                <div className="mt-1">
                  <label className="font-bold text-gray-800">Beginning: </label>
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
            </span>
          );
        })}
      </div>
    </div>
  );
}
