import LoginPanel from "../components/LoginPanel";
import { getSession, getError } from "../cookies/session";

export default async function Home() {
  const session = await getSession();
  const error = await getError();

  if (!error) {
    if (!session) return <LoginPanel error={false} />;
    else {
      return <meta http-equiv="refresh" content="0; url=validation" />;
    }
  } else {
    return <LoginPanel error={true} />;
  }
}
