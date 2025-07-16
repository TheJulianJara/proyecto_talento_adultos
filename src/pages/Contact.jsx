"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaReddit,
  FaPinterest,
} from "react-icons/fa"

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.")
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Envíanos un Mensaje</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Tu Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Tu Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Tu Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Dirección</h3>
                <p className="text-gray-600">Av. Corrientes 1234, C1043AAS, CABA, Buenos Aires</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaEnvelope className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">contacto@talentoshop.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Teléfono</h3>
                <p className="text-gray-600">+54 11 4567-8901</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaClock className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Horario de Atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00 hs</p>
                <p className="text-gray-600">Sábados: 10:00 - 14:00 hs</p>
                <p className="text-gray-600">Domingos: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-3">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-red-500 hover:text-red-700">
                <FaReddit size={24} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <FaPinterest size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
