# Task Management App
This is a task management application built with Node.js and Express. It uses MongoDB to store data and Mongoose for interacting with the database.

## Features
- Create, read, update, and delete tasks
- Mark tasks as completed
- Filter tasks by completion status
- Sort tasks by creation date (ascending or descending)
- User authentication and authorization
- Pagination for tasks
- Upload profile picture

## Technologies Used
- Node.js
- Express
- Mongoose
- MongoDB
- bcrypt (password hashing)
- jsonwebtoken (JSON Web Tokens for authentication)
- multer (for uploading files)

## Installation
1. Clone this repository.
2. Install the required dependencies:
```Bash
npm install
```

## Configuration
1. Create a .env file in the root directory of the project.
2. Add the following environment variable to your .env file:
```bash
PORT=3000
JWT_SECRET=your_secret_string
MONGODB_URL= mongodb_url
```
This secret string will be used to sign JSON Web Tokens. Make sure to replace your_secret_string with a strong, unique secret and mongodb_url with your database url.

## Usage
1. Start the server:
```Bash
npm start
```
## API Endpoints

### Tasks
- POST /tasks - Create a new task (requires authentication)
- GET /tasks - Get all tasks for the authenticated user (with optional query parameters for filtering, sorting, and pagination)
- GET /tasks/:id - Get a task by ID (requires authentication)
- PATCH /tasks/:id - Update a task by ID (requires authentication)
- DELETE /tasks/:id - Delete a task by ID (requires authentication)

### Users
- POST /users - Create a new user (signup)
- POST /users/login - Login an existing user
- POST /users/logout - Logout the currently authenticated user (requires authentication)
- POST /users/logoutAll - Logout from all sessions (requires authentication)
- GET /users/me - Get the profile of the currently authenticated user (requires authentication)
- PATCH /users/me - Update the profile of the currently authenticated user (requires authentication)
- DELETE /users/me - Delete the currently authenticated user (requires authentication)
- POST /users/me/avatar - Upload a profile picture for the currently authenticated user (requires authentication)
DELETE /users/me/avatar - Delete the profile picture for the currently authenticated user (requires authentication)

## Authentication

All endpoints that modify data require authentication. The API uses JSON Web Tokens (JWT) for authentication. When a user logs in, the server will send a JWT back to the client. The client should then store this token and include it in the Authorization header of subsequent requests.

The Authorization header should be formatted as follows:
```bash
Authorization: Bearer <token>
```
## License
This project is licensed under the MIT License. See the LICENSE file for more details.
