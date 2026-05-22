"use client";

import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import api from "@/lib/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    location: "",
  });

  const [error, setError] = useState("");

  const defaultImage =
    "https://plus.unsplash.com/premium_vector-1683140924463-adba1c428d66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const register = async () => {
    setError("");

    if (!/[A-Z]/.test(form.password)) {
      return setError(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(form.password)) {
      return setError(
        "Password must contain at least one lowercase letter."
      );
    }

    if (form.password.length < 6) {
      return setError(
        "Password length must be at least 6 characters."
      );
    }


    const userData = {
  name: form.name,
  email: form.email,
  password: form.password,
  photo: form.photo.trim() || defaultImage,
  location: "",
};

    try {
      await api.post("/auth/register", userData);
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("Registration failed.");
    }
    console.log(form);
  };

const handleGoogle = async () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const redirectUri = window.location.origin + "/oauth/google";

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=token` +
    `&scope=profile email`;

  window.location.href = url;
};
  return (
    <div className="min-h-screen hero-glow flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        
      
        <div className="space-y-8">
          <div className="glass inline-flex px-5 py-2 rounded-full text-sm tracking-[3px] uppercase font-semibold">
            Premium Car Rental
          </div>

          <div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Welcome To
            </h1>

            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              DriveFleet
            </h1>
          </div>

          <p className="text-lg opacity-80 leading-relaxed max-w-xl">
            Experience luxury and comfort with DriveFleet.
            Rent premium cars anytime, anywhere with seamless
            booking and affordable pricing.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="glass rounded-3xl px-6 py-5">
              <h2 className="text-3xl font-black text-blue-500">500+</h2>
              <p className="opacity-70">Luxury Cars</p>
            </div>

            <div className="glass rounded-3xl px-6 py-5">
              <h2 className="text-3xl font-black text-blue-500">24/7</h2>
              <p className="opacity-70">Support</p>
            </div>
          </div>
        </div>

  
        <Card className="glass border-none rounded-[32px] shadow-2xl">
          <div className="p-8 lg:p-10">
            
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-black">
                Create Account
              </h2>

              <p className="opacity-70 mt-2">
                Join DriveFleet today
              </p>
            </div>

            <div className="flex flex-col gap-5">
              
              <Input
                size="lg"
                radius="lg"
                variant="bordered"
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                size="lg"
                radius="lg"
                type="email"
                variant="bordered"
                label="Email Address"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Input
                size="lg"
                radius="lg"
                variant="bordered"
                label="Image URL"
                placeholder="Paste profile image URL (optional)"
                value={form.photo}
                onChange={(e) =>
                  setForm({ ...form, photo:e.target.value,})
                }
              />

              <Input
                size="lg"
                radius="lg"
                type="password"
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

           
              <div className="text-sm opacity-70 space-y-1 pl-1">
                <p>• Must contain one uppercase letter</p>
                <p>• Must contain one lowercase letter</p>
                <p>• Minimum 6 characters</p>
              </div>

            
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

          
              <Button
                size="lg"
                radius="lg"
                className="glow-btn text-white font-bold h-14"
                onClick={register}
              >
                Register Now
              </Button>

            
              <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-white/10"></div>
                <span className="text-sm opacity-60">OR</span>
                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

             <Button 
  size="lg"
  radius="lg"
  variant="bordered"
  className="h-14 w-full border-white/10 hover:border-blue-400 transition-all duration-300" onClick={handleGoogle}>
  <div className="flex items-center justify-center gap-3 w-full">
    
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
      alt="google"
      className="w-5 h-5"
    />

    <span className="font-semibold">
      Continue with Google
    </span>

  </div>
</Button>

              <p className="text-center text-sm opacity-70 pt-2">
                Already have an account?
                <a
                  href="/login"
                  className="text-blue-500 ml-2 font-semibold hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}