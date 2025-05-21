"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../App"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <Link to={`/product/${product.id}`}>
            <div className="h-48 overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
          </Link>

          <div className="p-4">
            <Link to={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
                {product.title}
              </h2>
            </Link>

            <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.description}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>

              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
