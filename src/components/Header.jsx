"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext, AuthContext } from "../App"

export default function Header() {
  const { cart } = useContext(CartContext)
  const { isAuthenticated, logout } = useContext(AuthContext)

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            TalentoShop
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition">
              About
            </Link>
            <Link to="/contacts" className="hover:text-blue-200 transition">
              Contact
            </Link>
            {isAuthenticated && (
              <Link to="/admin" className="hover:text-blue-200 transition">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
