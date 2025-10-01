import { Link } from "react-router-dom";
import strings from "../assets/strings.jpg";
import percussion from "../assets/percussions.jpg";
import keyboards from "../assets/keyboards.jpg";
import accessories from "../assets/accessories.jpg";

const items = [
  { label: "Strings",     backgroundImage: strings },
  { label: "Percussion",  backgroundImage: percussion },
  { label: "Keyboards",   backgroundImage: keyboards },
  { label: "Accessories", backgroundImage: accessories },
];

export default function CollectionsGrid() {
  return (
    <section id="collections" className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="mb-6 text-xl font-semibold">Collections</h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {items.map((x) => (
            <Link
              key={x.label}
              to={`/${x.label.toLowerCase()}`}
              className="
                group relative block h-[480px] overflow-hidden rounded-2xl
                border border-black/10 bg-neutral-900 shadow-sm
                hover:shadow-lg hover:-translate-y-0.5 transition-all
              "
              style={{ backgroundImage: `url(${x.backgroundImage})` }}
            >
              {/* image background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${x.backgroundImage})` }}
                aria-hidden
              />

              {/* dark overlay for contrast */}
              <div
                className="
                  absolute inset-0
                  bg-black/35 group-hover:bg-black/25 transition-colors
                "
                aria-hidden
              />

              {/* gradient from bottom to help any text near bottom too */}
              <div
                className="
                  pointer-events-none absolute inset-x-0 bottom-0 h-1/3
                  bg-gradient-to-t from-black/60 via-black/20 to-transparent
                "
                aria-hidden
              />

              {/* label pill */}
              <span
                className="
                  absolute left-4 top-4 z-[1]
                  rounded-full bg-black/45 text-white px-3 py-1
                  backdrop-blur-sm
                  font-semibold tracking-wide
                  drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
                "
              >
                {x.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
