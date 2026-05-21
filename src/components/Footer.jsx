"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#081120] border-t py-8">

      <div className="container-main">

        <div className="grid md:grid-cols-4 gap-12">

       
          <div>
            <h2 className="text-3xl font-bold text-blue-600">
              DriveFleet
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              Premium car rental experiences designed for comfort,
              luxury and reliability.
            </p>
          </div>

      
          <div>
            <h3 className="font-semibold mb-5">
              Quick Links
            </h3>

            <div className="space-y-6 text-gray-500">
               <ul className="space-y-4">

            <li>
              <Link href="/" className="hover:text-green-500">
                Home
              </Link>
            </li>

            <li>
              <Link href="/cars" className="hover:text-green-500">
                Explore Cars
              </Link>
            </li>

            <li>
              <Link href="/my-profile" className="hover:text-green-500">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/my-bookings"  className="hover:text-green-500">
                My Bookings
              </Link>
            </li>

          </ul>
             
            </div>
          </div>

         
          <div>
            <h3 className="font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-500">
              <p>Dhaka, Bangladesh</p>
              <p>support@drivefleet.com</p>
              <p>+880 1234567890</p>
            </div>
          </div>

       
          <div>
            <h3 className="font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">
 <div className="flex gap-4 mt-5 text-xl">

            <a href="https://facebook.com" className="hover:text-blue-500">
              <FaFacebookF />
            </a>

            <a href="https://instagram.com" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="https://twitter.com" className="hover:text-sky-400">
              <FaXTwitter />
            </a>

            <a href="https://github.com" className="hover:text-gray-300">
              <FaLinkedinIn />
            </a>

          </div>

            </div>
          </div>

        </div>

        <div className="mt-14 pt-8 border-t text-center text-gray-500 text-sm">
          © 2026 DriveFleet • Premium Car Rental Platform
        </div>

      </div>
    </footer>
  );
}