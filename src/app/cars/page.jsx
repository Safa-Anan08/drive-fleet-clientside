"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import CarCard from "@/components/CarCard";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";

function CarsContent() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
 
  const [sort, setSort] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
const typeFromQuery = searchParams.get("type");

const [typeFilter, setTypeFilter] = useState(typeFromQuery || "");
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars`)
      .then((res) => {
        setCars(res.data);
        setFilteredCars(res.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...cars];

    if (location || locationFilter) {
      const loc = location || locationFilter;
      filtered = filtered.filter((car) =>
        car.location.toLowerCase().includes(loc.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((car) =>
        car.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    

    

if (typeFilter) {
  const types = typeFilter
    .split(",")
    .map((type) => type.trim().toLowerCase());

  filtered = filtered.filter((car) =>
    types.includes(car.type?.toLowerCase())
  );
}
  

    if (availableOnly) {
      filtered = filtered.filter((car) => car.availableCars > 0);
    }

    if (sort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(filtered);
  }, [
    cars,
    search,
    locationFilter,
    typeFilter,
    sort,
    availableOnly,
    location,
    
  ]);

  if (loading) return <Loader />;

  return (
    <section className="container-main py-10">

      <div className="mb-14">
        <p className="text-blue-500 uppercase tracking-[0.25em] text-sm mb-3">
          Explore Collection
        </p>

        <h1 className="text-3xl md:text-5xl font-bold">
          Premium Cars
        </h1>

        <p className="text-gray-500 mt-4 text-base md:text-lg">
          Find your perfect ride with smart filters.
        </p>
      </div>

   <div className="glass rounded-3xl p-5 md:p-6 mb-14">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

    <input
      type="text"
      placeholder="Search car..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border bg-transparent"
    />

    <input
      type="text"
      placeholder="Location"
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border bg-transparent"
    />

    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border bg-transparent"
    >
      <option value="">All Types</option>
      <option value="SUV">SUV</option>
      <option value="Sedan">Sedan</option>
      <option value="Luxury SUV">Luxury SUV </option>
      <option value="Luxury Sedan">Luxury Sedan </option>
      <option value="Microbus">Microbus </option>
      
    </select>

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border bg-transparent"
    >
      <option value="">Sort By</option>
      <option value="low-high">Price Low → High</option>
      <option value="high-low">Price High → Low</option>
    </select>

    <label className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-2xl border cursor-pointer">
      <input
        type="checkbox"
        checked={availableOnly}
        onChange={() => setAvailableOnly(!availableOnly)}
      />
      Available Only
    </label>

  </div>
</div>

      {filteredCars.length ? (
        <div className="grid lg:grid-cols-2 gap-10">
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <h2 className="text-3xl font-bold">
            No Cars Found
          </h2>
          <p className="text-gray-500 mt-3">
            Try adjusting filters.
          </p>
        </div>
      )}
    </section>
  );
}

export default function Cars() {
  return (
    <Suspense fallback={<Loader />}>
      <CarsContent />
    </Suspense>
  );
}