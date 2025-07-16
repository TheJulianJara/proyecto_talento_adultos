"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, createContext, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "./App.css"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Contacts from "./pages/Contact"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import ProductDetail from "./components/ProductDetail"

// Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProtectedRoutes from "./auth/ProtectedRoutes"

// Create context for cart and auth
export const CartContext = createContext()
export const AuthContext = createContext()

function App() {
  // Cart state
  const [cart, setCart] = useState([])

  // Auth state with localStorage persistence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false
  })

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  // Add to cart function
  const addToCart = (product) => {
    if (!product.stock || product.stock <= 0) {
      toast.error("Lo sentimos, este producto está agotado")
      return
    }

    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        toast.warn("Lo sentimos, no tenemos más unidades en stock")
        return
      }

      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
      toast.success(`¡Cantidad de ${product.title} actualizada en el carrito!`)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
      toast.success(`¡${product.title} agregado al carrito!`)
    }
  }

  // Remove from cart function
  const removeFromCart = (productId) => {
    const existingProduct = cart.find((item) => item.id === productId)

    if (existingProduct.quantity === 1) {
      setCart(cart.filter((item) => item.id !== productId))
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)))
    }
  }

  // Clear cart function
  const clearCart = () => {
    setCart([])
  }

  // Login function
  const login = () => {
    setIsAuthenticated(true)
  }

  // Logout function
  const logout = () => {
    setIsAuthenticated(false)
    toast.info("Has cerrado sesión.")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
          </div>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
