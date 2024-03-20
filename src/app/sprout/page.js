"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "@/session/client/crypt";
import {
  getPermission,
  sessionExpired,
  validSession,
} from "@/session/sessionUtils";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Sprout() {
  const [control, setControl] = useState(-1);
  const [showExpired, setShowExpired] = useState(false);

  //control meaning
  // -1 Verificar a sessão
  //  0 Acesso negado
  //  1 Sessão verificada

  useEffect(() => {
    let flag = true;
    const getSession = async () => {
      if (!flag) {
        const sessionStatus = await sessionExpired();
        if (sessionStatus === 1 && !showExpired) {
          setShowExpired(true);
        }
      } else if (flag) {
        const sessionStatus = await validSession(4);
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
      <nav>
        <Navbar activeRoute="/sprout" />
      </nav>

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
      ) : control === 1 ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
            <h2 className="text-2xl text-gray-600 font-bold text-center">OK</h2>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
            <h2 className="text-2xl text-gray-600 font-bold text-center">
              Unexpected error
            </h2>
          </div>
        </div>
      )}
      {showExpired && (
        <div
          className="n fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-md shadow-md p-4 flex flex-col items-center w-full md:w-auto md:max-w-lg px-8 py-8 text-lg
        "
        >
          <p className="text-gray-700 text-center font-bold">
            Your session has expired!
          </p>

          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/">Logout </Link>
          </button>
        </div>
      )}
    </div>
  );
}
