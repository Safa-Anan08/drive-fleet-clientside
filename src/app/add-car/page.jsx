"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddCar() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    location: "",
    description: "",
    available:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/cars",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Car Added");
    router.push("/my-cars");
  };

  return (
    <div className="max-w-3xl mx-auto py-20">

      <form
        onSubmit={handleSubmit}
        className="glass p-10 rounded-3xl space-y-5"
      >
        <h2 className="text-3xl font-bold">
          Add New Car
        </h2>

        <input
          placeholder="Car Name"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />
         <input
  placeholder="Mileage (e.g. 14 km/l)"
  className="w-full p-4 rounded-xl"
  onChange={(e) =>
    setForm({
      ...form,
      mileage: e.target.value
    })
  }
/>
        <input
          placeholder="Image URL"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <input
          placeholder="Type"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        <input
          placeholder="Seats"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, seats: e.target.value })
          }
        />

        <input
  placeholder="Number of Cars Available"
  className="w-full p-4 rounded-xl"
  onChange={(e) =>
    setForm({
      ...form,
      availableCars: e.target.value
    })
  }
/>
       
        <input
          placeholder="Location"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-4 rounded-xl"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="glow-btn text-white px-8 py-4 rounded-2xl">
          Add Car
        </button>

      </form>

    </div>
  );
}