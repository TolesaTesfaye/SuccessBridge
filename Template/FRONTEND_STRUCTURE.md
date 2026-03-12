# SuccessBridge Frontend Structure

## Overview
The SuccessBridge frontend is a modern React application built with TypeScript, Vite, and Tailwind CSS. It provides a comprehensive educational platform with role-based dashboards for students, admins, and super admins.

## Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Data Fetching**: React Query
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript compiler

## Project Structure

```
Client/
├── public/                     # Static assets
├── src/                       # Source code
│   ├── assets/               # Images, logos, static files
│   │   └── AppLogo.jpg
│   ├── components/           # Reusable UI components
│   │   ├── analytics/        # Analytics & metrics components
│   │   ├── common/          # Shared UI components
│   │   ├── dashboards/      # Dashboard layout components
│   │   ├── forms/           # Form input components
│   │   ├── quizzes/         # Quiz-related components
│   │   ├── resources/       # Resource management components
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── context/             # React contexts (currently empty)
│   ├── dashboards/          # Role-based dashboard pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── student/         # Student dashboards (HS & University)
│   │   └── superadmin/      # Super admin dashboard
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Route-based page components
│   │   ├── admin/           # Admin-specific pages
│   │   ├── student/         # Student-specific pages
│   │   ├── superadmin/      # Super admin pages
│   │   └── [public pages]   # Home, Login, Register, etc.
│   ├── services/            # API service layer
│   ├── store/               # Zustand state stores
│   ├── styles/              # Additional CSS files (currently empty)
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and constants
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── postcss.config.js        # PostCSS configuration
```

## Architecture Patterns

### 1. Component Architecture
- **Atomic Design**: Components organized by complexity (common, forms, specialized)
- **Feature-Based**: Components grouped by domain (analytics, quizzes, resources)
- **Lazy Loading**: Route-based code splitting for optimal performance

### 2. State Management
- **Zustand**: Lightweight state management for auth and theme
- **Local State**: React hooks for component-specific state
- **React Query**: Server state management and caching

### 3. Routing Structure
- **Role-Based Routes**: Different routes for students, admins, super admins
- **Protected Routes**: Authentication and authorization guards
- **Lazy Loading**: Dynamic imports for better performance

## Detailed Component Structure

### Components Directory (`src/components/`)

#### Analytics (`analytics/`)
- `AnalyticsChart.tsx` - Chart visualization component
- `PerformanceMetrics.tsx` - Performance metrics display
- `StatCard.tsx` - Statistical data cards

#### Common (`common/`)
- `AppLogo.tsx` - Application logo component
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card container component
- `Error.tsx` - Error boundary component
- `ErrorMessage.tsx` - Error message display
- `Footer.tsx` - Application footer
- `Header.tsx` - Application header
- `Loading.tsx` - Loading state component
- `Modal.tsx` - Modal dialog component
- `Pagination.tsx` - Pagination controls
- `PerformanceMonitor.tsx` - Performance monitoring
- `Spinner.tsx` - Loading spinner
- `ThemeToggle.tsx` - Dark/light theme toggle
- `Toast.tsx` - Toast notification system

#### Dashboards (`dashboards/`)
- `DashboardLayout.tsx` - Dashboard layout wrapper
- `Sidebar.tsx` - Navigation sidebar

#### Forms (`forms/`)
- `FormCheckbox.tsx` - Checkbox input component
- `FormInput.tsx` - Text input component
- `FormSelect.tsx` - Select dropdown component
- `FormTextarea.tsx` - Textarea component

#### Quizzes (`quizzes/`)
- `AdminQuizCreator.tsx` - Quiz creation interface
- `QuizCard.tsx` - Quiz display card
- `QuizList.tsx` - Quiz listing component
- `QuizResults.tsx` - Quiz results display
- `QuizTaker.tsx` - Quiz taking interface

#### Resources (`resources/`)
- `ResourceCard.tsx` - Resource display card
- `ResourceFilter.tsx` - Resource filtering controls
- `ResourceList.tsx` - Resource listing component
- `ResourceUpload.tsx` - Resource upload interface
- `ResourceUploadForm.tsx` - Upload form component

### Pages Directory (`src/pages/`)

#### Public Pages
- `Home.tsx` - Landing page
- `About.tsx` - About page
- `Contact.tsx` - Contact page
- `Login.tsx` - User authentication
- `Register.tsx` - User registration
- `NotFound.tsx` - 404 error page
- `Unauthorized.tsx` - 403 error page

#### Student Pages (`student/`)
- `StudentProfile.tsx` - Student profile management
- `StudentProgress.tsx` - Progress tracking
- `StudentQuizzes.tsx` - Quiz interface for students
- `StudentResources.tsx` - Resource access for students

#### Admin Pages (`admin/`)
- `AdminAnalytics.tsx` - Analytics dashboard
- `AdminQuizzes.tsx` - Quiz management
- `AdminResources.tsx` - Resource management
- `AdminSettings.tsx` - Admin settings
- `AdminStudents.tsx` - Student management
- `AdminSubjects.tsx` - Subject management

