export default function About() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">About MuseMart</h1>
        <p className="mb-10 text-gray-600 leading-relaxed max-w-3xl">
          At <span className="font-semibold text-yellow-600">MuseMart</span>, we believe music is more than just sound —
          it’s an experience that connects people across cultures and generations. Our mission is to make high-quality 
          instruments accessible to musicians of every level, from beginners taking their first step to professionals 
          performing on stage.
        </p>

        {/* Sections */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Our Story */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">🎵 Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2025, MuseMart started as a small community shop and has grown into a global platform
              for musicians. From guitars and pianos to percussion and accessories, we curate instruments 
              that inspire creativity and passion.
            </p>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">🌟 Our Values</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Authentic, quality-checked instruments</li>
              <li>✅ Affordable pricing with fast, secure delivery</li>
              <li>✅ A community-driven platform supporting artists</li>
              <li>✅ Sustainable sourcing and eco-friendly packaging</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">💡 Why Choose MuseMart?</h2>
            <p className="text-gray-600 leading-relaxed">
              We’re not just a store — we’re a trusted partner for your musical journey. 
              Our curated collections, expert recommendations, and responsive support ensure 
              you find the perfect sound, every time.
            </p>
          </div>

          {/* Join Us */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">🤝 Join the MuseMart Family</h2>
            <p className="text-gray-600 leading-relaxed">
              Whether you’re just starting out or an experienced musician, MuseMart is here to support 
              you. Explore our collections, discover new sounds, and become part of a growing global 
              community of music lovers.
            </p>
          </div>
        </div>

        {/* Closing Banner */}
        <div className="mt-16 rounded-xl bg-yellow-50 p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Let’s Create Music Together</h2>
          <p className="text-gray-700 mb-6">
            Explore our collections today and find the instrument that matches your passion.
          </p>
          <a
            href="/shop"
            className="inline-block rounded-md bg-yellow-500 px-6 py-3 font-semibold text-white shadow hover:brightness-95"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
