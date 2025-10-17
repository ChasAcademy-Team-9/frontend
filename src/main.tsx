import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import Scan from "./routes/Scan.tsx";
import Position from "./routes/Position.tsx";
import Home from "./routes/Home.tsx";
import Recipient from "./pages/RecipientPage.tsx";
import PackageDetailsPage from "./pages/PackageDetailsPage.tsx";
import ReceiptPage from "./pages/ReceiptPage.tsx";
import DriverList from "./pages/DriverList.tsx";
import PackageList from "./pages/PackageList.tsx";
import ConfirmationRapport from "./pages/ConfirmationRapport.tsx";
import ConfirmationScanning from "./pages/ConfirmationScanning.tsx";
import Driver from "./pages/Driver.tsx";
import { Sender } from "./pages/sender/Sender.tsx";
import { New } from "./pages/sender/New.tsx";
import Photo from "./pages/Photo.tsx";
import Scanning from "./pages/Scanning.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/scan", element: <Scan /> },
  { path: "/position", element: <Position /> },
  { path: "/home", element: <Home /> },
  { path: "/driver", element: <Driver /> },
  { path: "/driver-list", element: <DriverList /> },
  { path: "/package-list", element: <PackageList /> },
  { path: "/confirmation-rapport", element: <ConfirmationRapport /> },
  { path: "/confirmation-scanning", element: <ConfirmationScanning /> },
  { path: "/scanning", element: <Scanning /> },
  { path: "/recipient", element: <Recipient /> },
  { path: "/package/:paketId", element: <PackageDetailsPage /> },
  { path: "/receipt/:paketId", element: <ReceiptPage /> },
  { path: "/sender", element: <Sender /> },
  { path: "/sender/new", element: <New /> },
  { path: "*", element: <NotFound /> },
  { path: "/photo", element: <Photo /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
