import React from "react";
import LoginForm from "./LoginForm";

const LoginPanel = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen flex">
        {/* Figura  */}
        <img
          src="https://img.freepik.com/free-photo/new-life-sprouts-from-seedling-dirt-generative-ai_188544-31816.jpg"
          alt="Image of a Sprout"
          className="hidden sm:block object-cover w-1/2 h-auto"
        />
        {/* Formulário */}
        <div className="w-full sm:w-1/2 h-1/2">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
