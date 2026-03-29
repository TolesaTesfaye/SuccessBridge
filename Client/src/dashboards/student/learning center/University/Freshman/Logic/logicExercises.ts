export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LOGIC_EXERCISES: Record<string, ExerciseQuestion[]> = {
  'logic-1-1': [ // What is Logic?
    {
      question: "What is the main focus of logic as a scientific study?",
      options: [
        "Emotional reasoning",
        "Rules and principles of reasoning", 
        "Personal beliefs",
        "Cultural traditions"
      ],
      correctAnswer: 1,
      explanation: "Logic is the scientific study of the rules and principles of reasoning, focusing on valid forms of inference and argument structure."
    },
    {
      question: "In an argument, what provides support for the conclusion?",
      options: ["Premises", "Emotions", "Opinions", "Traditions"],
      correctAnswer: 0,
      explanation: "Premises are statements in an argument that set forth evidence and provide support for the conclusion."
    }
  ],
  
  'logic-1-2': [ // Deduction vs. Induction
    {
      question: "Which type of argument claims the conclusion follows with absolute necessity?",
      options: ["Inductive", "Deductive", "Emotional", "Cultural"],
      correctAnswer: 1,
      explanation: "Deductive arguments claim that the conclusion follows from the premises with absolute necessity, while inductive arguments claim probability."
    },
    {
      question: "An argument where the conclusion is claimed to follow with probability is:",
      options: ["Deductive", "Inductive", "Invalid", "Unsound"],
      correctAnswer: 1,
      explanation: "Inductive arguments claim that the conclusion follows from the premises with probability, not certainty."
    }
  ]
};