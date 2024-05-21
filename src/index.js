import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Routing from "./components/Routing";
import Navigation from "./components/nav/nav";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Navigation />
    <Routing />
  </React.StrictMode>
);

reportWebVitals();
