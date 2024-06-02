import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context";
import { App } from "./app";
import "./index.css";
const root = createRoot(document.getElementById("root"));

root.render(
  <>
    <AppProvider>
      <App></App>
    </AppProvider>
  </>
);
