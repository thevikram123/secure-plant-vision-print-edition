import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { PresentationApp } from "./PresentationApp";

const root = document.getElementById("root");

if (!root) throw new Error("Presentation root element is missing.");

createRoot(root).render(
  <StrictMode>
    <PresentationApp />
  </StrictMode>,
);
