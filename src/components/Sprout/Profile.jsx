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
  const [hours, setHours] = useState([]);

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

  async function tryGetUserHours() {
    try {
      const token = cookies.get("session");
      const decryptedSession = await decrypt(token);

      const url = new URL("http://localhost:3000/api/sprout/gethours");
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
        const hours = await tryGetUserHours();
        console.log(hours.message);
        setHours(hours.message);
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
    <div className="mt-5 mb-5 max-w-screen">
      <Toaster richColors position="bottom-center h-screen" />
      <div className="max-w-screen mx-auto p-5">
        <div className="flex justify-between items-center mb-8 rounded-s py-5 bg-gray-100">
          <h1 className="text-3xl font-bold ml-10 text-green-500">Profile</h1>

          <div className="space-x-4 mr-10">
            {/* <Link href="/profile/edit">
              <button className="bg-[#DFDFDF] text-[#818181] font-bold px-2 py-1 rounded shadow-sm hover:bg-green-500 hover:text-white active:bg-green-700 mr-2">
                Edit Profile
              </button>
            </Link> */}
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
            <h2 className="text-xl font-bold text-black">
              Personal Information
            </h2>
          </span>

          <hr className="mb-5" />
          <div className="grid grid-cols-2 gap-4 ml-10">
            <div className="col-span-2">
              <div className="h-40 w-40 bg-gray-200 rounded-md flex justify-center items-center">
                <img
                  className="h-full w-full object-cover rounded-md"
                  src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt="User Photo"
                />
              </div>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Name:</p>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Number:</p>
              <p className="text-gray-700">{user.number}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Email:</p>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Seniority:</p>
              <p className="text-gray-700">{user.seniority}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Starting Date:</p>
              <p className="text-gray-700">{user.start}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Formation time:</p>
              <p className="text-gray-700">{hours} hours</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Location:</p>
              <p className="text-gray-700">
                {user.country} - {user.city}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-5 bg-gray-100 rounded-s">
          <span className="flex ">
            <RiTeamFill className="mt-1 mr-4 ml-2" />
            <h2 className="text-xl font-bold text-black">My Team</h2>
          </span>
          <hr className="mb-5" />
          <div className="grid grid-cols-2 gap-4 ml-10">
            <div className="col-span-1">
              <p className="font-semibold text-black">Department:</p>
              <p className="text-gray-700">{team.department}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Team:</p>
              <p className="text-gray-700">{team.team}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Type:</p>
              <p className="text-gray-700">{user.type}</p>
            </div>
            <div className="col-span-1">
              <p className="font-semibold text-black">Role:</p>
              <p className="text-gray-700">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-5 bg-gray-100 rounded-s">
          <span className="flex ">
            <FaLayerGroup className="mt-1 mr-4 ml-2" />
            <h2 className="text-xl font-bold text-black">Groups</h2>
          </span>
          <hr className="mb-5" />

          <div className="space-y-4 ml-10">
            {group.map((group, index) => (
              <div key={index}>
                <p className="font-semibold text-black">Name:</p>
                <p className="text-gray-700">{group.group_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
