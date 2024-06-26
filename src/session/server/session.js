import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "../crypt";

async function tryLogin(email, password) {
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
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function tryGetEssentials(email) {
  try {
    const url = new URL("http://localhost:3000/api/sprout/getessentials");
    url.searchParams.append("email", email);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function Login(credentials) {
  //const permission = 4;

  //perms :
  // 0 -> admin & manager & sprout
  // 1 -> admin & sprout
  // 3 -> manager & sprout
  // 4 -> sprout

  const email = credentials.get("email");
  const password = credentials.get("password");

  try {
    const response = await tryLogin(email, password);
    if (response.code == 200) {
      const essentials = await tryGetEssentials(email);
      if (essentials.code == 200) {
        const id = essentials.message[0].uid;
        const name = essentials.message[0].name;
        const permission = parseInt(essentials.message[0].permission);
        const team = parseInt(essentials.message[0].teamid);
        const first = essentials.message[0].firsttime;
        console.log(first);
        const user = {
          email: email,
          id: id,
          name: name,
          permission: permission,
          team: team,
          first: first,
        };

        const expires = new Date(Date.now() + 30 * 60 * 1000);
        const session = await encrypt({ user, expires });
        cookies().set("session", session, { expires });
        return session;
      } else {
        const expires = new Date(Date.now() + 1 * 1000);
        cookies().set("error", "Invalid Credentials", { expires });
        return null;
      }
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

export async function getError() {
  const error = cookies().get("error")?.value;
  if (!error) return null;
  return true;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
