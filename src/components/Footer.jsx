"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#081120] border-t py-16">

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

            <div className="space-y-3 text-gray-500">
              <p>Home</p>
              <p>Explore Cars</p>
              <p>Add Car</p>
              <p>My Bookings</p>
            </div>
          </div>

         
          <div>
            <h3 className="font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-500">
              <p>Dhaka, Bangladesh</p>
              <p>support@drivefleet.com</p>
              <p>+880 1533-380769</p>
            </div>
          </div>

       
          <div>
            <h3 className="font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              {[FaFacebookF, FaInstagram, FaLinkedinIn].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#111827] flex items-center justify-center text-blue-600 hover:scale-110 transition"
                  >
                    <Icon />
                  </div>
                )
              )}

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