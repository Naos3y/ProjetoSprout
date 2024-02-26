import LoginPanel from "@/components/LoginPanel";
import { getSession, getError } from "@/auth/session";
import { destroyCookie } from "nookies";

export default async function Home() {
  const session = await getSession();
  const error = await getError();

  if (!error) {
    if (!session) return <LoginPanel error={false} />;
    else {
      return <meta http-equiv="refresh" content="0; url=main" />;
    }
  } else {
    return <LoginPanel error={true} />;
  }
}
