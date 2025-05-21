"use client"

import { useState } from "react"
import ProductList from "../components/ProductList"
import Cart from "../components/Cart"

export default function Home() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>

            <button
              onClick={() => setShowCart(!showCart)}
              className="md:hidden bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              {showCart ? "Hide Cart" : "Show Cart"}
            </button>
          </div>

          <div className={`${showCart ? "hidden" : "block"} md:block`}>
            <ProductList />
          </div>
        </div>

        <div className={`${showCart ? "block" : "hidden"} md:block md:w-1/4 sticky top-4`}>
          <Cart />
        </div>
      </div>
    </div>
  )
}
