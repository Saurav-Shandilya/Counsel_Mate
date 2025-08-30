// components/Navbar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollOrNavigate = (sectionId) => {
    if (location.pathname === "/") {
      // Already on homepage: scroll directly
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage and scroll to section
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleScrollOrNavigate("home")}>
          <img src="/logo.png" alt="CounselMate Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold text-[#bd5e2b]">CounselMate</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-10 font-medium text-white text-lg">
          <button onClick={() => handleScrollOrNavigate("home")} className="hover:text-[#bd5e2b] transition">
            Home
          </button>
          <button onClick={() => handleScrollOrNavigate("impact")} className="hover:text-[#bd5e2b] transition">
            Impact
          </button>
          <button onClick={() => handleScrollOrNavigate("help")} className="hover:text-[#bd5e2b] transition">
            Help
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Link to="/signin">
            <button className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#201942] transition">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 rounded-full bg-[#bd5e2b] text-white font-semibold hover:bg-[#a04e25] transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
