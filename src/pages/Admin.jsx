"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import ConfirmationModal from "../components/ConfirmationModal"

const API_URL = "https://682e36af746f8ca4a47c45b7.mockapi.io/api/v1/products"

export default function Admin() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error("Error al cargar los productos")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Error al eliminar el producto")
      toast.success("¡Producto eliminado con éxito!")
      setProducts(products.filter((p) => p.id !== id))
      setProductToDelete(null)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleSave = async (productData) => {
    const isEditing = !!productData.id
    const url = isEditing ? `${API_URL}/${productData.id}` : API_URL
    const method = isEditing ? "PUT" : "POST"

    // Validation
    if (!productData.title.trim()) {
      toast.error("El título es obligatorio.")
      return
    }
    if (Number.parseFloat(productData.price) <= 0) {
      toast.error("El precio debe ser mayor a 0.")
      return
    }
    if (productData.description.length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres.")
      return
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
      if (!response.ok) throw new Error(`Error al ${isEditing ? "actualizar" : "agregar"} el producto`)

      toast.success(`¡Producto ${isEditing ? "actualizado" : "agregado"} con éxito!`)
      setEditingProduct(null)
      setIsAdding(false)
      fetchProducts() // Re-fetch to get the latest data
    } catch (err) {
      toast.error(err.message)
    }
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        <button
          onClick={() => {
            setIsAdding(true)
            setEditingProduct(null)
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Agregar Producto
        </button>
      </div>

      {(isAdding || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => {
            setEditingProduct(null)
            setIsAdding(false)
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${Number.parseFloat(product.price).toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingProduct(product)
                        setIsAdding(false)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => setProductToDelete(product)} className="text-red-600 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => handleDelete(productToDelete.id)}
        title="Eliminar Producto"
        message={`¿Estás seguro de que quieres eliminar "${productToDelete?.title}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}

// Product Form Component
function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: 10,
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      // Reset for new product
      setFormData({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "https://via.placeholder.com/150",
        stock: 10,
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">{product ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Categoría
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 font-medium mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              min="0"
            />
          </div>
          <div className="md:col-span-2 mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="md:col-span-2 mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-md"
              required
              minLength="10"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}
