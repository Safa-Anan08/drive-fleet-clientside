"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

export default function EditCar() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    mileage: "",
    location: "",
    description: "",
    availableCars: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars`)
      .then((res) => {
        const car = res.data.find((c) => c._id === id);

        if (car) setForm(car);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/cars/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Car Updated");
    router.push("/my-cars");
  };

  return (
    <div className="max-w-3xl mx-auto py-20">

      <form
        onSubmit={handleSubmit}
        className="glass p-10 rounded-3xl space-y-5"
      >
        <h2 className="text-3xl font-bold">
          Edit Car
        </h2>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.seats}
          onChange={(e) =>
            setForm({ ...form, seats: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.mileage}
          onChange={(e) =>
            setForm({ ...form, mileage: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full p-4 rounded-xl"
        />

        <input
          value={form.availableCars}
          onChange={(e) =>
            setForm({
              ...form,
              availableCars: e.target.value
            })
          }
          className="w-full p-4 rounded-xl"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value
            })
          }
          className="w-full p-4 rounded-xl"
        />

        <button className="glow-btn px-8 py-4 rounded-2xl text-white">
          Update Car
        </button>

      </form>

    </div>
  );
}