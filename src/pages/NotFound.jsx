import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Página No Encontrada</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        La página que buscas pudo haber sido eliminada, su nombre cambiado o no está disponible temporalmente.
      </p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
        Ir a la Página Principal
      </Link>
    </div>
  )
}
