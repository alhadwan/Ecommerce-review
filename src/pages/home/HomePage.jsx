import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";

import { useState, useEffect } from "react";

import axios from "axios";
import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="home-favicon.png" />
      <title>HomePage</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
