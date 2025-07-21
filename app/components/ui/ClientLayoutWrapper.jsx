"use client";
import { Toaster } from "react-hot-toast";

export default function ClientLayoutWrapper({ children }) {
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}