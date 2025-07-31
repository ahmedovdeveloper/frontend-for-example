import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "../src/index.css";
import App from "./App";
import Catalog from "./componentns/Catalog";
import Basket from "./componentns/Basket";
import ProductView from "./componentns/ProductView";
import ProductCreate from "./componentns/ProductCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
     path: '/product/create',
     element: <ProductCreate />,
  },
  {
    path: "/catalog",
    element: <Catalog/>
  },
  {
    path: "/cart", 
    element:<Basket/>
  },
  {
        path: '/product/:id',
        element: <ProductView />,
      },
      
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// changeds 
