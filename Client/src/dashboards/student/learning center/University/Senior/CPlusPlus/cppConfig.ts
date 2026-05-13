import { SubjectConfig } from '../subjectRegistry';

export const cppConfig: SubjectConfig = {
  name: 'C++',
  color: {
    primary: '#00599C',
    secondary: '#004482',
    gradient: 'from-blue-600 to-blue-800',
  },
  chapters: [
    {
      id: 'introduction',
      title: 'Introduction to C++',
      subtopics: [
        'What is C++?',
        'History and Evolution',
        'Setting Up Development Environment',
        'Your First C++ Program',
        'Compilation Process',
      ],
    },
    {
      id: 'basics',
      title: 'C++ Basics',
      subtopics: [
        'Variables and Data Types',
        'Operators',
        'Input and Output',
        'Comments',
        'Constants',
      ],
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      subtopics: [
        'If-Else Statements',
        'Switch Statements',
        'For Loops',
        'While Loops',
        'Do-While Loops',
        'Break and Continue',
      ],
    },
    {
      id: 'functions',
      title: 'Functions',
      subtopics: [
        'Function Declaration and Definition',
        'Function Parameters',
        'Return Values',
        'Function Overloading',
        'Recursion',
        'Inline Functions',
      ],
    },
    {
      id: 'arrays-strings',
      title: 'Arrays and Strings',
      subtopics: [
        'One-Dimensional Arrays',
        'Multi-Dimensional Arrays',
        'C-Style Strings',
        'String Class',
        'String Operations',
      ],
    },
    {
      id: 'pointers',
      title: 'Pointers and References',
      subtopics: [
        'Pointer Basics',
        'Pointer Arithmetic',
        'Pointers and Arrays',
        'References',
        'Dynamic Memory Allocation',
        'Smart Pointers',
      ],
    },
    {
      id: 'oop',
      title: 'Object-Oriented Programming',
      subtopics: [
        'Classes and Objects',
        'Constructors and Destructors',
        'Encapsulation',
        'Inheritance',
        'Polymorphism',
        'Abstract Classes',
        'Virtual Functions',
      ],
    },
    {
      id: 'stl',
      title: 'Standard Template Library (STL)',
      subtopics: [
        'Vectors',
        'Lists',
        'Maps and Sets',
        'Iterators',
        'Algorithms',
        'Function Objects',
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      subtopics: [
        'Templates',
        'Exception Handling',
        'File I/O',
        'Namespaces',
        'Operator Overloading',
        'Lambda Expressions',
      ],
    },
  ],
};
