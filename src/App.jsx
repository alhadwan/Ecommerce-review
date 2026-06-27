import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // using useCallback to memoize/stores the loadCart function, 
  // so it dose not create a new function on every render. 
  // This helps prevent unnecessary re-renders of components 
  // that depend on this function.
  const loadCart = useCallback(async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  }, []);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage cart={cart} />} />
        {/* since path="/" has nothing in it we can use index */}
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="/orders" element={<OrdersPage cart={cart} />} />
        <Route
          path="/tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
      </Routes>
    </>
  );
}

export default App;
