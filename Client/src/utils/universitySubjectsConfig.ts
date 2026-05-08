// Configuration for all university subjects
// This file centralizes all subject data for easy maintenance and scalability

export interface SubjectChapter {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  chapters: SubjectChapter[];
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

// All university subjects configuration
export const UNIVERSITY_SUBJECTS: Record<string, SubjectConfig> = {
  Psychology: {
    name: 'Psychology',
    color: {
      primary: 'pink',
      secondary: 'purple',
      gradient: 'from-pink-600 to-purple-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Essence of Psychology',
        subtopics: [
          '1.1. Definition of Psychology',
          '1.2. The Four Goals of Psychology',
          '1.3. Historical Evolution',
          '1.4. Modern Perspectives'
        ]
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Human Development',
        subtopics: [
          '2.1. Basics of Human Development',
          '2.2. Principles of Development',
          '2.3. Aspects of Development',
          '2.4. Theories of Development'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Learning and Theories',
        subtopics: [
          '3.1. Definition of Learning',
          '3.2. Classical Conditioning',
          '3.3. Operant Conditioning',
          '3.4. Observational Learning'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Memory and Forgetting',
        subtopics: [
          '4.1. Nature of Memory',
          '4.2. Types of Memory',
          '4.3. Forgetting and Its Causes',
          '4.4. Improving Memory'
        ]
      },
      {
        id: 'chapter5',
        title: 'Chapter 5: Motivation and Emotions',
        subtopics: [
          '5.1. Nature of Motivation',
          '5.2. Theories of Motivation',
          '5.3. Nature of Emotions',
          '5.4. Theories of Emotions'
        ]
      },
      {
        id: 'chapter6',
        title: 'Chapter 6: Personality',
        subtopics: [
          '6.1. Definition of Personality',
          '6.2. Psychoanalytic Theory',
          '6.3. Humanistic Theory',
          '6.4. Trait Theory'
        ]
      },
      {
        id: 'chapter7',
        title: 'Chapter 7: Psychological Disorders',
        subtopics: [
          '7.1. Understanding Psychological Disorders',
          '7.2. Anxiety Disorders',
          '7.3. Mood Disorders',
          '7.4. Schizophrenia'
        ]
      },
      {
        id: 'chapter8',
        title: 'Chapter 8: Life Skills',
        subtopics: [
          '8.1. Introduction to Life Skills',
          '8.2. Types of Life Skills',
          '8.3. Importance of Life Skills',
          '8.4. Developing Life Skills'
        ]
      },
      {
        id: 'chapter9',
        title: 'Chapter 9: Intra-Personal Skills',
        subtopics: [
          '9.1. Self-Awareness',
          '9.2. Self-Esteem',
          '9.3. Self-Management',
          '9.4. Emotional Intelligence'
        ]
      },
      {
        id: 'chapter10',
        title: 'Chapter 10: Academic Skills',
        subtopics: [
          '10.1. Study Skills',
          '10.2. Time Management',
          '10.3. Note-Taking',
          '10.4. Test-Taking Strategies'
        ]
      },
      {
        id: 'chapter11',
        title: 'Chapter 11: Social Skills',
        subtopics: [
          '11.1. Communication Skills',
          '11.2. Interpersonal Relationships',
          '11.3. Conflict Resolution',
          '11.4. Leadership Skills'
        ]
      }
    ]
  },

  Logic: {
    name: 'Logic',
    color: {
      primary: 'blue',
      secondary: 'indigo',
      gradient: 'from-blue-600 to-indigo-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Introducing Philosophy',
        subtopics: [
          'Lesson 1: Meaning and Nature of Philosophy',
          'Lesson 2: Basic Features of Philosophy',
          'Lesson 3: Metaphysics and Epistemology',
          'Lesson 4: Axiology and Logic',
          'Lesson 5: Importance of Learning Philosophy'
        ]
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Basic Concepts of Logic',
        subtopics: [
          'Lesson 1: Arguments, Premises and Conclusions',
          'Lesson 2: Techniques of Recognizing Arguments',
          'Lesson 3: Types of Arguments',
          'Lesson 4: Evaluating Arguments'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Logic and Language',
        subtopics: [
          'Lesson 1: Language and Logic',
          'Lesson 2: Types of Language',
          'Lesson 3: Definitions'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Basic Concepts of Critical Thinking',
        subtopics: [
          'Lesson 1: Meaning of Critical Thinking',
          'Lesson 2: Standards of Critical Thinking',
          'Lesson 3: Codes of Intellectual Conduct',
          'Lesson 4: Characteristics of Critical Thinking'
        ]
      },
      {
        id: 'chapter5',
        title: 'Chapter 5: Informal Fallacies',
        subtopics: [
          'Lesson 1: Fallacy in General',
          'Lesson 2: Fallacies of Relevance',
          'Lesson 3: Fallacies of Weak Induction',
          'Lesson 4: Fallacies of Presumption',
          'Lesson 5: Fallacies of Ambiguity and Grammatical Analogy'
        ]
      },
      {
        id: 'chapter6',
        title: 'Chapter 6: Categorical Propositions',
        subtopics: [
          'Lesson 1: General Introduction',
          'Lesson 2: Attributes of Categorical Propositions',
          'Lesson 3: Venn Diagrams and Square of Opposition',
          'Lesson 4: Evaluating Immediate Inferences'
        ]
      }
    ]
  },

  Physics: {
    name: 'Physics',
    color: {
      primary: 'cyan',
      secondary: 'blue',
      gradient: 'from-cyan-600 to-blue-600'
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
        title: 'Chapter 2: Kinematics and Dynamics of Particles',
        subtopics: [
          '2.1. Kinematics in One and Two Dimensions',
          '2.2. Particle Dynamics and Planetary Motion',
          '2.3. Work, Energy and Linear Momentum'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Fluid Mechanics',
        subtopics: [
          '3.1. Properties of Bulk Matter',
          '3.2. Density and Pressure in Static Fluids',
          '3.3. Buoyant Force and Archimedes\' Principles',
          '3.4. Moving Fluids and Bernoulli Equations'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Heat and Thermodynamics',
        subtopics: [
          '4.1. The Concept of Temperature and the Zeroth Law of Thermodynamics',
          '4.2. Thermal Expansion',
          '4.3. The Concept of Heat, Work and Internal Energy',
          '4.4. Specific Heat and Latent Heat',
          '4.5. Heat Transfer Mechanisms',
          '4.6. The First Law of Thermodynamics'
        ]
      },
      {
        id: 'chapter5',
        title: 'Chapter 5: Oscillations, Waves and Optics',
        subtopics: [
          '5.1. Simple Harmonic Motion',
          '5.2. The Simple Pendulum',
          '5.3. Wave and Its Characteristics',
          '5.4. Resonance',
          '5.5. The Doppler Effect',
          '5.6. Image Formation by Thin Lenses and Mirrors'
        ]
      },
      {
        id: 'chapter6',
        title: 'Chapter 6: Electromagnetism and Electronics',
        subtopics: [
          '6.1. Coulomb\'s Law and Electric Fields',
          '6.2. Electric Potential',
          '6.3. Current, Resistance and Ohm\'s Law',
          '6.4. Electrical Energy and Power',
          '6.5. Equivalent Resistance and Kirchhoff\'s Rule',
          '6.6. Magnetic Field and Magnetic Flux',
          '6.7. Electromagnetic Induction',
          '6.8. Insulators, Conductors and Semiconductors',
          '6.9. Diodes',
          '6.10. Transistors'
        ]
      },
      {
        id: 'chapter7',
        title: 'Chapter 7: Cross Cutting Applications of Physics',
        subtopics: [
          '7.1. Physics in Agriculture and Environment',
          '7.2. Physics in Industries',
          '7.3. Physics in Health Sciences and Medical Imaging',
          '7.4. Physics and Archeology',
          '7.5. Application in Earth and Space Sciences',
          '7.6. Applications in Power Generation'
        ]
      }
    ]
  },

  'Math (Natural Science)': {
    name: 'Math (Natural Science)',
    color: {
      primary: 'emerald',
      secondary: 'teal',
      gradient: 'from-emerald-600 to-teal-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Propositional Logic and Set Theory',
        subtopics: [
          '1.1. Propositional Logic',
          '1.2. Open Propositions and Quantifiers',
          '1.3. Arguments and Validity',
          '1.4. Set Theory'
        ]
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: The Real and Complex Number Systems',
        subtopics: [
          '2.1. The Real Number System',
          '2.2. The Set of Complex Numbers'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Functions',
        subtopics: [
          '3.1. Review of Relations and Functions',
          '3.2. Real Valued Functions and Their Properties',
          '3.3. Types of Functions and Inverse of a Function',
          '3.4. Polynomials, Zeros of Polynomials, Rational Functions and Their Graphs',
          '3.5. Logarithmic, Exponential, Trigonometric and Hyperbolic Functions'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Analytic Geometry',
        subtopics: [
          '4.1. Distance Formula and Equation of Lines',
          '4.2. Circles',
          '4.3. Parabolas',
          '4.4. Ellipse',
          '4.5. Hyperbola',
          '4.6. The General Second Degree Equation'
        ]
      }
    ]
  },

  'Math (Social Science)': {
    name: 'Math (Social Science)',
    color: {
      primary: 'violet',
      secondary: 'purple',
      gradient: 'from-violet-600 to-purple-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Propositional Logic and Set Theory',
        subtopics: [
          '1.1. Propositional Logic',
          '1.2. Open Propositions and Quantifiers',
          '1.3. Arguments and Validity',
          '1.4. Set Theory'
        ]
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Functions',
        subtopics: [
          '2.1. The Real Number System',
          '2.2. Solving Equations and Inequalities',
          '2.3. Review of Relations and Functions',
          '2.4. Real Valued Functions and Their Properties',
          '2.5. Types of Functions and Inverse of a Function',
          '2.6. Polynomials, Zeros of Polynomials, Rational Functions and Their Graphs',
          '2.7. Logarithmic, Exponential, Trigonometric Functions and Their Graphs'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: Matrices and Determinant',
        subtopics: [
          '3.1. Definition of a Matrix',
          '3.2. Matrix Algebra',
          '3.3. Types of Matrices',
          '3.4. Elementary Row Operations',
          '3.5. Row Echelon Form and Reduced Row Echelon Form',
          '3.6. Rank of a Matrix',
          '3.7. Determinant and Its Properties',
          '3.8. Adjoint and Inverse of a Matrix',
          '3.9. System of Linear Equations'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Introduction to Calculus',
        subtopics: [
          '4.1. Limit and Continuity',
          '4.2. Derivatives',
          '4.3. Application of Derivative',
          '4.4. Integrals and Their Applications'
        ]
      }
    ]
  },

  Geography: {
    name: 'Geography',
    color: {
      primary: 'green',
      secondary: 'emerald',
      gradient: 'from-green-600 to-emerald-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Introduction',
        subtopics: [
          '1.1. Geography: Definition, Scope and Themes',
          '1.2. Location, Shape and Size of Ethiopia and the Horn',
          '1.3. Basic Skills of Map Reading'
        ]
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: The Geology of Ethiopia and the Horn',
        subtopics: [
          '2.1. Introduction',
          '2.2. The Geologic Processes: Endogenic and Exogenic Forces',
          '2.3. The Geological Time scale and Age Dating Techniques',
          '2.4. Geological Processes and the Resulting Landforms',
          '2.5. Rock and Mineral Resources of Ethiopia'
        ]
      },
      {
        id: 'chapter3',
        title: 'Chapter 3: The Topography of Ethiopia and the Horn',
        subtopics: [
          '3.1. Introduction',
          '3.2. The Physiographic Divisions of Ethiopia',
          '3.3. The Impacts of Relief on Biophysical and Socioeconomic Conditions'
        ]
      },
      {
        id: 'chapter4',
        title: 'Chapter 4: Drainage Systems and Water Resource',
        subtopics: [
          '4.1. Introduction',
          '4.2. Major Drainage System of Ethiopia',
          '4.3. Water Resources: Rivers, Lakes and Sub-Surface Water',
          '4.4. Water Resources Potentials and Development in Ethiopia'
        ]
      },
      {
        id: 'chapter5',
        title: 'Chapter 5: The Climate of Ethiopia and the Horn',
        subtopics: [
          '5.1. Introduction',
          '5.2. Elements and Controls of Weather and Climate',
          '5.3. Spatiotemporal Patterns and Distribution of Temperature and Rainfall',
          '5.4. Agro-ecological Zones of Ethiopia',
          '5.5. Climate Change/Global Warming'
        ]
      },
      {
        id: 'chapter6',
        title: 'Chapter 6: Soils, Natural Vegetation and Wildlife Resources',
        subtopics: [
          '6.1. Introduction',
          '6.2. Ethiopian Soils: Types, Degradation and Conservation',
          '6.3. Natural Vegetation of Ethiopia',
          '6.4. Wild Life/Wild Animals in Ethiopia'
        ]
      },
      {
        id: 'chapter7',
        title: 'Chapter 7: Population of Ethiopia and the Horn',
        subtopics: [
          '7.1. Introduction',
          '7.2. Population Data: Uses and Sources',
          '7.3. Population Dynamics: Fertility, Mortality and Migration',
          '7.4. Age and Sex Structure of Ethiopian Population',
          '7.5. Population Distribution in Ethiopia',
          '7.6. Socio-cultural Aspects of Ethiopian Population',
          '7.7. Settlement Types and Patterns'
        ]
      },
      {
        id: 'chapter8',
        title: 'Chapter 8: Economic Activities in Ethiopia',
        subtopics: [
          '8.1. Introduction',
          '8.2. Mining Activity in Ethiopia',
          '8.3. Forestry',
          '8.4. Fishery',
          '8.5. Agriculture in Ethiopia',
          '8.6. Manufacturing Industry in Ethiopia',
          '8.7. The Service Sector in Ethiopia'
        ]
      }
    ]
  },

  History: {
    name: 'History',
    color: {
      primary: 'amber',
      secondary: 'orange',
      gradient: 'from-amber-600 to-orange-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Unit 1: Introduction',
        subtopics: [
          '1.1. The Nature and Uses of History',
          '1.2. Sources and Methods of Historical Study',
          '1.3. Historiography of Ethiopia and the Horn',
          '1.4. The Geographical Context'
        ]
      },
      {
        id: 'chapter2',
        title: 'Unit 2: Peoples and Cultures in Ethiopia and the Horn',
        subtopics: [
          '2.1. Human Evolution',
          '2.2. Neolithic Revolution',
          '2.3. The Peopling of the Region',
          '2.4. Religion and Religious Processes'
        ]
      },
      {
        id: 'chapter3',
        title: 'Unit 3: Politics, Economy and Society to the 13th Century',
        subtopics: [
          '3.1. Emergence of States',
          '3.2. Ancient States',
          '3.3. External Contacts',
          '3.4. Economic Formations',
          '3.5. Socio-Cultural Achievements'
        ]
      },
      {
        id: 'chapter4',
        title: 'Unit 4: Politics, Economy and Society (13th-16th Centuries)',
        subtopics: [
          '4.1. The "Restoration" of the "Solomonic" Dynasty',
          '4.2. Power Struggle, Consolidation, Territorial Expansion',
          '4.3. Political and Socio-Economic Dynamics in Muslim Sultanates',
          '4.4. Rivalry Between Christian Kingdom and Muslim Sultanates',
          '4.5. External Relations'
        ]
      },
      {
        id: 'chapter5',
        title: 'Unit 5: Politics, Economy and Social Processes (16th-18th Centuries)',
        subtopics: [
          '5.1. Conflict Between Christian Kingdom and Sultanate of Adal',
          '5.2. Foreign Intervention and Religious Controversies',
          '5.3. Population Movements',
          '5.4. Interaction and Integration Across Diversities',
          '5.5. Peoples and States in Various Regions',
          '5.6. The Gondarine Period and Zemene-Mesafint'
        ]
      },
      {
        id: 'chapter6',
        title: 'Unit 6: Internal Developments and External Relations, 1800-1941',
        subtopics: [
          '6.1. Nature of Interactions Among Peoples and States',
          '6.2. The Making of Modern Ethiopian State',
          '6.3. Modernization Attempts',
          '6.4. Socio-Economic Developments',
          '6.5. External Relations'
        ]
      },
      {
        id: 'chapter7',
        title: 'Unit 7: Internal Developments and External Relations, 1941-1995',
        subtopics: [
          '7.1. Post-1941 Imperial Period',
          '7.2. The Derg Regime (1974-1991)',
          '7.3. Transitional Government'
        ]
      }
    ]
  },

  English: {
    name: 'English',
    color: {
      primary: 'rose',
      secondary: 'red',
      gradient: 'from-rose-600 to-red-600'
    },
    chapters: [
      {
        id: 'chapter1',
        title: 'Unit 1: Study Skills',
        subtopics: [
          '1.1. Listening: What is a lecture?',
          '1.2. Grammar focus: Modals and infinitives for giving advice',
          '1.3. Reading: Reading for study',
          '1.4. Grammar focus: Present perfect tense',
          '1.5. Reflections',
          '1.6. Self-assessment',
          '1.7. Summary'
        ]
      },
      {
        id: 'chapter2',
        title: 'Unit 2: Health and Fitness',
        subtopics: [
          '2.1. Listening: Zinedine Zidane',
          '2.2. Grammar focus: Conditionals',
          '2.3. Reading: Health and fitness',
          '2.4. Vocabulary: Guessing meaning from context',
          '2.5. Reflections',
          '2.6. Self-assessment',
          '2.7. Summary'
        ]
      },
      {
        id: 'chapter3',
        title: 'Unit 3: Cultural Values',
        subtopics: [
          '3.1. Listening: Cultural tourism',
          '3.2. Grammar focus: Tenses in contrast',
          '3.3. Strategies for improving English grammar knowledge',
          '3.4. Reading: The Awramba community',
          '3.5. Reflections',
          '3.6. Self-assessment',
          '3.7. Summary'
        ]
      },
      {
        id: 'chapter4',
        title: 'Unit 4: Wildlife',
        subtopics: [
          '4.1. Listening: Human-wildlife interaction',
          '4.2. Reading: Africa\'s wild animals',
          '4.3. Vocabulary: Denotative and connotative meanings',
          '4.4. Grammar focus: Conditionals revised',
          '4.5. Reflections',
          '4.6. Self-assessment',
          '4.7. Summary'
        ]
      },
      {
        id: 'chapter5',
        title: 'Unit 5: Population',
        subtopics: [
          '5.1. Listening: Population density',
          '5.2. Reading: Population pyramid',
          '5.3. Vocabulary: Collocation',
          '5.4. Grammar focus: Voice',
          '5.5. Reflections',
          '5.6. Self-assessment',
          '5.7. Summary'
        ]
      }
    ]
  }
};

// Helper function to get subject configuration
export const getSubjectConfig = (subjectName: string): SubjectConfig | undefined => {
  return UNIVERSITY_SUBJECTS[subjectName];
};

// Helper function to get all subject names
export const getAllSubjectNames = (): string[] => {
  return Object.keys(UNIVERSITY_SUBJECTS);
};
