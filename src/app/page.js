import LoginPanel from "@/components/LoginPanel";
import { getSession } from "@/auth/auth";

export default async function Home() {
  const session = await getSession();

  if (!session) return <LoginPanel />;
  else {
    return (
      <div>
        <al>you're being redirected to your main page 🌱</al>
        <meta http-equiv="refresh" content="0; url=main" />
      </div>
    );
  }
}
