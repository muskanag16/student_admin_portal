// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AssignmentCard from "../components/AssignmentCard";

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [assignments, setAssignments] = useState([]);
//   const [submissions, setSubmissions] = useState({});
//   const [title, setTitle] = useState("");
//   const [driveLink, setDriveLink] = useState("");

//   // Load assignments + submissions
//   useEffect(() => {
//     const savedAssignments = JSON.parse(localStorage.getItem("sam_assignments") || "[]");
//     const savedSubs = JSON.parse(localStorage.getItem("sam_submissions") || "{}");
//     setAssignments(savedAssignments);
//     setSubmissions(savedSubs);
//   }, []);

//   // Save to localStorage when assignments change
//   useEffect(() => {
//     localStorage.setItem("sam_assignments", JSON.stringify(assignments));
//   }, [assignments]);

//   useEffect(() => {
//     localStorage.setItem("sam_submissions", JSON.stringify(submissions));
//   }, [submissions]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // ------------------ Admin functions ------------------
//   const handleAddAssignment = (e) => {
//     e.preventDefault();
//     if (!title.trim() || !driveLink.trim()) return;
//     const newAssignment = {
//       id: Date.now().toString(),
//       title,
//       driveLink,
//       createdBy: user.email,
//       date: new Date().toLocaleDateString(),
//     };
//     setAssignments((prev) => [...prev, newAssignment]);
//     setTitle("");
//     setDriveLink("");
//   };

//   const handleDeleteAssignment = (id) => {
//     setAssignments((prev) => prev.filter((a) => a.id !== id));
//   };

//   // ------------------ Student functions ------------------
//   const handleSubmission = (assignmentId) => {
//     if (!window.confirm("Are you sure you’ve submitted this assignment?")) return;
//     if (!window.confirm("Final confirmation: Mark as submitted?")) return;
//     setSubmissions((prev) => ({
//       ...prev,
//       [assignmentId]: { ...prev[assignmentId], [user.email]: true },
//     }));
//   };

//   // ------------------ Derived data ------------------
//   const userAssignments =
//     user.role === "admin"
//       ? assignments.filter((a) => a.createdBy === user.email)
//       : assignments;

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Sidebar */}
//       <aside className="bg-indigo-700 text-white w-full md:w-64 p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Assignment Dashboard</h2>
//           <p className="font-semibold mb-4">Logged in as:</p>
//           <p className="capitalize bg-indigo-600 rounded-md px-3 py-1 inline-block mb-6">
//             {user.role}
//           </p>

//           {user.role === "admin" && (
//             <form onSubmit={handleAddAssignment} className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Assignment title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full rounded-lg p-2 text-black"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Google Drive link"
//                 value={driveLink}
//                 onChange={(e) => setDriveLink(e.target.value)}
//                 className="w-full rounded-lg p-2 text-black"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 hover:bg-green-600 rounded-lg py-2 font-semibold"
//               >
//                 + Add Assignment
//               </button>
//             </form>
//           )}
//         </div>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 mt-8 font-semibold"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6">
//           Welcome, <span className="text-indigo-600">{user.name}</span>
//         </h1>

//         {user.role === "admin" ? (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Your Assignments</h2>
//             {userAssignments.length === 0 ? (
//               <p>No assignments yet.</p>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2">
//                 {userAssignments.map((assignment) => (
//                   <AssignmentCard
//                     key={assignment.id}
//                     assignment={assignment}
//                     submissions={submissions}
//                     onDelete={handleDeleteAssignment}
//                     isAdmin
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Available Assignments</h2>
//             {userAssignments.length === 0 ? (
//               <p>No assignments yet.</p>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2">
//                 {userAssignments.map((assignment) => (
//                   <AssignmentCard
//                     key={assignment.id}
//                     assignment={assignment}
//                     submissions={submissions}
//                     user={user}
//                     onSubmit={handleSubmission}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// // }
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AssignmentCard from "../components/AssignmentCard";
// import { Plus, LogOut, ClipboardList } from "lucide-react";

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [assignments, setAssignments] = useState([]);
//   const [submissions, setSubmissions] = useState({});
//   const [title, setTitle] = useState("");
//   const [driveLink, setDriveLink] = useState("");
//   const [editing, setEditing] = useState(null);

//   // Load data
//   useEffect(() => {
//     if (!user) return;

//     if (user.role === "admin") {
//       const storedAssignments = localStorage.getItem(`sam_assignments_${user.email}`);
//       setAssignments(storedAssignments ? JSON.parse(storedAssignments) : []);
//     } else {
//       const keys = Object.keys(localStorage).filter((k) =>
//         k.startsWith("sam_assignments_")
//       );
//       const allAssignments = keys.flatMap((k) =>
//         JSON.parse(localStorage.getItem(k) || "[]")
//       );
//       setAssignments(allAssignments);
//     }

