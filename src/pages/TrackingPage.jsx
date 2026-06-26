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
                Arriving on{" "}
                {dayjs(selectSingleProduct.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="product-info">
                {selectSingleProduct.product.name}
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>

              <div className="product-info">
                Quantity: {selectSingleProduct.quantity}
              </div>

              <img
                className="product-image"
                src={selectSingleProduct.product.image}
              />

              <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div className="progress-bar"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
