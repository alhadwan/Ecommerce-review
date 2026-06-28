import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummery } from "./OrderSummary/OrderSummery";
import { PaymentSummary } from "./PaymentSummary";

import { useEffect, useState } from "react";

import axios from "axios";

import "./CheckoutPage.css";
import "./CheckoutHeader.css";

export function CheckoutPage({
  cart,
  loadCart,
  paymentSummary,
  setPaymentSummary,
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const getDeliverySummaryData = async () => {
      const deliveryResponse = await axios.get(
        "api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(deliveryResponse.data);

      const paymentResponse = await axios.get("api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    };
    getDeliverySummaryData();
  }, [setPaymentSummary]);
  return (
    <>
      <link rel="icon" type="image/png" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummery
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