//     const storedSubs = localStorage.getItem("sam_submissions");
//     setSubmissions(storedSubs ? JSON.parse(storedSubs) : {});
//   }, [user]);

//   // Save admin data
//   useEffect(() => {
//     if (user?.role === "admin") {
//       localStorage.setItem(`sam_assignments_${user.email}`, JSON.stringify(assignments));
//     }
//   }, [assignments, user]);

//   useEffect(() => {
//     localStorage.setItem("sam_submissions", JSON.stringify(submissions));
//   }, [submissions]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // ADMIN
//   const handleAddAssignment = (e) => {
//     e.preventDefault();
//     if (!title.trim() || !driveLink.trim()) return;

//     if (editing) {
//       const updated = assignments.map((a) =>
//         a.id === editing.id ? { ...a, title, driveLink } : a
//       );
//       setAssignments(updated);
//       setEditing(null);
//     } else {
//       const newAssignment = {
//         id: Date.now().toString(),
//         title,
//         driveLink,
//         createdBy: user.email,
//         date: new Date().toLocaleDateString(),
//       };
//       setAssignments((prev) => [...prev, newAssignment]);
//     }
//     setTitle("");
//     setDriveLink("");
//   };

//   const handleDeleteAssignment = (id) => {
//     if (window.confirm("Delete this assignment?")) {
//       setAssignments((prev) => prev.filter((a) => a.id !== id));
//     }
//   };

//   const handleEditAssignment = (a) => {
//     setEditing(a);
//     setTitle(a.title);
//     setDriveLink(a.driveLink);
//   };

//   // STUDENT
//   const handleSubmission = (assignmentId) => {
//     if (!window.confirm("Are you sure you’ve submitted this assignment?")) return;
//     if (!window.confirm("Final confirmation: Mark as submitted?")) return;

//     setSubmissions((prev) => ({
//       ...prev,
//       [assignmentId]: { ...(prev[assignmentId] || {}), [user.email]: true },
//     }));
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
//       {/* Sidebar */}
//       <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-700 p-6 flex flex-col justify-between shadow-xl">
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <ClipboardList className="text-indigo-400 w-8 h-8" />
//             <h2 className="text-2xl font-bold">Assignments</h2>
//           </div>

//           <p className="font-semibold mb-2">Logged in as:</p>
//           <p className="capitalize bg-indigo-700 rounded-md px-3 py-1 inline-block mb-6">
//             {user.role}
//           </p>

//           {user.role === "admin" && (
//             <form
//               onSubmit={handleAddAssignment}
//               className="space-y-3 bg-gray-800 p-4 rounded-xl shadow-md"
//             >
//               <h3 className="font-semibold text-lg mb-2">
//                 {editing ? "Edit Assignment" : "New Assignment"}
//               </h3>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full rounded-lg p-2 text-black focus:ring-2 focus:ring-indigo-400"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Google Drive link"
//                 value={driveLink}
//                 onChange={(e) => setDriveLink(e.target.value)}
//                 className="w-full rounded-lg p-2 text-black focus:ring-2 focus:ring-indigo-400"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-lg py-2 font-semibold flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 {editing ? "Update" : "Add"}
//               </button>
//             </form>
//           )}
//         </div>

//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 mt-8 font-semibold flex items-center justify-center gap-2 transition"
//         >
//           <LogOut className="w-4 h-4" /> Logout
//         </button>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6">
//           Welcome, <span className="text-indigo-400">{user.name}</span>
//         </h1>

//         {user.role === "admin" ? (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Your Assignments</h2>
//             {assignments.length === 0 ? (
//               <p className="text-gray-400">No assignments yet.</p>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {assignments.map((a) => (
//                   <motion.div
//                     key={a.id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <AssignmentCard
//                       assignment={a}
//                       submissions={submissions}
//                       isAdmin
//                       onDelete={() => handleDeleteAssignment(a.id)}
//                       onEdit={() => handleEditAssignment(a)}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </section>
//         ) : (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Available Assignments</h2>
//             {assignments.length === 0 ? (
//               <p className="text-gray-400">No assignments available yet.</p>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {assignments.map((a) => (
//                   <motion.div
//                     key={a.id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     whileHover={{ scale: 1.03 }}
//                   >
//                     <AssignmentCard
//                       assignment={a}
//                       submissions={submissions}
//                       user={user}
//                       onSubmit={() => handleSubmission(a.id)}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">JoinEazy</span>
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          Manage your assignments easily and efficiently — all in one place.
          Track submissions, get updates, and stay organized.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/assignments")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/profile")}
            className="bg-white/20 hover:bg-white/30 text-white border border-white px-6 py-3 rounded-full font-medium transition"
          >
            View Profile
          </motion.button>
        </div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 text-sm text-gray-200"
      >
        © {new Date().getFullYear()} JoinEazy • All Rights Reserved
      </motion.footer>
    </div>
  );
}
