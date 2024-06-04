import React from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { redirect, useNavigate } from "react-router-dom";

export const Subscribed = () => {
  const navigate = useNavigate();
  function redirect() {
    navigate("/");
  }
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="subModal">
        <h1>No subscriptions</h1>
      </div>
      <div className="goToHome">
        <button onClick={redirect}>Home</button>
      </div>
    </>
  );
};
