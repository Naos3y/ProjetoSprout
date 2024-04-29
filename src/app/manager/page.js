"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import Layout from "@/components/Manager/Layout";
import { sessionExpired, validSession } from "@/session/sessionUtils";
import Navbar from "@/components/Navbar";
import SessionExpired from "@/components/Session/SessionExpired";
import Footer from "@/components/Footer";
import "@fontsource/proza-libre";

export default function Manager() {
  const [control, setControl] = useState(-1);
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    let flag = true;
    let sessionStatus;
    const getSession = async () => {
      if (!flag) {
        const expired = await sessionExpired();
        if (sessionStatus === 1 && expired === 1 && !showExpired) {
          setShowExpired(true);
        }
      } else if (flag) {
        sessionStatus = await validSession(3);
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
      ) : control === 1 ? (
        <div>
          <nav>
            <Navbar activeRoute="/manager" privilege={3} />
          </nav>
          <div className="justify-center items-center mr-5 ml-5">
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
