"use client";

import styles from "../Styles/styles.css";
import Link from "next/link";

const Navbar = ({ activeRoute }) => {
  return (
    <div className="mainNav">
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
              activeRoute === "/admin/mytrainings" ? "tabs active-tabs" : "tabs"
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
    </div>
  );
};

export default Navbar;
