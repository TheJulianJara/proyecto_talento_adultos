"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { CartContext } from "../App"
import { FaArrowLeft, FaStar } from "react-icons/fa"
import { toast } from "react-toastify"

const API_URL = "https://682e36af746f8ca4a47c45b7.mockapi.io/api/v1/products"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          throw new Error("Producto no encontrado")
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
        toast.error("No se pudieron obtener los detalles del producto.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <Navigate to="/404" />
  }

  if (!product) {
    return <Navigate to="/login" />
  }

  const rating = product.rating ? product.rating.rate : Math.floor(Math.random() * 5) + 1
  const ratingCount = product.rating ? product.rating.count : Math.floor(Math.random() * 200)

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-blue-600 hover:text-blue-800">
        <FaArrowLeft className="mr-2" />
        Volver a Productos
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
            <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">{product.category}</div>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>

            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <span className="ml-2 text-gray-600">
                {rating.toFixed(1)} ({ratingCount} reseñas)
              </span>
            </div>

            <div className="mt-6 text-3xl font-bold text-gray-900">${Number.parseFloat(product.price).toFixed(2)}</div>

            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

            <div className="mt-8">
              {product.stock > 0 ? (
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-gray-700 mr-2">Disponibilidad:</span>
                    <span className="text-sm text-green-600">En Stock ({product.stock} disponibles)</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-gray-700 mr-2">Disponibilidad:</span>
                    <span className="text-sm text-red-600">Agotado</span>
                  </div>
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-6 py-3 rounded-md font-medium cursor-not-allowed"
                  >
                    Agotado
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
