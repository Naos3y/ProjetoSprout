"use client";

import Link from "next/link";
import styles from "../Styles/styles.css";
import UserOptions from "./UserOptionsNavBar";

const Navbar = ({ activeRoute, privilege }) => {
  return (
    <div className="mainNav">
      {privilege === 0 || privilege === 1 || privilege === 2 ? (
        <div className="block-tabs">
          <Link href="/admin">
            <div
              className={activeRoute === "/admin" ? "tabs active-tabs" : "tabs"}
            >
              Home
            </div>
          </Link>
          <Link href="/admin/mytrainings">
            <div
              className={
                activeRoute === "/admin/mytrainings"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              My Trainigs
            </div>
          </Link>
          <Link href="/admin/myteam">
            <div
              className={
                activeRoute === "/admin/myteam" ? "tabs active-tabs" : "tabs"
              }
            >
              My Team
            </div>
          </Link>
          <Link href="/admin/adminhub">
            <div
              className={
                activeRoute === "/admin/adminhub" ? "tabs active-tabs" : "tabs"
              }
            >
              Admin Hub
            </div>
          </Link>
        </div>
      ) : privilege === 3 ? (
        <div className="block-tabs">
          <Link href="/manager">
            <div
              className={
                activeRoute === "/manager" ? "tabs active-tabs" : "tabs"
              }
            >
              Home
            </div>
          </Link>
          <Link href="/manager/mytrainings">
            <div
              className={
                activeRoute === "/manager/mytrainings"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              My Trainigs
            </div>
          </Link>
          <Link href="/manager/myteam">
            <div
              className={
                activeRoute === "/manager/myteam" ? "tabs active-tabs" : "tabs"
              }
            >
              My Team
            </div>
          </Link>
          <Link href="/manager/adminhub">
            <div
              className={
                activeRoute === "/manager/adminhub"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              Manager Hub
            </div>
          </Link>
        </div>
      ) : (
        <div className="block-tabs">
          <Link href="/sprout">
            <div
              className={
                activeRoute === "/sprout" ? "tabs active-tabs" : "tabs"
              }
            >
              Home
            </div>
          </Link>
          <Link href="/sprout/mytrainings">
            <div
              className={
                activeRoute === "/sprout/mytrainings"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              My Trainigs
            </div>
          </Link>
          <Link href="/sprout/myteam">
            <div
              className={
                activeRoute === "/sprout/myteam" ? "tabs active-tabs" : "tabs"
              }
            >
              My Team
            </div>
          </Link>
          <Link href="/sprout/adminhub">
            <div
              className={
                activeRoute === "/sprout/adminhub" ? "tabs active-tabs" : "tabs"
              }
            >
              Sprout Hub
            </div>
          </Link>
        </div>
      )}
      <UserOptions />
    </div>
  );
};

export default Navbar;
