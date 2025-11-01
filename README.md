
---

### 📘 **README.md**


# 🎓 Student Assignment Management Dashboard

A responsive React-based dashboard for managing student assignments with **role-based functionality** — built for simplicity, clarity, and progress tracking.

---

## 🚀 Features

### 👩‍🏫 **Admin (Professor)**
- Create new assignments with title and Google Drive link.
- Assign tasks to selected students.
- View all assignments created.
- Track submission progress through **individual progress bars**.
- Delete assignments if needed.
- Logout functionality.

### 👨‍🎓 **Student**
- View only assignments assigned to them.
- Submit assignments using a confirmation flow.
- See **real-time progress**: completed assignments marked as ✅.
- Beautiful, modern dark-themed UI.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js** | Frontend Framework |
| **Tailwind CSS** | Modern UI Styling |
| **React Router** | Routing between Login / Dashboard |
| **localStorage** | Data persistence (users, assignments, submissions) |
| **Framer Motion** *(optional)* | Smooth animations |

---

## 📁 Folder Structure

```

src/
├── components/
│   ├── AdminDashboard.jsx
│   ├── StudentDashboard.jsx
│   ├── AssignmentCard.jsx
│   ├── LoginPage.jsx
│   └── Navbar.jsx
├── App.jsx
├── index.js
└── styles/
└── tailwind.css

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/student-assignment-dashboard.git
````

### 2️⃣ Navigate to the project folder

```bash
cd student-assignment-dashboard
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Start the development server

```bash
npm start
```

Your app will run on **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 🔑 Local Storage Data

The app stores:

* `sam_user` → Logged-in user info
* `sam_users` → All users (students/admins)
* `sam_assignments` → Created assignments
* `sam_submissions` → Student submissions

You can clear these anytime from **DevTools → Application → Local Storage**.

---

## 🧾 Example Roles

| Email                  | Role    | Description                    |
| ---------------------- | ------- | ------------------------------ |
| `admin@example.com`    | Admin   | Can create & track assignments |
| `student1@example.com` | Student | Can view & submit assignments  |

---
## ScreenShots
<img width="1909" height="905" alt="Screenshot 2025-11-01 231142" src="https://github.com/user-attachments/assets/518dce6c-501f-40d7-a3bb-df4d08bc987f" />
<img width="1915" height="918" alt="image" src="https://github.com/user-attachments/assets/8669e87c-f670-4cb0-ab9d-0e5791f2c212" />
<img width="1914" height="957" alt="Screenshot 2025-11-01 232327" src="https://github.com/user-attachments/assets/0a5f98ce-8772-4588-bcd3-16aefce20736" />

<img width="1907" height="967" alt="Screenshot 2025-11-01 232402" src="https://github.com/user-attachments/assets/879d0803-2573-4d00-8033-03a5b37e161c" />



-
