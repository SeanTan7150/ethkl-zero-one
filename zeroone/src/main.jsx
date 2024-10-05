import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
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
  LandingPage,
  TestPage,
} from "./pages/index.js";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrum, mainnet } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;

// 2. Set the networks
const networks = [arbitrum, mainnet];

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  projectId,
  // features: {
  //   analytics: true, // Optional - defaults to your Cloud configuration
  // },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/landing-page" replace />,
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
      {
        path: "/landing-page",
        element: <LandingPage />,
      },
      { path: "/test", element: <TestPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ContractContextProvider>
    {/* <App />
     */}
    <RouterProvider router={router} />
  </ContractContextProvider>
);
