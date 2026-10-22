// Math Subject Configuration
// This file contains all chapters and subtopics for Remedial Math

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

export const mathConfig: SubjectConfig = {
  name: 'Math',
  color: {
    primary: 'blue',
    secondary: 'indigo',
    gradient: 'from-blue-600 to-indigo-600'
  },
  chapters: [
    {
      id: 'remedial-math-ch1',
      title: 'Chapter 1: Solving Equations and Inequalities',
      subtopics: [
        '1.1. Equations involving exponents and radicals',
        '1.2. System of linear equations in two variables',
        '1.3. Equations Involving Absolute Value',
        '1.4. Inequalities involving absolute values',
        '1.5. System of linear inequalities in two variables',
        '1.6. Quadratic equations and inequalities'
      ]
    },
    {
      id: 'remedial-math-ch2',
      title: 'Chapter 2: Relations and Functions',
      subtopics: [
        '2.1. Definition and examples of relations',
        '2.2. Definition and examples of functions',
        '2.3. Classification of functions (one to one, onto, even and odd) and inverse of functions',
        '2.4. Operations on functions and composition of functions',
        '2.5. Types of functions',
        '2.5.1. Polynomial functions',
        '2.5.1.1. Theorems on polynomial functions (Division, remainder, factor and location theorems)',
        '2.5.1.2. Graphs of polynomial functions',
        '2.5.1.3. Rational functions and their graphs',
        '2.5.2. Exponential functions and their graphs',
        '2.5.3. Logarithmic functions, graphs and equations involving logarithms',
        '2.5.5. Power function, Absolute value function, Signum function and greatest integer function',
        '2.5.6. Trigonometric (Sine, Cosine and Tangent) functions and their graphs'
      ]
    },
    {
      id: 'remedial-math-ch3',
      title: 'Chapter 3: Geometry and Measurement',
      subtopics: [
        '3.1. Theorems on triangles',
        '3.2. Special quadrilaterals',
        '3.3. Circles',
        '3.4. Regular Polygons',
        '3.5. Congruency and Similarity',
        '3.6. Areas of Triangle and parallelogram',
        '3.7. Surface area and volume of solid figures (Prism, Cylinder, Cone and Sphere)',
        '3.8. Frustum of pyramids and cones'
      ]
    },
    {
      id: 'remedial-math-ch4',
      title: 'Chapter 4: Coordinate Geometry',
      subtopics: [
        '4.1. Distance between points in a plane',
        '4.2. Division of a line segment',
        '4.3. Equation of a straight line /gradient line',
        '4.4. Distance between a point and a line and between two lines',
        '4.5. Conic Sections'
      ]
    },
    {
      id: 'remedial-math-ch5',
      title: 'Chapter 5: Statistics and Probability',
      subtopics: [
        '5.1. Statistics',
        '5.1.1. Types of data',
        '5.1.2. Measures of location for ungrouped and group data',
        '5.1.3. Measures of Dispersion for ungrouped and grouped data',
        '5.2. Probability',
        '5.2.1. Permutation and combination',
        '5.2.2. Binomial theorem',
        '5.2.3. Random experiment and their outcomes',
        '5.2.4. Events'
      ]
    },
    {
      id: 'remedial-math-ch6',
      title: 'Chapter 6: Limit and Continuity',
      subtopics: [
        '6.1. Limit of functions',
        '6.2. Continuity of functions'
      ]
    },
    {
      id: 'remedial-math-ch7',
      title: 'Chapter 7: Derivative and its Application',
      subtopics: [
        '7.1. Definition of derivative and its geometric interpretation',
        '7.2. Rules of differentiation',
        '7.3. Derivatives of special functions (exponential, logarithmic and trigonometric)',
        '7.4. Extreme values of functions'
      ]
    },
    {
      id: 'remedial-math-ch8',
      title: 'Chapter 8: Integration and its Application',
      subtopics: [
        '8.1. Integration as a reverse process of derivative',
        '8.3. Definite integral and Fundamental theorem of calculus',
        '8.4. Area of a region under a curve and between two curves'
      ]
    },
    {
      id: 'remedial-math-ch9',
      title: 'Chapter 9: Introduction to Linear Programming',
      subtopics: [
        '9.1. Graphical solutions of systems of linear inequalities',
        '9.2. Maximum and minimum values',
        '9.3. Real life linear programming problems'
      ]
    },
    {
      id: 'remedial-math-ch10',
      title: 'Chapter 10: Mathematical Applications in Business',
      subtopics: [
        '(Content to be added)'
      ]
    }
  ]
};
