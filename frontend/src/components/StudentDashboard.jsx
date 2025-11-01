
import React, { useState, useEffect } from "react";
import AssignmentCard from "./AssignmentCard";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("sam_user"));
  const allAssignments = JSON.parse(localStorage.getItem("sam_assignments") || "[]");
  const [submissions, setSubmissions] = useState(
    JSON.parse(localStorage.getItem("sam_submissions") || "{}")
  );

  // ✅ Student’s assignments
  const assignments = allAssignments.filter(
    (a) => Array.isArray(a.assignedTo) && a.assignedTo.includes(user.email)
  );

  // ✅ Calculate progress
  const total = assignments.length;
  const completed = assignments.filter(
    (a) => submissions[a.id]?.[user.email]
  ).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // ✅ Handle submission
  const handleSubmit = (assignmentId) => {
    const updated = {
      ...submissions,
      [assignmentId]: {
        ...(submissions[assignmentId] || {}),
        [user.email]: true,
      },
    };
    setSubmissions(updated);
    localStorage.setItem("sam_submissions", JSON.stringify(updated));
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("sam_user");
    window.location.href = "/"; // redirect to login/start page
  };

  useEffect(() => {
    document.title = `${user.name}'s Dashboard - ${progress}% complete`;
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col">
      {/* 🔹 Top Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
          🎓 Student Dashboard
        </h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-300 text-sm">
            Welcome, <span className="font-semibold text-white">{user.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Dashboard Content */}
      <main className="flex-1 p-8 space-y-10">
        {/* Progress Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800">
          <div>
            <h2 className="text-2xl font-semibold mb-2">📊 Your Progress</h2>
            <p className="text-gray-400 mb-3">
              Completed <span className="text-blue-400 font-semibold">{completed}</span> of{" "}
              <span className="text-blue-400 font-semibold">{total}</span> assignments
            </p>

            {/* Linear Progress Bar */}
            <div className="w-64 bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Circular Progress Chart */}
          <div className="relative w-32 h-32 mt-8 md:mt-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="gray"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="url(#grad)"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 - (progress / 100) * 283}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-white">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* 🔹 Assignment List */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">
            📝 My Assignments
          </h2>

          {assignments.length === 0 ? (
            <p className="text-gray-400 text-center py-10 bg-gray-900 rounded-xl">
              No assignments assigned yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submissions={submissions}
                  user={user}
                  onSubmit={handleSubmit}
                  isAdmin={false}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
