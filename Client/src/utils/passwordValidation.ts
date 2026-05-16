/**
 * Password Validation Utility
 * Implements strong password requirements with Zod
 */

import { z } from "zod";

// Password strength levels
export enum PasswordStrength {
  Weak = "weak",
  Fair = "fair",
  Good = "good",
  Strong = "strong",
  VeryStrong = "veryStrong",
}

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxRepeatingChars: 3, // Maximum consecutive repeating characters
};

/**
 * Zod schema for password validation
 */
export const passwordSchema = z
  .string()
  .min(
    PASSWORD_REQUIREMENTS.minLength,
    `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`,
  )
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .refine(
    (password) => {
      // Check for maximum repeating characters
      const repeatingRegex = new RegExp(
        `(.)\\1{${PASSWORD_REQUIREMENTS.maxRepeatingChars},}`,
      );
      return !repeatingRegex.test(password);
    },
    {
      message: `Password cannot have more than ${PASSWORD_REQUIREMENTS.maxRepeatingChars} repeating characters in a row`,
    },
  )
  .refine(
    (password) => {
      // Check for sequential characters (abc, 123, etc.)
      let sequentialCount = 0;
      for (let i = 1; i < password.length; i++) {
        if (password.charCodeAt(i) === password.charCodeAt(i - 1) + 1) {
          sequentialCount++;
          if (sequentialCount >= 3) return false;
        } else {
          sequentialCount = 0;
        }
      }
      return true;
    },
    {
      message: "Password cannot contain sequential characters (e.g., abc, 123)",
    },
  );

/**
 * Common passwords list (top 100 most common)
 * In production, this should be a more comprehensive list or API check
 */
const COMMON_PASSWORDS = [
  "password",
  "123456",
  "12345678",
  "1234",
  "qwerty",
  "12345",
  "dragon",
  "pussy",
  "baseball",
  "football",
  "letmein",
  "monkey",
  "696969",
  "abc123",
  "mustang",
  "michael",
  "shadow",
  "master",
  "jennifer",
  "111111",
  "2000",
  "jordan",
  "superman",
  "harley",
  "1234567",
  "fuckme",
  "hunter",
  "fuckyou",
  "trustno1",
  "ranger",
  "buster",
  "thomas",
  "tigger",
  "robert",
  "soccer",
  "fuck",
  "batman",
  "test",
  "pass",
  "killer",
  "hockey",
  "george",
  "charlie",
  "andrew",
  "michelle",
  "love",
  "sunshine",
  "jessica",
  "pepper",
  "daniel",
  "access",
  "123456789",
  "654321",
  "joshua",
  "maggie",
  "starwars",
  "silver",
  "william",
  "dallas",
  "yankees",
  "123123",
  "ashley",
  "666666",
  "hello",
  "amanda",
  "orange",
  "biteme",
  "freedom",
  "computer",
  "sexy",
  "thunder",
  "nicole",
  "ginger",
  "heather",
  "hammer",
  "summer",
  "corvette",
  "taylor",
  "fucker",
  "austin",
  "1111",
  "merlin",
  "matthew",
  "121212",
  "golfer",
  "cheese",
  "princess",
  "martin",
  "chelsea",
  "patrick",
  "richard",
  "diamond",
  "yellow",
  "bigdog",
  "secret",
  "asdfgh",
  "sparky",
  "cowboy",
  "camaro",
];

/**
 * Check if password is in common passwords list
 */
export function isCommonPassword(password: string): boolean {
  const lowerPassword = password.toLowerCase();
  return COMMON_PASSWORDS.some((common) => lowerPassword.includes(common));
}

/**
 * Calculate password strength score
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  level: PasswordStrength;
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Bonus for mixed content
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 8) score += 1;
  if (uniqueChars >= 12) score += 1;

  // Penalties
  if (/^[a-z]+$/.test(password)) {
    score -= 2;
    feedback.push("Password contains only lowercase letters");
  }
  if (/^[A-Z]+$/.test(password)) {
    score -= 2;
    feedback.push("Password contains only uppercase letters");
  }
  if (/^[0-9]+$/.test(password)) {
    score -= 2;
    feedback.push("Password contains only numbers");
  }
  if (isCommonPassword(password)) {
    score -= 3;
    feedback.push("Password is too common");
  }

  // Check for repeating characters
  const repeatingRegex = /(.)\1{2,}/;
  if (repeatingRegex.test(password)) {
    score -= 1;
    feedback.push("Password has too many repeating characters");
  }

  // Check for sequential characters
  let sequentialCount = 0;
  for (let i = 1; i < password.length; i++) {
    if (password.charCodeAt(i) === password.charCodeAt(i - 1) + 1) {
      sequentialCount++;
    }
  }
  if (sequentialCount >= 3) {
    score -= 1;
    feedback.push("Password has sequential characters");
  }

  // Determine strength level
  let level: PasswordStrength;
  if (score <= 2) level = PasswordStrength.Weak;
  else if (score <= 4) level = PasswordStrength.Fair;
  else if (score <= 6) level = PasswordStrength.Good;
  else if (score <= 8) level = PasswordStrength.Strong;
  else level = PasswordStrength.VeryStrong;

  // Add positive feedback for strong passwords
  if (
    level === PasswordStrength.Strong ||
    level === PasswordStrength.VeryStrong
  ) {
    feedback.push("Great password!");
  }

  return { score, level, feedback };
}

/**
 * Validate password and return detailed result
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
  strength: { score: number; level: PasswordStrength; feedback: string[] };
} {
  // Check basic requirements
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`,
    );
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  if (isCommonPassword(password)) {
    errors.push("Password is too common, please choose a more unique password");
  }

  // Calculate strength
  const strength = calculatePasswordStrength(password);

  return {
    valid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Generate a random strong password
 */
export function generateStrongPassword(length: number = 16): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const all = lowercase + uppercase + numbers + special;
  let password = "";

  // Ensure at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
