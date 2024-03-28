import React, { Component } from "react";

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

  return (
    <div className="overflow-y-auto w-flex border max-h-screen rounded">
      <div></div>
      <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
        {formacoes.map(function (training, index) {
          return (
            <div
              key={index}
              className="mb-4 border border-gray-100 p-2 rounded-lg"
            >
              <div>
                <label className="font-bold text-gray-800">Training: </label>
                <span className="text-gray-600">{training.formacao}</span>
              </div>
              <div>
                <label className="font-bold text-gray-800">Beginning: </label>
                <span className="text-gray-600">{training.Inicio}</span>
              </div>
              <div>
                <label className="font-bold text-gray-800">Teacher: </label>
                <span className="text-gray-600">{training.formador}</span>
              </div>
              <div>
                <label className="font-bold text-gray-800">Type: </label>
                <span className="text-gray-600">{training.tipo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
