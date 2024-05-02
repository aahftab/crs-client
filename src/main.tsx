import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/Complaint.tsx";
import About from "./pages/About.tsx";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "./pages/loginPage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/complaint",
        element: <ComplaintForm />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/loginPage",
    element: <LoginPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
