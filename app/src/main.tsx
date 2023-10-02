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
import Editor from "./routes/editor";

// When the app is in production mode, we use the custom error boundary component:
import ErrorElement from "./components/errorElement";

// Providers:
import { ThemeProvider } from "./providers/themeProvider";

// Router:
const router = createBrowserRouter([
  {
    element: <Sidebar />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        toastOptions={{
          style: { background: "#1b1b1b", border: "1px solid #131313" },
          className: "bg-neutral-800 text-neutral-200 font-sans border-none",
          descriptionClassName: "text-neutral-400",
        }}
      />
    </ThemeProvider>
  </React.StrictMode>,
);
