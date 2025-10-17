// frontend/src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { fetchGraphQL } from "../lib/api";
import type { Product } from "../types";
import Hero from "../components/Hero";
import SectionCarousel from "../components/SectionCarousel";
import CollectionsGrid from "../components/CollectionsGrid";
import BrandsStrip from "../components/BrandsStrip";
import PromoBanner from "../components/PromoBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

//   useEffect(() => {
//     fetchJSON<Product[]>("/api/products/best?limit=8").then(setFeatured);
//     fetchJSON<Product[]>("/api/products?limit=8&isNewArrival=true").then(setNewArrivals);
//   }, []);
const HOME_QUERY = `
  query Home($limit: Int!) {
    featured: featuredProducts(limit: $limit) {
      _id name brand price images isNewArrival
    }
    newArrivals: newProducts(limit: $limit, isNewArrival: true) {
      _id name brand price images isNewArrival
    }
  }
`;
  useEffect(() => {
    fetchGraphQL<{ featured: Product[]; newArrivals: Product[] }>(HOME_QUERY, { limit: 8 })
      .then((data) => {
        setFeatured(data.featured);
        setNewArrivals(data.newArrivals);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      <Hero />
      <main className="bg-white">
        <div className="py-10">
          <SectionCarousel title="Featured" products={featured} />
          <SectionCarousel title="New Arrivals" products={newArrivals} />
        </div>
        <CollectionsGrid />
        <BrandsStrip />
        <PromoBanner />
        <WhyChooseUs />
        <Testimonials />
      </main>
    </>
  );
}
