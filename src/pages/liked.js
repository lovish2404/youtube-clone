import React from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { useNavigate } from "react-router-dom";

export const Liked = () => {
  const navigate = useNavigate();
  function redirect() {
    navigate("/");
  }
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="subModal">
        <h1>No Liked Video</h1>
      </div>
      <div className="goToHome">
        <button onClick={redirect}>Home</button>
      </div>
    </>
  );
};
