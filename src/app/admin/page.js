"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "@/session/client/crypt";

export default function Sprout() {
  const [control, setControl] = useState(-1);

  useEffect(() => {
    const getSession = async () => {
      const sessionCookie = cookies.get("session");

      if (sessionCookie) {
        try {
          const decryptedSession = await decrypt(sessionCookie);
          if (decryptedSession) {
            const perm = await getPermission();
            if (perm == 0 || perm == 1 || perm == 2) {
              setControl(1);
            } else {
              setControl(0);
            }
          }
        } catch (error) {
          setControl(0);
        }
      } else {
        setControl(0);
      }
    };
    getSession();
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
