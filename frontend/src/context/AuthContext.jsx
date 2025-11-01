// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create Context
// const AuthContext = createContext();

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("sam_user");
//     return saved ? JSON.parse(saved) : null;
//   });

//   // 🔹 Login function
//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem("sam_users") || "[]");
//     const found = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (found) {
//       setUser(found);
//       localStorage.setItem("sam_user", JSON.stringify(found));
//       return { success: true };
//     }
//     return { success: false, message: "Invalid credentials" };
//   };

//   // 🔹 Signup function
//   const signup = (name, email, password, role) => {
//     const users = JSON.parse(localStorage.getItem("sam_users") || "[]");

//     if (users.some((u) => u.email === email)) {
//       return { success: false, message: "Email already exists" };
//     }

//     const newUser = {
//       id: Date.now().toString(),
//       name,
//       email,
//       password,
//       role,
//     };

//     const updated = [...users, newUser];
//     localStorage.setItem("sam_users", JSON.stringify(updated));

//     setUser(newUser);
//     localStorage.setItem("sam_user", JSON.stringify(newUser));

//     return { success: true };
//   };

//   // 🔹 Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("sam_user");
//   };

//   // 🔹 Keep user logged in (restore from localStorage)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("sam_user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for easier access
// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sam_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Ensure we always have a user list array
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("sam_users") || "[]");
    if (!Array.isArray(users)) {
      localStorage.setItem("sam_users", JSON.stringify([]));
    }
  }, []);

  // ✅ Signup
  const signup = (name, email, password, role) => {
    const users = JSON.parse(localStorage.getItem("sam_users") || "[]");

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.trim().toLowerCase(),
      password,
      role,
      data: [], // store user-specific assignments etc.
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("sam_users", JSON.stringify(updatedUsers));
    localStorage.setItem("sam_user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  // ✅ Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("sam_users") || "[]");
    const found = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("sam_user", JSON.stringify(found));
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("sam_user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
