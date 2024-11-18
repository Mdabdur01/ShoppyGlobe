import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import Error from "./components/Error.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import Cart from "./components/cartComponents/Cart.jsx";
import ProductList from "./components/productComponents/ProductList.jsx";
// import ProductDetails from "./components/productComponents/ProductDetails.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// import CheckOut from "./components/CheckOut.jsx";
// import OrderConfirmation from "./components/OrderConfirmation.jsx";
import { lazy, Suspense } from "react";

const Cart = lazy(()=> import ('./components/cartComponents/Cart.jsx'))
const ProductDetails = lazy(()=> import('./components/productComponents/ProductDetails.jsx'))
const Checkout = lazy(()=> import('./components/CheckOut.jsx'))
const OrderConfirmation = lazy(()=> import('./components/OrderConfirmation.jsx'))
const Error = lazy(()=> import('./components/Error.jsx'))

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>,
      },
      {
        path: "/productDetails/:id",
        element: <Suspense fallback={<div>Loading...</div>}><ProductDetails /></Suspense>,
      },
      {
        path: "/checkout",
        element: <Suspense fallback={<div>Loading...</div>} ><Checkout /></Suspense>,
      },
      {
        path: "/orderConfirmation",
        element: <Suspense fallback={<div>Loading...</div>} ><OrderConfirmation /></Suspense>,
      },
    ],
    errorElement: <Suspense fallback={<div>Loading...</div>} ><Error /></Suspense>,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
    </Provider>
  </StrictMode>
);
