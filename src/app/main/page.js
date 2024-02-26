"use client";
import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { decrypt } from "@/auth/cookie";
import Link from "next/link";

export default function Main() {
  const [linkComponent, setLinkComponent] = useState(null);
  const [username, setUsername] = useState(null);
  const [control, setControl] = useState(-1);

  useEffect(() => {
    const getSession = async () => {
      const sessionCookie = cookies.get("session");
      if (sessionCookie) {
        try {
          const decryptedSession = await decrypt(sessionCookie);
          setUsername(decryptedSession.user.name);
          console.log(decryptedSession);

          console.log(username);
          let link;
          switch (decryptedSession.user.permission) {
            case 0:
            case 1:
            case 2:
              link = <Link href="/admin">Continue to Home Page</Link>;
              setControl(1);

              break;
            case 3:
              link = <Link href="/manager">Continue to Home Page</Link>;
              setControl(1);

              break;
            case 4:
              link = <Link href="/sprout">Continue to Home Page</Link>;
              setControl(1);

              break;
          }
          setLinkComponent(link);
        } catch (error) {
          setControl(0);
          cookies.remove("nomeDoCookie");
          setLinkComponent(<Link href="/">Retry</Link>);
        }
      } else {
        console.log("Cookie não encontrado");
        setControl(0);
        setLinkComponent(<Link href="/">Retry</Link>);
      }
    };
    getSession();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg bg-white p-6 shadow-md w-full md:w-96">
        <h2 className="text-2xl text-gray-600 font-bold mb-4 text-center">
          {control === -1
            ? "Loading"
            : control === 1
            ? `Welcome ${username}`
            : "An unexpected error has occurred !"}
        </h2>
        <div className="max-w-screen">
          {linkComponent && (
            <Link
              href={linkComponent.props.href}
              className="block w-full bg-green-700 text-white font-bold py-2 px-4 rounded-md hover:bg-green-400 hover:text-black transition-colors duration-300 text-center"
            >
              {linkComponent.props.children}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
