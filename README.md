# 🎓 SuccessBridge - Educational Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**SuccessBridge** is a comprehensive educational learning platform designed to bridge the gap between high school and university education. The platform provides personalized learning experiences, resource management, quiz systems, and analytics for students, administrators, and super administrators.

### 🎯 Mission
To create an accessible, scalable, and effective learning environment that supports students' educational journey from high school through university.

## ✨ Features

### 👨‍🎓 **For Students**
- **Personalized Dashboards**: Separate interfaces for high school and university students
- **Grade-Specific Content**: Resources filtered by grade levels (9-12) and university levels
- **Interactive Quizzes**: Comprehensive quiz system with instant feedback
- **Progress Tracking**: Monitor learning progress and performance analytics
- **Resource Library**: Access to curated educational materials
- **Profile Management**: Manage personal information and academic details

### 👨‍🏫 **For Administrators**
- **Student Management**: Oversee student enrollment and progress
- **Resource Management**: Upload, organize, and manage educational content
- **Quiz Creation**: Create and manage assessments
- **Analytics Dashboard**: View performance metrics and insights
- **Subject Management**: Organize curriculum and subjects
- **Department Oversight**: Manage departmental activities

### 🔧 **For Super Administrators**
- **System-Wide Analytics**: Comprehensive platform insights and visualizations
- **User Management**: Manage all users (students, admins, super admins)
- **University Management**: Oversee multiple institutions
- **Approval System**: Review and approve resources and content
- **System Configuration**: Platform-wide settings and configurations
- **Advanced Reporting**: Detailed reports and data exports

## 🛠 Tech Stack

### **Frontend**
- **React 18.2** - Modern UI library with hooks
- **TypeScript 5.3** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM 6.20** - Client-side routing
- **Zustand 4.4** - Lightweight state management
- **React Query 3.39** - Data fetching and caching
- **Axios 1.6** - HTTP client
- **Lucide React** - Beautiful icons

### **Backend**
- **Node.js 18+** - JavaScript runtime
- **Express 4.18** - Web application framework
- **TypeScript 5.3** - Type-safe server development
- **Sequelize 6.35** - PostgreSQL ORM
- **PostgreSQL 15+** - Primary database
- **Redis 4.6** - Caching and session storage
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Swagger** - API documentation

### **DevOps & Deployment**
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting
- **Supabase** - PostgreSQL database hosting
- **GitHub Actions** - CI/CD pipeline
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🏗 Architecture

```
SuccessBridge/
├── Client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── dashboards/    # Role-specific dashboards
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   └── store/         # State management
│   └── public/            # Static assets
├── Server/                # Node.js Backend Application
│   ├── src/
│   │   ├── config/        # Database and app configuration
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── uploads/           # File storage
└── docs/                  # Documentation
```

### **Database Schema**

The platform uses a relational database with the following key entities:

- **Users** - Students, Admins, Super Admins
- **Universities** - Educational institutions
- **Departments** - Academic departments
- **Subjects** - Course subjects
- **Resources** - Educational materials
- **Quizzes** - Assessments and tests
- **Quiz Results** - Student performance data
- **Student Progress** - Learning analytics

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 15+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **npm or yarn** - Package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SuccessBridge.git
   cd SuccessBridge
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd Client
   npm install
   
   # Install backend dependencies
   cd ../Server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment files
   cp Server/.env.example Server/.env
   cp Client/.env.example Client/.env
   ```

4. **Configure database**
   ```bash
   # Update Server/.env with your database credentials
   DATABASE_URL=postgresql://username:password@localhost:5432/successbridge
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd Server
   npm run dev
   
   # Terminal 2: Start frontend
   cd Client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## ⚙️ Installation

### Detailed Setup Guide

#### 1. Environment Setup

**Backend Environment (Server/.env)**
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/successbridge
DB_HOST=localhost
DB_PORT=5432
DB_NAME=successbridge
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Admin Credentials
SUPER_ADMIN_EMAIL=admin@successbridge.com
SUPER_ADMIN_PASSWORD=SecurePassword123
ADMIN_EMAIL=admin@university.com
ADMIN_PASSWORD=SecurePassword123
```

**Frontend Environment (Client/.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SuccessBridge
VITE_APP_VERSION=1.0.0
```

#### 2. Database Setup

**Create Database**
```sql
CREATE DATABASE successbridge;
CREATE USER successbridge_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE successbridge TO successbridge_user;
```

