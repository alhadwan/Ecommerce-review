import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";

import { useState, useEffect } from "react";

import axios from "axios";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    getProductsData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="home-favicon.png" />
      <title>HomePage</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
