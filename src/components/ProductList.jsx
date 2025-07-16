"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../App"
import { FaCartPlus } from "react-icons/fa"

export default function ProductList({ products }) {
  const { addToCart } = useContext(CartContext)

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron productos.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <Link to={`/product/${product.id}`} className="block">
            <div className="h-48 overflow-hidden p-4 bg-white flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </Link>

          <div className="p-4 flex flex-col flex-grow">
            <Link to={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 h-14">
                {product.title}
              </h2>
            </Link>

            <div className="flex-grow"></div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-gray-900">${Number.parseFloat(product.price).toFixed(2)}</span>

              {product.stock > 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                  aria-label="Add to cart"
                >
                  <FaCartPlus />
                </button>
              ) : (
                <span className="text-sm text-red-500">Out of stock</span>
              )}
            </div>
            {product.stock > 0 && <span className="text-xs text-gray-500 mt-1">Stock: {product.stock}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
