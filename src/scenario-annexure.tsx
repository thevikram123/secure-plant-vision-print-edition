import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { ScenarioAnnexure } from "./ScenarioAnnexure";

const root = document.getElementById("root");
if (!root) throw new Error("Scenario annexure root element is missing.");

createRoot(root).render(
  <StrictMode>
    <ScenarioAnnexure />
  </StrictMode>,
);
