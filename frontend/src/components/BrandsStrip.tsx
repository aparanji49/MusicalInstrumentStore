// frontend/src/components/BrandsStrip.tsx
import yamaha from "../assets/YamahaLogo.png";
import fender from "../assets/Fender_logo.png";
import gibson from "../assets/gibson.png";
// import korg from "../assets/brands/korg.svg";
import roland from "../assets/rolandlogo.png";
// import boss from "../assets/brands/boss.svg";
import shure from "../assets/shurelogo.png";
import steinway from "../assets/Steinwaylogo.png";
const brands = [yamaha, fender, gibson, roland, shure, steinway];
export default function BrandsStrip() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="mb-4 text-sm opacity-80">Top Brands</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-80">
          {brands.map(b => <img key={b} src={b} alt={"brand"} className="w-14 object-contain" />)}
        </div>
      </div>
    </section>
  );
}
