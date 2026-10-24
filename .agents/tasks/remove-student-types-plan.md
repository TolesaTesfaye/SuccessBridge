# Implementation Plan: Remove Senior and GC Student Types

This plan removes the "senior" and "gc" university level types from the SuccessBridge project, leaving only "remedial" and "freshman" for university students. The system will support:
- **High School:** Grades 9-12 with natural/social streams
- **University:** Remedial and Freshman levels only

## Phase 1: Type Definitions and Models

- [ ] 1. Update Server type definitions in `Server/src/types/index.ts`
      Change all occurrences of `universityLevel?: "remedial" | "freshman" | "senior" | "gc"` to `universityLevel?: "remedial" | "freshman"` in IUser and IRegisterRequest interfaces. Remove the comment in Quiz model interface that mentions "senior | gc". Simplify department validation since it was only required for senior/gc students.
      Files: `Server/src/types/index.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 2. Update Client type definitions in `Client/src/types/index.ts`
      Change `universityLevel?: "remedial" | "freshman" | "senior" | "gc"` to `universityLevel?: "remedial" | "freshman"` in User interface. Update the UniversityFilter comment that mentions category values from `'remedial', 'freshman', 'senior', 'gc'` to `'remedial', 'freshman'`.
      Files: `Client/src/types/index.ts`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 3. Update MobileApp type definitions in `MobileApp/src/types/index.ts`
      Change the UniversityLevel type from `type UniversityLevel = 'remedial' | 'freshman' | 'senior' | 'gc';` to `type UniversityLevel = 'remedial' | 'freshman';`.
      Files: `MobileApp/src/types/index.ts`
      Verify: Run `cd MobileApp && npx tsc --noEmit` — TypeScript compilation passes with no errors.

## Phase 2: Database Models

- [ ] 4. Update User model ENUM definition in `Server/src/models/User.ts`
      Change the universityLevel DataTypes.ENUM from `DataTypes.ENUM('remedial', 'freshman', 'senior', 'gc')` to `DataTypes.ENUM('remedial', 'freshman')` (line 113). Update the class property type on line 22 from `public universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'` to `public universityLevel?: 'remedial' | 'freshman'`. Note: This creates a database schema change that will be handled by Sequelize sync.
      Files: `Server/src/models/User.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 5. Update PendingUser model ENUM definition in `Server/src/models/PendingUser.ts`
      Change universityLevel ENUM from `DataTypes.ENUM('remedial', 'freshman', 'senior', 'gc')` to `DataTypes.ENUM('remedial', 'freshman')` (line 78). Update the interface property on line 13 and class property on line 31 from `universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'` to `universityLevel?: 'remedial' | 'freshman'`.
      Files: `Server/src/models/PendingUser.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 6. Update Quiz model comments in `Server/src/models/Quiz.ts`
      Update the comment on line 19 from `/** High school: grade_9–12; university: remedial | freshman | senior | gc */` to `/** High school: grade_9–12; university: remedial | freshman */`. Update the comment on line 24 from `/** Department name for senior/gc (matches User.department) */` to `/** Department name (optional for university students) */`.
      Files: `Server/src/models/Quiz.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 3: Seed Data and Services

- [ ] 7. Update seed data in `Server/src/config/seedEducationData.ts`
      Remove the Senior and GC entries from the GRADES array (lines 15-16). Remove these two lines:
      `{ name: 'Senior', level: 4, educationLevel: 'university' as const },`
      `{ name: 'GC', level: 5, educationLevel: 'university' as const },`
      Files: `Server/src/config/seedEducationData.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 8. Update gradeService seed data in `Server/src/services/gradeService.ts`
      In the seedGrades method (lines 48-49), remove the Senior and GC grade entries from the grades array:
      `{ name: 'Senior', level: 4, educationLevel: 'university' },`
      `{ name: 'GC', level: 5, educationLevel: 'university' },`
      Files: `Server/src/services/gradeService.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 9. Update userService type in `Server/src/services/userService.ts`
      Change the UpdateUserDTO interface universityLevel property on line 13 from `universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'` to `universityLevel?: 'remedial' | 'freshman'`.
      Files: `Server/src/services/userService.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 4: Authentication and Validation

- [ ] 10. Simplify validation logic in `Server/src/controllers/authController.ts`
      Since department is no longer specifically required only for senior/gc students, the validation in the completeOAuthProfile function (around line 565) can remain as is, but consider updating the error message for clarity. The current validation `if (!universityLevel || !university || !department)` treats department as required for all university students now that we only have remedial and freshman. Review if department should remain required or become optional for remedial/freshman.
      Files: `Server/src/controllers/authController.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 5: API Documentation

