import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { InlineExercise } from '../../../components/common/InlineExercise';
import { PsychologyChapterContent } from '../learning center/University/Freshman/Psychology/chapters/PsychologyChapterContent';
import { LogicChapterContent } from '../learning center/University/Freshman/Logic/chapters/LogicChapterContent';
import { PhysicsChapterContent } from '../learning center/University/Freshman/physics/chapters/PhysicsChapterContent';
import { MathNaturalChapterContent } from '../learning center/University/Freshman/mathnatural/chapters/MathNaturalChapterContent';
import { MathSocialChapterContent } from '../learning center/University/Freshman/mathsocial/chapters/MathSocialChapterContent';
import { GeographyChapterContent } from '../learning center/University/Freshman/geography/chapters/GeographyChapterContent';
import { HistoryChapterContent } from '../learning center/University/Freshman/history/chapters/HistoryChapterContent';
import { EnglishChapterContent } from '../learning center/University/Freshman/english/chapters/EnglishChapterContent';

interface UniversityLearningCenterProps {
  subjects: string[];
  learningSubject: string;
  setLearningSubject: (subject: string) => void;
  learningContent: any;
  navigate: (path: string) => void;
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void;
}

export const UniversityLearningCenter: React.FC<UniversityLearningCenterProps> = ({
  subjects,
  learningSubject,
  setLearningSubject,
  learningContent,
  navigate,
  setActiveTab
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPsychologyChapter, setSelectedPsychologyChapter] = useState<string>('');
  const [selectedLogicChapter, setSelectedLogicChapter] = useState<string>('');
  const [selectedPhysicsChapter, setSelectedPhysicsChapter] = useState<string>('');
  const [selectedMathNaturalChapter, setSelectedMathNaturalChapter] = useState<string>('');
  const [selectedMathSocialChapter, setSelectedMathSocialChapter] = useState<string>('');
  const [selectedGeographyChapter, setSelectedGeographyChapter] = useState<string>('');
  const [selectedHistoryChapter, setSelectedHistoryChapter] = useState<string>('');
  const [selectedEnglishChapter, setSelectedEnglishChapter] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');

  // Check which subjects use new chapter structure
  const isPsychology = learningSubject === 'Psychology';
  const isLogic = learningSubject === 'Logic';
  const isPhysics = learningSubject === 'Physics';
  const isMathNatural = learningSubject === 'Math (Natural Science)';
  const isMathSocial = learningSubject === 'Math (Social Science)';
  const isGeography = learningSubject === 'Geography';
  const isHistory = learningSubject === 'History';
  const isEnglish = learningSubject === 'English';
  
  // Psychology chapters with subtopics
  const psychologyChapters = [
    { 
      id: 'chapter1', 
      title: 'Chapter 1: Essence of Psychology',
      subtopics: [
        '1.1. Definition of Psychology',
        '1.2. Goals of Psychology',
        '1.3. Historical Background',
        '1.4. Branches of Psychology',
        '1.5. Research Methods'
      ]
    },
    { 
      id: 'chapter2', 
      title: 'Chapter 2: Human Development',
      subtopics: [
        '2.1. Basics of Development',
        '2.2. Principles of Development',
        '2.3. Aspects of Development',
        '2.4. Theories of Development'
      ]
    },
    { 
      id: 'chapter3', 
      title: 'Chapter 3: Learning and Theories',
      subtopics: [
        '3.1. Definition and Characteristics',
        '3.2. Factors Influencing Learning',
        '3.3. Learning Theories'
      ]
    },
    { 
      id: 'chapter4', 
      title: 'Chapter 4: Memory and Forgetting',
      subtopics: [
        '4.1. Memory Processes',
        '4.2. Forgetting',
        '4.3. Improving Memory'
      ]
    },
    { 
      id: 'chapter5', 
      title: 'Chapter 5: Motivation and Emotions',
      subtopics: [
        '5.1. Motivation',
        '5.2. Emotions'
      ]
    },
    { 
      id: 'chapter6', 
      title: 'Chapter 6: Personality',
      subtopics: [
        '6.1. Meaning of Personality',
        '6.2. Theories of Personality'
      ]
    },
    { 
      id: 'chapter7', 
      title: 'Chapter 7: Psychological Disorders',
      subtopics: [
        '7.1. Nature of Disorders',
        '7.2. Causes of Disorders',
        '7.3. Types of Disorders',
        '7.4. Treatment Techniques'
      ]
    },
    { 
      id: 'chapter8', 
      title: 'Chapter 8: Introduction to Life Skills',
      subtopics: [
        '8.1. Nature and Definition',
        '8.2. Goals of Life Skills',
        '8.3. Components of Life Skills'
      ]
    },
    { 
      id: 'chapter9', 
      title: 'Chapter 9: Intra-Personal Skills',
      subtopics: [
        '9.1. Self-Concept',
        '9.2. Self-Esteem',
        '9.3. Self-Control',
        '9.4. Anger Management',
        '9.5. Emotional Intelligence',
        '9.6. Stress and Resilience'
      ]
    },
    { 
      id: 'chapter10', 
      title: 'Chapter 10: Academic Skills',
      subtopics: [
        '10.1. Time Management',
        '10.2. Note-taking and Study Skills',
        '10.3. Test-Taking Skill',
        '10.4. Test Anxiety and Overcoming',
        '10.5. Goal Setting',
        '10.6. Career Development Skill'
      ]
    },
    { 
      id: 'chapter11', 
      title: 'Chapter 11: Social Skills',
      subtopics: [
        '11.1. Understanding Cultural Diversity',
        '11.2. Gender and Social Inclusion',
        '11.3. Interpersonal Communication Skills',
        '11.4. Social Influences',
        '11.5. Peer Pressure',
        '11.6. Assertiveness',
        '11.7. Conflict and Conflict Resolution',
        '11.8. Team Work',
        '11.9. Overcoming Risky Behavior'
      ]
    }
  ];

  // Logic chapters with subtopics
  const logicChapters = [
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
  ];

  // Physics chapters with subtopics
  const physicsChapters = [
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
  ];

  // Math Natural chapters with subtopics
  const mathNaturalChapters = [
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
  ];

  // Math Social chapters with subtopics
  const mathSocialChapters = [
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
  ];

  // Geography chapters with subtopics
  const geographyChapters = [
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
  ];

  // History chapters with subtopics
  const historyChapters = [
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
  ];

  // English chapters with subtopics
  const englishChapters = [
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
  ];

  // Get current chapter and topic content
  const currentChapter = learningContent?.chapters?.find((ch: any) => ch.id === selectedChapter);
  const currentTopic = currentChapter?.topics?.find((topic: any) => topic.id === selectedTopic);

  // Reset chapter selections when subject changes
  React.useEffect(() => {
    // Reset all chapter-related states when subject changes
    setSelectedPsychologyChapter('');
    setSelectedLogicChapter('');
    setSelectedPhysicsChapter('');
    setSelectedMathNaturalChapter('');
    setSelectedMathSocialChapter('');
    setSelectedGeographyChapter('');
    setSelectedHistoryChapter('');
    setSelectedEnglishChapter('');
    setSelectedSubtopic('');
    setSelectedChapter('');
    setSelectedTopic('');
    setExpandedChapters(new Set());
    
    // For Psychology, auto-select first chapter
    if (isPsychology && psychologyChapters.length > 0) {
      setSelectedPsychologyChapter(psychologyChapters[0].id);
      setExpandedChapters(new Set([psychologyChapters[0].id]));
    }
    // For Logic, auto-select first chapter
    else if (isLogic && logicChapters.length > 0) {
      setSelectedLogicChapter(logicChapters[0].id);
      setExpandedChapters(new Set([logicChapters[0].id]));
    }
    // For Physics, auto-select first chapter
    else if (isPhysics && physicsChapters.length > 0) {
      setSelectedPhysicsChapter(physicsChapters[0].id);
      setExpandedChapters(new Set([physicsChapters[0].id]));
    }
    // For Math Natural, auto-select first chapter
    else if (isMathNatural && mathNaturalChapters.length > 0) {
      setSelectedMathNaturalChapter(mathNaturalChapters[0].id);
      setExpandedChapters(new Set([mathNaturalChapters[0].id]));
    }
    // For Math Social, auto-select first chapter
    else if (isMathSocial && mathSocialChapters.length > 0) {
      setSelectedMathSocialChapter(mathSocialChapters[0].id);
      setExpandedChapters(new Set([mathSocialChapters[0].id]));
    }
    // For Geography, auto-select first chapter
    else if (isGeography && geographyChapters.length > 0) {
      setSelectedGeographyChapter(geographyChapters[0].id);
      setExpandedChapters(new Set([geographyChapters[0].id]));
    }
    // For History, auto-select first chapter
    else if (isHistory && historyChapters.length > 0) {
      setSelectedHistoryChapter(historyChapters[0].id);
      setExpandedChapters(new Set([historyChapters[0].id]));
    }
    // For English, auto-select first chapter
    else if (isEnglish && englishChapters.length > 0) {
      setSelectedEnglishChapter(englishChapters[0].id);
      setExpandedChapters(new Set([englishChapters[0].id]));
    }
    // For other subjects, use old structure
    else if (learningContent?.chapters?.length > 0) {
      const firstChapter = learningContent.chapters[0];
      setSelectedChapter(firstChapter.id);
      setExpandedChapters(new Set([firstChapter.id]));
      if (firstChapter.topics?.length > 0) {
        setSelectedTopic(firstChapter.topics[0].id);
      }
    }
  }, [learningSubject, learningContent]);

  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  // Handle chapter click
  const handleChapterClick = (chapter: any) => {
    setSelectedChapter(chapter.id);
    if (chapter.topics?.length > 0) {
      setSelectedTopic(chapter.topics[0].id);
    }
    // Auto-expand when selecting a chapter
    const newExpanded = new Set(expandedChapters);
    newExpanded.add(chapter.id);
    setExpandedChapters(newExpanded);
    // Close sidebar on mobile after selection
    setIsSidebarOpen(false);
  };

  // Navigation logic
  const getAllTopics = () => {
    const allTopics: any[] = [];
    learningContent?.chapters?.forEach((chapter: any) => {
      chapter.topics?.forEach((topic: any) => {
        allTopics.push({ ...topic, chapterId: chapter.id });
      });
    });
    return allTopics;
  };

  const getCurrentTopicIndex = () => {
    const allTopics = getAllTopics();
    return allTopics.findIndex(topic => topic.id === selectedTopic);
  };

  const goToPrevious = () => {
    if (!selectedChapter) return;
    
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    
    if (currentIndex > 0) {
      const prevTopic = allTopics[currentIndex - 1];
      setSelectedChapter(prevTopic.chapterId);
      setSelectedTopic(prevTopic.id);
      // Auto-expand the chapter
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(prevTopic.chapterId);
      setExpandedChapters(newExpanded);
    } else {
      // Go to introduction
      setSelectedChapter('');
      setSelectedTopic('');
    }
  };

  const goToNext = () => {
    if (!selectedChapter) {
      // From introduction, go to first topic
      if (learningContent?.chapters?.length > 0) {
        const firstChapter = learningContent.chapters[0];
        setSelectedChapter(firstChapter.id);
        if (firstChapter.topics?.length > 0) {
          setSelectedTopic(firstChapter.topics[0].id);
        }
        // Auto-expand the chapter
        const newExpanded = new Set(expandedChapters);
        newExpanded.add(firstChapter.id);
        setExpandedChapters(newExpanded);
      }
      return;
    }

    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    
    if (currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      setSelectedChapter(nextTopic.chapterId);
      setSelectedTopic(nextTopic.id);
      // Auto-expand the chapter
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(nextTopic.chapterId);
      setExpandedChapters(newExpanded);
    }
  };

  const canGoPrevious = () => {
    if (!selectedChapter) return false;
    return getCurrentTopicIndex() >= 0;
  };

  const canGoNext = () => {
    if (!selectedChapter) return learningContent?.chapters?.length > 0;
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    return currentIndex < allTopics.length - 1;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* W3Schools Styled Top Navigation Bar */}
      <div className="bg-[#282a35] overflow-x-auto no-scrollbar shadow-lg sticky top-0 z-50">
        <div className="flex items-center min-w-max h-10 md:h-12">
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setLearningSubject(subj)}
              className={`h-full px-3 md:px-6 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center whitespace-nowrap ${
                learningSubject === subj
                  ? 'bg-[#2563eb] text-white shadow-inner'
                  : 'text-slate-300 hover:bg-black/40 hover:text-white'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed bottom-4 left-4 z-30 bg-[#2563eb] text-white p-4 rounded-full shadow-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Tutorial Navigation */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-56 md:w-48 bg-[#f1f1f1] dark:bg-slate-800
          flex flex-col h-full
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll" style={{ maxHeight: 'calc(100vh - 48px)', minHeight: '400px' }}>
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-end p-2 border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tutorial Navigation */}
            <div className="space-y-0">
              {/* Chapters with Collapsible Topics */}
              {isPsychology ? (
                /* Psychology - Show chapter list with expandable subtopics */
                psychologyChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedPsychologyChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedPsychologyChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedPsychologyChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedPsychologyChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedPsychologyChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isLogic ? (
                /* Logic - Show chapter list with expandable subtopics */
                logicChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedLogicChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedLogicChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedLogicChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedLogicChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedLogicChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isPhysics ? (
                /* Physics - Show chapter list with expandable subtopics */
                physicsChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedPhysicsChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedPhysicsChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedPhysicsChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedPhysicsChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedPhysicsChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isMathNatural ? (
                /* Math Natural - Show chapter list with expandable subtopics */
                mathNaturalChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedMathNaturalChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedMathNaturalChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedMathNaturalChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedMathNaturalChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedMathNaturalChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isMathSocial ? (
                /* Math Social - Show chapter list with expandable subtopics */
                mathSocialChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedMathSocialChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedMathSocialChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedMathSocialChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedMathSocialChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedMathSocialChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isGeography ? (
                /* Geography - Show chapter list with expandable subtopics */
                geographyChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedGeographyChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedGeographyChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedGeographyChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedGeographyChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedGeographyChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isHistory ? (
                /* History - Show chapter list with expandable subtopics */
                historyChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedHistoryChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedHistoryChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedHistoryChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedHistoryChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedHistoryChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : isEnglish ? (
                /* English - Show chapter list with expandable subtopics */
                englishChapters.map((chapter) => (
                  <div key={chapter.id}>
                    {/* Chapter Header with Expand/Collapse */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setSelectedEnglishChapter(chapter.id);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                          selectedEnglishChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedChapters);
                          if (newExpanded.has(chapter.id)) {
                            newExpanded.delete(chapter.id);
                          } else {
                            newExpanded.add(chapter.id);
                          }
                          setExpandedChapters(newExpanded);
                        }}
                        className={`px-2 py-2 md:py-3 transition-colors ${
                          selectedEnglishChapter === chapter.id
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Subtopics under expanded chapter */}
                    {expandedChapters.has(chapter.id) && chapter.subtopics?.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedEnglishChapter(chapter.id);
                          setSelectedSubtopic(subtopic);
                          setSelectedChapter('');
                          setSelectedTopic('');
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                          selectedEnglishChapter === chapter.id && selectedSubtopic === subtopic
                            ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {subtopic}
                      </button>
                    ))}
                  </div>
                ))
              ) : (
                /* Other subjects - original structure */
                learningContent?.chapters?.map((chapter: any) => (
                <div key={chapter.id}>
                  {/* Chapter Header with Expand/Collapse */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleChapterClick(chapter)}
                      className={`flex-1 text-left px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm transition-colors ${
                        selectedChapter === chapter.id
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {chapter.title}
                    </button>
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className={`px-2 py-2 md:py-3 transition-colors ${
                        selectedChapter === chapter.id
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Topics under expanded chapter */}
                  {expandedChapters.has(chapter.id) && chapter.topics?.map((topic: any) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
            {/* Content */}
            {isLogic && selectedLogicChapter ? (
              // Logic Chapter Content
              <LogicChapterContent 
                chapterId={selectedLogicChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedLogicChapter={setSelectedLogicChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isPhysics && selectedPhysicsChapter ? (
              // Physics Chapter Content
              <PhysicsChapterContent 
                chapterId={selectedPhysicsChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedPhysicsChapter={setSelectedPhysicsChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isMathNatural && selectedMathNaturalChapter ? (
              // Math Natural Chapter Content
              <MathNaturalChapterContent 
                chapterId={selectedMathNaturalChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedMathNaturalChapter={setSelectedMathNaturalChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isMathSocial && selectedMathSocialChapter ? (
              // Math Social Chapter Content
              <MathSocialChapterContent 
                chapterId={selectedMathSocialChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedMathSocialChapter={setSelectedMathSocialChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isGeography && selectedGeographyChapter ? (
              // Geography Chapter Content
              <GeographyChapterContent 
                chapterId={selectedGeographyChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedGeographyChapter={setSelectedGeographyChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isHistory && selectedHistoryChapter ? (
              // History Chapter Content
              <HistoryChapterContent 
                chapterId={selectedHistoryChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedHistoryChapter={setSelectedHistoryChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isEnglish && selectedEnglishChapter ? (
              // English Chapter Content
              <EnglishChapterContent 
                chapterId={selectedEnglishChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedEnglishChapter={setSelectedEnglishChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : isPsychology && selectedPsychologyChapter ? (
              // Psychology Chapter Content
              <PsychologyChapterContent 
                chapterId={selectedPsychologyChapter} 
                selectedSubtopic={selectedSubtopic}
                setSelectedPsychologyChapter={setSelectedPsychologyChapter}
                setSelectedSubtopic={setSelectedSubtopic}
              />
            ) : !selectedChapter ? (
              // Subject Introduction
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-8">
                  {learningSubject} Introduction
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-8 md:mb-12">
                  <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 mb-4 md:mb-6">
                    {learningSubject} is a fundamental subject for university students.
                  </p>
                  
                  <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">
                    What is {learningSubject}?
                  </h2>
                  
                  {learningContent?.chapters?.length > 0 && (
                    <ul className="space-y-1 md:space-y-2">
                      {learningContent.chapters.map((chapter: any) => (
                        <li key={chapter.id} className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                          • {chapter.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : currentTopic ? (
              // Topic Content
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-8">
                  {currentTopic.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-8 md:mb-12">
                  {currentTopic.content.map((paragraph: string, index: number) => (
                    <div key={index} className="mb-3 md:mb-4">
                      {paragraph.startsWith('- **') || paragraph.startsWith('• ') ? (
                        <div className="ml-4 text-sm md:text-base text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ) : paragraph.includes('**') ? (
                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ) : (
                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline Exercises - Temporarily disabled */}
                {/* TODO: Add exercises back when exercise files are created */}

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : (
              // Chapter Overview
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-8">
                  {currentChapter?.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-8 md:mb-12">
                  <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 mb-4 md:mb-6">
                    This chapter covers the following topics:
                  </p>
                  
                  <ul className="space-y-1 md:space-y-2">
                    {currentChapter?.topics?.map((topic: any) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => setSelectedTopic(topic.id)}
                          className="text-sm md:text-base text-[#2563eb] hover:underline font-medium"
                        >
                          {topic.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};