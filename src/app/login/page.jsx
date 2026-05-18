"use client";

import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login: setUser } = useAuth(); 
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

   
      setUser(res.data.user);

   
      localStorage.setItem("token", res.data.token);

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen hero-glow flex items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

      
        <div className="space-y-8">
          
          <div className="glass inline-flex px-5 py-2 rounded-full text-sm tracking-[3px] uppercase font-semibold">
            Welcome Back
          </div>

          <div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Login To
            </h1>

            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              DriveFleet
            </h1>
          </div>

          <p className="text-lg opacity-80 leading-relaxed max-w-xl">
            Access your account and continue exploring premium
            car rentals with luxury, comfort, and convenience.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            
            <div className="glass rounded-3xl px-6 py-5">
              <h2 className="text-3xl font-black text-blue-500">
                500+
              </h2>

              <p className="opacity-70">
                Available Cars
              </p>
            </div>

            <div className="glass rounded-3xl px-6 py-5">
              <h2 className="text-3xl font-black text-blue-500">
                24/7
              </h2>

              <p className="opacity-70">
                Customer Support
              </p>
            </div>

          </div>
        </div>

    
        <Card className="glass border border-white/10 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
          
          <div className="p-8 lg:p-10">

      
            <div className="mb-8 text-center">
              
              <h2 className="text-4xl font-black">
                Sign In
              </h2>

              <p className="opacity-70 mt-2">
                Continue your DriveFleet journey
              </p>

            </div>

        
            <div className="flex flex-col gap-5">

              <Input
                size="lg"
                radius="lg"
                type="email"
                variant="bordered"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                size="lg"
                radius="lg"
                type="password"
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

            
              <Button
                size="lg"
                radius="lg"
                className="glow-btn text-white font-bold h-14"
                onClick={handleLogin}
              >
                Login Now
              </Button>

      
              <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-white/10"></div>

                <span className="text-sm opacity-60">
                  OR
                </span>

                <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              <Button
                size="lg"
                radius="lg"
                variant="bordered"
                className="h-14 w-full border-white/10 hover:border-blue-400 transition-all duration-300"
              >
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
                Don't have an account?

                <a
                  href="/register"
                  className="text-blue-500 ml-2 font-semibold hover:underline"
                >
                  Register
                </a>
              </p>

            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}