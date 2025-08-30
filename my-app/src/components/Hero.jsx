// components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <header
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Spline background */}
      <iframe
        src="https://my.spline.design/rollingrectangles-0Fb36sdUKNxi1CUYVsjzUjMw/"
        frameBorder="0"
        className="absolute top-0 left-0 w-full h-full"
        allow="fullscreen"
      ></iframe>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span className="block text-white">Unlock Your Career</span>
          <span className="block text-[#bd5e2b]">
            Potential with CounselMate
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#ffffffcc] max-w-2xl">
          Discover the right path, build your future roadmap, and get
          motivated to achieve success.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button className="px-6 py-3 bg-[#bd5e2b] text-white rounded-full font-semibold hover:bg-[#a04e25] transition">
            Start Journey with CounselMate
          </button>
          <button className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#201942] transition">
            Learn More about CounselMate
          </button>
        </div>
      </div>
    </header>
  );
}
