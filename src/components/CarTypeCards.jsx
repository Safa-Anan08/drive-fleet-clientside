"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CarTypeCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 70,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  const carTypes = [
    {
      title: "SUV",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1400&auto=format&fit=crop",
      desc: "Spacious interiors, powerful performance, and perfect for family adventures.",
      link: "/cars?type=SUV",
    },

    {
      title: "Sedan",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
      desc: "Elegant everyday driving experience with comfort and smooth handling.",
      link: "/cars?type=Sedan",
    },

    {
      title: "Luxury",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop",
      desc: "Premium class vehicles crafted for ultimate comfort and prestige.",
      link: "/cars?type=Luxury SUV,Luxury Sedan",
    },
  ];

  return (
    <section className="container-main py-24">

     
      <div className="text-center mb-20">

        <p className="text-blue-400 uppercase tracking-[0.35em] text-sm mb-4">
          Browse By Category
        </p>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Choose Your Driving Style
        </h2>

        <p className="mt-6 text-gray-400 text-xl max-w-4xl mx-auto leading-9">
          Explore premium vehicles tailored for every lifestyle.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {carTypes.map((car, i) => (
          <Link
            href={car.link}
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative overflow-hidden rounded-[32px] h-[520px]"
          >

           
            <img
              src={car.image}
              alt={car.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-700"
            />

          
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          
            <div className="absolute bottom-0 p-8 z-10">

              <div className="mb-4 inline-flex px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-white">
                Premium Collection
              </div>

              <h3 className="text-white text-4xl font-bold">
                {car.title}
              </h3>

              <p className="mt-5 text-gray-300 leading-8">
                {car.desc}
              </p>

              <button className="mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-blue-500 hover:text-white duration-300">
                Explore Cars
              </button>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}