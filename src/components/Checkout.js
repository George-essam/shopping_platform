import React from "react";

const ProductCard = ({ product }) => {
  if (!product) return null; // ⬅️ skip rendering if undefined

  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white hover:shadow-xl hover:scale-105 transition-transform duration-200">
      <div className="relative w-full h-40 flex justify-center items-center mb-4">
        <img
          src={product.image || "https://via.placeholder.com/150"} // fallback image
          alt={product.title || "Product"}
          className="max-h-36 object-contain transition-transform duration-200 hover:scale-110"
        />
      </div>

      <h3 className="text-md font-medium text-gray-800 line-clamp-2 hover:line-clamp-none transition-all mb-2">
        {product.title || "No Title"}
      </h3>

      <div className="flex justify-between items-center mb-3">
        <p className="text-green-600 font-semibold text-lg">
          ${product.price || "0.00"}
        </p>
        <span className="text-yellow-500 text-sm">
          ⭐ {product.rating?.rate ?? "N/A"}
        </span>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 active:scale-95 transition shadow">
          Add to Cart
        </button>
        <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 active:scale-95 transition">
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
