import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./cookie";
const secretKey = "toni";
const key = new TextEncoder().encode(secretKey);

export async function Login(email, password) {
  const id = 1;
  const permission = 4;
  const name = "Sam";
  // Falta fazer a consulta à base de dados

  //permissions :
  // 0 -> admin root
  // 1 -> admin supreme
  // 2 -> admin light
  // 3 -> manager
  // 4 -> sprout

  const user = { id: id, name: name, email: email, permission: permission };
  const expires = new Date(Date.now() + 30 * 60 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires });

  return session;
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
