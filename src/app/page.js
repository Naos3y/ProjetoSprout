import LoginPanel from "../components/Login/LoginPanel";
import { getSession } from "../session/server/session";
import { getError } from "../session/server/session";
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
