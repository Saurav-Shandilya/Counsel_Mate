// components/ImpactSection.jsx
import React from "react";

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#1a1a1a] px-6"
    >
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[#bd5e2b] mb-6">
          Impact of CounselMate
        </h2>
        <p className="text-lg md:text-xl text-[#ffffffcc] leading-relaxed">
          CounselMate is transforming how students plan their careers. With the
          right mentorship, personalized roadmaps, and motivational guidance,
          students unlock opportunities and step confidently into their future.
        </p>
      </div>
    </section>
  );
}
