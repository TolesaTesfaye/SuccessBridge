-- Targeting columns so published quizzes reach the correct students
ALTER TABLE quizzes
  ADD COLUMN IF NOT EXISTS university VARCHAR(255),
  ADD COLUMN IF NOT EXISTS department VARCHAR(255);
