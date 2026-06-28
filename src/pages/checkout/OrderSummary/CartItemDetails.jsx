import { formatMoney } from "../../../util/money";

import { useState } from "react";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {
  const [selectedValue, setSelectedValue] = useState(cartItem.quantity);

  const deleteProduct = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateProduct = async () => {
    await axios.put(`api/cart-items/${cartItem.productId}`, {
      quantity: selectedValue,
    });
    await loadCart();
  };

  return (
    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <div className="product-quantity-info">
          <span>
            {" "}
            Quantity:{" "}
            <span className="quantity-label">
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(Number(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </span>{" "}
          </span>
        </div>
        <div className="quantity-actions">
          <button
            onClick={updateProduct}
            className="update-quantity-link link-primary"
          >
            Update
          </button>
          <button
            onClick={deleteProduct}
            className="delete-quantity-link link-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
