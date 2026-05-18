"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TrustedBy() {
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 1
      }
    );
  }, []);

  const brands = [
    {
      name: "BRTA",
      link: "https://brta.gov.bd"
    },
    {
      name: "Suzuki",
      link: "https://www.suzuki.com"
    },
    {
      name: "Nissan",
      link: "https://www.nissan-global.com"
    },
    {
      name: "Toyota",
      link: "https://www.toyota.com"
    },
    {
      name: "BMW",
      link: "https://www.bmw.com"
    }
  ];

  return (
    <section className=" container-main py-20 bg-[var(--bg)] text-center px-3 md:px-6">

      <p className="text-gray-400 tracking-[0.35em] uppercase text-xl mb-14">
        Trusted By
      </p>

      <div className="flex justify-center flex-wrap gap-16 md:gap-24">

        {brands.map((brand, i) => (
          <a
            key={brand.name}
            href={brand.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (itemsRef.current[i] = el)}
            className="text-[var(--text)] text-3xl md:text-4xl font-bold hover:text-blue-500 transition-all duration-300 hover:scale-110"
          >
            {brand.name}
          </a>
        ))}

      </div>

    </section>
  );
}