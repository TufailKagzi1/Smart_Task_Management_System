# 🗂️ Smart Task Management System

A full-stack web application built using **Spring Boot**, **React.js**, and **MySQL** that helps users manage and track tasks efficiently. The system supports user roles (Admin/User), authentication, note-taking, and task status analytics.

---

## 🚀 Features

### ✅ Authentication & Authorization

* JWT-based secure login and registration
* Role-based access control (USER / ADMIN)

### 👥 User Management

* Register, login, and update profile details
* Admin can view, update, and delete any user
* Promote a user to Admin role

### 📝 Task Management

* Create, update, delete tasks
* Assign tasks to users
* Filter by task **status** or **priority**
* View tasks by ownership (created or assigned)

### 📒 Note Management

* Create, update, view, and delete personal notes

### 📊 Dashboard & Overview

* Real-time task overview statistics for Admin
* Dashboard filtering by user, status, or priority

---

## 🛠️ Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Frontend    | React.js             |
| Backend     | Spring Boot (Java)   |
| Database    | MySQL                |
| Auth        | JWT (JSON Web Token) |
| HTTP Client | Axios                |

---

## 📁 Project Structure

```
backend/
├── src/main/java/com/tkagzi/stms/
│   ├── controller
│   ├── model
│   ├── repository
│   ├── security
│   └── service
└── application.properties

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/ApiService.js
```

---

## 🔐 API Endpoints

### Auth:

* `POST /auth/register` - Register a new user
* `POST /auth/login` - Login and receive JWT

### User:

* `GET /user/all` - Fetch all users
* `POST /user/update` - Update user info
* `DELETE /user/delete/{id}` - Delete user (Admin)
* `POST /user/username` - Change username
* `PUT /user/role/{id}` - Promote to admin

### Task:

* `POST /task/create` - Create a task
* `PUT /task/update/{id}` - Update task
* `GET /task/all-tasks` - Get all tasks (Admin)
* `GET /task/my-tasks` - Logged-in user’s tasks
* `POST /task/complete/{id}` - Mark as complete

### Notes:

* `POST /note/create` - Add a note
* `GET /note/all` - All user notes
* `DELETE /note/{id}` - Delete note

---

## 🧪 How to Run Locally

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Ensure MySQL is running and DB credentials match `application.properties`.

### Frontend (React.js)

```bash
cd frontend
npm install
npm start
```

Make sure the backend is running on `http://localhost:8080`.

---

## 🙋‍♂️ Author

**Mohammed Tufail Kagzi**
📧 [Email Me](mailto:tufailkagzi009@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/tufailkagzi)