#### Super Admin Pages (`superadmin/`)
- `SuperAdminAboutProject.tsx` - Project information
- `SuperAdminAddQuiz.tsx` - Quiz creation
- `SuperAdminAdmins.tsx` - Admin management
- `SuperAdminAnalytics.tsx` - System analytics
- `SuperAdminApprovals.tsx` - Approval workflows
- `SuperAdminResources.tsx` - Global resource management
- `SuperAdminSystem.tsx` - System management
- `SuperAdminSystemSettings.tsx` - System configuration
- `SuperAdminUniversities.tsx` - University management
- `SuperAdminUsers.tsx` - User management
- `SuperAdminVisualization.tsx` - Data visualization

### Dashboards Directory (`src/dashboards/`)

#### Student Dashboards
- `student/HighSchoolDashboard.tsx` - High school student dashboard
- `student/UniversityDashboard.tsx` - University student dashboard

#### Admin Dashboard
- `admin/AdminDashboard.tsx` - Admin control panel

#### Super Admin Dashboard
- `superadmin/SuperAdminDashboard.tsx` - Super admin control panel

## Services Layer (`src/services/`)

### API Services
- `api.ts` - Base Axios configuration with interceptors
- `authService.ts` - Authentication API calls
- `departmentService.ts` - Department management
- `progressService.ts` - Student progress tracking
- `quizService.ts` - Quiz operations
- `resourceService.ts` - Resource management
- `subjectService.ts` - Subject operations
- `universityService.ts` - University management
- `userService.ts` - User operations

### Service Features
- **Centralized API Configuration**: Base URL, headers, interceptors
- **Token Management**: Automatic token injection and refresh
- **Error Handling**: Global error handling and logout on 401
- **Type Safety**: Full TypeScript integration

## State Management (`src/store/`)

### Zustand Stores
- `authStore.ts` - Authentication state (user, token, login/logout)
- `themeStore.ts` - Theme management (dark/light mode)

### Store Features
- **Persistence**: localStorage integration for auth and theme
- **Type Safety**: Full TypeScript support
- **Minimal Boilerplate**: Simple, clean state management

## Custom Hooks (`src/hooks/`)

- `useApi.ts` - API call abstraction
- `useAuth.ts` - Authentication utilities
- `useResources.ts` - Resource management hooks

## Type System (`src/types/index.ts`)

### Core Types
- **User Types**: User, role-based interfaces
- **Education Hierarchy**: EducationLevel, Grade, Stream, University, Department, Subject
- **Resource Types**: Resource, ResourceType enum
- **Quiz Types**: Quiz, Question interfaces
- **Filter Types**: HighSchoolFilter, UniversityFilter
- **API Types**: ApiResponse, PaginatedResponse

### Type Features
- **Comprehensive Coverage**: All API responses and data structures
- **Role-Based Types**: Different interfaces for different user roles
- **Filter Types**: Type-safe filtering for resources and data
- **Generic Types**: Reusable API response wrappers

## Utilities (`src/utils/`)

- `constants.ts` - Application constants (universities, departments, subjects)
- `hierarchy.ts` - Education hierarchy utilities
- `rbac.ts` - Role-based access control utilities

## Configuration Files

### Build Configuration
- `vite.config.ts` - Vite build configuration with path aliases
- `tsconfig.json` - TypeScript compiler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

### Development Configuration
- `.eslintrc.json` - ESLint rules and configuration
- `package.json` - Dependencies, scripts, and project metadata

## Key Features

### 1. Role-Based Access Control
- **Three User Roles**: Student, Admin, Super Admin
- **Protected Routes**: Route-level authorization
- **Conditional Rendering**: Component-level access control

### 2. Educational Hierarchy Support
- **High School**: Grades 9-12 with Natural/Social streams
- **University**: Remedial, Freshman, Senior, GC categories
- **Multi-Level Filtering**: University → Department → Subject

### 3. Resource Management
- **Multiple Resource Types**: Textbooks, videos, quizzes, etc.
- **Hierarchical Organization**: By education level, grade, subject
- **Upload System**: File upload with metadata

### 4. Performance Optimization
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vendor chunk splitting
- **Performance Monitoring**: Built-in performance tracking

### 5. Modern Development Experience
- **Hot Module Replacement**: Fast development feedback
- **TypeScript**: Full type safety
- **Path Aliases**: Clean import statements
- **ESLint**: Code quality enforcement

## Development Workflow

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Development Server
- **Port**: 3000
- **HMR**: Hot Module Replacement enabled
- **Proxy**: API calls proxied to backend (localhost:5000)
- **Error Overlay**: Development error display

## Environment Configuration

### Environment Variables
- `VITE_API_URL` - Backend API base URL (defaults to http://localhost:5000/api)

### Build Targets
- **Development**: Fast builds with source maps
- **Production**: Optimized builds with code splitting

This frontend structure provides a scalable, maintainable, and performant foundation for the SuccessBridge educational platform, with clear separation of concerns and modern React development practices.