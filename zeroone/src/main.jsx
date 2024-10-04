import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContractContextProvider } from "./context";
import RootLayout from "./RootLayout";
import {
  HomePage,
  CreditPage,
  ProfilePage,
  ChatPage,
  StorePage,
} from "./pages/index.js";

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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/credit",
        element: <CreditPage />,
      },
      {
        path: "/store",
        element: <StorePage />,
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
