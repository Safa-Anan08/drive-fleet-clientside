"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const cars = [
  "https://images.unsplash.com/photo-1623006772851-a8bf2c47d304?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=1800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1800&auto=format&fit=crop&q=80"
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const router = useRouter();

  const titleRef = useRef();
  const descRef = useRef();
  const btnRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cars.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      [titleRef.current, descRef.current, btnRef.current, searchRef.current],
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 1
      }
    );
  }, []);

  const handleSearch = () => {
    router.push(
      `/cars?location=${location}&date=${date}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden">

    
      <img
        src={cars[current]}
        alt="car"
        className="absolute inset-0 w-full h-full object-cover scale-110 transition-all duration-[2000ms]"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-[#081120]/55 to-blue-900/40" />

      <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-blue-500/20 blur-[180px]" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="text-center max-w-6xl">

          <h1
            ref={titleRef}
            className="text-white text-6xl md:text-8xl font-extrabold leading-tight drop-shadow-2xl"
          >
            Drive Beyond
            <br />
            Expectations
          </h1>

          <p
            ref={descRef}
            className="mt-8 text-gray-200 max-w-3xl mx-auto text-xl leading-9"
          >
            Premium rentals engineered for unforgettable journeys.
            Instant booking, elite vehicles, zero waiting.
          </p>

          <button
            ref={btnRef}
            onClick={() => router.push("/cars")}
            className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:scale-105 transition"
          >
            Explore Fleet
          </button>

          <div
            ref={searchRef}
            className="mt-16 bg-white/12 border border-white/20 rounded-3xl p-5 flex flex-wrap gap-4 justify-center backdrop-blur-2xl max-w-5xl mx-auto shadow-2xl"
          >

            <div className="flex items-center gap-3 bg-white/10 px-5 py-4 rounded-2xl min-w-[250px]">
              <FaMapMarkerAlt className="text-cyan-300" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Pick Location"
                className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full"
              />
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-5 py-4 rounded-2xl min-w-[250px]">
              <FaCalendarAlt className="text-cyan-300" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none text-white w-full"
              />
            </div>

            <button
              onClick={handleSearch}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center gap-3 text-white font-semibold hover:scale-105 transition"
            >
              <FaSearch />
              Search Cars
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}