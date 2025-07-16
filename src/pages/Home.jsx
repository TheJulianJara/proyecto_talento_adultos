"use client"

import { useState, useEffect } from "react"
import ProductList from "../components/ProductList"
import Cart from "../components/Cart"
import { FaSearch } from "react-icons/fa"
import { toast } from "react-toastify"

const API_URL = "https://682e36af746f8ca4a47c45b7.mockapi.io/api/v1/products"

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error("Error al cargar los productos")
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Productos</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on new search
                }}
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">¡Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <>
              <ProductList products={currentProducts} />
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav>
                    <ul className="inline-flex items-center -space-x-px">
                      {[...Array(totalPages).keys()].map((number) => (
                        <li key={number + 1}>
                          <button
                            onClick={() => paginate(number + 1)}
                            className={`py-2 px-3 leading-tight ${
                              currentPage === number + 1
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            } border border-gray-300`}
                          >
                            {number + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full md:w-1/4">
          <div className="sticky top-24">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  )
}
