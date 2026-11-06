-- Check if users exist
SELECT id, name, email, role FROM "Users" LIMIT 5;

-- Check if SubjectAccess table exists
SELECT * FROM "SubjectAccess" LIMIT 5;

-- Check if Subjects table exists
SELECT id, name, code FROM "Subjects" LIMIT 5;

-- Check relationships between User and SubjectAccess
SELECT 
    u.id as user_id,
    u.name as user_name,
    u.email,
    COUNT(sa.id) as subject_count
FROM "Users" u
LEFT JOIN "SubjectAccess" sa ON u.id = sa."userId"
GROUP BY u.id, u.name, u.email
LIMIT 10;

-- Check a specific user's subject access with subject details
-- Replace 'YOUR_USER_ID_HERE' with actual user ID
SELECT 
    u.name as user_name,
    sa.id as access_id,
    s.name as subject_name,
    s.code as subject_code
FROM "Users" u
LEFT JOIN "SubjectAccess" sa ON u.id = sa."userId"
LEFT JOIN "Subjects" s ON sa."subjectId" = s.id
WHERE u.id = 'YOUR_USER_ID_HERE';
