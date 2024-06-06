"use client";
import { useEffect, useState } from "react";
import "@fontsource/proza-libre"; // Defaults to weight 400
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";

export default function Test() {
  async function tryGetTrainingData() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/gettrainingsdata");
      //url.searchParams.append("uid", decryptedSession.user.id);
      url.searchParams.append("uid", 12);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function tryGetUserRuid() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/getruid");
      //url.searchParams.append("uid", decryptedSession.user.id);
      url.searchParams.append("uid", 12);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const updateData = async () => {
      try {
        const data = await tryGetTrainingData();
        const ruid = await tryGetUserRuid();
        console.log(ruid);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    updateData();
  }, []);

  return <div></div>;
}
