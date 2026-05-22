"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function Page() {
  useEffect(() => {
    const token = new URLSearchParams(
      window.location.hash.substring(1)
    ).get("access_token");

    if (!token) return;

    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(async (data) => {
         if (!data.email) {
    return;
  }
        const res = await api.post("/auth/google", {
          name: data.name,
          email: data.email,
          photo: data.picture,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = "/";
      });
  }, []);

  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass px-8 py-6 rounded-3xl">
      Signing you in...
    </div>
  </div>
);
}