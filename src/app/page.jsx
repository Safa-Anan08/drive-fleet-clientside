"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Banner from "@/components/Banner";
import TrustedBy from "@/components/TrustedBy";
import FeaturedCards from "@/components/FeaturedCards";
import CarCard from "@/components/CarCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CarTypeCards from "@/components/CarTypeCards";
export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`)
      .then((res) => {
        setCars(res.data.slice(0, 4));
      });
  }, []);

  return (
    <>
      <Banner />
      <TrustedBy />
      <FeaturedCards />

      <section className="container-main py-10">

        <div className="mb-14">

          <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-3">
            Featured Fleet
          </p>

          <h2 className="text-5xl font-bold">
            Available Cars
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Premium vehicles ready for your next journey.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">
  {cars.map((car) => (
    <CarCard key={car._id} car={car} />
  ))}
</div>

<div className="mt-16 text-center">

  {cars.length >= 4 ? (
    <Link
      href="/cars"
      className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-black hover:bg-blue-700 text-white font-semibold text-lg transition-all cursor-pointer"
    >
      View Our Fleet
    </Link>
  ) : (
    <p className="text-gray-500 text-lg italic">
      That's all for now — more premium rides coming soon.
    </p>
  )}

</div>

      </section>
      <CarTypeCards />
      <ContactSection />
<Footer />
    </>
  );
}