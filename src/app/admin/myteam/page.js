import React from "react";
import Navbar from "@/components/Navbar";
import "tailwindcss/tailwind.css";

const Myteam = () => {
  return (
    <div>
      <Navbar activeRoute="/admin/myteam" />
      <div>Página da my team</div>
    </div>
  );
};

export default Myteam;
