import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./session/server/session";

export async function middleware(request) {
  return await updateSession(request);
}
