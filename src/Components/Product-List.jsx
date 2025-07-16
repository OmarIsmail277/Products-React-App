// ProductList.jsx
// import axios from "axios";
import ProductCard from "./Product-Card";
import { useEffect, useState } from "react";
import { axiosInterceptor } from "../Network/Interceptor";
import SearchBar from "./SearchBar";
import { useCart } from "../contexts/useCart";
import { AddToCart } from "../store/cartSlice";

function ProductList() {
  const [products, setProducts] = useState([]);

  const { searchQuery } = useCart();

  const filteredProducts =
    searchQuery.length > 0
      ? products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products;

  useEffect(() => {
    axiosInterceptor.get("/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="container">
      <SearchBar />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
