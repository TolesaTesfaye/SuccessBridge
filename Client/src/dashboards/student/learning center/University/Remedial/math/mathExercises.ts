export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const REMEDIAL_MATH_EXERCISES: Record<string, ExerciseQuestion[]> = {
  'remedial-math-1-1': [ // Addition and Subtraction
    {
      question: "What is 25 + 17?",
      options: ["32", "42", "41", "43"],
      correctAnswer: 1,
      explanation: "25 + 17 = 42. Line up the digits: 5 + 7 = 12 (write 2, carry 1), then 2 + 1 + 1 = 4."
    },
    {
      question: "What is 63 - 28?",
      options: ["35", "45", "34", "36"],
      correctAnswer: 0,
      explanation: "63 - 28 = 35. Since 3 < 8, borrow from the 6: 13 - 8 = 5, then 5 - 2 = 3."
    },
    {
      question: "Which property shows that 4 + 7 = 7 + 4?",
      options: ["Associative", "Commutative", "Identity", "Distributive"],
      correctAnswer: 1,
      explanation: "The commutative property states that the order of addition doesn't matter: a + b = b + a."
    }
  ],
  
  'remedial-math-1-2': [ // Multiplication and Division
    {
      question: "What is 6 × 8?",
      options: ["42", "48", "54", "46"],
      correctAnswer: 1,
      explanation: "6 × 8 = 48. This can be thought of as 6 groups of 8 or 8 groups of 6."
    },
    {
      question: "What is 72 ÷ 9?",
      options: ["7", "8", "9", "6"],
      correctAnswer: 1,
      explanation: "72 ÷ 9 = 8. Think: 'How many 9s are in 72?' or check: 8 × 9 = 72."
    },
    {
      question: "Which shows repeated addition?",
      options: ["5 + 5 + 5", "5 × 3", "Both A and B", "Neither"],
      correctAnswer: 2,
      explanation: "Both show the same value. 5 + 5 + 5 = 15 and 5 × 3 = 15. Multiplication is repeated addition."
    }
  ],

  'remedial-math-2-1': [ // Understanding Fractions
    {
      question: "In the fraction 3/4, what does the 4 represent?",
      options: ["Parts we have", "Total equal parts", "Whole number", "Mixed number"],
      correctAnswer: 1,
      explanation: "The denominator (bottom number) represents the total number of equal parts the whole is divided into."
    },
    {
      question: "Which fraction is equivalent to 1/2?",
      options: ["2/3", "3/6", "1/4", "2/5"],
      correctAnswer: 1,
      explanation: "3/6 = 1/2 because both the numerator and denominator are multiplied by 3: (1×3)/(2×3) = 3/6."
    }
  ],

  'remedial-math-2-2': [ // Decimal Numbers
    {
      question: "What is 0.25 as a fraction?",
      options: ["25/10", "1/4", "2/5", "25/50"],
      correctAnswer: 1,
      explanation: "0.25 = 25/100 = 1/4 when simplified by dividing both numerator and denominator by 25."
    },
    {
      question: "Which decimal is larger: 0.456 or 0.465?",
      options: ["0.456", "0.465", "They are equal", "Cannot determine"],
      correctAnswer: 1,
      explanation: "0.465 is larger. Compare digit by digit: 0.4 = 0.4, 0.05 < 0.06, so 0.465 > 0.456."
    }
  ]
};