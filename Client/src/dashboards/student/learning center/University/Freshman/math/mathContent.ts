export interface Topic {
  id: string
  title: string
  content: string[]
}

export interface Chapter {
  id: string
  title: string
  topics: Topic[]
}

export interface CourseContent {
  subject: string
  chapters: Chapter[]
}

export const MATH_CONTENT: CourseContent = {
  subject: 'Math',
  chapters: [
    {
      id: 'math-ch1',
      title: 'Number Systems and Sets',
      topics: [
        {
          id: 'math-1-1',
          title: 'The Real Number System',
          content: [
            'The real number system includes:',
            '- **Natural Numbers (N)**: {1, 2, 3, ...}',
            '- **Whole Numbers (W)**: {0, 1, 2, ...}',
            '- **Integers (Z)**: {..., -2, -1, 0, 1, 2, ...}',
            '- **Rational Numbers (Q)**: p/q where p, q are integers and q ≠ 0.',
            '- **Irrational Numbers**: Cannot be expressed as fractions (e.g., √2, π).'
          ]
        }
      ]
    },
    {
      id: 'math-ch2',
      title: 'Algebraic Expressions and Equations',
      topics: [
        {
          id: 'math-2-1',
          title: 'Introduction to Algebra',
          content: [
            'Algebra is the branch of mathematics that uses letters and symbols to represent numbers and quantities.',
            '',
            '**Key Concepts:**',
            '• **Variables**: Letters that represent unknown numbers (x, y, z)',
            '• **Constants**: Fixed numbers that don\'t change (5, -3, π)',
            '• **Coefficients**: Numbers multiplied by variables (in 3x, the coefficient is 3)',
            '• **Terms**: Parts of an expression separated by + or - signs',
            '',
            '**Why Use Algebra?**',
            '• Solve problems with unknown quantities',
            '• Express general mathematical relationships',
            '• Model real-world situations mathematically',
            '• Foundation for advanced mathematics'
          ]
        },
        {
          id: 'math-2-2',
          title: 'Algebraic Expressions',
          content: [
            'An algebraic expression is a mathematical phrase that contains numbers, variables, and operations.',
            '',
            '**Types of Expressions:**',
            '• **Monomial**: One term (5x, -3y², 7)',
            '• **Binomial**: Two terms (3x + 2, y² - 4)',
            '• **Trinomial**: Three terms (x² + 3x + 2)',
            '• **Polynomial**: Multiple terms (x³ + 2x² - 5x + 1)',
            '',
            '**Examples:**',
            '• 3x + 5 (binomial)',
            '• 2y² - 7y + 3 (trinomial)',
            '• 4a³ + 2a² - a + 6 (polynomial)',
            '',
            '**Operations with Expressions:**',
            '• **Like terms**: Terms with the same variable and exponent',
            '• **Combining like terms**: Add or subtract coefficients',
            '• Example: 3x + 5x = 8x, 7y² - 2y² = 5y²'
          ]
        },
        {
          id: 'math-2-3',
          title: 'Simplifying Expressions',
          content: [
            'Simplifying expressions means combining like terms and reducing to the simplest form.',
            '',
            '**Steps to Simplify:**',
            '1. **Remove parentheses** using distributive property',
            '2. **Identify like terms** (same variable, same exponent)',
            '3. **Combine like terms** by adding/subtracting coefficients',
            '4. **Arrange terms** in descending order of exponents',
            '',
            '**Distributive Property:**',
            '• a(b + c) = ab + ac',
            '• Example: 3(x + 4) = 3x + 12',
            '• Example: -2(3y - 5) = -6y + 10',
            '',
            '**Practice Examples:**',
            '• 2x + 3x - x = 4x',
            '• 5y² + 2y - 3y² + 7y = 2y² + 9y',
            '• 3(x + 2) + 4x = 3x + 6 + 4x = 7x + 6'
          ]
        },
        {
          id: 'math-2-4',
          title: 'Linear Equations in One Variable',
          content: [
            'A linear equation in one variable is an equation that can be written in the form ax + b = c.',
            '',
            '**Characteristics:**',
            '• Contains only one variable',
            '• Variable has an exponent of 1',
            '• Graph is a straight line',
            '• Has exactly one solution',
            '',
            '**Examples of Linear Equations:**',
            '• 2x + 5 = 11',
            '• 3y - 7 = 14',
            '• 4z + 1 = 2z + 9',
            '',
            '**Solving Linear Equations:**',
            '1. **Simplify** both sides if needed',
            '2. **Move variables** to one side',
            '3. **Move constants** to the other side',
            '4. **Divide** by the coefficient of the variable',
            '',
            '**Example Solution:**',
            '• 2x + 5 = 11',
            '• 2x = 11 - 5 (subtract 5 from both sides)',
            '• 2x = 6',
            '• x = 3 (divide both sides by 2)'
          ]
        },
        {
          id: 'math-2-5',
          title: 'Solving Multi-Step Equations',
          content: [
            'Multi-step equations require several operations to isolate the variable.',
            '',
            '**General Strategy:**',
            '1. **Clear fractions** (multiply by LCD if needed)',
            '2. **Distribute** to remove parentheses',
            '3. **Combine like terms** on each side',
            '4. **Move variables** to one side',
            '5. **Move constants** to the other side',
            '6. **Solve for the variable**',
            '',
            '**Example 1:**',
            '• 3(x + 2) = 15',
            '• 3x + 6 = 15 (distribute)',
            '• 3x = 9 (subtract 6)',
            '• x = 3 (divide by 3)',
            '',
            '**Example 2:**',
            '• 2x + 5 = 3x - 7',
            '• 5 + 7 = 3x - 2x (move variables and constants)',
            '• 12 = x',
            '',
            '**Checking Solutions:**',
            '• Substitute answer back into original equation',
            '• Both sides should be equal',
            '• If not equal, check your work'
          ]
        },
        {
          id: 'math-2-6',
          title: 'Word Problems with Linear Equations',
          content: [
            'Word problems require translating English phrases into mathematical equations.',
            '',
            '**Common Phrases:**',
            '• "Sum of" → addition (+)',
            '• "Difference of" → subtraction (-)',
            '• "Product of" → multiplication (×)',
            '• "Quotient of" → division (÷)',
            '• "Is", "equals", "gives" → equals sign (=)',
            '',
            '**Problem-Solving Steps:**',
            '1. **Read** the problem carefully',
            '2. **Identify** what you\'re looking for',
            '3. **Define** the variable',
            '4. **Write** the equation',
            '5. **Solve** the equation',
            '6. **Check** your answer',
            '7. **Answer** the question',
            '',
            '**Example Problem:**',
            '"A number increased by 7 is 23. Find the number."',
            '• Let x = the unknown number',
            '• x + 7 = 23',
            '• x = 16',
            '• Check: 16 + 7 = 23 ✓',
            '',
            '**Age Problems:**',
            '"Sarah is 3 years older than Tom. Their ages sum to 27."',
            '• Let x = Tom\'s age, then x + 3 = Sarah\'s age',
            '• x + (x + 3) = 27',
            '• 2x + 3 = 27, so x = 12',
            '• Tom is 12, Sarah is 15'
          ]
        }
      ]
    },
    {
      id: 'math-ch3',
      title: 'Functions and Graphing',
      topics: [
        {
          id: 'math-3-1',
          title: 'Introduction to Functions',
          content: [
            'A function is a special relationship between inputs and outputs where each input has exactly one output.',
            '',
            '**Function Notation:**',
            '• f(x) = 2x + 3 (read as "f of x equals 2x plus 3")',
            '• The input is x, the output is f(x)',
            '• Example: If f(x) = 2x + 3, then f(5) = 2(5) + 3 = 13',
            '',
            '**Domain and Range:**',
            '• **Domain**: Set of all possible input values (x-values)',
            '• **Range**: Set of all possible output values (y-values)',
            '',
            '**Function vs. Relation:**',
            '• All functions are relations, but not all relations are functions',
            '• Vertical Line Test: If any vertical line crosses the graph more than once, it\'s not a function'
          ]
        },
        {
          id: 'math-3-2',
          title: 'Linear Functions',
          content: [
            'Linear functions have the form f(x) = mx + b, where m is the slope and b is the y-intercept.',
            '',
            '**Slope (m):**',
            '• Measures the steepness of the line',
            '• m = (y₂ - y₁)/(x₂ - x₁) = rise/run',
            '• Positive slope: line goes up from left to right',
            '• Negative slope: line goes down from left to right',
            '• Zero slope: horizontal line',
            '',
            '**Y-intercept (b):**',
            '• The point where the line crosses the y-axis',
            '• When x = 0, y = b',
            '',
            '**Examples:**',
            '• f(x) = 2x + 1 (slope = 2, y-intercept = 1)',
            '• f(x) = -3x + 5 (slope = -3, y-intercept = 5)'
          ]
        },
        {
          id: 'math-3-3',
          title: 'Graphing Linear Equations',
          content: [
            'There are several methods to graph linear equations.',
            '',
            '**Method 1: Slope-Intercept Form**',
            '• Start at the y-intercept (0, b)',
            '• Use the slope to find the next point',
            '• Draw a line through the points',
            '',
            '**Method 2: Table of Values**',
            '• Choose several x-values',
            '• Calculate corresponding y-values',
            '• Plot the points and connect them',
            '',
            '**Method 3: X and Y Intercepts**',
            '• Find where the line crosses the x-axis (y = 0)',
            '• Find where the line crosses the y-axis (x = 0)',
            '• Plot both intercepts and draw the line',
            '',
            '**Example: Graph y = 2x - 3**',
            '• Y-intercept: (0, -3)',
            '• Slope = 2 = 2/1, so go up 2, right 1',
            '• Next point: (1, -1), then (2, 1), etc.'
          ]
        },
        {
          id: 'math-3-4',
          title: 'Quadratic Functions',
          content: [
            'Quadratic functions have the form f(x) = ax² + bx + c, where a ≠ 0.',
            '',
            '**Key Features:**',
            '• Graph is a parabola (U-shaped curve)',
            '• Opens upward if a > 0, downward if a < 0',
            '• Has a vertex (highest or lowest point)',
            '• Has an axis of symmetry',
            '',
            '**Vertex Form:**',
            '• f(x) = a(x - h)² + k',
            '• Vertex is at point (h, k)',
            '• Easier to identify transformations',
            '',
            '**Finding the Vertex:**',
            '• x-coordinate: x = -b/(2a)',
            '• y-coordinate: substitute x-value into function',
            '',
            '**Examples:**',
            '• f(x) = x² - 4x + 3 (opens upward)',
            '• f(x) = -2x² + 8x - 5 (opens downward)'
          ]
        }
      ]
    },
    {
      id: 'math-ch4',
      title: 'Systems of Equations',
      topics: [
        {
          id: 'math-4-1',
          title: 'Introduction to Systems',
          content: [
            'A system of equations is a set of two or more equations with the same variables.',
            '',
            '**Types of Solutions:**',
            '• **One solution**: Lines intersect at one point',
            '• **No solution**: Lines are parallel (never intersect)',
            '• **Infinite solutions**: Lines are the same (coincident)',
            '',
            '**Example System:**',
            '• x + y = 5',
            '• 2x - y = 1',
            '',
            '**Applications:**',
            '• Finding break-even points in business',
            '• Mixing problems in chemistry',
            '• Motion problems in physics',
            '• Age and number problems'
          ]
        },
        {
          id: 'math-4-2',
          title: 'Solving by Substitution',
          content: [
            'The substitution method involves solving one equation for a variable and substituting into the other.',
            '',
            '**Steps:**',
            '1. **Solve** one equation for one variable',
            '2. **Substitute** this expression into the other equation',
            '3. **Solve** the resulting equation',
            '4. **Back-substitute** to find the other variable',
            '5. **Check** your solution in both original equations',
            '',
            '**Example:**',
            '• System: x + y = 7 and 2x - y = 2',
            '• From first equation: y = 7 - x',
            '• Substitute: 2x - (7 - x) = 2',
            '• Simplify: 2x - 7 + x = 2',
            '• Solve: 3x = 9, so x = 3',
            '• Back-substitute: y = 7 - 3 = 4',
            '• Solution: (3, 4)'
          ]
        },
        {
          id: 'math-4-3',
          title: 'Solving by Elimination',
          content: [
            'The elimination method involves adding or subtracting equations to eliminate one variable.',
            '',
            '**Steps:**',
            '1. **Align** equations with like terms in columns',
            '2. **Multiply** one or both equations to make coefficients opposites',
            '3. **Add or subtract** equations to eliminate one variable',
            '4. **Solve** for the remaining variable',
            '5. **Substitute** back to find the other variable',
            '6. **Check** your solution',
            '',
            '**Example:**',
            '• System: 3x + 2y = 12 and x - 2y = 4',
            '• Add equations: (3x + 2y) + (x - 2y) = 12 + 4',
            '• Simplify: 4x = 16',
            '• Solve: x = 4',
            '• Substitute: 4 - 2y = 4, so y = 0',
            '• Solution: (4, 0)'
          ]
        }
      ]
    },
    {
      id: 'math-ch5',
      title: 'Polynomials and Factoring',
      topics: [
        {
          id: 'math-5-1',
          title: 'Introduction to Polynomials',
          content: [
            'A polynomial is an expression with variables and coefficients using only addition, subtraction, and multiplication.',
            '',
            '**Polynomial Terms:**',
            '• **Degree**: Highest power of the variable',
            '• **Leading coefficient**: Coefficient of the highest degree term',
            '• **Constant term**: Term without a variable',
            '',
            '**Types by Degree:**',
            '• **Linear**: Degree 1 (3x + 2)',
            '• **Quadratic**: Degree 2 (x² + 3x + 2)',
            '• **Cubic**: Degree 3 (x³ + 2x² - x + 1)',
            '',
            '**Types by Number of Terms:**',
            '• **Monomial**: One term (5x²)',
            '• **Binomial**: Two terms (x + 3)',
            '• **Trinomial**: Three terms (x² + 2x + 1)'
          ]
        },
        {
          id: 'math-5-2',
          title: 'Adding and Subtracting Polynomials',
          content: [
            'To add or subtract polynomials, combine like terms.',
            '',
            '**Like Terms:**',
            '• Same variable with same exponent',
            '• Examples: 3x² and -5x² are like terms',
            '• Examples: 2x and 7y are NOT like terms',
            '',
            '**Addition Example:**',
            '• (3x² + 2x - 1) + (x² - 4x + 3)',
            '• = 3x² + x² + 2x - 4x - 1 + 3',
            '• = 4x² - 2x + 2',
            '',
            '**Subtraction Example:**',
            '• (5x² + 3x - 2) - (2x² - x + 4)',
            '• = 5x² + 3x - 2 - 2x² + x - 4',
            '• = 3x² + 4x - 6'
          ]
        },
        {
          id: 'math-5-3',
          title: 'Multiplying Polynomials',
          content: [
            'Use the distributive property to multiply polynomials.',
            '',
            '**Monomial × Polynomial:**',
            '• 3x(2x² + 5x - 1) = 6x³ + 15x² - 3x',
            '',
            '**Binomial × Binomial (FOIL):**',
            '• (x + 3)(x + 2)',
            '• First: x · x = x²',
            '• Outer: x · 2 = 2x',
            '• Inner: 3 · x = 3x',
            '• Last: 3 · 2 = 6',
            '• Result: x² + 2x + 3x + 6 = x² + 5x + 6',
            '',
            '**Special Products:**',
            '• (a + b)² = a² + 2ab + b²',
            '• (a - b)² = a² - 2ab + b²',
            '• (a + b)(a - b) = a² - b²'
          ]
        }
      ]
    }
  ]
}