import { NextRequest } from "next/server";
import { updateSession } from "@/auth/auth";

export async function middleware(request) {
  return await updateSession(request);
}
