// pages/SignUp.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 pt-28 bg-black text-white">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl shadow-md border border-white/10">
        <h2 className="text-3xl font-bold text-[#bd5e2b] mb-6 text-center">Sign Up</h2>
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#bd5e2b] text-white font-semibold hover:bg-[#a04e25] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Sign In */}
        <p className="mt-6 text-center text-sm text-[#ffffffaa]">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#bd5e2b] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
