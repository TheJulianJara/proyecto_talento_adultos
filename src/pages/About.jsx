export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          TalentoShop was founded in 2023 with a simple mission: to provide high-quality products at affordable prices.
          What started as a small online store has grown into a trusted e-commerce platform serving customers worldwide.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Our mission is to make shopping easy, enjoyable, and accessible to everyone. We believe in transparency,
          quality, and exceptional customer service. Every product in our catalog is carefully selected to ensure it
          meets our high standards.
        </p>

        <h2 className="text-xl font-semibold mb-4 mt-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { name: "Jane Doe", role: "CEO & Founder", image: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "John Smith", role: "CTO", image: "https://randomuser.me/api/portraits/men/1.jpg" },
            {
              name: "Emily Johnson",
              role: "Head of Customer Service",
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
