import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./auth/session";

export async function middleware(request) {
  return await updateSession(request);
}
