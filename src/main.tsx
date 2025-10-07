import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp.tsx';
import Login from './pages/Login.tsx';
import NotFound from './pages/NotFound.tsx';
import Scan from './routes/Scan.tsx';
import Position from './routes/Position.tsx';
import Home from './routes/Home.tsx';
import ConfirmationRapport from './pages/ConfirmationRapport.tsx';
import DriverList from './components/DriverList.tsx';
import ConfirmationScanning from './pages/ConfirmationScanning.tsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/scan', element: <Scan /> },
  { path: '/position', element: <Position /> },
  { path: '/home', element: <Home /> },
  { path: '/confirmation-rapport', element: <ConfirmationRapport /> },
  { path: '/driverlist', element: <DriverList /> },
  { path: '/confirmation-scanning', element: <ConfirmationScanning /> },
  { path: '*', element: <NotFound /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
