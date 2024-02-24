"use client";
import { useState } from "react";
import cookies from "js-cookie";

export default function Main() {
  const sessionCookie = cookies.get();
  if (sessionCookie) {
    console.log(sessionCookie);
  } else {
    console.log("Cookie não encontrado");
  }

  return (
    <div>
      <h1>Hello User</h1>
    </div>
  );
}
