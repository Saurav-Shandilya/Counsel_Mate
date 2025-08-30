// src/pages/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const serverURL = "http://localhost:5000"; // replace with your backend URL

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${serverURL}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log("Signup successful:", res.data);
      setError("");
      navigate("/signin"); // redirect after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${serverURL}/api/auth/google`;
  };

  const handleGithubSignup = () => {
    window.location.href = `${serverURL}/api/auth/github`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 pt-28 bg-black text-white">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl shadow-md border border-white/10">
        <h2 className="text-3xl font-bold text-[#bd5e2b] mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded bg-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#bd5e2b]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#bd5e2b] text-white font-semibold hover:bg-[#a04e25] transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleGoogleSignup}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Google
          </button>
          <button
            onClick={handleGithubSignup}
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-900"
          >
            GitHub
          </button>
        </div>

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
