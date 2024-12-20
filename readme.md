# Task Management System API

A robust RESTful API for a task management system built with Express.js, MongoDB, and JWT authentication.

## Features

- **User Authentication**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Role-based access control (Admin and Regular users)

- **Task Management**
  - Create, read, update, and delete tasks
  - Task attributes include title, description, due date, priority, and status
  - Kanban-style board support with drag-and-drop functionality
  - Task assignment to multiple users
  - Deadline management

- **Collaboration**
  - Comment system for tasks
  - Task assignment notifications
  - Multi-user support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Register a new user
  - Body: `{ username, email, password }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ email, password }`

### Tasks

- **GET /api/tasks**
  - Get all tasks
  - Requires authentication

- **POST /api/tasks**
  - Create a new task
  - Requires authentication
  - Body: `{ title, description, dueDate, priority, assignees }`

- **PUT /api/tasks/:id**
  - Update a task
  - Requires authentication
  - Body: `{ title, description, dueDate, priority, status, assignees }`

- **DELETE /api/tasks/:id**
  - Delete a task
  - Requires authentication

- **PATCH /api/tasks/:id/status**
  - Update task status
  - Requires authentication
  - Body: `{ status }`

### Comments

- **GET /api/comments/task/:taskId**
  - Get all comments for a task
  - Requires authentication

- **POST /api/comments**
  - Add a comment to a task
  - Requires authentication
  - Body: `{ taskId, content }`

- **DELETE /api/comments/:id**
  - Delete a comment
  - Requires authentication

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your-token-here>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Data Validation

Input validation is implemented for:
- User registration and login
- Task creation and updates
- Comment creation

## Project Structure

```
├── server.js
├── models/
│   ├── user.model.js
│   ├── task.model.js
│   └── comment.model.js
├── routes/
│   ├── auth.routes.js
│   ├── task.routes.js
│   └── comment.routes.js
├── middleware/
│   └── auth.middleware.js
├── validators/
│   ├── auth.validator.js
│   ├── task.validator.js
│   └── comment.validator.js
└── .env
```

## Development

1. For development, you can use nodemon:
```bash
npm install -g nodemon
nodemon server.js
```

2. Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email@example.com](mailto:your-email@example.com) or create an issue in the repository.

## Security

Please report any security issues to [security@example.com](mailto:security@example.com).
