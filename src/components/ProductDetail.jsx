"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { CartContext } from "../App";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        // Add random stock if not present
        if (!data.stock) {
          data.stock = Math.floor(Math.random() * 11); // Random number between 0 and 10
        }
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/404" />;
  }

  if (!product) {
    return <Navigate to="/login" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
              {product.category}
            </div>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <span className="ml-2 text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="mt-6 text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">
              {product.stock > 0 ? (
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      Availability:
                    </span>
                    <span className="text-sm text-green-600">
                      In Stock ({product.stock} available)
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      Availability:
                    </span>
                    <span className="text-sm text-red-600">Out of Stock</span>
                  </div>
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-6 py-3 rounded-md font-medium cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
