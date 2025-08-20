import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (err) {
        setError("⚠️ Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.length > 0 &&
        products.map((product) => (
        product ? <ProductCard key={product.id} product={product} /> : null
        ))}
    </div>
    );

  if (error)
    return <p className="text-center text-red-500 font-semibold mt-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">🛍️ Product List</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};




export default ProductList;
