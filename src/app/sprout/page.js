"use client";
import { useEffect, useState } from "react";
import { sessionExpired, validSession } from "@/session/sessionUtils";
import Navbar from "@/components/Navbar";
import SessionExpired from "@/components/Session/SessionExpired";
import Layout from "@/components/Sprout/Layout";
import Footer from "@/components/Footer";

export default function Sprout() {
  const [control, setControl] = useState(-1);
  const [showExpired, setShowExpired] = useState(false);

  //control
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
        <div>
          <h1 className="text-5xl font-black text-center text-green-700 mt-8 mb-8 font-tara">
            Incoming Trainings
          </h1>
          <div className="flex justify-center items-center h-screen mb-5">
            <Layout />
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
      {showExpired && <SessionExpired />}
      <Footer />
    </div>
  );
}
