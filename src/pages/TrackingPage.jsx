import { Header } from "../components/Header";
import dayjs from "dayjs";
import "./TrackingPage.css";
import "../components/Header";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  const [singleOrder, setSingleOrder] = useState(null);

  // console.log("singleOrder", singleOrder);

  useEffect(() => {
    const getSingleOrder = async () => {
      const response = await axios.get(`api/orders/${orderId}?expand=products`);
      setSingleOrder(response.data);
    };
    getSingleOrder();
  }, [orderId]);

  const selectSingleProduct = singleOrder?.products.find((product) => {
    return product.productId === productId;
  });
  // console.log("selectSingleProduct", selectSingleProduct);

  // gets the total time required for delivery
  const totalDeliveryTime =
    selectSingleProduct?.estimatedDeliveryTimeMs - singleOrder?.orderTimeMs;
  // console.log("totalDeliveryTime", totalDeliveryTime);

  // calculate the amount of time that has passed since creating the order
  // const timePassedMs = totalDeliveryTime * 0.3;
  const timePassedMs = dayjs().valueOf() - singleOrder?.orderTimeMs; // what is the output of dayjs().valueOf()? -
  // console.log("timePassedMs", timePassedMs);

  //delivery progress as a percent
  const deliveryPercent = (timePassedMs / totalDeliveryTime) * 100;
  // console.log("deliveryPercent", deliveryPercent);

  //preparing
  const isPreparing = deliveryPercent < 33;

  //Shipping
  const isShipping = deliveryPercent >= 33 && deliveryPercent < 100;

  // delivered
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <link rel="icon" type="image/png" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
          {singleOrder && (
            <>
              <div className="delivery-date">
                {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
                {dayjs(selectSingleProduct.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="product-info">
                {selectSingleProduct.product.name}
              </div>

              <div className="product-info">
                Quantity: {selectSingleProduct.quantity}
              </div>

              <img
                className="product-image"
                src={selectSingleProduct.product.image}
              />

              <div className="progress-labels-container">
                <div className={`progress-label ${isPreparing}`}>Preparing</div>
                <div
                  className={`progress-label ${isShipping && "current-status"}`}
                >
                  Shipped
                </div>
                <div className={`progress-label ${isDelivered}`}>Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${deliveryPercent}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
