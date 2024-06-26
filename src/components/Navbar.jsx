"use client";

import Link from "next/link";
import styles from "../Styles/styles.css";
import UserOptions from "./Static/UserOptionsNavBar";

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
          <Link href="/admin/adminhub/trainings/add">
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
              My Team
            </div>
          </Link>
          <Link href="/manager/TrainingRequests">
            <div
              className={
                activeRoute === "/manager/TrainingRequests"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              Training Requests
            </div>
          </Link>
          <Link href="/manager/AddToTraining">
            <div
              className={
                activeRoute === "/manager/AddToTraining"
                  ? "tabs active-tabs"
                  : "tabs"
              }
            >
              Invite to Training
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
              Catalog
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
          <Link href="/sprout/calendar">
            <div
              className={
                activeRoute === "/sprout/calendar" ? "tabs active-tabs" : "tabs"
              }
            >
              Calendar
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
        </div>
      )}
      <UserOptions active={(activeRoute = "/profile" ? 1 : 0)} />
    </div>
  );
};

export default Navbar;
