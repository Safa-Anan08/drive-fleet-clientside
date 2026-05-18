"use client";

import {
  FaBolt,
  FaMobileAlt,
  FaMapMarkedAlt,
  FaStar
} from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FeatureCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1
      }
    );
  }, []);

  const features = [
    {
      icon: <FaBolt />,
      title: "All-Electric. Charging Included.",
      desc: "Integrated fast charging access with intelligent route planning ensures effortless journeys without range anxiety."
    },
    {
      icon: <FaMobileAlt />,
      title: "Book, Arrive & Drive in 2 Minutes",
      desc: "Skip paperwork and queues. Unlock, start, and manage your rental directly from your smartphone."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "You Pick Up or We Deliver",
      desc: "Flexible self-service pickup and seamless delivery options designed for maximum convenience."
    },
    {
      icon: <FaStar />,
      title: "World-Class, Highest Rated",
      desc: "We rebuilt car rental from the ground up with smarter technology and exceptional customer experience."
    }
  ];

  return (
    <section className="container-main py-5 ">

   
      <div className="text-center mb-20">

        <p className="text-blue-400 uppercase tracking-[0.35em] text-sm mb-4">
          Why DriveFleet
        </p>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          All Electric, All Digital
        </h2>

        <p className="mt-6 text-gray-400 text-xl max-w-4xl mx-auto leading-9">
          Welcome to the car rental experience of the future —
          premium vehicles, zero friction, and fully digital mobility.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="glass rounded-3xl p-10 flex items-center gap-8 hover:scale-[1.02] transition-all duration-300"
          >

        
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-4xl shrink-0 shadow-xl">
              {feature.icon}
            </div>

           
            <div>
              <h3 className="text-2xl font-bold text-[var(--text)] leading-tight">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-8">
                {feature.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}