import React from "react";
import { useGlobalContext } from "../context";

export const Loading = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return <div className="loader"></div>;
  }
  return;
};
