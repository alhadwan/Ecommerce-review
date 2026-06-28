import { Header } from "../../components/Header";
import { OrderGrid } from "./OrderGrid/OrdersGrid";
import "../orders/OrdersPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const response = await axios.get("api/orders?expand=products");
      setOrders(response.data);
    };
    getOrderData();
  }, []);
  return (
    <>
      <link rel="icon" type="image/png" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders}  />
      </div>
    </>
  );
}
