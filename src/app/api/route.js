import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    code: 200,
    message: "GET is working :)",
  });
}

export async function POST() {
  return NextResponse.json({
    code: 200,
    message: "POST is working :)",
  });
}

export async function PATCH() {
  return NextResponse.json({
    code: 200,
    message: "PATCH is working :)",
  });
}

export async function DELETE() {
  return NextResponse.json({
    code: 200,
    message: "DELETE is working :)",
  });
}
