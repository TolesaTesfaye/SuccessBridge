export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const MATH_EXERCISES: Record<string, ExerciseQuestion[]> = {
  'math-1-1': [ // The Real Number System
    {
      question: "Which of the following is NOT a natural number?",
      options: ["1", "0", "5", "100"],
      correctAnswer: 1,
      explanation: "Natural numbers are counting numbers {1, 2, 3, ...}. Zero is not included in natural numbers."
    },
    {
      question: "Which set contains all the others as subsets?",
      options: ["Natural Numbers", "Whole Numbers", "Integers", "Rational Numbers"],
      correctAnswer: 3,
      explanation: "Rational numbers contain all integers, which contain all whole numbers, which contain all natural numbers: N ⊂ W ⊂ Z ⊂ Q."
    },
    {
      question: "Which of the following is an irrational number?",
      options: ["0.5", "√4", "√2", "3/7"],
      correctAnswer: 2,
      explanation: "√2 cannot be expressed as a fraction of two integers, making it irrational. The others can all be written as fractions."
    },
    {
      question: "If a number can be written as p/q where p and q are integers and q ≠ 0, it is:",
      options: ["Natural", "Whole", "Integer", "Rational"],
      correctAnswer: 3,
      explanation: "By definition, rational numbers are numbers that can be expressed as p/q where p and q are integers and q ≠ 0."
    }
  ],

  'math-2-1': [ // Introduction to Algebra
    {
      question: "In the expression 5x + 3, what is the coefficient of x?",
      options: ["5", "3", "x", "8"],
      correctAnswer: 0,
      explanation: "The coefficient is the number multiplied by the variable. In 5x + 3, the coefficient of x is 5."
    },
    {
      question: "Which of the following is a variable?",
      options: ["5", "π", "y", "-3"],
      correctAnswer: 2,
      explanation: "A variable is a letter that represents an unknown number. In this case, 'y' is the variable."
    }
  ],

  'math-2-2': [ // Algebraic Expressions
    {
      question: "How many terms are in the expression 3x² + 2x - 5?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      explanation: "Terms are parts separated by + or - signs. The expression 3x² + 2x - 5 has three terms: 3x², 2x, and -5."
    },
    {
      question: "What type of expression is 2x + 7?",
      options: ["Monomial", "Binomial", "Trinomial", "Polynomial"],
      correctAnswer: 1,
      explanation: "A binomial has exactly two terms. The expression 2x + 7 has two terms, so it's a binomial."
    }
  ],

  'math-2-4': [ // Linear Equations in One Variable
    {
      question: "What is the solution to 2x + 6 = 14?",
      options: ["x = 2", "x = 4", "x = 6", "x = 8"],
      correctAnswer: 1,
      explanation: "Subtract 6 from both sides: 2x = 8. Then divide by 2: x = 4."
    },
    {
      question: "Which equation is linear in one variable?",
      options: ["x² + 3 = 7", "2x + y = 5", "3x - 4 = 11", "x³ = 8"],
      correctAnswer: 2,
      explanation: "A linear equation in one variable has the variable to the first power only. 3x - 4 = 11 fits this definition."
    }
  ],

  'math-2-3': [ // Simplifying Expressions
    {
      question: "Simplify: 3x + 5x - 2x",
      options: ["6x", "10x", "5x", "8x"],
      correctAnswer: 0,
      explanation: "Combine like terms: (3 + 5 - 2)x = 6x."
    },
    {
      question: "Simplify: 2(3y + 4) + 5y",
      options: ["11y + 8", "10y + 4", "6y + 9", "8y + 8"],
      correctAnswer: 0,
      explanation: "Distribute: 6y + 8 + 5y. Combine like terms: 11y + 8."
    }
  ],

  'math-2-5': [ // Solving Multi-Step Equations
    {
      question: "Solve: 3(x + 2) = 18",
      options: ["x = 4", "x = 6", "x = 8", "x = 12"],
      correctAnswer: 0,
      explanation: "Distribute: 3x + 6 = 18. Subtract 6: 3x = 12. Divide by 3: x = 4."
    },
    {
      question: "Solve: 2x + 7 = 4x - 3",
      options: ["x = 5", "x = 2", "x = 10", "x = -5"],
      correctAnswer: 0,
      explanation: "Subtract 2x from both sides: 7 = 2x - 3. Add 3: 10 = 2x. Divide by 2: x = 5."
    }
  ],

  'math-2-6': [ // Word Problems
    {
      question: "A number increased by 8 equals 23. What is the number?",
      options: ["15", "31", "8", "23"],
      correctAnswer: 0,
      explanation: "Let x be the number. Then x + 8 = 23, so x = 23 - 8 = 15."
    },
    {
      question: "Tom is 5 years older than Sarah. If their ages sum to 35, how old is Sarah?",
      options: ["15", "20", "25", "30"],
      correctAnswer: 0,
      explanation: "Let x = Sarah's age, then Tom's age = x + 5. So x + (x + 5) = 35, which gives 2x + 5 = 35, so x = 15."
    }
  ],

  'math-3-1': [ // Introduction to Functions
    {
      question: "If f(x) = 3x + 2, what is f(4)?",
      options: ["14", "12", "10", "8"],
      correctAnswer: 0,
      explanation: "Substitute x = 4: f(4) = 3(4) + 2 = 12 + 2 = 14."
    },
    {
      question: "Which of the following represents a function?",
      options: ["x = y²", "y = x²", "x² + y² = 1", "y² = x + 1"],
      correctAnswer: 1,
      explanation: "y = x² passes the vertical line test - each x-value has exactly one y-value."
    }
  ],

  'math-3-2': [ // Linear Functions
    {
      question: "What is the slope of the line y = -2x + 5?",
      options: ["-2", "2", "5", "-5"],
      correctAnswer: 0,
      explanation: "In the form y = mx + b, the slope m is the coefficient of x, which is -2."
    },
    {
      question: "What is the y-intercept of y = 4x - 3?",
      options: ["4", "-3", "3", "-4"],
      correctAnswer: 1,
      explanation: "In the form y = mx + b, the y-intercept b is -3."
    }
  ],

  'math-4-1': [ // Introduction to Systems
    {
      question: "How many solutions does the system x + y = 5 and x + y = 3 have?",
      options: ["One", "None", "Infinite", "Two"],
      correctAnswer: 1,
      explanation: "These are parallel lines (same slope, different y-intercepts), so they never intersect."
    },
    {
      question: "What does it mean when two lines intersect at exactly one point?",
      options: ["No solution", "One solution", "Infinite solutions", "Undefined"],
      correctAnswer: 1,
      explanation: "When two lines intersect at one point, the system has exactly one solution."
    }
  ],

  'math-5-1': [ // Introduction to Polynomials
    {
      question: "What is the degree of the polynomial 3x⁴ + 2x² - 5x + 1?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 3,
      explanation: "The degree is the highest power of the variable, which is 4."
    },
    {
      question: "How many terms does the polynomial 2x³ - 5x + 7 have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "The terms are 2x³, -5x, and 7, so there are 3 terms."
    }
  ]
};