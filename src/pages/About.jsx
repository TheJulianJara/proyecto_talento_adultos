export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sobre Nosotros</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Nuestra Historia</h2>
        <p className="text-gray-700 mb-4">
          TalentoShop fue fundada en 2023 con una misión simple: proveer productos de alta calidad a precios accesibles.
          Lo que comenzó como una pequeña tienda en línea ha crecido hasta convertirse en una plataforma de e-commerce
          de confianza que sirve a clientes en todo el mundo.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">Nuestra Misión</h2>
        <p className="text-gray-700 mb-4">
          Nuestra misión es hacer que las compras sean fáciles, agradables y accesibles para todos. Creemos en la
          transparencia, la calidad y un servicio al cliente excepcional. Cada producto en nuestro catálogo es
          cuidadosamente seleccionado para asegurar que cumpla con nuestros altos estándares.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { name: "Juana Pérez", role: "CEO y Fundadora", image: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "Juan García", role: "CTO", image: "https://randomuser.me/api/portraits/men/1.jpg" },
            {
              name: "Emilia Johnson",
              role: "Jefa de Atención al Cliente",
              image: "https://randomuser.me/api/portraits/women/2.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
