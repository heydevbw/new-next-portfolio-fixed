"use client";

import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Me */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">About Me</h3>
          <p className="text-sm leading-relaxed">
            I’m Bharat (aka <span className="font-bold">Me_canon_wala</span>),
              🎬 I tell stories through cinematic visuals that capture emotions.
                 "Enjoy what you see? Let’s create something amazing together."
                 Get in touch and share your requirements with us
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <p className="text-sm">📧 bharat.warkar@gmail.com</p>
          <p className="text-sm">📱 +91 9730548830</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Me</h3>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/me_canon_wala"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://youtube.com/@TalesofTechTravellers"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="mailto:bharat.warkar@gmail.com"
              className="hover:text-blue-400 transition"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © 2025 <span className="font-semibold">Me_canon_wala</span> | Will Make It Awwwsome
      </p>
    </footer>
  );
}
