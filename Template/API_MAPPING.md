# Frontend-Backend API Mapping

## Overview
This document maps the frontend services to the exact backend API endpoints to ensure proper connectivity.

## Authentication Endpoints

### Frontend: `authService.ts`
- ✅ `POST /auth/login` - Login user
- ✅ `POST /auth/register` - Register user  
- ✅ `GET /auth/me` - Get current user
- ✅ `POST /auth/logout` - Logout user (requires authentication)

### Backend Response Format
```json
{
  "success": true,
  "data": {
    "user": { "id", "email", "name", "role", "studentType", ... },
    "token": "jwt_token"
  }
}
```

## Resource Endpoints

### Frontend: `resourceService.ts`
- ✅ `GET /resources` - Get resources with filters
- ✅ `GET /resources/:id` - Get single resource
- ✅ `POST /resources` - Upload resource (multipart/form-data)
- ✅ `PUT /resources/:id` - Update resource
- ✅ `DELETE /resources/:id` - Delete resource
- ❌ `GET /resources/search` - Not implemented in backend (removed from frontend)

### Backend Query Parameters
- `page`, `limit` - Pagination
- `type`, `resourceType` - Resource type filtering
- `educationLevel` - 'high_school' or 'university'
- `grade`, `category` - Grade/category (stored in grade field)
- `stream` - Stream filtering
- `subject`, `subjectId` - Subject filtering
- `university`, `universityId` - University filtering
- `department`, `departmentId` - Department filtering

## User Management Endpoints

### Frontend: `userService.ts`
- ✅ `GET /users` - Get all users (super admin only)
- ✅ `GET /users/:id` - Get user by ID
- ✅ `PUT /users/:id` - Update user (admin/super admin)
- ✅ `DELETE /users/:id` - Delete user (super admin only)

## Quiz Endpoints

### Frontend: `quizService.ts`
- ✅ `GET /quizzes` - Get all quizzes
- ✅ `GET /quizzes/:id` - Get quiz by ID
- ✅ `POST /quizzes` - Create quiz
- ✅ `PUT /quizzes/:id` - Update quiz
- ✅ `DELETE /quizzes/:id` - Delete quiz
- ✅ `POST /quizzes/:id/submit` - Submit quiz result

## Student Endpoints

### Frontend: `studentService.ts` (NEW)
- ✅ `GET /student/progress` - Get student progress
- ✅ `GET /student/stats` - Get student statistics

## Key Fixes Applied

1. **Response Format Alignment**: Updated services to handle backend response formats
2. **Parameter Mapping**: Fixed frontend-backend parameter mismatches
3. **Type Definitions**: Updated interfaces to match backend exactly
4. **Missing Services**: Added studentService for student-specific endpoints
5. **Removed Non-existent Endpoints**: Cleaned up frontend services

All frontend services now properly connect to the backend without mismatches.