import React, { Component, useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
export default function ProfileLayout() {
  // const profile = {
  //   uname: "Samuel",
  //   lemail: "sam@root.pt",
  //   ucity: "City",
  //   ucountry: "country",
  //   urole: "Backend Engineer",
  //   utype: "leader",
  //   uemployeenumber: "123",
  //   uphoto: "link",
  //   ustartdate: "date",
  //   useniority: "senior",
  //   groups: ["g1", "g2", "g3", "g4"],
  //   team: "Green",
  //   department: "goat",
  // };
  const [user, setUser] = useState([]);
  const [team, setTeam] = useState([]);
  const [group, setGroup] = useState([]);

  async function tryGetUserInfo() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/getuserinfo");
      url.searchParams.append("uid", decryptedSession.user.id);

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

  async function tryGetUserTeam() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/getteamdep");
      url.searchParams.append("uid", decryptedSession.user.id);

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

  async function tryGetUserGroups() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/getgroups");
      url.searchParams.append("uid", decryptedSession.user.id);

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
        const aUser = await tryGetUserInfo();
        const aTeam = await tryGetUserTeam();
        const aGroup = await tryGetUserGroups();
        setUser(aUser.message[0]);
        setTeam(aTeam.message[0]);
        const temporaryGroup = [];

        for (let i = 0; i < aGroup.message.length; i++) {
          temporaryGroup.push(aGroup.message[i]);
        }

        setGroup(temporaryGroup);
        console.log(group);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };
    updateData();
  }, []);

  return (
    <div className="border rounded mt-5 mb-5 max-w-screen">
      <div className="h-screen">
        <div className="border p-5 m-2 rounded bg-[#87B421] text-white font-bold text-xl text-center">
          My Profile
        </div>
        <span className="ml-3">
          <Link href="/profile/edit">
            <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 mr-2">
              Edit profile
            </button>
          </Link>
          <Link href="/profile/password">
            <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700">
              Edit password
            </button>
          </Link>
        </span>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-xl  font-bold text-right text-[#87B421]">
            Personal Information
          </h3>
          <div className="flex">
            <div className="w-[300px] h-[200px]">
              <div className="text-l text-gray-600 font-bold text-left bg-blue-500 w-[200px] h-[200px]">
                <span className="text-black  mt-1 ml-1">{user.photo}</span>
              </div>
            </div>
            <div className="flex-1 p-4 ">
              <div className="text-xl text-gray-600 font-bold">
                Name:
                <span className="text-black mt-1 ml-2 text-lg">
                  {user.name}
                </span>
              </div>
              <div className="text-xl text-gray-600 font-bold">
                Number:
                <span className="text-black  mt-1 ml-2 text-lg">
                  {user.number}
                </span>
              </div>
              <div className="text-xl text-gray-600 font-bold">
                Email:
                <span className="text-black  mt-1 ml-2 text-lg">
                  {user.email}
                </span>
              </div>

              <div className="text-xl text-gray-600 font-bold">
                Seniority:
                <span className="text-black  mt-1 ml-2 text-lg">
                  {user.seniority}
                </span>
              </div>

              <div className="text-xl text-gray-600 font-bold">
                Starting Date:
                <span className="text-black  mt-1 ml-2 text-lg">
                  {user.start}
                </span>
              </div>
              <div className="text-xl text-gray-600 font-bold">
                Location:
                <span className="text-black  mt-1 ml-2 text-lg">
                  {user.country} - {user.city}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-xl  font-bold text-right text-[#87B421]">Team</h3>
          <div className="text-xl text-gray-600 font-bold text-left">
            Department:
            <span className="text-black mt-1 ml-2 text-lg">
              {team.department}
            </span>
          </div>
          <div className="text-xl text-gray-600 font-bold text-left">
            Team:
            <span className="text-black mt-1 ml-2 text-lg">{team.team}</span>
          </div>
          <div className="text-xl text-gray-600 font-bold">
            Type:
            <span className="text-black  mt-1 ml-2 text-lg">{user.type}</span>
          </div>
          <div className="text-xl text-gray-600 font-bold ">
            Role:
            <span className="text-black  mt-1 ml-2 text-lg">{user.role}</span>
          </div>
        </div>
        <div className="text-left ml-2 mr-2 mb-2 border p-5 m-2 rounded">
          <h3 className="text-xl  font-bold text-right text-[#87B421]">
            Groups
          </h3>
          {group.map(function (group, index) {
            return (
              <div id={index} key={index} className="flex">
                <div className="text-xl text-gray-600 font-bold text-left">
                  Name:
                  <span className="text-black mt-1 ml-2 text-lg">
                    {group.group_name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
