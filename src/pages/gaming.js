import React from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { VideoList } from "../components/videolist";

export const Gaming = () => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <VideoList searchFilter="gaming"></VideoList>
    </>
  );
};
