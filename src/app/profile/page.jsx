"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
    location: user?.location || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setEditing(false);
      toast.success("Profile updated");
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <section className="container-main py-20">

      <div className="max-w-3xl mx-auto bg-white dark:bg-[#111827] rounded-[36px] shadow-xl border p-12">

        {!editing ? (
          <>

            <div className="text-center">

              <img
                src={user?.photo}
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 mx-auto"
              />

              <h1 className="text-4xl font-bold mt-6">
                {user?.name}
              </h1>

              <p className="text-gray-500 mt-3">
                {user?.email}
              </p>

              <p className="text-gray-500 mt-2">
                {user?.location || "Location not added"}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="mt-10 px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold"
              >
                Update Profile
              </button>

            </div>
          </>
        ) : (
          <>

            <h1 className="text-4xl font-bold mb-10">
              Update Profile
            </h1>

            <div className="space-y-7">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border rounded-2xl px-5 py-4"
              />

              <div className="flex gap-4">

                <button
                  onClick={updateProfile}
                  className="flex-1 py-4 rounded-2xl bg-blue-600 text-white"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-4 rounded-2xl border"
                >
                  Cancel
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </section>
  );
}