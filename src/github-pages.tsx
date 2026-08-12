import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PrintApp } from "./PrintApp";

const root = document.getElementById("root");

if (!root) throw new Error("GitHub Pages root element is missing.");

createRoot(root).render(
  <StrictMode>
    <PrintApp />
  </StrictMode>,
);
