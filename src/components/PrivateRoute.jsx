"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {

  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      router.replace("/login");

    } else {

      setAuthorized(true);
    }

  }, [router]);

  if (!authorized) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

      </div>
    );
  }

  return children;
}