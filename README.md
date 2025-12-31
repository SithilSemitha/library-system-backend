📚 Library Management System – Backend API

A RESTful backend service for managing a Library Management System built using Node.js, Express.js, and MySQL.
This project handles user authentication, book management, borrowing/returning, reservations, and fine management.

🚀 Features

🔐 User authentication (Signup & Login)

👤 Role-based users (ADMIN / MEMBER)

📘 Book management (CRUD)

🔍 Search books by title, author, category, ISBN

🔄 Borrow & return books

⏳ Reservation system

💰 Fine calculation for overdue books

📊 Admin reports & statistics

🧱 Modular Express architecture

🗄️ MySQL relational database

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MySQL

Security: bcrypt (password hashing)

API Style: REST

Dev Tools: Nodemon

📁 Project Structure
library-system-backend/
│
├── server.js
├── database.js
├── package.json
│
├── routes/
│ ├── user.routes.js
│ ├── book.routes.js
│ ├── transaction.routes.js
│ ├── reservation.routes.js
│ ├── fine.routes.js
│ └── category.routes.js
│
├── middleware/
│ ├── auth.middleware.js
│ └── admin.middleware.js
│
└── README.md

🗄️ Database Design

The system uses a normalized MySQL database with the following tables:

users

books

categories

transactions

reservations

fines

➡️ Full SQL schema is included in the project.

🔑 API Endpoints
Authentication & Users
Method Endpoint Description
POST /user/signup Register user
POST /user/login Login user
GET /user Get all users
GET /user/:uid Get user by ID
Books
Method Endpoint Description
POST /books Add new book
GET /books Get all books
GET /books/:bookId Get book by ID
PUT /books/:bookId Update book
DELETE /books/:bookId Delete book
Transactions
Method Endpoint Description
POST /transactions/borrow Borrow book
POST /transactions/return Return book
GET /transactions/user/:uid User borrow history
Reservations
Method Endpoint Description
POST /reservations Reserve book
GET /reservations/user/:uid User reservations
DELETE /reservations/:id Cancel reservation
Fines
Method Endpoint Description
GET /fines/user/:uid Get user fines
POST /fines/pay Pay fine
GET /fines Get all fines (Admin)
⚙️ Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/library-system-backend.git
cd library-system-backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Database

Create MySQL database and tables using the provided SQL schema.

Update database.js:

host: 'localhost',
user: 'root',
password: 'your_password',
database: 'library_system'

4️⃣ Run the Server
npm run dev

Server will start at:

http://localhost:3000

🧪 Testing

Use:

Postman

Thunder Client

curl

Example login request:

POST /user/login
Content-Type: application/json

{
"uname": "admin",
"password": "123456"
}

🔒 Security Notes

Passwords are hashed using bcrypt

Role-based access can be extended using middleware

JWT authentication can be added for production use

🧩 Future Enhancements

JWT authentication

Email notifications

Pagination & filtering

Rate limiting

Logging & monitoring

Docker support

👨‍💻 Author

Sithil De Silva
Software Engineering Student
Backend & API Development

📄 License

This project is licensed under the MIT License.
