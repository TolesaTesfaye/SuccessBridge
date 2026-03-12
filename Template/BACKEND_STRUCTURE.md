# SuccessBridge Backend Structure

## Current Clean Structure

```
Server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # PostgreSQL connection
│   │   ├── redis.ts      # Redis configuration
│   │   ├── initDb.ts     # Database initialization
│   │   └── seedAdmin.ts  # Seed super admin user
│   │
│   ├── models/           # Sequelize models
│   │   ├── User.ts
│   │   ├── Resource.ts
│   │   ├── Subject.ts
│   │   ├── Quiz.ts
│   │   ├── QuizResult.ts
│   │   ├── University.ts
│   │   ├── Department.ts
│   │   ├── Grade.ts
│   │   ├── Stream.ts
│   │   ├── StudentProgress.ts
│   │   ├── ResourceAccess.ts
│   │   └── index.ts      # Model associations
│   │
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts       # JWT authentication
│   │   └── errorHandler.ts
│   │
│   ├── routes/           # API routes
│   │   ├── auth.ts       # Login, register
│   │   ├── users.ts      # User management
│   │   ├── resources.ts  # Resource CRUD
│   │   ├── quizzes.ts    # Quiz management
│   │   ├── subjects.ts   # Subject management
│   │   ├── universities.ts
│   │   ├── departments.ts
│   │   └── student.ts    # Student-specific routes
│   │
│   ├── types/            # TypeScript type definitions
│   │   ├── index.ts      # Shared types
│   │   └── pg.d.ts       # PostgreSQL types
│   │
│   ├── scripts/          # Utility scripts
│   │   └── createAdmin.ts
│   │
│   └── index.ts          # Main entry point
│
├── dist/                 # Compiled JavaScript (generated)
├── uploads/              # Uploaded files
├── node_modules/         # Dependencies
├── .env                  # Environment variables
├── .env.example          # Environment template
├── package.json
├── tsconfig.json
└── .gitignore
```

## Removed Duplicates

1. ✅ Empty root folders (config/, controllers/, middleware/, models/, routes/)
2. ✅ Duplicate index.js (kept index.ts)
3. ✅ Duplicate createAdmin.js (kept createAdmin.ts)
4. ✅ Empty feature folders with only README.md files:
   - analytics/
   - auth/
   - education/
   - quizzes/
   - recommendations/
   - resources/
   - users/

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id
- POST /api/users/admins (create admin)

### Resources
- GET /api/resources
- GET /api/resources/:id
- POST /api/resources (upload)
- PUT /api/resources/:id
- DELETE /api/resources/:id

### Quizzes
- GET /api/quizzes
- GET /api/quizzes/:id
- POST /api/quizzes
- PUT /api/quizzes/:id
- DELETE /api/quizzes/:id
- POST /api/quizzes/:id/submit

### Universities
- GET /api/universities
- GET /api/universities/:id
- POST /api/universities
- PUT /api/universities/:id
- DELETE /api/universities/:id

### Departments
- GET /api/departments
- GET /api/departments/:id
- POST /api/departments
- PUT /api/departments/:id
- DELETE /api/departments/:id

### Subjects
- GET /api/subjects
- GET /api/subjects/:id
- POST /api/subjects
- PUT /api/subjects/:id
- DELETE /api/subjects/:id

### Student
- GET /api/student/progress
- GET /api/student/resources
- GET /api/student/quizzes

## Database Models

### User
- id, email, name, password, role
- studentType (high_school | university)
- highSchoolGrade, highSchoolStream
- universityLevel (remedial | freshman | senior | gc)
- university, department

### Resource
- id, title, description, type, fileUrl
- educationLevel (high_school | university)
- grade, stream
- subjectId, universityId, departmentId
- tags, uploadedBy

### Subject
- id, name, code
- departmentId, gradeId, streamId

### Quiz
- id, title, description, subjectId
- questions (JSON), timeLimit, passingScore

### QuizResult
- id, quizId, studentId
- answers (JSON), score, completedAt

### University
- id, name, location, email, phone

### Department
- id, name, universityId

### Grade
- id, name, level, educationLevelId

### Stream
- id, name, gradeId

### StudentProgress
- id, studentId, subjectId
- resourcesCompleted, quizzesCompleted
- averageScore, lastAccessedAt

### ResourceAccess
- id, resourceId, studentId
- accessedAt, duration

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=successbridge
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800

# Super Admin
SUPER_ADMIN_EMAIL=tolesatesfaye273@gmail.com
SUPER_ADMIN_PASSWORD=702512@Tol
```

## Frontend-Backend Alignment

### Resource Filtering
- Frontend sends: `educationLevel`, `grade`/`category`, `stream`, `subject`, `university`, `department`
- Backend accepts: Same parameters in query string
- Backend stores: `grade` field for both high school grades and university categories

### User Roles
- Frontend: `student`, `admin`, `super_admin`
- Backend: Same roles with RBAC middleware

### Education Hierarchy
- High School: Grade (9-12) → Stream (Natural/Social) → Subject
- University: University → Department → Subject
- University Students: Category (Remedial/Freshman/Senior/GC) → Stream (for Remedial/Freshman)

## Next Steps for Improvement

1. **Add Controllers Layer**: Separate business logic from routes
2. **Add Services Layer**: Reusable business logic
3. **Add Validators**: Input validation using Joi or Zod
4. **Add Tests**: Unit and integration tests
5. **Add API Documentation**: Swagger/OpenAPI
6. **Add Logging**: Winston or Pino
7. **Add Rate Limiting**: Express rate limit
8. **Add Caching**: Implement Redis caching
9. **Add File Storage**: Move to S3 or Cloudflare R2
10. **Add Database Migrations**: Sequelize migrations
