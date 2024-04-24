import React, { Component, useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import cookies from "js-cookie";
import { decrypt } from "@/session/crypt";
import { SlPeople } from "react-icons/sl";
import { RiTeamFill } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa";

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

      const url = new URL("http://localhost:3000/api/sprout/getuserinfo");
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

      const url = new URL("http://localhost:3000/api/sprout/getteamdep");
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

      const url = new URL("http://localhost:3000/api/sprout/getgroups");
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
    <div className="mt-5 mb-5 max-w-screen max-h-screen">
      <Toaster richColors position="bottom-center" />
      <div className="h-screen ">
        <div className="max-w-screen mx-auto p-5">
          <div className="flex justify-between items-center mb-8 rounded-s py-5 bg-gray-100">
            <h1 className="text-3xl font-bold ml-10">Profile</h1>

            <div className="space-x-4 mr-10">
              <Link href="/profile/edit">
                <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 mr-2">
                  Edit Profile
                </button>
              </Link>
              <Link href="/profile/password">
                <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 mr-2">
                  Change Password
                </button>
              </Link>
            </div>
          </div>

          <div className="mb-8 p-5 bg-gray-100 rounded-s">
            <span className="flex ">
              <SlPeople className="mt-1 mr-4 ml-2" />
              <h2 className="text-xl font-bold">Personal Information</h2>
            </span>

            <hr className="mb-5" />
            <div className="grid grid-cols-2 gap-4 ml-10">
              <div className="col-span-2">
                <p className="font-semibold">Photo:</p>
                <div className="h-40 w-40 bg-gray-200 rounded-md flex justify-center items-center">
                  <img
                    className="h-full w-full object-cover rounded-md"
                    src={user.photo}
                    alt="User Photo"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Name:</p>
                <p>{user.name}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Number:</p>
                <p>{user.number}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Email:</p>
                <p>{user.email}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Seniority:</p>
                <p>{user.seniority}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Starting Date:</p>
                <p>{user.start}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Location:</p>
                <p>
                  {user.country} - {user.city}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 p-5 bg-gray-100 rounded-s">
            <span className="flex ">
              <RiTeamFill className="mt-1 mr-4 ml-2" />
              <h2 className="text-xl font-bold">My Team</h2>
            </span>
            <hr className="mb-5" />
            <div className="grid grid-cols-2 gap-4 ml-10">
              <div className="col-span-1">
                <p className="font-semibold">Department:</p>
                <p>{team.department}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Team:</p>
                <p>{team.team}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Type:</p>
                <p>{user.type}</p>
              </div>
              <div className="col-span-1">
                <p className="font-semibold">Role:</p>
                <p>{user.role}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 p-5 bg-gray-100 rounded-s">
            <span className="flex ">
              <FaLayerGroup className="mt-1 mr-4 ml-2" />
              <h2 className="text-xl font-bold">Groups</h2>
            </span>
            <hr className="mb-5" />

            <div className="space-y-4 ml-10">
              {group.map((group, index) => (
                <div key={index}>
                  <p className="font-semibold">Name:</p>
                  <p>{group.group_name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
