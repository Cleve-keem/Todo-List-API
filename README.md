# Todo List API

A robust and feature-rich REST API for managing todos with user authentication, built with **TypeScript**, **Express**, and **MySQL**. This project demonstrates best practices in backend development including authentication, validation, error handling, rate limiting, and caching.

## 🎯 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Todo Management**: Full CRUD operations for todo items
- **Rate Limiting**: Built-in request rate limiting to prevent abuse
- **Redis Caching**: Performance optimization with Redis caching layer
- **Input Validation**: Schema validation using Zod with detailed error messages
- **Error Handling**: Centralized error handling with custom exception classes
- **CORS Support**: Configured CORS for frontend integration
- **Health Check**: Health check endpoint for monitoring
- **Sequelize ORM**: Database interaction with MySQL using Sequelize ORM

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Caching**: Redis
- **Validation**: Zod
- **Rate Limiting**: express-rate-limit
- **Development**: Nodemon, tsx, Nodemon

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm package manager (v10.19.0)
- MySQL database
- Redis server (for caching)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 09-Todo-List-API
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=todo_db
   DB_USER=root
   DB_PASSWORD=your_password
   
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   
   # CORS Origins
   ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # The database schema will be created automatically via Sequelize models
   # Ensure MySQL is running and the credentials in .env are correct
   ```

## 📦 Project Structure

```
src/
├── app.ts                    # Express app configuration
├── server.ts                 # Server entry point
├── config/
│   ├── database.ts           # Database connection setup
│   └── process-supervisor.ts # Process supervision
├── controllers/
│   ├── userController.ts     # User-related logic
│   └── todoController.ts     # Todo-related logic
├── dtos/
│   ├── types/                # TypeScript type definitions
│   │   ├── express.d.ts
│   │   ├── todo.type.ts
│   │   └── user.type.ts
│   └── zod/                  # Zod validation schemas
│       ├── user.zod.ts
│       └── todo.zod.ts
├── exceptions/               # Custom exception/error classes
│   ├── AppError.ts
│   ├── AuthError.ts
│   ├── TodoError.ts
│   └── UserErrors.ts
├── lib/
│   └── redisClient.ts        # Redis client configuration
├── middleware/
│   ├── auth.middleware.ts    # JWT authentication middleware
│   ├── errorHandler.ts       # Global error handling middleware
│   ├── limiter.ts            # Rate limiting middleware
│   └── validator.ts          # Request validation middleware
├── models/
│   ├── repositories/         # Data access layer
│   │   ├── todo.repository.ts
│   │   └── user.repository.ts
│   └── schema/               # Sequelize models
│       ├── association.ts    # Model associations
│       ├── todo.schema.ts
│       └── user.schema.ts
├── routes/
│   ├── user.routes.ts        # User routes
│   └── todo.routes.ts        # Todo routes
├── services/
│   ├── todo.service.ts       # Business logic for todos
│   └── user.service.ts       # Business logic for users
└── utils/
    ├── response.ts           # Response formatting utilities
    └── token.ts              # JWT token utilities
```

## 🔌 API Endpoints

### Health Check
- **GET** `/health-check` - Returns server status and PID

### Authentication Routes (`/api/v1/auth`)
- **POST** `/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }
  ```
- **POST** `/login` - Login user and receive JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

### Todo Routes (`/api/v1/todos`) - *Requires Authentication*
- **POST** `/` - Create a new todo
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false
  }
  ```
- **GET** `/` - Fetch all todos for authenticated user
- **GET** `/:id` - Fetch a specific todo by ID
- **PUT** `/:id` - Update a todo
  ```json
  {
    "title": "Updated title",
    "completed": true
  }
  ```
- **DELETE** `/:id` - Delete a todo

## 🏃 Running the Project

### Development Mode
```bash
pnpm dev
```
This will start the server with auto-reload using Nodemon.

### Production Mode
```bash
pnpm build && pnpm start
```

The server will be available at `http://localhost:5000` (or your configured PORT).

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication for protected routes
- **Password Hashing**: Uses bcryptjs to hash passwords before storage
- **Rate Limiting**: Prevents brute force attacks with configurable rate limits
- **CORS Configuration**: Restricted CORS origins for secure cross-origin requests
- **Input Validation**: All inputs validated against Zod schemas
- **Error Handling**: Sensitive error information is not exposed to clients

## 🗄️ Caching Strategy

Redis is used to cache frequently accessed data:
- User session management
- Todo list caching
- Reduced database queries for better performance

## 🧪 Testing

To test the API endpoints, use the provided `user-request.rest` file in your REST client (VS Code REST Client extension recommended).

## 📝 Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password` - Hashed password
- `name` - User's full name
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Todos Table
- `id` - Primary key
- `userId` - Foreign key to Users table
- `title` - Todo title
- `description` - Todo description
- `completed` - Boolean status
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## 📚 Error Handling

The API uses custom error classes for better error management:
- `AppError` - General application errors
- `AuthError` - Authentication-related errors
- `TodoError` - Todo operation errors
- `UserErrors` - User-related errors

All errors are caught by the global error handler middleware and returned in a consistent format.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Backend Roadmap Project - Todo List API

## 🔗 Project Inspiration

This project is inspired by the [Todo List API project](https://roadmap.sh/projects/todo-list-api) on [roadmap.sh](https://roadmap.sh/), a platform providing free community-driven roadmaps, guides, and other educational content.

---

For more information or support, please open an issue in the repository.
