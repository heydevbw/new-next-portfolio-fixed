"use client";

export default function Header({ collageImages = [] }) {
  return (
    <header className="relative h-[60vh] flex items-center justify-center text-center text-white">
      {/* Background collage */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
        {collageImages.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover opacity-40 blur-sm scale-110"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Shiny 3D Text */}
      <h1 className="relative z-10 text-6xl font-extrabold bg-gradient-to-r from-gray-100 via-white to-gray-300 text-transparent bg-clip-text drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] animate-pulse">
        Bharat ©Artist™🔘
      </h1>
    </header>
  );
}
