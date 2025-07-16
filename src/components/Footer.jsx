export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TalentoShop</h3>
            <p className="text-gray-300">
              Tu tienda única para todas tus necesidades. Productos de calidad a precios accesibles.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-gray-300 hover:text-white transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
            <address className="not-italic text-gray-300">
              <p>Av. Corrientes 1234, C1043AAS</p>
              <p>CABA, Buenos Aires</p>
              <p>Email: contacto@talentoshop.com</p>
              <p>Teléfono: +54 11 4567-8901</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TalentoShop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
