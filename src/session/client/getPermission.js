import { encrypt, decrypt } from "./crypt";
import cookies from "js-cookie";

export async function getPermission() {
  const session = cookies.get("session");
  const decryptedSession = await decrypt(session);
  return decryptedSession.user.permission;
}
