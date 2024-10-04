import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContractContextProvider } from "./context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContractContextProvider>
      <App />
    </ContractContextProvider>
  </StrictMode>
);
