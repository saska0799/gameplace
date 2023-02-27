import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./pages/Home/products/context/ProductsContext";
import { CartProvider } from "./pages/Cart/cart/context/CartContext";
import { ShippingProvider } from "./pages/Checkout/checkout/context/ShippingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShippingProvider>
      <CartProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </CartProvider>
    </ShippingProvider>
  </React.StrictMode>
);
