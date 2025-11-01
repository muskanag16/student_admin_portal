import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      const stored = localStorage.getItem(`sam_assignments_${user.email}`);
      setAssignments(stored ? JSON.parse(stored) : []);
    } else {
      const allKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("sam_assignments_")
      );
      const allAssignments = allKeys.flatMap((k) =>
        JSON.parse(localStorage.getItem(k) || "[]")
      );
      setAssignments(allAssignments);
    }

    const storedSubs = localStorage.getItem("sam_submissions");
    setSubmissions(storedSubs ? JSON.parse(storedSubs) : {});
  }, [user]);

  const handleSubmission = (id) => {
    if (!window.confirm("Confirm you’ve submitted this assignment?")) return;
    if (!window.confirm("Final confirmation: mark as submitted?")) return;

    setSubmissions((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [user.email]: true },
    }));
    localStorage.setItem("sam_submissions", JSON.stringify(submissions));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        {user.role === "admin" ? "All Assignments" : "Your Pending Assignments"}
      </h1>

      {assignments.length === 0 ? (
        <p className="text-center text-gray-400">
          No assignments available yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((a) => {
            const isSubmitted = submissions[a.id]?.[user.email];
            if (user.role === "student" && isSubmitted) return null; // hide submitted ones
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <AssignmentCard
                  assignment={a}
                  submissions={submissions}
                  user={user}
                  onSubmit={() => handleSubmission(a.id)}
                  isAdmin={user.role === "admin"}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
