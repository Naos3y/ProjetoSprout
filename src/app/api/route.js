import { NextResponse } from "next/server";

export async function GET() {
<<<<<<< HEAD
  return NextResponse.json({
<<<<<<< HEAD
    user: 1,
=======
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
>>>>>>> origin/Samuel
  });
}
=======

  return NextResponse.json({
    hello:1,
  });
}
>>>>>>> origin/Rodrigo
