export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const REMEDIAL_ENGLISH_EXERCISES: Record<string, ExerciseQuestion[]> = {
  'remedial-english-1-1': [ // Parts of Speech
    {
      question: "In the sentence 'The quick brown fox jumps over the lazy dog,' what part of speech is 'quick'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: 2,
      explanation: "'Quick' is an adjective because it describes the noun 'fox.' Adjectives modify or describe nouns."
    },
    {
      question: "Which word is a verb in this sentence: 'Students study hard for their exams'?",
      options: ["Students", "study", "hard", "exams"],
      correctAnswer: 1,
      explanation: "'Study' is a verb because it shows the action that the students are performing."
    },
    {
      question: "What type of noun is 'happiness'?",
      options: ["Common noun", "Proper noun", "Concrete noun", "Abstract noun"],
      correctAnswer: 3,
      explanation: "'Happiness' is an abstract noun because it names an idea or feeling that cannot be touched or seen."
    }
  ],
  
  'remedial-english-1-2': [ // Sentence Structure
    {
      question: "Which of the following is a complete sentence?",
      options: [
        "Because I was tired.",
        "Running down the street.",
        "The cat slept on the mat.",
        "After the game ended."
      ],
      correctAnswer: 2,
      explanation: "'The cat slept on the mat' is complete because it has a subject (cat) and predicate (slept on the mat) and expresses a complete thought."
    },
    {
      question: "What type of sentence is: 'Where did you put my keys?'",
      options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
      correctAnswer: 1,
      explanation: "This is an interrogative sentence because it asks a question, indicated by the question word 'where' and the question mark."
    }
  ],

  'remedial-english-2-1': [ // Reading Strategies
    {
      question: "What should you do BEFORE reading a text?",
      options: [
        "Read every word carefully",
        "Preview the title and headings",
        "Look up all unknown words",
        "Take detailed notes"
      ],
      correctAnswer: 1,
      explanation: "Previewing the title, headings, and pictures before reading helps you understand what the text will be about and prepares your mind for the content."
    },
    {
      question: "When you encounter a difficult word while reading, what should you try FIRST?",
      options: [
        "Skip the entire sentence",
        "Stop reading immediately",
        "Use context clues",
        "Look it up in the dictionary"
      ],
      correctAnswer: 2,
      explanation: "Using context clues (surrounding words and sentences) is the first strategy to try because it helps you understand the word's meaning without interrupting your reading flow."
    }
  ],

  'remedial-english-2-2': [ // Finding Main Ideas
    {
      question: "The main idea of a paragraph is usually found in the:",
      options: [
        "First sentence only",
        "Last sentence only", 
        "Topic sentence",
        "Longest sentence"
      ],
      correctAnswer: 2,
      explanation: "The main idea is usually found in the topic sentence, which can be at the beginning, middle, or end of a paragraph, but most commonly appears first."
    },
    {
      question: "Supporting details in a paragraph:",
      options: [
        "Are more important than the main idea",
        "Help explain or prove the main idea",
        "Should be ignored when reading",
        "Are always facts and statistics"
      ],
      correctAnswer: 1,
      explanation: "Supporting details help explain, prove, or illustrate the main idea with examples, facts, statistics, or explanations."
    }
  ]
};