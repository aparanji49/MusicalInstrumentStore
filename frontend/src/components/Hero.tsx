import heroimg from "../assets/grandpiano.png";



export default function Hero() {
  return (
    <section className="relative isolate">
      {/* Background image */}
      <img
        src={heroimg}
        alt="Grand Piano"
        className="absolute inset-0 h-[58vh] w-full object-cover md:h-[68vh] lg:h-[72vh]"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content container */}
      <div className="relative mx-auto flex h-[58vh] items-center md:h-[68vh] lg:h-[72vh] max-w-6xl px-4 text-white">
        <div className="w-full text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Find Your Perfect Sound
          </h1>
          <p className="mx-auto mt-3 max-w-xl opacity-90 md:text-lg">
            Shop the latest arrivals and timeless classics.
          </p>

        </div>

          <a
            href="/shop"
            className="absolute bottom-8 right-6 md:bottom-12 md:right-10 rounded-full px-8 py-3 font-semibold shadow-md bg-yellow-500 hover:brightness-95"
          >
            Shop Now
          </a>

      </div>
    </section>
  );
}
