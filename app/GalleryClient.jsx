"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import {
  useLightboxState,
  addToolbarButton,
  IconButton,
} from "yet-another-react-lightbox";
import Image from "next/image";
import gallery from "../public/gallery.json";

//import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa"; // <-- for icons



export default function GalleryClient({ images, videos }) {
  // --- State ---
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [rotations, setRotations] = useState({}); // { index: degrees }

  const allItems = [...images, ...videos];
  let galleryItems = [];
  if (category === "photos") galleryItems = images;
  else if (category === "videos") galleryItems = videos;
  else galleryItems = allItems;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  /* ---------------- Rotate Button + Plugin ---------------- */
  function RotateButton() {
    const { state } = useLightboxState();
    const currentIndex = state?.currentIndex;

    return (
      <IconButton
        label="Rotate"
        icon={() => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 1 0-3 6.7M21 3v6h-6"
            />
          </svg>
        )}
        onClick={() => {
          if (currentIndex == null) return;
          const current = rotations[currentIndex] || 0;
          const next = (current + 90) % 360;
          setRotations((prev) => ({ ...prev, [currentIndex]: next }));
        }}
      />
    );
  }

  function RotatePlugin({ augment }) {
    augment(({ toolbar, render, ...rest }) => ({
      ...rest,
      toolbar: addToolbarButton(toolbar, "rotate-button", <RotateButton />),

      render: {
        ...render,
        slide: ({ slide, rect, index, ...props }) => {
          const rotation = rotations[index] || 0;

          if (slide.type === "video") {
            return (
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <video
                  src={slide.sources?.[0]?.src}
                  controls
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            );
          }

          // fallback for images
          return render?.slide?.({ slide, rect, index, ...props });
        },
      },
    }));

    return null;
  }

  /* ---------------- Render ---------------- */
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          { /* <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bharat ©Artist™🔘
          </h1> */}
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg mb=6 ">
            Me_canon_wala
          </h2>
          <p className="text-lg md:text-xl font-semibold mb-6">🎨 Artist</p>

          <div className="text-gray-700 text-base md:text-lg max-w-2xl space-y-2">
            <p>• I help brands & creators tell stories through cinematic visuals.</p>
            <p>• Specializing in creative visuals & impactful storytelling.</p>
      
          </div>
        </section>

        {/* Gallery Section */}
        <section className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {["all", "photos", "videos"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Masonry Gallery */}
          <Masonry
           key={category} // 👈 forces re-render when category changes
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="bg-clip-padding"
          >
            {galleryItems.map((item, i) => {
                  const key = `${category}-${item.src}`; // 👈 unique key so React refreshes properly
              
              return (
                <div
                  key={key}
                  className="mb-4 cursor-pointer hover:opacity-90"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="rounded-lg shadow-md w-full object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <video
                        src={item.src}
                        className="rounded-lg shadow-md w-full object-cover"
                        muted
                        loop
                        type={item.src.endsWith(".mov") ? "video/quicktime" : "video/mp4"}
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                        onTouchStart={(e) => e.currentTarget.play()}
                        onTouchEnd={(e) => e.currentTarget.pause()}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </Masonry>

          {/* Lightbox */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={galleryItems.map((item) =>
              item.type === "image"
                ? { type: "image", src: item.src }
                : 
                 {
                    type: "video",
                           sources: [
                           {
                             src: item.src,
                             type: item.src.endsWith(".mov") ? "video/quicktime" : "video/mp4",
                           },
                                     ],
                 }
                
            )}
            plugins={[
              Video,
              (props) => (
                <RotatePlugin
                  {...props}
                  rotations={rotations}
                  setRotations={setRotations}
                />
              ),
            ]}
          />
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-black text-gray-300 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Me */}
         {/*  <div>
            <h3 className="text-lg font-semibold mb-3 text-white">About Me</h3>
            <p className="text-sm leading-relaxed">
              I’m Bharat (aka <span className="font-bold">Me_canon_wala</span>),
              a visual storyteller capturing moments through cinematic artistry.
              “Like what you see? Let’s team up and bring ideas to life.”
            </p>
          </div> */}

          {/* Contact Us */}
         {/*  <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
            <p className="text-sm">📧 bharat.warkar@gmail.com</p>
            <p className="text-sm">📱 +91 9730548830</p>
          </div> */}

          {/* Social Media */}
         {/*  <div>
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
              > */}
           {/*      <FaYoutube size={24} />
              </a>
              <a
                href="mailto:bharat.warkar@gmail.com"
                className="hover:text-blue-400 transition"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
           </div>*/} 
        {/* Divider */}
        {/*<div className="border-t border-gray-700 my-6"></div>*/}

        {/* Copyright */}
       {/* <p className="text-center text-sm text-gray-500">
          © 2025 <span className="font-semibold">Me_canon_wala</span> | Artist | Will Make It Awesome
        </p>
      {/* </footer> */}
    </div>
  );
}
