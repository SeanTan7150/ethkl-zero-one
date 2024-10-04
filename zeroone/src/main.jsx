import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContractContextProvider } from "./context";
import RootLayout from "./RootLayout";
import { HomePage } from "./pages/index.js";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContractContextProvider>
      {/* <App />
       */}
      <RouterProvider router={router} />
    </ContractContextProvider>
  </StrictMode>
);
