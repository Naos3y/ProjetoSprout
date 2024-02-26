import React from "react";
import LoginForm from "./LoginForm";
import { Redirect } from "next";

const LoginPanel = (props) => {
  return (
    <div className="flex justify-center items-center h-screen shadow-2xl">
      <div className="max-w-screen flex ">
        {/* Figura  */}
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.74gDxvdhJkPEH_kHkvGj8gHaFj&pid=15.1"
          alt="Image of a Sprout"
          className="hidden sm:block object-cover w-1/2 h-auto rounded-l-lg shadow-lg"
        />
        {/* Formulário */}
        <div className="w-full sm:w-1/2 h-1/2">
          <LoginForm error={props.error} />
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
