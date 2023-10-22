import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// App styles:
import "@/styles/globals.css";
import "@typethings/ui/dist/index.css";

// Global Imports:
import Sidebar from "./components/sidebar";

// Routes:
import App from "./routes";
import Settings from "./routes/settings";
import Editor from "./routes/editor";

// When the app is in production mode, we use the custom error boundary component:
import ErrorElement from "./components/errorElement";

// Providers:
import { ThemeProvider } from "./providers/themeProvider";
import Providers from "./components/providers";

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
      <Providers />
    </ThemeProvider>
  </React.StrictMode>,
);
