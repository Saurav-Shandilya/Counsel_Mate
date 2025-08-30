// components/HelpSection.jsx
import React from "react";

export default function HelpSection() {
  return (
    <section
      id="help"
      className="min-h-screen flex items-center justify-center bg-black px-6"
    >
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-[#bd5e2b] mb-6">
          How CounselMate Helps You
        </h2>
        <p className="text-lg text-[#ffffffcc]">
          From discovering career interests to planning higher education and
          achieving your dream goals — we are here to guide you every step of
          the way.
        </p>
      </div>
    </section>
  );
}
