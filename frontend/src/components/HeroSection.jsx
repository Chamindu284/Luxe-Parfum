import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/luxury-perfume-bottles-elegant-display.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Your <br />
          <span className="text-purple-800">Signature Scent</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Explore our curated collection of luxury perfumes from the world's
          most prestigious brands. Find the perfect fragrance that tells your
          unique story.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-purple-700 text-white hover:bg-purple-700/90ansition-colors"
          >
            Shop Collection
          </Link>
          <Link
            to="/products?featured=true"
            className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-white text-white hover:bg-white hover:text-slate-900 transition-colors"
          >
            Featured Perfumes
          </Link>
        </div>
      </div>
    </section>
  );
}
