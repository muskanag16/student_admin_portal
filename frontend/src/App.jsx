import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import AssignmentsPage from "./components/AssignmentsPage";
import SignupPage from "./components/SignupPage";
import Dashboard  from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
  <Route path="/assignments" element={<RoleRedirect />} />
          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              
            }
            
          />
            <Route path="/assignments" element={<AssignmentsPage />} />
   <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
function RoleRedirect() {
  const user = JSON.parse(localStorage.getItem("sam_user"));
  if (!user) {
    alert("Please log in first!");
    window.location.href = "/";
    return null;
  }

  if (user.role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/student";
  }

  return null;
}
