import { SignJWT, jwtVerify } from "jose";
const key = new TextEncoder().encode("sxpxrsxcrxt");

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Date.now() + 30 * 60 * 1000)
    .sign(key);
}
