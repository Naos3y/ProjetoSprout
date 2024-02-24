import Image from "next/image";
import LoginPanel from "@/components/LoginPanel";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  return <LoginPanel />;
}
