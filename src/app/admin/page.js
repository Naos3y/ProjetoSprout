<<<<<<< HEAD
import React from "react";

const admin = () => {
  return (
    <div>
      <div>Admin home page - Colocar aqui tudo o que está na home do admin</div>
    </div>
  );
};

export default admin;
=======
"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "@/session/sessionUtils";

export default function Sprout() {
  const [control, setControl] = useState(-1);

  useEffect(() => {
    let flag = true;
    const getSession = async () => {
      if (!flag) {
        const sessionStatus = await sessionExpired();
        setControl(sessionStatus);
      } else if (flag) {
        const sessionStatus = await validSession(0, 1, 3, 4);
        setControl(sessionStatus);
        flag = !flag;
      }
    };
    getSession();
    const intervalId = setInterval(getSession, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
            <h2 className="text-2xl text-gray-600 font-bold text-center">OK</h2>
          </div>
        </div>
      )}
    </div>
  );
}
>>>>>>> origin/Samuel
