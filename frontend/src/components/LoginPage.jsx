// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const res = login(email, password);
//     if (res.success) navigate("/dashboard");
//     else setError(res.message);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-4">
//       <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">
//         {/* Header */}
//         <div className="text-center">
//           <div className="flex justify-center mb-3">
//             <FaSignInAlt className="text-5xl text-indigo-600" />
//           </div>
//           <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
//             Welcome Back
//           </h1>
//           <p className="text-gray-500 text-sm">Login to your dashboard</p>
//         </div>

//         {error && (
//           <p className="text-red-500 bg-red-100 rounded-md text-center py-2 font-medium text-sm">
//             {error}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleLogin} className="space-y-5">
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-lg" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaLock className="absolute left-3 top-3.5 text-gray-400 text-lg" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 mt-2 transition transform hover:scale-[1.02]"
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const res = login(email, password);
//     if (res.success) navigate("/dashboard");
//     else setError(res.message);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           Welcome Back
//         </h1>
//         <p className="text-center text-gray-500">Login to continue</p>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg p-3 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <FaSignInAlt className="text-5xl text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">Login to your dashboard</p>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 rounded-md text-center py-2 font-medium text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-lg" />
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
            <FaLock className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-xl pl-10 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 mt-2 transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
