"use client"

import { useContext } from "react"
import { CartContext } from "../App"
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Function to handle adding to cart with stock check
  const handleAddToCart = (item) => {
    if (item.quantity >= item.stock) {
      toast.warn("Lo sentimos, no tenemos más unidades en stock")
      return
    }
    addToCart(item)
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Tu Carrito</h2>
        <p className="text-gray-500">Tu carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tu Carrito</h2>
        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm flex items-center">
          <FaTrash className="mr-1" /> Vaciar Carrito
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div key={item.id} className="py-4 flex items-center">
            <div className="w-16 h-16 overflow-hidden mr-4 flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
              <p className="text-sm text-gray-500">
                ${item.price} x {item.quantity}
              </p>
              <p className="text-xs text-gray-500">Stock: {item.stock}</p>
            </div>

            <div className="flex items-center ml-2">
              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 p-1">
                <FaMinus size={12} />
              </button>

              <span className="mx-2 text-gray-700 w-6 text-center">{item.quantity}</span>

              <button
                onClick={() => handleAddToCart(item)}
                className={`text-gray-500 hover:text-green-500 p-1 ${item.quantity >= item.stock ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={item.quantity >= item.stock}
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al finalizar la compra.</p>

        <div className="mt-6">
          <button className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}