- [ ] 11. Update API documentation in `Server/src/routes/auth.ts`
      Change the universityLevel enum in the Swagger documentation from `enum: [remedial, freshman, senior, gc]` to `enum: [remedial, freshman]` (line 384).
      Files: `Server/src/routes/auth.ts`
      Verify: Run `cd Server && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 6: Client Constants and UI Utilities

- [ ] 12. Remove senior and gc from constants in `Client/src/utils/constants.ts`
      Delete the `senior` object (lines 187-191) and the `gc` object (lines 191-197) from the UNIVERSITY_CATEGORIES constant. This leaves only `remedial` and `freshman` categories.
      Files: `Client/src/utils/constants.ts`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 7: Client UI Components - Registration and Profile

- [ ] 13. Update Register component in `Client/src/pages/Register.tsx`
      Change the UniversityLevel type definition on line 21 from `type UniversityLevel = "remedial" | "freshman" | "senior" | "gc" | null;` to `type UniversityLevel = "remedial" | "freshman" | null;`. Find all dropdown options or select elements that show senior/gc and remove them. Update validation logic that may have special handling for senior/gc students requiring departments.
      Files: `Client/src/pages/Register.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 14. Update CompleteProfile component in `Client/src/pages/CompleteProfile.tsx`
      Remove senior and gc options from any university level dropdowns. Update validation to simplify department requirements since senior/gc-specific logic is no longer needed.
      Files: `Client/src/pages/CompleteProfile.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 8: Client UI Components - Admin and SuperAdmin

- [ ] 15. Update SuperAdminDashboard in `Client/src/dashboards/superadmin/SuperAdminDashboard.tsx`
      Change the UNIVERSITY_LEVELS constant on line 45 from `["freshman", "remedial", "senior", "gc"]` to `["freshman", "remedial"]`.
      Files: `Client/src/dashboards/superadmin/SuperAdminDashboard.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 16. Update StudentViewWrapper in `Client/src/dashboards/superadmin/components/StudentViewWrapper.tsx`
      Change the UniversityLevel type on line 7 from `type UniversityLevel = "freshman" | "remedial" | "senior" | "gc";` to `type UniversityLevel = "freshman" | "remedial";`.
      Files: `Client/src/dashboards/superadmin/components/StudentViewWrapper.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 17. Update UniversityLevelDashboard in `Client/src/dashboards/superadmin/components/UniversityLevelDashboard.tsx`
      Change the UniversityLevel type on line 10 from `type UniversityLevel = "freshman" | "remedial" | "senior" | "gc";` to `type UniversityLevel = "freshman" | "remedial";`.
      Files: `Client/src/dashboards/superadmin/components/UniversityLevelDashboard.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 18. Update SuperAdminUniversityView in `Client/src/pages/superadmin/SuperAdminUniversityView.tsx`
      Change the UniversityLevel type on line 8 from `type UniversityLevel = "freshman" | "remedial" | "senior" | "gc";` to `type UniversityLevel = "freshman" | "remedial";`. Update the UNIVERSITY_TABS array to remove senior and gc tab entries if they exist.
      Files: `Client/src/pages/superadmin/SuperAdminUniversityView.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 9: Client UI Components - Resources and Quizzes

- [ ] 19. Update ResourceUploadForm in `Client/src/components/resources/ResourceUploadForm.tsx`
      Remove the validation logic on line 355 that checks `if ((formData.category === "senior" || formData.category === "gc") && !formData.departmentId)`. Remove or update the error message on line 356 about department being required for senior/gc students. Update the showDepartmentDropdown logic on line 435 from `formData.category === "senior" || formData.category === "gc"` to handle only remedial/freshman or make department optional for all university students.
      Files: `Client/src/components/resources/ResourceUploadForm.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 20. Update AdminQuizCreator in `Client/src/components/quizzes/AdminQuizCreator.tsx`
      Remove the validation on line 161 that checks `if (["senior", "gc"].includes(category) && !departmentId)`. Remove or update the corresponding alert about selecting department for Senior/GC students. Update the department assignment logic on line 187 from `educationLevel === "university" && ["senior", "gc"].includes(category) ? departmentId : undefined` to handle only remedial/freshman or make department optional. Remove the conditional rendering on line 404 `{["senior", "gc"].includes(category) && (` that shows department dropdown only for senior/gc.
      Files: `Client/src/components/quizzes/AdminQuizCreator.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 21. Update SuperAdminAddQuiz in `Client/src/pages/superadmin/SuperAdminAddQuiz.tsx`
      Remove the validation on line 540 that checks `if (["senior", "gc"].includes(category) && !departmentId)`. Remove the toast error on line 541 about department for Senior/GC students. Update the department assignment on line 589 from `educationLevel === "university" && ["senior", "gc"].includes(category) ? departmentId : undefined` to handle only remedial/freshman. Remove the conditional rendering on line 1141 `{["senior", "gc"].includes(props.category) && (` that shows department dropdown only for senior/gc.
      Files: `Client/src/pages/superadmin/SuperAdminAddQuiz.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 10: Client UI Components - Dashboard Features

- [ ] 22. Update Sidebar quiz visibility logic in `Client/src/components/dashboards/Sidebar.tsx`
      Remove or update the shouldShowQuizzes logic on lines 35-38. Currently it hides quizzes for senior/gc university students. Since we're removing those types, this logic can be simplified or removed entirely. Update to: `const shouldShowQuizzes = true;` or remove the condition.
      Files: `Client/src/components/dashboards/Sidebar.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

- [ ] 23. Update UniversityDashboard in `Client/src/dashboards/student/UniversityDashboard.tsx`
      Change the StudentCategory type on line 18 from `type StudentCategory = "remedial" | "freshman" | "senior" | "gc";` to `type StudentCategory = "remedial" | "freshman";`. Remove any UI tabs or sections specific to senior/gc categories.
      Files: `Client/src/dashboards/student/UniversityDashboard.tsx`
      Verify: Run `cd Client && npm run type-check` — TypeScript compilation passes with no errors.

## Phase 11: MobileApp UI Components

- [ ] 24. Update RegisterScreen in `MobileApp/src/screens/auth/RegisterScreen.tsx`
      Remove the senior and gc options from the university level picker array (lines 32-33). Remove these entries:
      `{ value: 'senior', label: 'Senior' },`
      `{ value: 'gc', label: 'GC' },`
      Files: `MobileApp/src/screens/auth/RegisterScreen.tsx`
      Verify: Run `cd MobileApp && npx tsc --noEmit` — TypeScript compilation passes with no errors.

- [ ] 25. Update CompleteProfileScreen in `MobileApp/src/screens/auth/CompleteProfileScreen.tsx`
      Remove senior and gc options from university level selection if present. Update validation and UI to remove senior/gc-specific handling.
      Files: `MobileApp/src/screens/auth/CompleteProfileScreen.tsx`
      Verify: Run `cd MobileApp && npx tsc --noEmit` — TypeScript compilation passes with no errors.

- [ ] 26. Review InfoInspectorModal in `MobileApp/src/components/common/InfoInspectorModal.tsx`
      The file contains a hardcoded string 'SuccessBridge Senior Academic Faculty' on line 256 which is unrelated to student types - it's about faculty. No change needed, but verify the context during implementation.
      Files: `MobileApp/src/components/common/InfoInspectorModal.tsx`
      Verify: Run `cd MobileApp && npx tsc --noEmit` — TypeScript compilation passes with no errors.

## Phase 12: Build and Integration Testing

- [ ] 27. Build and test Server application
      Run full TypeScript compilation and verify no type errors. The database ENUM changes will be applied when the server starts and Sequelize syncs the schema. Note: Existing database records with "senior" or "gc" values will need manual cleanup or migration.
      Files: All Server files
      Verify: Run `cd Server && npm run build` — Build completes successfully with no errors.

- [ ] 28. Build and test Client application
      Run full TypeScript compilation and Vite build to ensure all UI components compile correctly. Test that registration flows, profile completion, resource uploads, and quiz creation all work without senior/gc options.
      Files: All Client files
      Verify: Run `cd Client && npm run build` — Build completes successfully with no errors.

- [ ] 29. Build and test MobileApp application
      Run TypeScript compilation to ensure the mobile app compiles correctly with updated types. Test registration and profile screens to verify senior/gc options are removed.
      Files: All MobileApp files
      Verify: Run `cd MobileApp && npx tsc --noEmit` — TypeScript compilation passes with no errors.

- [ ] 30. Run full system integration test
      Start the server and client applications. Test the complete user flow: registration as university student (should only see remedial/freshman options), profile completion, resource browsing, and quiz taking. Verify no UI elements reference senior or gc student types.
      Files: All project files
      Verify: Run `npm run dev` from project root — Both server and client start successfully. Manual testing confirms senior/gc options are removed throughout the application.

## Database Migration Notes

**IMPORTANT:** The database ENUM changes in the User and PendingUser models will require careful handling:

1. If using Sequelize with `alter: true` or `sync({ alter: true })`, the ENUM will be updated automatically when the server starts.
2. If using production database with strict migrations, a manual migration SQL script may be needed to:
   - Check for existing users with universityLevel = 'senior' or 'gc'
   - Either migrate them to 'freshman' or handle them appropriately
   - Alter the ENUM type to remove 'senior' and 'gc' values
3. For PostgreSQL, the SQL would look like:
   ```sql
   -- First, update any existing senior/gc users
   UPDATE users SET "universityLevel" = 'freshman' WHERE "universityLevel" IN ('senior', 'gc');
   UPDATE pending_users SET "universityLevel" = 'freshman' WHERE "universityLevel" IN ('senior', 'gc');
   
   -- Then alter the ENUM type
   ALTER TYPE "enum_users_universityLevel" RENAME TO "enum_users_universityLevel_old";
   CREATE TYPE "enum_users_universityLevel" AS ENUM ('remedial', 'freshman');
   ALTER TABLE users ALTER COLUMN "universityLevel" TYPE "enum_users_universityLevel" USING "universityLevel"::text::"enum_users_universityLevel";
   DROP TYPE "enum_users_universityLevel_old";
   
   -- Repeat for pending_users table
   ALTER TYPE "enum_pending_users_universityLevel" RENAME TO "enum_pending_users_universityLevel_old";
   CREATE TYPE "enum_pending_users_universityLevel" AS ENUM ('remedial', 'freshman');
   ALTER TABLE pending_users ALTER COLUMN "universityLevel" TYPE "enum_pending_users_universityLevel" USING "universityLevel"::text::"enum_pending_users_universityLevel";
   DROP TYPE "enum_pending_users_universityLevel_old";
   ```

## Summary

This plan systematically removes senior and gc student types from:
- 3 type definition files (Server, Client, MobileApp)
- 3 database model files (User, PendingUser, Quiz)
- 2 seed data files (seedEducationData, gradeService)
- 1 service file (userService)
- 1 authentication controller and 1 route documentation file
- 1 constants file
- 14 UI component files across Client and MobileApp

Total: 26 files to modify across all three platforms (Server, Client, MobileApp)

The changes ensure the system only supports high school (grades 9-12) and university (remedial and freshman only) student types, simplifying the codebase and reducing complexity around department requirements.
