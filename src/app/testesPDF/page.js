// pages/testesPDF.js
"use client";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import CertificatePDF from "@/components/CertificatePDF";
import "tailwindcss/tailwind.css";

const TestesPDF = () => {
  const userName = "Samuel Martins";
  const trainingName = "Java Basics";
  const date = "01/06/2024";
  const trainers = "Bruno Lopes";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PDFViewer width="100%" height="600">
        <CertificatePDF
          userName={userName}
          trainingName={trainingName}
          date={date}
          trainers={trainers}
        />
      </PDFViewer>
    </div>
  );
};

export default TestesPDF;
