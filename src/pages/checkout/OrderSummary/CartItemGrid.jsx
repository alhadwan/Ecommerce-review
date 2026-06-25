import { CartItemDetails } from "./CartItemDetails";
import { DeliveryOptions } from "./DeliveryOptions";

export function CartItemGrid({ cartItem, deliveryOptions }) {
  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <CartItemDetails cartItem={cartItem} />

      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
    </div>
  );
}
