import { encrypt, decrypt } from "./client/crypt";
import cookies from "js-cookie";

export async function getPermission() {
  const session = cookies.get("session");
  const decryptedSession = await decrypt(session);
  return decryptedSession.user.permission;
}

export async function validSession(p1, p2 = p1, p3 = p1) {
  const sessionCookie = cookies.get("session");
  if (sessionCookie) {
    try {
      const decryptedSession = await decrypt(sessionCookie);
      if (decryptedSession) {
        const response = await getPermission();
        if (response == p1 || response == p2 || response == p3) {
          return 1;
        } else {
          return 0;
        }
      }
    } catch (error) {
      return 0;
    }
  } else {
    return 0;
  }
}

export async function sessionExpired() {
  const sessionCookie = cookies.get("session");
  if (sessionCookie) return 0;
  return 1;
}
