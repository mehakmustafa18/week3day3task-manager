# Task Manager Frontend ⚛️

A React.js web application for managing tasks, connected to a Node.js/Express backend with JWT authentication.

---

## 🚀 Live Backend

```
https://week3day2backend-production.up.railway.app
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js (Vite) | Frontend framework |
| React Router DOM | Page navigation |
| Axios | API calls |
| Formik | Form management |
| Yup | Form validation |
| Plain CSS | Styling & responsiveness |

---

## 📁 Folder Structure

```
task-manager-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar with logout
│   │   ├── TaskForm.jsx      # Add new task form
│   │   └── TaskList.jsx      # Tasks list with edit/delete
│   ├── pages/
│   │   ├── LoginPage.jsx     # Login screen
│   │   ├── RegisterPage.jsx  # Register screen
│   │   └── Dashboard.jsx     # Main tasks dashboard
│   ├── services/
│   │   └── api.js            # Axios setup & all API calls
│   ├── App.jsx               # Routes configuration
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## ✨ Features

- 🔐 **Register & Login** — JWT token based authentication
- 📋 **Task Dashboard** — View all your tasks in one place
- ➕ **Create Task** — Add new tasks instantly
- ✏️ **Edit Task** — Update task title inline
- 🗑️ **Delete Task** — Remove tasks with confirmation
- ✅ **Mark Complete** — Toggle task completion status
- 📊 **Stats** — Total, Completed, Pending task counts
- 🔍 **Filter** — Filter tasks by All, Pending, Completed
- 🔒 **Protected Routes** — Dashboard only accessible after login
- 📱 **Responsive** — Works on mobile, tablet, and desktop
- ☰ **Hamburger Menu** — Mobile-friendly navigation

---

## ⚙️ Getting Started

### 1 — Clone the project
```bash
git clone <your-repo-url>
cd task-manager-frontend
```

### 2 — Install dependencies
```bash
npm install
```

### 3 — Run development server
```bash
npm run dev
```

### 4 — Open in browser
```
http://localhost:5173
```

---

## 🔗 API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/stats` | Get task statistics |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 🔒 Authentication Flow

```
User registers/logs in
        ↓
Backend returns JWT token
        ↓
Token saved in localStorage
        ↓
Every API request sends token in header:
Authorization: Bearer <token>
        ↓
Backend verifies token & returns data
```

---

## 📦 Dependencies

```json
{
  "axios": "^1.6.0",
  "formik": "^2.4.5",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "yup": "^1.3.2"
}
```

---

## 🧪 Form Validation (Formik + Yup)

### Login
- Email — required, must be valid email
- Password — required, minimum 6 characters

### Register
- Name — required, minimum 2 characters
- Email — required, must be valid email
- Password — required, minimum 6 characters

### Add Task
- Title — required, minimum 2 characters

---

## 📱 Responsive Breakpoints

| Screen | Breakpoint | Changes |
|---|---|---|
| Desktop | 769px+ | Full navbar, 3-column stats |
| Tablet | max 768px | Hamburger menu, 1-column stats |
| Mobile | max 480px | Smaller padding, compact buttons |

---

## 👩‍💻 Developed By

**Mehak Mustafa**
DevSquad Bootcamp — Week 3, Day 3