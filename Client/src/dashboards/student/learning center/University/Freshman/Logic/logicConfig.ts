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
        '1.1. Meaning and Nature of Philosophy',
        '1.2. Basic Features of Philosophy',
        '1.3. Metaphysics and Epistemology',
        '1.4. Axiology and Logic',
        '1.5. Importance of Learning Philosophy'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Basic Concepts of Logic',
      subtopics: [
        '2.1. Arguments, Premises and Conclusions',
        '2.2. Techniques of Recognizing Arguments',
        '2.3. Types of Arguments',
        '2.4. Evaluating Arguments'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Logic and Language',
      subtopics: [
        '3.1. Language and Logic',
        '3.2. Types of Language',
        '3.3. Definitions'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Basic Concepts of Critical Thinking',
      subtopics: [
        '4.1. Meaning of Critical Thinking',
        '4.2. Standards of Critical Thinking',
        '4.3. Codes of Intellectual Conduct',
        '4.4. Characteristics of Critical Thinking'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Informal Fallacies',
      subtopics: [
        '5.1. Fallacy in General',
        '5.2. Fallacies of Relevance',
        '5.3. Fallacies of Weak Induction',
        '5.4. Fallacies of Presumption',
        '5.5. Fallacies of Ambiguity and Grammatical Analogy'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Categorical Propositions',
      subtopics: [
        '6.1. General Introduction',
        '6.2. Attributes of Categorical Propositions',
        '6.3. Venn Diagrams and Square of Opposition',
        '6.4. Evaluating Immediate Inferences'
      ]
    }
  ]
};
