"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext, AuthContext } from "../App"
import { FaShoppingCart } from "react-icons/fa"
import { FiLogOut, FiLogIn } from "react-icons/fi"

export default function Header() {
  const { cart } = useContext(CartContext)
  const { isAuthenticated, logout } = useContext(AuthContext)

  // Calculate total items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            TalentoShop
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition">
              Nosotros
            </Link>
            <Link to="/contacts" className="hover:text-blue-200 transition">
              Contacto
            </Link>
            {isAuthenticated && (
              <Link to="/admin" className="hover:text-blue-200 transition">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/" className="relative p-2">
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
              >
                <FiLogOut className="mr-2" />
                Salir
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
              >
                <FiLogIn className="mr-2" />
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
