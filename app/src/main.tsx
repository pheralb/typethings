import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// App styles:
import "@/styles/globals.css";

// Global Imports:
import Sidebar from "./components/sidebar";
import { Toaster } from "sonner";

// Routes:
import App from "./routes";
import Settings from "./routes/settings";

// Router:
const router = createBrowserRouter([
  {
    element: <Sidebar />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/settings",
        element: <Settings />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
