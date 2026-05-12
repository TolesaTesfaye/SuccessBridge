// Grade 11 Physics Subject Configuration

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  grade: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

export const physicsConfig: SubjectConfig = {
  name: 'Physics',
  grade: 'Grade 11',
  color: {
    primary: 'purple',
    secondary: 'pink',
    gradient: 'from-purple-600 to-pink-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Physical World and Measurement',
      subtopics: [
        '1.1. What is Physics?',
        '1.2. Units and Measurements',
        '1.3. Dimensional Analysis',
        '1.4. Significant Figures'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Kinematics',
      subtopics: [
        '2.1. Motion in a Straight Line',
        '2.2. Motion in a Plane',
        '2.3. Projectile Motion',
        '2.4. Circular Motion'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Laws of Motion',
      subtopics: [
        '3.1. Newton\'s First Law',
        '3.2. Newton\'s Second Law',
        '3.3. Newton\'s Third Law',
        '3.4. Friction and Applications'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Work, Energy and Power',
      subtopics: [
        '4.1. Work',
        '4.2. Energy',
        '4.3. Power',
        '4.4. Conservation of Energy'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Gravitation',
      subtopics: [
        '5.1. Universal Law of Gravitation',
        '5.2. Gravitational Potential Energy',
        '5.3. Escape Velocity',
        '5.4. Satellites'
      ]
    }
  ]
};
