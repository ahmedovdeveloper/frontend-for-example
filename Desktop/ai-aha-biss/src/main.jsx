import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AhaAiUltimate from "./components/AiChat";
import Login from "./components/Login";
import PrivateRoute from "./components/Route/PrivateRoute"; // <-- Добавь

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <AhaAiUltimate />
      </PrivateRoute>
    )
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);