**Run Migrations**
```bash
cd Server
npm run dev  # This will auto-sync the database schema
```

#### 3. Seed Data

```bash
# Seed admin users
npm run dev  # Admins are created automatically on first run

# Seed sample data (optional)
npm run seed:freshman
```

## 🔧 Configuration

### Application Settings

The platform supports various configuration options:

#### **Authentication**
- JWT-based authentication
- Role-based access control (Student, Admin, Super Admin)
- Session management with Redis

#### **File Upload**
- Maximum file size: 10MB
- Supported formats: PDF, DOC, DOCX, PPT, PPTX, images
- Storage: Local filesystem with cloud backup option

#### **Database**
- Connection pooling for performance
- Automatic retry on connection failures
- SSL support for production

#### **Caching**
- Redis for session storage
- API response caching
- Static asset caching

## 📖 Usage

### User Roles and Permissions

#### **Students**
```typescript
// Access levels
- View assigned resources
- Take quizzes and view results
- Track personal progress
- Update profile information
```

#### **Administrators**
```typescript
// Access levels
- Manage students in their department
- Upload and manage resources
- Create and manage quizzes
- View department analytics
```

#### **Super Administrators**
```typescript
// Access levels
- Full system access
- Manage all users and institutions
- System-wide analytics
- Platform configuration
```

### API Usage Examples

#### **Authentication**
```javascript
// Login
POST /api/auth/login
{
  "email": "student@university.com",
  "password": "password123"
}

// Response
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "student@university.com",
    "role": "student",
    "profile": {...}
  }
}
```

#### **Resource Management**
```javascript
// Get resources
GET /api/resources?grade=11&subject=mathematics

// Upload resource
POST /api/resources
Content-Type: multipart/form-data
{
  "title": "Algebra Basics",
  "description": "Introduction to algebra",
  "grade": "11",
  "subject": "mathematics",
  "file": [file]
}
```

#### **Quiz System**
```javascript
// Get quiz
GET /api/quizzes/1

// Submit quiz
POST /api/quizzes/1/submit
{
  "answers": [
    {"questionId": 1, "answer": "A"},
    {"questionId": 2, "answer": "B"}
  ]
}
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Resource Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/resources` | Get resources | Yes |
| POST | `/api/resources` | Upload resource | Admin+ |
| GET | `/api/resources/:id` | Get specific resource | Yes |
| PUT | `/api/resources/:id` | Update resource | Admin+ |
| DELETE | `/api/resources/:id` | Delete resource | Admin+ |

### Quiz Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/quizzes` | Get quizzes | Yes |
| POST | `/api/quizzes` | Create quiz | Admin+ |
| GET | `/api/quizzes/:id` | Get specific quiz | Yes |
| POST | `/api/quizzes/:id/submit` | Submit quiz | Student |
| GET | `/api/quizzes/:id/results` | Get quiz results | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get users | Admin+ |
| GET | `/api/users/:id` | Get specific user | Admin+ |
| PUT | `/api/users/:id` | Update user | Admin+ |
| DELETE | `/api/users/:id` | Delete user | Super Admin |

For complete API documentation, visit: `http://localhost:5000/api-docs`

## 🚀 Deployment

### Production Deployment

#### **Frontend (Vercel)**

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git push origin main
   
   # Connect to Vercel
   # Visit vercel.com and import your repository
   ```

2. **Configure Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install",
     "framework": "vite"
   }
   ```

3. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   VITE_APP_NAME=SuccessBridge
   ```

#### **Backend (Railway/Render)**

1. **Railway Deployment**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db
   JWT_SECRET=production-secret-key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

#### **Database (Supabase)**

1. **Create Project**
   - Visit supabase.com
   - Create new project
   - Get connection string

2. **Configure Connection**
   ```env
   DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
   ```

### Docker Deployment

```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./Client
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:5000/api
  
  backend:
    build: ./Server
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/successbridge
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=successbridge
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🤝 Contributing

We welcome contributions to SuccessBridge! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Reporting Issues

Please use the GitHub issue tracker to report bugs or request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Node.js community for excellent tools
- PostgreSQL for reliable database
- All contributors and supporters

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/SuccessBridge/issues)
- **Email**: support@successbridge.com
- **Discord**: [Join our community](https://discord.gg/successbridge)

---

**Made with ❤️ by the SuccessBridge Team**

*Bridging the gap between education and success*