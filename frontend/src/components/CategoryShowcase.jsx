import { Link } from "react-router-dom";

const categories = [
  {
    name: "Women's Fragrances",
    description: "Elegant and sophisticated scents for the modern woman",
    image: "/elegant-women-perfume-bottles-floral.jpg",
    href: "/products?category=women",
    color: "from-rose-100 to-pink-100",
  },
  {
    name: "Men's Fragrances",
    description: "Bold and masculine fragrances for the confident man",
    image: "/masculine-men-cologne-bottles-woody.jpg",
    href: "/products?category=men",
    color: "from-blue-100 to-slate-100",
  },
  {
    name: "Unisex Collection",
    description: "Versatile scents that transcend traditional boundaries",
    image: "/unisex-perfume-bottles-minimalist-design.jpg",
    href: "/products?category=unisex",
    color: "from-amber-100 to-orange-100",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every
            preference and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="block group"
            >
              <div className="hover:shadow-xl transition-all duration-300 overflow-hidden rounded-lg border bg-white">
                <div className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
