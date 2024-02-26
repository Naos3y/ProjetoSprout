"use client";

import styles from "../Styles/styles.css";

import { useState } from "react";

const Navbar = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="mainNav">
      <div className="block-tabs">
        <div
          className={toggleState === 0 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(0)}
        >
          Home
        </div>
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          My Trainigs
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          My Team
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Admin Hub
        </div>
      </div>
    </div>
  );
};

export default Navbar;
