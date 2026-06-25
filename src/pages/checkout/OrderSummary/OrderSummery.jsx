import { CartItemGrid } from "./CartItemGrid";

import dayjs from "dayjs";

export function OrderSummery({ deliveryOptions, cart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return cartItem.deliveryOptionId === deliveryOption.id;
            },
          );

          return (
            <div key={cartItem.id} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <CartItemGrid
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
            </div>
          );
        })}
    </div>
  );
}
