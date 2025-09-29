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
import { Sender } from "./pages/sender/Sender.tsx";
import { New } from "./pages/sender/New.tsx";
import DriverList from "./components/DriverList.tsx";
import Driver from "./routes/Driver.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/scan", element: <Scan /> },
  { path: "/position", element: <Position /> },
  { path: "/home", element: <Home /> },
  { path: "/driverlist", element: <DriverList /> },
  { path: "/driver", element: <Driver /> },
  { path: "/sender", element: <Sender /> },
  { path: "/sender/new", element: <New /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
