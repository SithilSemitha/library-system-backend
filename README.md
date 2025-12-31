
---

# 📚 Library Management System - Backend API

A robust backend service for a Library Management System, built using **Node.js**, **Express.js**, and **MySQL**. This API handles the core logic for a modern library, including user authentication, book inventory, borrowing workflows, and automated fine management.

⚙️ **Backend-only project** — ready to integrate with any frontend (React, Next.js, Angular, etc.)

---

## ✨ Features

* **User Authentication:** Secure Signup & Login.
* **Role-Based Access Control (RBAC):** Differentiated permissions for `ADMIN` and `MEMBER`.
* **Book Management:** Full CRUD operations and category organization.
* **Search & Filtering:** Easily find books by title, author, or category.
* **Borrowing Workflow:** Logic for checking books out and returning them.
* **Reservation System:** Allow users to hold books that are currently unavailable.
* **Fine Management:** Handling overdue book penalties.
* **Security:** Password hashing using `bcrypt`.
* **Modular Architecture:** Clean separation of routes, logic, and database configuration.

---

## 🛠️ Tech Stack

| Technology | Usage |
| --- | --- |
| **Node.js** | JavaScript Runtime |
| **Express.js** | Web Framework |
| **MySQL** | Relational Database |
| **bcrypt** | Secure Password Hashing |
| **Nodemon** | Development Server Auto-restart |

---

## 📁 Project Structure

```text
library-system-backend/
│
├── server.js                # Entry point
├── database.js              # MySQL connection logic
├── package.json             # Dependencies & scripts
│
├── routes/                  # API Route Definitions
│   ├── user.routes.js
│   ├── book.routes.js
│   ├── transaction.routes.js
│   ├── reservation.routes.js
│   ├── fine.routes.js
│   └── category.routes.js
│
├── middleware/              # Security & Auth Logic
│   ├── auth.middleware.js
│   └── admin.middleware.js
│
└── README.md

```

---

## 🗄️ Database Overview

The database is normalized to ensure data integrity and scalability.

### Relationships

* **Users** ───< **Transactions** >─── **Books**
* **Transactions** ───< **Fines**
* **Users** ───< **Reservations** >─── **Books**
* **Categories** ───< **Books**

---

## 🔑 API Endpoints

### 🔐 Authentication & Users

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/user/signup` | Register a new user |
| `POST` | `/user/login` | Login user |
| `GET` | `/user` | Get all users (Admin) |
| `GET` | `/user/:uid` | Get user profile by ID |

### 📘 Books

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/books` | Add a new book |
| `GET` | `/books` | List all books |
| `GET` | `/books/:bookId` | Get details of a specific book |
| `PUT` | `/books/:bookId` | Update book info |
| `DELETE` | `/books/:bookId` | Remove a book |

### 🔄 Transactions & Fines

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/transactions/borrow` | Process a book checkout |
| `POST` | `/transactions/return` | Process a book return |
| `GET` | `/fines/user/:uid` | View fines for a specific user |
| `POST` | `/fines/pay` | Record a fine payment |

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-system-backend.git
cd library-system-backend

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Database

Update `database.js` with your local MySQL credentials:

```javascript
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'library_system'
};

```

> **Note:** Ensure you run the provided SQL schema script in your MySQL workbench before starting the server.

### 4. Start the Server

```bash
# For development
npm run dev

```

The server will start at: `http://localhost:3000`

---

## 🚀 Future Improvements

* [ ] **JWT Integration:** Moving from basic auth to JSON Web Tokens.
* [ ] **Pagination:** Adding `limit` and `offset` to book listings.
* [ ] **API Docs:** Implementing Swagger/OpenAPI documentation.
* [ ] **Docker:** Containerizing the Node.js app and MySQL DB.

---

## 👨‍💻 Author

**Sithil De Silva**
*Software Engineering Student | Backend & API Development*

---

## 📄 License

This project is licensed under the MIT License.

---
