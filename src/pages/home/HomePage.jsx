import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";

import axios from "axios";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      if (search) {
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data);
      } else {
        const response = await axios.get(`/api/products`);
        setProducts(response.data);
      }
    };
    getProductsData();
  }, [search]);

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
