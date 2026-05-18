"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { gsap } from "gsap";
import toast from "react-hot-toast";

export default function ContactSection() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });

      gsap.from(".contact-form", {
        x: 80,
        opacity: 0,
        duration: 1.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        location: "",
        message: "",
      });
    } else {
      toast.error("Failed to send");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-gray-50 dark:bg-[#081120]"
    >
      <div className="container-main">

        <div className="text-center mb-16">
          <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-3">
            Contact DriveFleet
          </p>

          <h2 className="text-5xl font-bold">
            Let's Get You Moving
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Premium support for premium journeys.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          
          <div className="space-y-6">

            {[
              {
                icon: <Phone />,
                title: "Call Us",
                value: "+880 1533-380769",
              },
              {
                icon: <Mail />,
                title: "Email",
                value: "support@drivefleet.com",
              },
              {
                icon: <MapPin />,
                title: "Office",
                value: "Dhaka, Bangladesh",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="contact-card bg-white dark:bg-[#111827] p-7 rounded-3xl shadow-md border"
              >
                <div className="flex items-center gap-5">

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      {item.title}
                    </p>

                    <h3 className="text-xl font-semibold">
                      {item.value}
                    </h3>
                  </div>

                </div>
              </div>
            ))}

          </div>

      
          <div className="contact-form bg-white dark:bg-[#111827] rounded-[36px] p-10 shadow-lg border">

            <form onSubmit={handleSubmit} className="space-y-7">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b pb-4 bg-transparent outline-none"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border-b pb-4 bg-transparent outline-none"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Pickup Location"
                className="w-full border-b pb-4 bg-transparent outline-none"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your rental needs"
                rows="4"
                className="w-full border-b pb-4 bg-transparent outline-none"
              />

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Send Inquiry
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}