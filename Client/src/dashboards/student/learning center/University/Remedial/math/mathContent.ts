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

export const REMEDIAL_MATH_CONTENT: CourseContent = {
  subject: 'Remedial Math',
  chapters: [
    {
      id: 'remedial-math-ch1',
      title: 'Basic Arithmetic',
      topics: [
        {
          id: 'remedial-math-1-1',
          title: 'Addition and Subtraction',
          content: [
            'Addition and subtraction are fundamental arithmetic operations.',
            '',
            '**Addition (+)**',
            '• Combining two or more numbers to get their total',
            '• Example: 5 + 3 = 8',
            '• Properties: Commutative (a + b = b + a), Associative ((a + b) + c = a + (b + c))',
            '',
            '**Subtraction (-)**',
            '• Taking away one number from another',
            '• Example: 8 - 3 = 5',
            '• Subtraction is the inverse operation of addition',
            '',
            '**Working with Larger Numbers:**',
            '• Line up digits by place value (ones, tens, hundreds)',
            '• Start from the rightmost column',
            '• Carry over or borrow when necessary'
          ]
        },
        {
          id: 'remedial-math-1-2',
          title: 'Multiplication and Division',
          content: [
            'Multiplication and division are essential operations for solving mathematical problems.',
            '',
            '**Multiplication (×)**',
            '• Repeated addition of the same number',
            '• Example: 4 × 3 = 4 + 4 + 4 = 12',
            '• Properties: Commutative (a × b = b × a), Associative ((a × b) × c = a × (b × c))',
            '',
            '**Division (÷)**',
            '• Splitting a number into equal parts',
            '• Example: 12 ÷ 3 = 4',
            '• Division is the inverse operation of multiplication',
            '',
            '**Multiplication Tables:**',
            '• Learning basic multiplication facts (1-12)',
            '• Using patterns to remember (5s end in 0 or 5, 9s digits sum to 9)',
            '',
            '**Long Division:**',
            '• Step-by-step process for dividing larger numbers',
            '• Divide, Multiply, Subtract, Bring down'
          ]
        }
      ]
    },
    {
      id: 'remedial-math-ch2',
      title: 'Fractions and Decimals',
      topics: [
        {
          id: 'remedial-math-2-1',
          title: 'Understanding Fractions',
          content: [
            'Fractions represent parts of a whole or parts of a group.',
            '',
            '**Parts of a Fraction:**',
            '• **Numerator**: The top number (how many parts we have)',
            '• **Denominator**: The bottom number (total number of equal parts)',
            '• Example: In 3/4, we have 3 parts out of 4 total parts',
            '',
            '**Types of Fractions:**',
            '• **Proper Fractions**: Numerator < Denominator (3/4, 2/5)',
            '• **Improper Fractions**: Numerator ≥ Denominator (5/4, 7/3)',
            '• **Mixed Numbers**: Whole number + proper fraction (1 1/2, 2 3/4)',
            '',
            '**Equivalent Fractions:**',
            '• Fractions that represent the same value',
            '• Example: 1/2 = 2/4 = 3/6 = 4/8',
            '• Multiply or divide both numerator and denominator by the same number'
          ]
        },
        {
          id: 'remedial-math-2-2',
          title: 'Decimal Numbers',
          content: [
            'Decimals are another way to represent fractions and parts of whole numbers.',
            '',
            '**Place Value in Decimals:**',
            '• Ones, Tenths, Hundredths, Thousandths',
            '• Example: 3.456 = 3 ones + 4 tenths + 5 hundredths + 6 thousandths',
            '',
            '**Converting Fractions to Decimals:**',
            '• Divide the numerator by the denominator',
            '• Example: 1/4 = 1 ÷ 4 = 0.25',
            '• Example: 3/8 = 3 ÷ 8 = 0.375',
            '',
            '**Converting Decimals to Fractions:**',
            '• Use place value to determine denominator',
            '• Example: 0.25 = 25/100 = 1/4',
            '• Example: 0.375 = 375/1000 = 3/8',
            '',
            '**Comparing Decimals:**',
            '• Compare digits from left to right',
            '• 0.456 > 0.445 because 5 > 4 in the hundredths place'
          ]
        }
      ]
    }
  ]
}