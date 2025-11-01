import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserGraduate, FaChalkboardTeacher, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const res = signup(name, email, password, role);
    if (res.success) navigate("/dashboard");
    else setError(res.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm">Join your assignment dashboard</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium text-sm">Select Your Role</label>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 flex flex-col items-center border-2 rounded-xl py-3 transition-all ${
                  role === "student"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md"
                    : "border-gray-300 text-gray-600 hover:border-indigo-300"
                }`}
              >
                <FaUserGraduate className="text-3xl mb-1" />
                <span className="font-semibold text-sm">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 flex flex-col items-center border-2 rounded-xl py-3 transition-all ${
                  role === "admin"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md"
                    : "border-gray-300 text-gray-600 hover:border-indigo-300"
                }`}
              >
                <FaChalkboardTeacher className="text-3xl mb-1" />
                <span className="font-semibold text-sm">Admin</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 mt-2 transition transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

