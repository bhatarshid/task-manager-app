# Task Manager App

Task Manager is a full-stack web application designed to help users efficiently manage their tasks. The application provides features such as user authentication, task creation, task management, and profile customization. It is built using modern web technologies, including React, Redux, Node.js, Express, and MongoDB.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Sign Up & Login**: Secure user authentication using JSON Web Tokens (JWT).
- **Profile Management**: Update user details, upload profile pictures, and delete accounts.
- **Task Management**:
  - Create, edit, and delete tasks.
  - Mark tasks as completed or pending.
  - Set task priorities (Low, Medium, High).
  - View tasks in a responsive dashboard.
- Modular and scalable project structure.
- Lightweight and efficient, powered by **Express.js**.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **React Router**: For client-side routing.
- **Tailwind CSS**: For styling.
- **Vite**: For fast development and build tooling.

### Backend
- **Node.js**: For server-side JavaScript runtime.
- **Express**: For building RESTful APIs.
- **MongoDB**: For database storage.
- **Mongoose**: For object data modeling (ODM).
- **JWT**: For secure user authentication.
- **Multer**: For handling file uploads.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (installed locally or use a hosted MongoDB Atlas URI)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bhatarshid/task-manager-app.git
   cd task-manager-app
   ```
2. Backend Server
   1. ```bash
      cd task-manager
      npm install
      ```
   2. Create .env file in this directory
   3. Add the following environment variable to your .env file:
      ```bash
      PORT=3000
      JWT_SECRET=your_secret_string
      MONGODB_URL= mongodb_url
      ```
      This secret string will be used to sign JSON Web Tokens. Make sure to replace your_secret_string with a strong, unique secret and mongodb_url with your database url.
   4. Start the Server
      ```bash
      npm run dev
      ```
3. Client:
   1. ```bash
      cd task-manager-client
      npm install
      ```
   2. Create .env file in this directory
   3. Add the following environment variable to your .env file:
      ```bash
      VITE_API_URL=http://localhost:3000
      ```
   4. Start the Client
      ```bash
      npm run dev
      ```
---
## Usage

Once both the frontend and backend are running, you can interact with the backend using API clients like Postman or cURL.
The client will be running on http://localhost:5173.

---

## API Endpoints

### User Routes

| Method | Endpoint                 | Description                          | Authentication |
|--------|--------------------------|--------------------------------------|----------------|
| POST   | `/users`                 | Create a new user (Sign Up)          | No             |
| POST   | `/users/login`          | Login an existing user               | No             |
| POST   | `/users/logout`         | Logout the current user              | Yes            |
| GET    | `/users/me`             | Get the logged-in user's profile     | Yes            |
| PATCH  | `/users/me`             | Update the logged-in user's profile  | Yes            |
| DELETE | `/users/me`             | Delete the logged-in user's account  | Yes            |
| POST   | `/users/me/avatar`      | Upload a profile picture             | Yes            |
| DELETE | `/users/me/avatar`      | Delete the profile picture           | Yes            |


### Task Routes

| Method | Endpoint        | Description                 | Authentication |
|--------|------------------|-----------------------------|----------------|
| POST   | `/tasks`         | Create a new task           | Yes            |
| GET    | `/tasks`         | Get all tasks for the user  | Yes            |
| GET    | `/tasks/:id`     | Get a specific task by ID   | Yes            |
| PATCH  | `/tasks/:id`     | Update a task by ID         | Yes            |
| DELETE | `/tasks/:id`     | Delete a task by ID         | Yes            |

---
## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your forked repository:
    ```bash
   git commit -m "Add your descriptive commit message here"
   git push origin feature-name
   ```
4. Open a pull request to the `master` branch of this repository.
   
---
## License

This project is licensed under the MIT License. See the LICENSE file for more details.

