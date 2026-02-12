# 🗓️ Routinary Backend

> AI-powered routine generator that transforms natural language into calendar files

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

Backend API for [Routinary](https://github.com/JunLovin/Routinary) - an intelligent routine planning assistant that converts conversational prompts into structured calendar events.

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 👤 **User Management** - Complete CRUD operations for user profiles
- 📋 **Routine Management** - Create, read, update, and delete routines
- ✅ **Zod Validation** - Type-safe request validation
- 🤖 **AI Generation** _(coming soon)_ - Gemini-powered natural language to .ics conversion
- 🗄️ **PostgreSQL + Prisma** - Type-safe database operations with migrations

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **AI:** Google Gemini API _(in progress)_

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/JunLovin/Routinary-Backend.git
cd Routinary-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/routinary"
JWT_SECRET="your-super-secret-key-change-this"
PORT=3000
```

4. **Run database migrations**

```bash
npx prisma migrate dev
```

5. **Start the development server**

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

---

## 📚 API Documentation

### Authentication

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

### Users

| Method | Endpoint         | Description      | Auth Required |
| ------ | ---------------- | ---------------- | ------------- |
| GET    | `/api/users`     | Get all users    | ✅            |
| GET    | `/api/users/me`  | Get current user | ✅            |
| GET    | `/api/users/:id` | Get user by ID   | ✅            |
| PATCH  | `/api/users/:id` | Update user      | ✅            |
| DELETE | `/api/users/:id` | Delete user      | ✅            |

### Routines

| Method | Endpoint            | Description                 | Auth Required |
| ------ | ------------------- | --------------------------- | ------------- |
| GET    | `/api/routines/me`  | Get current user's routines | ✅            |
| GET    | `/api/routines/:id` | Get routine by ID           | ✅            |
| POST   | `/api/routines/`    | Create new routine          | ✅            |
| DELETE | `/api/routines/:id` | Delete routine              | ✅            |

### Messages

| Method | Endpoint                   | Description                 | Auth Required |
| ------ | -------------------------- | --------------------------- | ------------- |
| GET    | `/api/messages/:routineId` | Get current user's routines | ✅            |
| POST   | `/api/messages/`           | Creates a new message       | ✅            |

### Example Request

**Register a new user:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe"
  }'
```

**Generate a routine:**

```bash
curl -X POST http://localhost:3000/api/routines/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prompt": "Wake up at 6am, go to gym at 7am, breakfast at 8:30am",
    "title": "Morning Routine"
  }'
```

---

## 🗂️ Project Structure

```
prisma/                # Database schema and migrations
|
src/
├── controllers/       # Request handlers
├── services/          # Business logic
├── routers/            # API routers definitions
├── middlewares/       # Custom middleware (auth, validation, error handling)
├── schemas/           # Zod validation schemas
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── handlers/          # Async error handler
```

---

## 🔧 Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma migrate dev  # Run database migrations
```

---

## 🌍 Environment Variables

| Variable         | Description                  | Required         |
| ---------------- | ---------------------------- | ---------------- |
| `DATABASE_URL`   | PostgreSQL connection string | ✅               |
| `JWT_SECRET`     | Secret key for JWT signing   | ✅               |
| `PORT`           | Server port (default: 3000)  | ❌               |
| `GEMINI_API_KEY` | Google Gemini API key        | ⏳ (coming soon) |

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTORS.md](CONTRIBUTORS.md) file for guidelines on how to contribute to this project.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Frontend Repository:** [Routinary](https://github.com/JunLovin/Routinary)
- **Author:** [@JunLovin](https://github.com/JunLovin)
- **Issues:** [Report a bug or request a feature](https://github.com/JunLovin/Routinary-Backend/issues)

---

## 💡 Roadmap

- [x] User authentication and authorization
- [x] Routine CRUD operations
- [x] Zod validation
- [x] Gemini AI integration for .ics generation
- [ ] Rate limiting
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Deploy to production

---

<p align="center">Made with ❤️ by <a href="https://github.com/JunLovin">JunLovin</a></p>
