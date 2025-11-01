import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("sam_assignments") || "[]")
  );
  const [submissions] = useState(
    JSON.parse(localStorage.getItem("sam_submissions") || "{}")
  );
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const navigate = useNavigate();

  const allUsers = JSON.parse(localStorage.getItem("sam_users") || "[]");
  const students = allUsers.filter((u) => u.role === "student");

  const createAssignment = () => {
    if (!title.trim() || !link.trim() || selectedStudents.length === 0) {
      alert("Please fill all fields and select at least one student!");
      return;
    }

    const newAssignment = {
      id: Date.now().toString(),
      title,
      driveLink: link,
      date: new Date().toLocaleDateString(),
      assignedTo: selectedStudents,
    };

    const updated = [...assignments, newAssignment];
    setAssignments(updated);
    localStorage.setItem("sam_assignments", JSON.stringify(updated));
    setTitle("");
    setLink("");
    setSelectedStudents([]);
  };

  const deleteAssignment = (id) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    localStorage.setItem("sam_assignments", JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem("sam_loggedin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white p-8 relative">
      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide">
          📘 Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Create Assignment Section */}
      <div className="bg-gray-800/80 rounded-2xl p-6 mb-10 shadow-lg backdrop-blur-sm border border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-indigo-300">
          Create New Assignment
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="Google Drive Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* 🔹 Select Students */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm text-gray-300 font-semibold uppercase tracking-wide">
            Assign To:
          </h3>
          <div className="flex flex-wrap gap-2">
            {students.map((s) => (
              <label
                key={s.email}
                className={`px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-200 text-sm font-medium ${
                  selectedStudents.includes(s.email)
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(s.email)}
                  onChange={() =>
                    setSelectedStudents((prev) =>
                      prev.includes(s.email)
                        ? prev.filter((x) => x !== s.email)
                        : [...prev, s.email]
                    )
                  }
                  className="hidden"
                />
                {s.name}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={createAssignment}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
        >
          ➕ Create Assignment
        </button>
      </div>

      {/* 🔹 Assignment List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assignments.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">
            No assignments created yet.
          </p>
        ) : (
          assignments.map((assignment) => {
            const assigned = assignment.assignedTo || [];
            const submitted = assigned.filter(
              (email) => submissions[assignment.id]?.[email]
            ).length;
            const progress =
              assigned.length > 0
                ? Math.round((submitted / assigned.length) * 100)
                : 0;

            return (
              <div
                key={assignment.id}
                className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-indigo-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {assignment.title}
                  </h3>
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    🗑️
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-3">
                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 underline hover:text-indigo-300"
                  >
                    View Assignment
                  </a>
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Student List */}
                <div className="space-y-2 text-sm mt-4">
                  {assigned.map((email) => {
                    const student = students.find((s) => s.email === email);
                    const isSubmitted = submissions[assignment.id]?.[email];
                    return (
                      <div
                        key={email}
                        className="flex justify-between items-center bg-gray-700/50 rounded-lg px-3 py-2"
                      >
                        <span>{student?.name || "Unknown Student"}</span>
                        <span
                          className={`font-semibold ${
                            isSubmitted
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {isSubmitted ? "✅ Submitted" : "❌ Not Submitted"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
