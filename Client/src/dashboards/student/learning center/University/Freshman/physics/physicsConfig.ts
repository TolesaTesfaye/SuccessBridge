// Physics Subject Configuration
// This file contains all chapters and subtopics for Physics

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

export const physicsConfig: SubjectConfig = {
  name: 'Physics',
  color: {
    primary: 'green',
    secondary: 'emerald',
    gradient: 'from-green-600 to-emerald-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Preliminaries',
      subtopics: [
        '1.1. Physical Quantities and Measurement',
        '1.2. Uncertainty in Measurement and Significant Digits',
        '1.3. Vectors: Composition and Resolution',
        '1.4. Unit Vector'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Motion in One Dimension',
      subtopics: [
        '2.1. Position, Displacement, and Distance',
        '2.2. Velocity and Speed',
        '2.3. Acceleration',
        '2.4. Motion with Constant Acceleration',
        '2.5. Free Fall Motion'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Motion in Two Dimensions',
      subtopics: [
        '3.1. Projectile Motion',
        '3.2. Uniform Circular Motion',
        '3.3. Tangential and Radial Acceleration',
        '3.4. Relative Velocity and Acceleration'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Laws of Motion',
      subtopics: [
        '4.1. Newton\'s First Law of Motion',
        '4.2. Newton\'s Second Law of Motion',
        '4.3. Newton\'s Third Law of Motion',
        '4.4. Applications of Newton\'s Laws',
        '4.5. Friction'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Work, Energy and Power',
      subtopics: [
        '5.1. Work Done by a Constant Force',
        '5.2. Kinetic Energy and Work-Energy Theorem',
        '5.3. Potential Energy',
        '5.4. Conservation of Mechanical Energy',
        '5.5. Power'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Linear Momentum and Collision',
      subtopics: [
        '6.1. Linear Momentum',
        '6.2. Impulse and Momentum',
        '6.3. Conservation of Linear Momentum',
        '6.4. Elastic and Inelastic Collisions',
        '6.5. Center of Mass'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Rotational Motion',
      subtopics: [
        '7.1. Angular Displacement and Velocity',
        '7.2. Angular Acceleration',
        '7.3. Rotational Kinetic Energy',
        '7.4. Moment of Inertia',
        '7.5. Torque and Angular Momentum'
      ]
    }
  ]
};
