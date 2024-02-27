"use client";

import styles from "../Styles/styles.css";
import Link from "next/link";
import { useState } from "react";

const Navbar = ({ activeRoute }) => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="mainNav">
      <div className="block-tabs">
        <Link href="/admin">
          <div
            className={activeRoute === "/admin" ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(0)}
          >
            Home
          </div>
        </Link>
        <Link href="/admin/mytrainings">
          <div
            className={
              activeRoute === "/admin/mytrainings" ? "tabs active-tabs" : "tabs"
            }
            onClick={() => toggleTab(1)}
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
