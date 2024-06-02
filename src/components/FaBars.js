import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../context";
export const Bars = ({ prop }) => {
  const { sidebarOpen, setSidebarOpen } = useGlobalContext();
  return (
    <button
      className={`${sidebarOpen ? `${prop} change` : prop}`}
      onClick={() => {
        setSidebarOpen(!sidebarOpen);
      }}
    >
      <FaBars
        className={`${sidebarOpen ? "sidebar-icon change" : "sidebar-icon"}`}
      ></FaBars>
    </button>
  );
};
