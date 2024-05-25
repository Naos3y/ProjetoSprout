"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/components/Static/constants";
import { FiMenu, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiLogOut, FiUser } from "react-icons/fi";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="fixed top-4 left-4 rounded-md hover:border-green-500 focus:outline-none cursor-pointer flex items-center justify-between bg-transparent text-black z-50"
        onClick={toggleSideNav}
      >
        <FiMenu className="text-gray-500" />
      </button>{" "}
      <button className="fixed bottom-4 left-4 rounded-md hover:border-green-500 focus:outline-none cursor-pointer flex items-center justify-between bg-transparent text-black z-50">
        <FiLogOut className="text-gray-500" />
      </button>
      <button className="fixed bottom-10 left-4 rounded-md hover:border-green-500 focus:outline-none cursor-pointer flex items-center justify-between bg-transparent text-black z-50">
        <FiUser className="text-gray-500 mr-2" />
      </button>
      {isOpen ? (
        <div>
          <div
            className={`w-12 bg-gray-200 h-screen fixed top-0 left-0 z-40 transition-transform`}
          ></div>

          <div
            className={`ml-12 w-72 bg-white bg-opacity-95 h-screen fixed top-0 left-0 z-40 border-r border-zinc-200 transition-transform overflow-y-auto ${
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex mt-10 flex-col space-y-6 w-full">
              <div className="flex flex-col space-y-2 md:px-6">
                {SIDENAV_ITEMS.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-12 bg-gray-200 h-screen fixed top-0 left-0 z-40 border-r border-zinc-200 transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        ></div>
      )}
    </div>
  );
};

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span
                className={`font-semibold text-xl flex ${
                  pathname.includes(item.path) ? "text-green-500" : ""
                }`}
              >
                {item.title}
              </span>
            </div>
            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              {subMenuOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-6 flex flex-col space-y-3 pr-2">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`${
                    subItem.path === pathname ? "font-bold text-green-500" : ""
                  }`}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <span>{subItem.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          <span
            className={`font-semibold text-xl flex ${
              item.path === pathname ? "text-green-500" : ""
            }`}
          >
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default SideNav;
