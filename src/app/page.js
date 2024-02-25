import LoginPanel from "@/components/LoginPanel";
import { getSession } from "@/auth/session";
export default async function Home() {
  const session = await getSession();

  if (!session) return <LoginPanel />;
  else {
    return <meta http-equiv="refresh" content="0; url=main" />;
  }
}
