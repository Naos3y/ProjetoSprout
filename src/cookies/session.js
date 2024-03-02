import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./cookie";

async function fazerLogin(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}

export async function Login(credentials) {
  const permission = 4;
  //permissions :
  // 0 -> admin root
  // 1 -> admin supreme
  // 2 -> admin light
  // 3 -> manager
  // 4 -> sprout
  const email = credentials.get("email");
  const password = credentials.get("password");

  try {
    const response = await fazerLogin(email, password);
    if (response.code == 200) {
      const user = { email: email, permission: permission };
      const expires = new Date(Date.now() + 30 * 60 * 1000);
      const session = await encrypt({ user, expires });
      cookies().set("session", session, { expires });
      return session;
    } else {
      const expires = new Date(Date.now() + 1 * 1000);
      cookies().set("error", "Invalid Credentials", { expires });
      return null;
    }
  } catch (error) {}

  const expires = new Date(Date.now() + 1 * 1000);
  cookies().set("error", "Invalid Credentials", { expires });
  return null;
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const decryptedSession = await decrypt(session);
  decryptedSession.expires = new Date(Date.now() + 30 * 60 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(decryptedSession),
    expires: decryptedSession.expires,
  });

  return res;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getError() {
  const error = cookies().get("error")?.value;
  if (!error) return null;
  return true;
}
