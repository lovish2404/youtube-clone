import React from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";

export const Subscribed = () => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <h1>No subscriptions</h1>
    </>
  );
};
