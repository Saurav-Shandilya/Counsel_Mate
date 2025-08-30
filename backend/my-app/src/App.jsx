// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactSection from "./components/ImpactSection";
import HelpSection from "./components/HelpSection";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay ensures DOM is loaded
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ImpactSection />
              <HelpSection />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
