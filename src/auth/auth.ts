import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SECRETKEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Date.now() + 30 * 60 * 1000)
    .sign(key);
}

export async function decrypt(input): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function Login(email, password) {
  const id = 1;
  const permission = 4;
  const name = "Sam";

  // Falta fazer a consulta à base de dados
  const user = { id: id, name: name, email: email, permission: permission };
  const expires = new Date(Date.now() + 30 * 60 * 1000);
  const session = await encrypt({ user, expires });

  //permissions :
  // 0 -> admin root
  // 1 -> admin supreme
  // 2 -> admin light
  // 3 -> manager
  // 4 -> sprout

  cookies().set("session", session, { expires });

  return session;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 30 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
