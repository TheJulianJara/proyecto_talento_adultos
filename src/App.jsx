"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, createContext } from "react"
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

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Add to cart function
  const addToCart = (product) => {
    // Check if product has stock
    if (!product.stock || product.stock <= 0) {
      alert("Sorry, this product is out of stock")
      return
    }

    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      // Check if we're trying to add more than what's in stock
      if (existingProduct.quantity >= product.stock) {
        alert("Sorry, we don't have more units in stock")
        return
      }

      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
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
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        <Router>
          <div className="flex flex-col min-h-screen">
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
          </div>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
