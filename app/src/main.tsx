import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styles:
import "@/styles/globals.css";

// Global Imports:
import Sidebar from "./components/sidebar";
import { Toaster } from "sonner";

// Routes:
import App from "./routes";

// Router:
const router = createBrowserRouter([
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
