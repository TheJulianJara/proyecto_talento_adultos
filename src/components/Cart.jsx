"use client"

import { useContext } from "react"
import { CartContext } from "../App"

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Function to handle adding to cart with stock check
  const handleAddToCart = (item) => {
    if (item.quantity >= item.stock) {
      alert("Sorry, we don't have more units in stock")
      return
    }
    addToCart(item)
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm">
          Clear Cart
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.map((item) => (
          <div key={item.id} className="py-4 flex items-center">
            <div className="w-16 h-16 overflow-hidden mr-4">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-contain" />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-500">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
              <p className="text-xs text-gray-500">Stock: {item.stock}</p>
            </div>

            <div className="flex items-center">
              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <span className="mx-2 text-gray-700">{item.quantity}</span>

              <button
                onClick={() => handleAddToCart(item)}
                className={`text-gray-500 hover:text-green-500 p-1 ${item.quantity >= item.stock ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={item.quantity >= item.stock}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
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
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

        <div className="mt-6">
          <button className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
