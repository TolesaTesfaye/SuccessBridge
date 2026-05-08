// Logic Subject Configuration
// This file contains all chapters and subtopics for Logic

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

export const logicConfig: SubjectConfig = {
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
};
