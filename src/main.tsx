import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import "remixicon/fonts/remixicon.css";
// import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
