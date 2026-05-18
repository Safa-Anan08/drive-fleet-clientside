"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "@/components/CarCard";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";
export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
 const location = searchParams.get("location");
  
 useEffect(() => {
  axios
    .get("http://localhost:5000/api/cars")
    .then((res) => {
      let filtered = res.data;

      if (location) {
        filtered = filtered.filter((car) =>
          car.location
            .toLowerCase()
            .includes(location.toLowerCase())
        );
      }

      setCars(filtered);
      setLoading(false);
    });
}, [location]);

 if (loading) return <Loader />;

  return (
    <section className="container-main py-20">

 
      <div className="mb-16">

        <p className="text-blue-500 uppercase tracking-[0.25em] text-sm mb-3">
          Explore Collection
        </p>

        <h1 className="text-5xl font-bold">
          Premium Cars
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Discover luxury, comfort and performance tailored for every journey.
        </p>

      </div>

   
      <div className="grid lg:grid-cols-2 gap-10">

        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}

      </div>

    </section>
  );
}