import { SubjectConfig } from '../subjectRegistry';

export const dataStructuresConfig: SubjectConfig = {
  name: 'Data Structures',
  color: {
    primary: '#8B5CF6',
    secondary: '#6D28D9',
    gradient: 'from-purple-500 to-purple-700',
  },
  chapters: [
    {
      id: 'introduction',
      title: 'Introduction to Data Structures',
      subtopics: [
        'What are Data Structures?',
        'Why Data Structures Matter',
        'Types of Data Structures',
        'Time and Space Complexity',
        'Big O Notation',
      ],
    },
    {
      id: 'arrays',
      title: 'Arrays',
      subtopics: [
        'Array Basics',
        'Static vs Dynamic Arrays',
        'Array Operations',
        'Multi-Dimensional Arrays',
        'Common Array Problems',
      ],
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      subtopics: [
        'Singly Linked Lists',
        'Doubly Linked Lists',
        'Circular Linked Lists',
        'Linked List Operations',
        'Applications of Linked Lists',
      ],
    },
    {
      id: 'stacks',
      title: 'Stacks',
      subtopics: [
        'Stack Basics',
        'Stack Implementation',
        'Stack Operations',
        'Applications of Stacks',
        'Expression Evaluation',
      ],
    },
    {
      id: 'queues',
      title: 'Queues',
      subtopics: [
        'Queue Basics',
        'Queue Implementation',
        'Circular Queue',
        'Priority Queue',
        'Deque',
        'Applications of Queues',
      ],
    },
    {
      id: 'trees',
      title: 'Trees',
      subtopics: [
        'Tree Terminology',
        'Binary Trees',
        'Binary Search Trees',
        'Tree Traversals',
        'AVL Trees',
        'Red-Black Trees',
        'B-Trees',
      ],
    },
    {
      id: 'heaps',
      title: 'Heaps',
      subtopics: [
        'Heap Basics',
        'Min Heap and Max Heap',
        'Heap Operations',
        'Heapify',
        'Heap Sort',
        'Priority Queue Implementation',
      ],
    },
    {
      id: 'hashing',
      title: 'Hashing',
      subtopics: [
        'Hash Tables',
        'Hash Functions',
        'Collision Resolution',
        'Chaining',
        'Open Addressing',
        'Applications of Hashing',
      ],
    },
    {
      id: 'graphs',
      title: 'Graphs',
      subtopics: [
        'Graph Basics',
        'Graph Representation',
        'Graph Traversals (BFS, DFS)',
        'Shortest Path Algorithms',
        'Minimum Spanning Tree',
        'Topological Sorting',
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Data Structures',
      subtopics: [
        'Trie',
        'Segment Tree',
        'Fenwick Tree',
        'Disjoint Set Union',
        'Suffix Array',
        'Skip List',
      ],
    },
  ],
};
