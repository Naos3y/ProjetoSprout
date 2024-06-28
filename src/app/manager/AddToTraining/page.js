"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "src/session/crypt";
import Layout from "src/components/Manager/Layout";
import { sessionExpired, validSession } from "src/session/sessionUtils";
import Navbar from "src/components/Navbar";
import SessionExpired from "src/components/Session/SessionExpired";
import Footer from "src/components/Footer";
import TeamLayout from "src/components/Sprout/Team";
import SideNav from "src/components/Static/sidenav";
import cookies from "js-cookie";
import { decrypt } from "src/session/crypt";
import "tailwindcss/tailwind.css";

export default function Manager() {
  const [control, setControl] = useState(-1);
  const [showExpired, setShowExpired] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState(0);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let flag = true;
    let sessionStatus;
    const getSession = async () => {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);
      const auxPermission = decryptedSession.user.permission;
      setPermission(auxPermission);
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
        <div className="relative flex">
          <SideNav
            isOpen={isOpen}
            toggleSideNav={toggleSideNav}
            perm={permission}
          />
          <div className="flex-1">
            <main className="ml-14">
              <Layout condition={false} />
            </main>
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
