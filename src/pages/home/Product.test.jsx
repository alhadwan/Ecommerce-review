import React from "react";
import { formatMoney } from "../../util/money";
import { it, expect, describe, vi } from "vitest";
import { Product } from "./Product";
// render -> display a component in a fake web page,
// screen -> check if the component is displayed correctly
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

// mocking the axios package to get a fake version of axios version.
// this way, the backend data dose not get mutated during tests.
vi.mock("axios");

describe("product component", () => {
  it("displays the elements in the components", () => {
    const product = {
      id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
      image:
        "http://localhost:5173/images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1099,
      keywords: ["socks", "sports", "apparel"],
    };

    // using vi.fn to create an empty function(mock) so it dose not contact
    // the backend and mutate the data.
    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart} />);

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "http://localhost:5173/images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByText(formatMoney(1099))).toBeInTheDocument();
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );
    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("adds products to the cart", async () => {
    const product = {
      id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
      image:
        "http://localhost:5173/images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1099,
      keywords: ["socks", "sports", "apparel"],
    };

    // using vi.fn to create an empty function(mock) so it dose not contact
    // the backend and mutate the data.
    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCart = screen.getByTestId("add-to-cart-button-test");
    await user.click(addToCart);

    expect(axios.post).toHaveBeenCalledWith("api/cart-items", {
      productId: product.id,
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
